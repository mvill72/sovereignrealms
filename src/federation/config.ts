/**
 * Federation Configuration
 *
 * ActivityPub federation settings for SovereignRealm
 */

import { createFederation, MemoryKvStore, type Federation } from '@fedify/fedify';
import { loadProfile, loadPosts, type Post } from '@/utils/storage';
import {
  createActorFromProfile,
  createNoteFromPost,
  getActorUri,
  getNoteUri,
  addFollower,
  removeFollower,
} from './fedify-instance';

// Environment configuration
const REALM_DOMAIN = process.env.NEXT_PUBLIC_REALM_DOMAIN || 'localhost:3000';
const REALM_PROTOCOL = process.env.NEXT_PUBLIC_REALM_PROTOCOL || 'http://';

/**
 * Create Fedify federation instance
 */
export function createRealmFederation(): Federation<void> {
  const federation = createFederation<void>({
    kv: new MemoryKvStore(), // In production, use Redis or persistent storage
  });

  // Actor dispatcher - returns the ActivityPub Person for a wallet address
  federation.setActorDispatcher('/ap/actors/{handle}', async (ctx, handle) => {
    try {
      // Handle is wallet address or ENS name
      const profile = loadProfile();

      if (!profile) {
        return null;
      }

      // Check if this profile matches the requested handle
      const matchesWallet = profile.walletAddress?.toLowerCase() === handle.toLowerCase();
      const matchesENS = profile.ensName?.toLowerCase() === handle.toLowerCase();

      if (!matchesWallet && !matchesENS) {
        return null;
      }

      const address = profile.walletAddress || handle;
      return await createActorFromProfile(address, profile);
    } catch (error) {
      console.error('Actor dispatcher error:', error);
      return null;
    }
  });

  // Outbox dispatcher - returns public posts as ActivityPub objects
  federation.setOutboxDispatcher(
    '/ap/actors/{handle}/outbox',
    async (ctx, handle, cursor) => {
      try {
        const posts = loadPosts();

        // Filter to public posts only
        const publicPosts = posts.filter(p => p.visibility === 'public');

        // Convert to ActivityPub Notes
        const actorUri = getActorUri(handle);
        const items = publicPosts.map(post => ({
          id: new URL(getNoteUri(post.id)),
          item: createNoteFromPost(post, actorUri),
        }));

        return {
          items,
          // For pagination (future enhancement)
          nextCursor: null,
          prevCursor: null,
        };
      } catch (error) {
        console.error('Outbox dispatcher error:', error);
        return { items: [] };
      }
    }
  );

  // Inbox dispatcher - handle incoming activities (Follow, Like, Create)
  federation
    .setInboxListeners('/ap/actors/{handle}/inbox', '/ap/inbox')
    .on('Follow', async (ctx, follow) => {
      // Someone wants to follow this realm
      const followerUri = follow.actorId?.href;
      if (followerUri) {
        console.log('New follower:', followerUri);
        addFollower(followerUri);

        // Auto-accept follows (can make this manual approval later)
        // await ctx.sendActivity({ actor, recipient }, accept);
      }
    })
    .on('Create', async (ctx, create) => {
      // Incoming post/reply from Fediverse
      console.log('Received federated content:', create.object);
      // Store as federated reply if desired
    })
    .on('Like', async (ctx, like) => {
      // Someone liked a post
      console.log('Received like:', like);
    })
    .on('Undo', async (ctx, undo) => {
      // Handle unfollow, unlike, etc.
      if (undo.object?.type === 'Follow') {
        const followerUri = undo.actorId?.href;
        if (followerUri) {
          removeFollower(followerUri);
        }
      }
    });

  // NodeInfo dispatcher - for Fediverse discovery
  federation.setNodeInfoDispatcher('/nodeinfo/2.1', async (ctx) => {
    const posts = loadPosts();
    const publicPosts = posts.filter(p => p.visibility === 'public');

    return {
      software: {
        name: 'sovereignrealm',
        version: '1.0.0',
        repository: 'https://github.com/your-repo/sovereign-realm',
      },
      protocols: ['activitypub'],
      usage: {
        users: {
          total: 1, // Single-user instance
          activeMonth: 1,
          activeHalfyear: 1,
        },
        localPosts: publicPosts.length,
      },
      metadata: {
        nodeName: 'SovereignRealm',
        nodeDescription: 'Personal digital sovereignty platform',
      },
    };
  });

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
