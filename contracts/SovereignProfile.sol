// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/**
 * @title SovereignProfile
 * @dev ERC-721 NFT representing a user's sovereign digital identity
 *
 * Philosophy:
 * - One profile per address (soulbound after mint)
 * - Profile metadata stored on IPFS
 * - Immutable identity that travels with the wallet
 * - No central authority can revoke or modify
 */
contract SovereignProfile is ERC721URIStorage, Ownable {
    // Token ID counter (each user gets sequential ID)
    uint256 private _nextTokenId;

    // Mapping from address to token ID (one profile per address)
    mapping(address => uint256) public addressToProfile;

    // Mapping to check if address has minted
    mapping(address => bool) public hasMinted;

    // Events
    event ProfileMinted(address indexed owner, uint256 indexed tokenId, string metadataURI);
    event ProfileUpdated(address indexed owner, uint256 indexed tokenId, string newMetadataURI);

    constructor() ERC721("Sovereign Profile", "SOVEREIGN") Ownable(msg.sender) {
        _nextTokenId = 1; // Start token IDs at 1
    }

    /**
     * @dev Mint a sovereign profile NFT
     * @param metadataURI IPFS URI containing profile metadata (name, bio, avatar, etc.)
     *
     * Requirements:
     * - Caller must not have already minted a profile
     * - Metadata URI must not be empty
     */
    function mintProfile(string memory metadataURI) public returns (uint256) {
        require(!hasMinted[msg.sender], "Profile already exists for this address");
        require(bytes(metadataURI).length > 0, "Metadata URI cannot be empty");

        uint256 tokenId = _nextTokenId++;

        // Mint the NFT to the caller
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, metadataURI);

        // Record the mapping
        addressToProfile[msg.sender] = tokenId;
        hasMinted[msg.sender] = true;

        emit ProfileMinted(msg.sender, tokenId, metadataURI);

        return tokenId;
    }

    /**
     * @dev Update profile metadata (change name, bio, avatar, etc.)
     * @param newMetadataURI New IPFS URI with updated metadata
     *
     * Requirements:
     * - Caller must own a profile
     */
    function updateProfile(string memory newMetadataURI) public {
        require(hasMinted[msg.sender], "No profile exists for this address");
        require(bytes(newMetadataURI).length > 0, "Metadata URI cannot be empty");

        uint256 tokenId = addressToProfile[msg.sender];
        _setTokenURI(tokenId, newMetadataURI);

        emit ProfileUpdated(msg.sender, tokenId, newMetadataURI);
    }

    /**
     * @dev Get the token ID for an address
     * @param user Address to check
     * @return tokenId The profile token ID (0 if no profile)
     */
    function getProfileId(address user) public view returns (uint256) {
        return addressToProfile[user];
    }

    /**
     * @dev Get profile metadata URI for an address
     * @param user Address to check
     * @return URI string (empty if no profile)
     */
    function getProfileURI(address user) public view returns (string memory) {
        if (!hasMinted[user]) {
            return "";
        }
        uint256 tokenId = addressToProfile[user];
        return tokenURI(tokenId);
    }

    /**
     * @dev Check if an address has a profile
     * @param user Address to check
     * @return bool True if profile exists
     */
    function hasProfile(address user) public view returns (bool) {
        return hasMinted[user];
    }

    /**
     * @dev Get total number of profiles minted
     * @return uint256 Total supply
     */
    function totalProfiles() public view returns (uint256) {
        return _nextTokenId - 1;
    }

    /**
     * @dev Override transfer functions to make profiles soulbound (non-transferable)
     * Profiles are tied to the wallet that minted them
     */
    function _update(
        address to,
        uint256 tokenId,
        address auth
    ) internal virtual override returns (address) {
        address from = _ownerOf(tokenId);

        // Allow minting (from == address(0))
        // Block all transfers (from != address(0))
        if (from != address(0)) {
            revert("Sovereign profiles are soulbound and cannot be transferred");
        }

        return super._update(to, tokenId, auth);
    }
}
