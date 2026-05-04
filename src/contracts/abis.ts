// Contract ABIs (will be auto-generated from compiled contracts)
// For now, we export the key functions we'll use

export const SovereignProfileABI = [
  {
    "type": "function",
    "name": "mintProfile",
    "inputs": [{ "name": "metadataURI", "type": "string" }],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "updateProfile",
    "inputs": [{ "name": "newMetadataURI", "type": "string" }],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "hasProfile",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getProfileId",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getProfileURI",
    "inputs": [{ "name": "user", "type": "address" }],
    "outputs": [{ "name": "", "type": "string" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "totalProfiles",
    "inputs": [],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "view",
  },
  {
    "type": "event",
    "name": "ProfileMinted",
    "inputs": [
      { "name": "owner", "type": "address", "indexed": true },
      { "name": "tokenId", "type": "uint256", "indexed": true },
      { "name": "metadataURI", "type": "string", "indexed": false },
    ],
  },
  {
    "type": "event",
    "name": "ProfileUpdated",
    "inputs": [
      { "name": "owner", "type": "address", "indexed": true },
      { "name": "tokenId", "type": "uint256", "indexed": true },
      { "name": "newMetadataURI", "type": "string", "indexed": false },
    ],
  },
] as const;

export const CircleKeysABI = [
  {
    "type": "function",
    "name": "createCircle",
    "inputs": [
      { "name": "circleType", "type": "uint8" },
      { "name": "name", "type": "string" },
    ],
    "outputs": [{ "name": "", "type": "uint256" }],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "grantAccess",
    "inputs": [
      { "name": "circleId", "type": "uint256" },
      { "name": "member", "type": "address" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "grantAccessBatch",
    "inputs": [
      { "name": "circleId", "type": "uint256" },
      { "name": "members", "type": "address[]" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "revokeAccess",
    "inputs": [
      { "name": "circleId", "type": "uint256" },
      { "name": "member", "type": "address" },
    ],
    "outputs": [],
    "stateMutability": "nonpayable",
  },
  {
    "type": "function",
    "name": "hasAccess",
    "inputs": [
      { "name": "circleId", "type": "uint256" },
      { "name": "user", "type": "address" },
    ],
    "outputs": [{ "name": "", "type": "bool" }],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getCircle",
    "inputs": [{ "name": "circleId", "type": "uint256" }],
    "outputs": [
      {
        "name": "",
        "type": "tuple",
        "components": [
          { "name": "creator", "type": "address" },
          { "name": "circleType", "type": "uint8" },
          { "name": "name", "type": "string" },
          { "name": "memberCount", "type": "uint256" },
          { "name": "exists", "type": "bool" },
        ],
      },
    ],
    "stateMutability": "view",
  },
  {
    "type": "function",
    "name": "getCreatorCircles",
    "inputs": [{ "name": "creator", "type": "address" }],
    "outputs": [{ "name": "", "type": "uint256[]" }],
    "stateMutability": "view",
  },
  {
    "type": "event",
    "name": "CircleCreated",
    "inputs": [
      { "name": "circleId", "type": "uint256", "indexed": true },
      { "name": "creator", "type": "address", "indexed": true },
      { "name": "circleType", "type": "uint8", "indexed": false },
      { "name": "name", "type": "string", "indexed": false },
    ],
  },
  {
    "type": "event",
    "name": "KeyGranted",
    "inputs": [
      { "name": "circleId", "type": "uint256", "indexed": true },
      { "name": "member", "type": "address", "indexed": true },
    ],
  },
  {
    "type": "event",
    "name": "KeyRevoked",
    "inputs": [
      { "name": "circleId", "type": "uint256", "indexed": true },
      { "name": "member", "type": "address", "indexed": true },
    ],
  },
] as const;
