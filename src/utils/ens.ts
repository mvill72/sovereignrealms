import { createPublicClient, http } from 'viem';
import { mainnet } from 'viem/chains';
import { normalize } from 'viem/ens';

const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});

/**
 * Get ENS name for an address
 */
export async function getEnsName(address: `0x${string}`): Promise<string | null> {
  try {
    const ensName = await publicClient.getEnsName({ address });
    return ensName;
  } catch (error) {
    console.error('Failed to resolve ENS name:', error);
    return null;
  }
}

/**
 * Get ENS avatar for an address or ENS name
 */
export async function getEnsAvatar(addressOrName: string): Promise<string | null> {
  try {
    if (addressOrName.endsWith('.eth')) {
      const avatar = await publicClient.getEnsAvatar({ name: normalize(addressOrName) });
      return avatar;
    } else {
      const avatar = await publicClient.getEnsAvatar({ name: normalize(addressOrName) });
      return avatar;
    }
  } catch (error) {
    console.error('Failed to resolve ENS avatar:', error);
    return null;
  }
}

/**
 * Get address from ENS name
 */
export async function getAddressFromEns(ensName: string): Promise<`0x${string}` | null> {
  try {
    const address = await publicClient.getEnsAddress({ name: normalize(ensName) });
    return address;
  } catch (error) {
    console.error('Failed to resolve ENS address:', error);
    return null;
  }
}

/**
 * Shorten wallet address for display
 * e.g., 0x1234...5678
 */
export function shortenAddress(address: string, chars = 4): string {
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`;
}
