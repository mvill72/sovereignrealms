// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title ISemaphore
 * @notice Interface for Semaphore v4 protocol
 * @dev See https://docs.semaphore.pse.dev/ for full documentation
 */
interface ISemaphore {
    function createGroup(uint256 groupId) external;

    function addMember(uint256 groupId, uint256 identityCommitment) external;

    function updateMember(
        uint256 groupId,
        uint256 oldIdentityCommitment,
        uint256 newIdentityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external;

    function removeMember(
        uint256 groupId,
        uint256 identityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external;

    function verifyProof(
        uint256 groupId,
        uint256 merkleTreeRoot,
        uint256 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external view;

    function getMerkleTreeRoot(uint256 groupId) external view returns (uint256);

    function getMerkleTreeDepth(uint256 groupId) external view returns (uint256);

    function getNumberOfMerkleTreeLeaves(uint256 groupId) external view returns (uint256);
}

/**
 * @title ZKCircleVerifier
 * @notice Zero-knowledge membership verification for SovereignRealm Circles
 * @dev Deployed per sovereign realm, linked to SovereignProfile NFT
 *
 * Philosophy:
 * - Prove Circle membership without revealing member list
 * - Nullifier prevents proof replay
 * - Instant revocation via token burn → Merkle tree update
 * - The Self proves it belongs — and nothing more
 *
 * Architecture:
 * - Links to Semaphore v4 for ZK group management
 * - One Semaphore group per Circle (Family=1, Work=2, Outer=3)
 * - Sovereign (contract owner) maintains Merkle tree via CircleKeys events
 * - Frontend generates proofs client-side (browser WASM)
 */
contract ZKCircleVerifier is Ownable {
    ISemaphore public immutable semaphore;

    // Mapping from Circle ID to Semaphore group ID
    mapping(uint256 => uint256) public circleToGroupId;

    // Mapping to track used nullifiers (prevent replay attacks)
    mapping(uint256 => bool) public usedNullifiers;

    // Events
    event GroupCreated(uint256 indexed circleId, uint256 indexed groupId);
    event MemberAdded(uint256 indexed circleId, uint256 identityCommitment);
    event MemberRemoved(uint256 indexed circleId, uint256 identityCommitment);
    event MembershipProved(
        address indexed prover,
        uint256 indexed circleId,
        uint256 nullifierHash,
        uint256 signal
    );

    /**
     * @dev Constructor
     * @param _semaphore Address of Semaphore v4 contract on this chain
     */
    constructor(address _semaphore) Ownable(msg.sender) {
        require(_semaphore != address(0), "Invalid Semaphore address");
        semaphore = ISemaphore(_semaphore);
    }

    /**
     * @notice Create a new Semaphore group for a Circle
     * @dev Only callable by sovereign (contract owner)
     * @param circleId The Circle ID (1=Family, 2=Work, 3=Outer, 4+=custom)
     */
    function createGroup(uint256 circleId) external onlyOwner {
        require(circleId >= 1, "Vault Only (0) is never on-chain");
        require(circleToGroupId[circleId] == 0, "Group already exists for this Circle");

        // Generate unique group ID: hash of contract address + circle ID
        uint256 groupId = uint256(keccak256(abi.encodePacked(address(this), circleId)));

        semaphore.createGroup(groupId);
        circleToGroupId[circleId] = groupId;

        emit GroupCreated(circleId, groupId);
    }

    /**
     * @notice Add member to Circle's Semaphore group
     * @dev Called by sovereign when CircleKey is minted
     * @param circleId The Circle ID
     * @param identityCommitment The member's Semaphore identity commitment
     */
    function addMember(uint256 circleId, uint256 identityCommitment) external onlyOwner {
        uint256 groupId = circleToGroupId[circleId];
        require(groupId != 0, "Group does not exist");

        semaphore.addMember(groupId, identityCommitment);

        emit MemberAdded(circleId, identityCommitment);
    }

    /**
     * @notice Remove member from Circle's Semaphore group
     * @dev Called by sovereign when CircleKey is burned/revoked
     * @param circleId The Circle ID
     * @param identityCommitment The member's Semaphore identity commitment
     * @param merkleProofSiblings Merkle proof siblings for removal
     */
    function removeMember(
        uint256 circleId,
        uint256 identityCommitment,
        uint256[] calldata merkleProofSiblings
    ) external onlyOwner {
        uint256 groupId = circleToGroupId[circleId];
        require(groupId != 0, "Group does not exist");

        semaphore.removeMember(groupId, identityCommitment, merkleProofSiblings);

        emit MemberRemoved(circleId, identityCommitment);
    }

    /**
     * @notice Verify ZK proof of Circle membership
     * @dev Can be called by anyone (verification is public, but reveals nothing about members)
     * @param circleId The Circle ID being proven
     * @param signal Public signal (e.g., hash of post CID)
     * @param nullifierHash Unique nullifier to prevent proof replay
     * @param externalNullifier Additional nullifier context (e.g., epoch or action type)
     * @param proof Groth16 proof (8 uint256 values)
     * @return bool True if proof is valid and nullifier hasn't been used
     */
    function verifyMembership(
        uint256 circleId,
        uint256 signal,
        uint256 nullifierHash,
        uint256 externalNullifier,
        uint256[8] calldata proof
    ) external returns (bool) {
        uint256 groupId = circleToGroupId[circleId];
        require(groupId != 0, "Group does not exist");
        require(!usedNullifiers[nullifierHash], "Nullifier already used");

        // Get current Merkle tree root from Semaphore
        uint256 merkleTreeRoot = semaphore.getMerkleTreeRoot(groupId);

        // Verify the ZK proof (reverts if invalid)
        semaphore.verifyProof(
            groupId,
            merkleTreeRoot,
            signal,
            nullifierHash,
            externalNullifier,
            proof
        );

        // Mark nullifier as used (prevents replay)
        usedNullifiers[nullifierHash] = true;

        emit MembershipProved(msg.sender, circleId, nullifierHash, signal);

        return true;
    }

    /**
     * @notice Check if a nullifier has been used (prevents double-proving)
     * @param nullifierHash The nullifier to check
     * @return bool True if nullifier has been used
     */
    function isNullifierUsed(uint256 nullifierHash) external view returns (bool) {
        return usedNullifiers[nullifierHash];
    }

    /**
     * @notice Get Semaphore group ID for a Circle
     * @param circleId The Circle ID
     * @return uint256 The Semaphore group ID (0 if not created)
     */
    function getGroupId(uint256 circleId) external view returns (uint256) {
        return circleToGroupId[circleId];
    }

    /**
     * @notice Get current Merkle tree root for a Circle
     * @param circleId The Circle ID
     * @return uint256 The current Merkle tree root
     */
    function getMerkleTreeRoot(uint256 circleId) external view returns (uint256) {
        uint256 groupId = circleToGroupId[circleId];
        require(groupId != 0, "Group does not exist");
        return semaphore.getMerkleTreeRoot(groupId);
    }

    /**
     * @notice Get number of members in a Circle's Semaphore group
     * @param circleId The Circle ID
     * @return uint256 Number of leaves in the Merkle tree
     */
    function getNumberOfMembers(uint256 circleId) external view returns (uint256) {
        uint256 groupId = circleToGroupId[circleId];
        require(groupId != 0, "Group does not exist");
        return semaphore.getNumberOfMerkleTreeLeaves(groupId);
    }
}
