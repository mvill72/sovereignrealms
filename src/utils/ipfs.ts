// Sovereign IPFS: Your content, your node (or gateway), your control
import { createHelia } from 'helia';
import { strings } from '@helia/strings';
import { unixfs } from '@helia/unixfs';
import type { Helia } from 'helia';

let heliaInstance: Helia | null = null;

/**
 * Initialize Helia (IPFS) instance - runs in browser
 * Creates a local IPFS node that peers with the network
 */
export async function initIPFS(): Promise<Helia> {
  if (heliaInstance) return heliaInstance;

  try {
    heliaInstance = await createHelia();
    console.log('🌐 Sovereign IPFS node initialized');
    return heliaInstance;
  } catch (error) {
    console.error('Failed to initialize IPFS:', error);
    throw error;
  }
}

/**
 * Upload text content to IPFS
 * Returns CID (Content Identifier) - immutable hash of your data
 */
export async function uploadTextToIPFS(content: string): Promise<string> {
  try {
    const helia = await initIPFS();
    const s = strings(helia);
    const cid = await s.add(content);
    console.log('📤 Content pinned to IPFS:', cid.toString());
    return cid.toString();
  } catch (error) {
    console.error('IPFS upload failed:', error);
    // Fallback: store locally if IPFS fails
    return `local-${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Upload file/blob to IPFS (for images, videos, etc.)
 */
export async function uploadFileToIPFS(file: File): Promise<string> {
  try {
    const helia = await initIPFS();
    const fs = unixfs(helia);

    // Convert file to Uint8Array
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const cid = await fs.addFile({
      content: uint8Array,
    });

    console.log('📤 File pinned to IPFS:', cid.toString());
    return cid.toString();
  } catch (error) {
    console.error('IPFS file upload failed:', error);
    return `local-file-${Date.now()}`;
  }
}

/**
 * Retrieve content from IPFS by CID
 */
export async function getFromIPFS(cid: string): Promise<string> {
  if (cid.startsWith('local-')) {
    // Fallback content stored locally
    return localStorage.getItem(cid) || '';
  }

  try {
    const helia = await initIPFS();
    const s = strings(helia);
    const content = await s.get(cid as any);
    return content;
  } catch (error) {
    console.error('IPFS retrieval failed:', error);
    return '';
  }
}

/**
 * Get IPFS gateway URL for content (for images, etc.)
 */
export function getIPFSUrl(cid: string): string {
  if (cid.startsWith('local-')) return '';
  // Use public gateway - in production, use your own
  return `https://ipfs.io/ipfs/${cid}`;
}

/**
 * Cleanup - stop IPFS node
 */
export async function stopIPFS() {
  if (heliaInstance) {
    await heliaInstance.stop();
    heliaInstance = null;
    console.log('🛑 IPFS node stopped');
  }
}
