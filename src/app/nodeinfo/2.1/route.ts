/**
 * NodeInfo 2.1 Endpoint
 *
 * Provides metadata about this SovereignRealm instance
 * Used by Fediverse for instance discovery and statistics
 */

import { loadPosts } from '@/utils/storage';

export async function GET() {
  const posts = loadPosts();
  const publicPosts = posts.filter(p => p.visibility === 'public');

  return Response.json({
    version: '2.1',
    software: {
      name: 'sovereignrealm',
      version: '1.0.0',
      repository: 'https://github.com/your-repo/sovereign-realm',
      homepage: 'https://sovereignrealm.xyz',
    },
    protocols: ['activitypub'],
    services: {
      inbound: [],
      outbound: [],
    },
    openRegistrations: false, // Single-user instance
    usage: {
      users: {
        total: 1,
        activeMonth: 1,
        activeHalfyear: 1,
      },
      localPosts: publicPosts.length,
      localComments: 0,
    },
    metadata: {
      nodeName: 'SovereignRealm',
      nodeDescription: 'Personal digital sovereignty platform with Web3 identity and ActivityPub federation',
      features: [
        'web3-identity',
        'ipfs-storage',
        'circle-gating',
        'activitypub-federation',
      ],
    },
  });
}
