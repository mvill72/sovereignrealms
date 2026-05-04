/**
 * Federation Configuration
 *
 * ActivityPub federation settings for SovereignRealm
 *
 * NOTE: This is a simplified version for MVP.
 * Fedify integration requires more complex type handling.
 * For now, federation endpoints are handled manually in API routes.
 */

import { createFederation, MemoryKvStore, type Federation } from '@fedify/fedify';

/**
 * Create Fedify federation instance
 *
 * TODO: Full Fedify integration with proper types
 * Current approach: Manual ActivityPub JSON endpoints
 */
export function createRealmFederation(): Federation<void> {
  const federation = createFederation<void>({
    kv: new MemoryKvStore(),
  });

  // Fedify setup will be enhanced in future iterations
  // For now, we handle ActivityPub via manual API routes

  return federation;
}

// Singleton instance
let federationInstance: Federation<void> | null = null;

export function getFederation(): Federation<void> {
  if (!federationInstance) {
    federationInstance = createRealmFederation();
  }
  return federationInstance;
}

// Export utilities for manual ActivityPub handling
export { createActorFromProfile, createNoteFromPost } from './fedify-instance';
