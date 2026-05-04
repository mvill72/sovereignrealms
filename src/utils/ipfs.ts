// Sovereign IPFS: Your content, content-addressed and immutable
// MVP version: Generates content-addressed hashes locally
// Future: Integrate with web3.storage, Pinata, or self-hosted IPFS node

/**
 * Generate a content-addressed hash (CID-like) for content
 * Uses SHA-256 to create a deterministic hash of the content
 * Prefixed with 'Qm' to match IPFS CIDv0 format visually
 */
async function generateContentHash(content: string): Promise<string> {
  // Use Web Crypto API to hash content
  const encoder = new TextEncoder();
  const data = encoder.encode(content);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  // Format like IPFS CID (base58 would be more accurate, but hex works for demo)
  // Real IPFS CIDs look like: QmXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
  return `Qm${hashHex.slice(0, 44)}`;
}

/**
 * Upload text content to IPFS (MVP: generates hash, stores locally)
 * Returns CID (Content Identifier) - immutable hash of your data
 *
 * Future enhancement: Actually upload to web3.storage or IPFS gateway
 */
export async function uploadTextToIPFS(content: string): Promise<string> {
  try {
    // Generate content-addressed hash
    const cid = await generateContentHash(content);

    // Store content locally with CID as key (like a local IPFS cache)
    localStorage.setItem(`ipfs-${cid}`, content);

    console.log('📤 Content hashed (CID):', cid);
    console.log('💡 Future: This will pin to real IPFS network');

    return cid;
  } catch (error) {
    console.error('Failed to hash content:', error);
    // Fallback to timestamp-based ID
    return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Upload file/blob to IPFS (for images, videos, etc.)
 * MVP: Generates hash and stores as data URL
 */
export async function uploadFileToIPFS(file: File): Promise<string> {
  try {
    // Read file as ArrayBuffer
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    // Generate hash of file content
    const hashBuffer = await crypto.subtle.digest('SHA-256', uint8Array);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    const cid = `Qm${hashHex.slice(0, 44)}`;

    // Store file as data URL (for local retrieval)
    const reader = new FileReader();
    const dataUrl = await new Promise<string>((resolve) => {
      reader.onload = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    localStorage.setItem(`ipfs-file-${cid}`, dataUrl);

    console.log('📤 File hashed (CID):', cid);
    return cid;
  } catch (error) {
    console.error('Failed to hash file:', error);
    return `local-file-${Date.now()}`;
  }
}

/**
 * Retrieve content from local IPFS cache by CID
 */
export async function getFromIPFS(cid: string): Promise<string> {
  if (cid.startsWith('local-')) {
    return localStorage.getItem(cid) || '';
  }

  // Try to get from local cache
  const content = localStorage.getItem(`ipfs-${cid}`);
  if (content) return content;

  // Future: Fetch from real IPFS gateway if not in cache
  console.warn('Content not in local cache. In production, would fetch from IPFS gateway.');
  return '';
}

/**
 * Get IPFS gateway URL for content (for images, etc.)
 */
export function getIPFSUrl(cid: string): string {
  if (cid.startsWith('local-')) {
    // Try to get data URL from local storage
    return localStorage.getItem(`ipfs-file-${cid}`) || '';
  }

  // Return public gateway URL (content may not be pinned yet in MVP)
  return `https://ipfs.io/ipfs/${cid}`;
}

/**
 * Upgrade to real IPFS: Upload to web3.storage
 * Requires API key from https://web3.storage
 */
export async function uploadToWeb3Storage(content: string, apiKey: string): Promise<string> {
  try {
    const blob = new Blob([content], { type: 'text/plain' });
    const formData = new FormData();
    formData.append('file', blob);

    const response = await fetch('https://api.web3.storage/upload', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
      body: formData,
    });

    const data = await response.json();
    return data.cid;
  } catch (error) {
    console.error('web3.storage upload failed:', error);
    throw error;
  }
}

// Export info about the current IPFS mode
export const IPFS_MODE = 'local-hash' as const;
export const IPFS_INFO = {
  mode: IPFS_MODE,
  description: 'Content-addressed hashing with local storage',
  upgrade: 'Add web3.storage API key to pin to real IPFS network',
};
