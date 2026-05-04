import { SiweMessage } from 'siwe';
import type { WalletClient } from 'viem';

/**
 * Create and sign a SIWE message
 * This proves ownership of the wallet address
 */
export async function signInWithEthereum(
  address: `0x${string}`,
  walletClient: WalletClient
): Promise<{ message: string; signature: string } | null> {
  try {
    const domain = typeof window !== 'undefined' ? window.location.host : 'localhost:3000';
    const origin = typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

    const siweMessage = new SiweMessage({
      domain,
      address,
      statement: 'Sign in to SovereignRealm - Your Digital Citadel. This signature proves you own this wallet.',
      uri: origin,
      version: '1',
      chainId: 1, // Mainnet
      nonce: generateNonce(),
      issuedAt: new Date().toISOString(),
    });

    const message = siweMessage.prepareMessage();

    // Sign the message
    const signature = await walletClient.signMessage({
      account: address,
      message,
    });

    // Store authentication
    localStorage.setItem('siwe_message', message);
    localStorage.setItem('siwe_signature', signature);
    localStorage.setItem('siwe_address', address);
    localStorage.setItem('siwe_timestamp', Date.now().toString());

    console.log('✅ Signed in with Ethereum:', address);

    return { message, signature };
  } catch (error) {
    console.error('SIWE signing failed:', error);
    return null;
  }
}

/**
 * Verify if user is authenticated
 */
export function isAuthenticated(address?: `0x${string}`): boolean {
  const storedAddress = localStorage.getItem('siwe_address');
  const signature = localStorage.getItem('siwe_signature');
  const timestamp = localStorage.getItem('siwe_timestamp');

  if (!storedAddress || !signature || !timestamp) return false;

  // Check if authentication is still valid (24 hours)
  const age = Date.now() - parseInt(timestamp);
  if (age > 24 * 60 * 60 * 1000) {
    clearAuthentication();
    return false;
  }

  // If address provided, check if it matches
  if (address && storedAddress.toLowerCase() !== address.toLowerCase()) {
    return false;
  }

  return true;
}

/**
 * Get authenticated address
 */
export function getAuthenticatedAddress(): `0x${string}` | null {
  if (!isAuthenticated()) return null;
  return localStorage.getItem('siwe_address') as `0x${string}` | null;
}

/**
 * Clear authentication
 */
export function clearAuthentication() {
  localStorage.removeItem('siwe_message');
  localStorage.removeItem('siwe_signature');
  localStorage.removeItem('siwe_address');
  localStorage.removeItem('siwe_timestamp');
}

/**
 * Generate a random nonce for SIWE
 */
function generateNonce(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(16)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
