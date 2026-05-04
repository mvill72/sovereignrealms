/**
 * Fedify Instance - ActivityPub Federation for SovereignRealm
 *
 * Philosophy:
 * - Inner citadel (private/circle posts) remains sovereign
 * - Public posts optionally federate to Fediverse
 * - Identity tied to wallet/ENS, not email
 * - Each realm is an ActivityPub Actor
 */

import { loadProfile, loadPosts, type Post, type Profile } from '@/utils/storage';

// Federation configuration
const REALM_DOMAIN = process.env.NEXT_PUBLIC_REALM_DOMAIN || 'localhost:3000';
const REALM_PROTOCOL = process.env.NEXT_PUBLIC_REALM_PROTOCOL || 'http://';

/**
 * Get ActivityPub Actor URI for a wallet address
 */
export function getActorUri(address: string): string {
  return `${REALM_PROTOCOL}${REALM_DOMAIN}/ap/actors/${address}`;
}

/**
 * Get ActivityPub Note URI for a post
 */
export function getNoteUri(postId: string): string {
  return `${REALM_PROTOCOL}${REALM_DOMAIN}/ap/notes/${postId}`;
}

/**
 * Create ActivityPub Person from SovereignRealm profile
 */
export async function createActorFromProfile(
  address: string,
  profile: Profile
): Promise<any> {
  const actorId = getActorUri(address);

  return {
    '@context': [
      'https://www.w3.org/ns/activitystreams',
      'https://w3id.org/security/v1',
    ],
    type: 'Person',
    id: actorId,
    preferredUsername: profile.ensName || address.slice(0, 8),
    name: profile.name,
    summary: profile.bio,
    icon: profile.avatar ? {
      type: 'Image',
      url: profile.avatar.startsWith('http')
        ? profile.avatar
        : `https://ipfs.io/ipfs/${profile.avatar}`,
      mediaType: 'image/png',
    } : undefined,
    inbox: `${actorId}/inbox`,
    outbox: `${actorId}/outbox`,
    followers: `${actorId}/followers`,
    following: `${actorId}/following`,
    // Link to on-chain profile
    attachment: profile.walletAddress ? [{
      type: 'PropertyValue',
      name: 'Wallet',
      value: profile.walletAddress,
    }] : undefined,
  };
}

/**
 * Create ActivityPub Note from SovereignRealm post
 */
export function createNoteFromPost(post: Post, actorUri: string): any {
  return {
    '@context': 'https://www.w3.org/ns/activitystreams',
    type: 'Note',
    id: getNoteUri(post.id),
    attributedTo: actorUri,
    content: post.content,
    published: post.timestamp,
    // Link to IPFS content hash
    attachment: post.ipfsHash ? [{
      type: 'Document',
      url: `https://ipfs.io/ipfs/${post.ipfsHash}`,
      name: 'IPFS Content Hash',
    }] : undefined,
    // Tag visibility
    to: post.visibility === 'public'
      ? ['https://www.w3.org/ns/activitystreams#Public']
      : [`${actorUri}/followers`],
  };
}

/**
 * Check if a post should federate
 */
export function shouldFederate(post: Post): boolean {
  // Only public posts federate by default
  // Future: Add per-circle federation settings
  return post.visibility === 'public';
}

/**
 * Federation state manager
 */
export interface FederationState {
  enabled: boolean;
  followers: string[]; // ActivityPub Actor URIs
  following: string[];
  instanceBlocks: string[]; // Blocked domains
}

/**
 * Load federation state from localStorage
 */
export function loadFederationState(): FederationState {
  const data = localStorage.getItem('federation_state');
  if (!data) {
    return {
      enabled: false,
      followers: [],
      following: [],
      instanceBlocks: [],
    };
  }
  return JSON.parse(data);
}

/**
 * Save federation state to localStorage
 */
export function saveFederationState(state: FederationState): void {
  localStorage.setItem('federation_state', JSON.stringify(state));
}

/**
 * Add a follower
 */
export function addFollower(actorUri: string): void {
  const state = loadFederationState();
  if (!state.followers.includes(actorUri)) {
    state.followers.push(actorUri);
    saveFederationState(state);
  }
}

/**
 * Remove a follower
 */
export function removeFollower(actorUri: string): void {
  const state = loadFederationState();
  state.followers = state.followers.filter(f => f !== actorUri);
  saveFederationState(state);
}

/**
 * Check if federation is enabled for this realm
 */
export function isFederationEnabled(): boolean {
  const state = loadFederationState();
  return state.enabled;
}

/**
 * Enable federation
 */
export function enableFederation(): void {
  const state = loadFederationState();
  state.enabled = true;
  saveFederationState(state);
}

/**
 * Disable federation
 */
export function disableFederation(): void {
  const state = loadFederationState();
  state.enabled = false;
  saveFederationState(state);
}
