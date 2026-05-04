// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title CircleKeys
 * @dev ERC-1155 tokens representing access keys to different circles
 *
 * Philosophy:
 * - Each circle (Family, Work, etc.) is a token ID
 * - Token holders can view content shared with that circle
 * - Circle creators can mint/burn keys (grant/revoke access)
 * - Decentralized access control without central authority
 *
 * Token IDs:
 * - User circles start at 1000 (1000 + userProfileId * 100)
 * - Within each user's space:
 *   - +1 = Family circle
 *   - +2 = Work circle
 *   - +3 = Custom circle 1
 *   - etc.
 */
contract CircleKeys is ERC1155, Ownable {
    // Circle types
    enum CircleType {
        Family,  // 0
        Work,    // 1
        Custom   // 2+
    }

    // Struct to track circle metadata
    struct Circle {
        address creator;
        CircleType circleType;
        string name;
        uint256 memberCount;
        bool exists;
    }

    // Mapping from token ID to circle info
    mapping(uint256 => Circle) public circles;

    // Mapping from creator address to their base token ID space
    mapping(address => uint256) public creatorBaseId;

    // Counter for assigning base IDs to new creators
    uint256 private _nextCreatorId = 1;

    // Events
    event CircleCreated(
        uint256 indexed circleId,
        address indexed creator,
        CircleType circleType,
        string name
    );
    event KeyGranted(uint256 indexed circleId, address indexed member);
    event KeyRevoked(uint256 indexed circleId, address indexed member);

    constructor() ERC1155("https://api.sovereignrealm.xyz/circle/{id}.json") Ownable(msg.sender) {}

    /**
     * @dev Create a new circle and get its token ID
     * @param circleType Type of circle (Family, Work, Custom)
     * @param name Human-readable name for the circle
     * @return circleId The token ID for this circle
     */
    function createCircle(CircleType circleType, string memory name)
        public
        returns (uint256)
    {
        // Assign base ID space if creator is new
        if (creatorBaseId[msg.sender] == 0) {
            creatorBaseId[msg.sender] = _nextCreatorId * 100;
            _nextCreatorId++;
        }

        // Calculate circle ID: baseId + circleType offset
        uint256 circleId = creatorBaseId[msg.sender] + uint256(circleType);

        require(!circles[circleId].exists, "Circle already exists");

        // Create the circle
        circles[circleId] = Circle({
            creator: msg.sender,
            circleType: circleType,
            name: name,
            memberCount: 0,
            exists: true
        });

        emit CircleCreated(circleId, msg.sender, circleType, name);

        return circleId;
    }

    /**
     * @dev Grant access to a circle (mint key for member)
     * @param circleId The circle token ID
     * @param member Address to grant access to
     *
     * Requirements:
     * - Caller must be the circle creator
     * - Circle must exist
     */
    function grantAccess(uint256 circleId, address member) public {
        Circle storage circle = circles[circleId];
        require(circle.exists, "Circle does not exist");
        require(circle.creator == msg.sender, "Only creator can grant access");
        require(balanceOf(member, circleId) == 0, "Member already has access");

        // Mint 1 key to the member
        _mint(member, circleId, 1, "");
        circle.memberCount++;

        emit KeyGranted(circleId, member);
    }

    /**
     * @dev Grant access to multiple members at once
     * @param circleId The circle token ID
     * @param members Array of addresses to grant access to
     */
    function grantAccessBatch(uint256 circleId, address[] memory members) public {
        Circle storage circle = circles[circleId];
        require(circle.exists, "Circle does not exist");
        require(circle.creator == msg.sender, "Only creator can grant access");

        for (uint256 i = 0; i < members.length; i++) {
            if (balanceOf(members[i], circleId) == 0) {
                _mint(members[i], circleId, 1, "");
                circle.memberCount++;
                emit KeyGranted(circleId, members[i]);
            }
        }
    }

    /**
     * @dev Revoke access from a circle (burn member's key)
     * @param circleId The circle token ID
     * @param member Address to revoke access from
     *
     * Requirements:
     * - Caller must be the circle creator
     */
    function revokeAccess(uint256 circleId, address member) public {
        Circle storage circle = circles[circleId];
        require(circle.exists, "Circle does not exist");
        require(circle.creator == msg.sender, "Only creator can revoke access");
        require(balanceOf(member, circleId) > 0, "Member does not have access");

        // Burn the key
        _burn(member, circleId, 1);
        circle.memberCount--;

        emit KeyRevoked(circleId, member);
    }

    /**
     * @dev Check if an address has access to a circle
     * @param circleId The circle token ID
     * @param user Address to check
     * @return bool True if user has access
     */
    function hasAccess(uint256 circleId, address user) public view returns (bool) {
        return balanceOf(user, circleId) > 0;
    }

    /**
     * @dev Get circle information
     * @param circleId The circle token ID
     * @return Circle struct with metadata
     */
    function getCircle(uint256 circleId) public view returns (Circle memory) {
        return circles[circleId];
    }

    /**
     * @dev Get all circle IDs for a creator
     * @param creator The creator's address
     * @return Array of circle IDs [family, work, custom...]
     */
    function getCreatorCircles(address creator)
        public
        view
        returns (uint256[] memory)
    {
        uint256 baseId = creatorBaseId[creator];
        if (baseId == 0) {
            return new uint256[](0);
        }

        // Check which circles exist (max 10 per creator for now)
        uint256 count = 0;
        for (uint256 i = 0; i < 10; i++) {
            if (circles[baseId + i].exists) {
                count++;
            }
        }

        uint256[] memory circleIds = new uint256[](count);
        uint256 index = 0;
        for (uint256 i = 0; i < 10; i++) {
            if (circles[baseId + i].exists) {
                circleIds[index] = baseId + i;
                index++;
            }
        }

        return circleIds;
    }

    /**
     * @dev Block transfers - keys are soulbound within circles
     * Keys can only be granted/revoked by circle creator
     */
    function safeTransferFrom(
        address from,
        address to,
        uint256 id,
        uint256 value,
        bytes memory data
    ) public virtual override {
        revert("Circle keys are soulbound and cannot be transferred");
    }

    /**
     * @dev Block batch transfers
     */
    function safeBatchTransferFrom(
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory values,
        bytes memory data
    ) public virtual override {
        revert("Circle keys are soulbound and cannot be transferred");
    }
}
