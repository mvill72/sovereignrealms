import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { SovereignProfileABI, CircleKeysABI } from './abis';

// Contract addresses (set via environment variables after deployment)
export const PROFILE_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_PROFILE_CONTRACT || '0x') as `0x${string}`;
export const CIRCLE_KEYS_CONTRACT_ADDRESS = (process.env.NEXT_PUBLIC_CIRCLE_KEYS_CONTRACT || '0x') as `0x${string}`;

// ============================================================================
// SovereignProfile Hooks
// ============================================================================

/**
 * Check if an address has a profile NFT
 */
export function useHasProfile(address?: `0x${string}`) {
  return useReadContract({
    address: PROFILE_CONTRACT_ADDRESS,
    abi: SovereignProfileABI,
    functionName: 'hasProfile',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}

/**
 * Get profile token ID for an address
 */
export function useProfileId(address?: `0x${string}`) {
  return useReadContract({
    address: PROFILE_CONTRACT_ADDRESS,
    abi: SovereignProfileABI,
    functionName: 'getProfileId',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}

/**
 * Get profile metadata URI for an address
 */
export function useProfileURI(address?: `0x${string}`) {
  return useReadContract({
    address: PROFILE_CONTRACT_ADDRESS,
    abi: SovereignProfileABI,
    functionName: 'getProfileURI',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
    },
  });
}

/**
 * Get total number of profiles minted
 */
export function useTotalProfiles() {
  return useReadContract({
    address: PROFILE_CONTRACT_ADDRESS,
    abi: SovereignProfileABI,
    functionName: 'totalProfiles',
  });
}

/**
 * Mint a new profile NFT
 */
export function useMintProfile() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const mintProfile = async (metadataURI: string) => {
    return writeContract({
      address: PROFILE_CONTRACT_ADDRESS,
      abi: SovereignProfileABI,
      functionName: 'mintProfile',
      args: [metadataURI],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return {
    mintProfile,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

/**
 * Update profile metadata URI
 */
export function useUpdateProfile() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const updateProfile = async (newMetadataURI: string) => {
    return writeContract({
      address: PROFILE_CONTRACT_ADDRESS,
      abi: SovereignProfileABI,
      functionName: 'updateProfile',
      args: [newMetadataURI],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return {
    updateProfile,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

// ============================================================================
// CircleKeys Hooks
// ============================================================================

export enum CircleType {
  Family = 0,
  Work = 1,
  Custom = 2,
}

/**
 * Get circle information by ID
 */
export function useCircle(circleId?: bigint) {
  return useReadContract({
    address: CIRCLE_KEYS_CONTRACT_ADDRESS,
    abi: CircleKeysABI,
    functionName: 'getCircle',
    args: circleId !== undefined ? [circleId] : undefined,
    query: {
      enabled: circleId !== undefined,
    },
  });
}

/**
 * Get all circles created by an address
 */
export function useCreatorCircles(creator?: `0x${string}`) {
  return useReadContract({
    address: CIRCLE_KEYS_CONTRACT_ADDRESS,
    abi: CircleKeysABI,
    functionName: 'getCreatorCircles',
    args: creator ? [creator] : undefined,
    query: {
      enabled: !!creator,
    },
  });
}

/**
 * Check if an address has access to a circle
 */
export function useHasCircleAccess(circleId?: bigint, address?: `0x${string}`) {
  return useReadContract({
    address: CIRCLE_KEYS_CONTRACT_ADDRESS,
    abi: CircleKeysABI,
    functionName: 'hasAccess',
    args: circleId !== undefined && address ? [circleId, address] : undefined,
    query: {
      enabled: circleId !== undefined && !!address,
    },
  });
}

/**
 * Create a new circle
 */
export function useCreateCircle() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const createCircle = async (circleType: CircleType, name: string) => {
    return writeContract({
      address: CIRCLE_KEYS_CONTRACT_ADDRESS,
      abi: CircleKeysABI,
      functionName: 'createCircle',
      args: [circleType, name],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return {
    createCircle,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

/**
 * Grant access to a circle member
 */
export function useGrantAccess() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const grantAccess = async (circleId: bigint, member: `0x${string}`) => {
    return writeContract({
      address: CIRCLE_KEYS_CONTRACT_ADDRESS,
      abi: CircleKeysABI,
      functionName: 'grantAccess',
      args: [circleId, member],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return {
    grantAccess,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

/**
 * Grant access to multiple members at once
 */
export function useGrantAccessBatch() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const grantAccessBatch = async (circleId: bigint, members: `0x${string}`[]) => {
    return writeContract({
      address: CIRCLE_KEYS_CONTRACT_ADDRESS,
      abi: CircleKeysABI,
      functionName: 'grantAccessBatch',
      args: [circleId, members],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return {
    grantAccessBatch,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}

/**
 * Revoke access from a circle member
 */
export function useRevokeAccess() {
  const { writeContract, data: hash, ...rest } = useWriteContract();

  const revokeAccess = async (circleId: bigint, member: `0x${string}`) => {
    return writeContract({
      address: CIRCLE_KEYS_CONTRACT_ADDRESS,
      abi: CircleKeysABI,
      functionName: 'revokeAccess',
      args: [circleId, member],
    });
  };

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  return {
    revokeAccess,
    hash,
    isConfirming,
    isConfirmed,
    ...rest,
  };
}
