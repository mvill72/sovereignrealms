/**
 * WebFinger Endpoint
 *
 * Required for ActivityPub actor discovery
 * Allows federation via @username@domain.com format
 */

import { NextRequest } from 'next/server';
import { loadProfile } from '@/utils/storage';

const REALM_DOMAIN = process.env.NEXT_PUBLIC_REALM_DOMAIN || 'localhost:3000';
const REALM_PROTOCOL = process.env.NEXT_PUBLIC_REALM_PROTOCOL || 'http://';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const resource = searchParams.get('resource');

  if (!resource) {
    return new Response('Missing resource parameter', { status: 400 });
  }

  // Parse resource (format: acct:username@domain)
  const match = resource.match(/^acct:([^@]+)@(.+)$/);
  if (!match) {
    return new Response('Invalid resource format', { status: 400 });
  }

  const [, username, domain] = match;

  // Verify domain matches this realm
  if (domain !== REALM_DOMAIN) {
    return new Response('Domain mismatch', { status: 404 });
  }

  // Load profile to verify user exists
  const profile = loadProfile();
  if (!profile) {
    return new Response('User not found', { status: 404 });
  }

  // Check if username matches wallet or ENS
  const matchesWallet = profile.walletAddress?.toLowerCase().startsWith(username.toLowerCase());
  const matchesENS = profile.ensName?.toLowerCase() === username.toLowerCase();

  if (!matchesWallet && !matchesENS) {
    return new Response('User not found', { status: 404 });
  }

  // Return WebFinger response
  const handle = profile.walletAddress || username;
  const actorUrl = `${REALM_PROTOCOL}${REALM_DOMAIN}/ap/actors/${handle}`;

  return Response.json({
    subject: resource,
    aliases: [actorUrl],
    links: [
      {
        rel: 'self',
        type: 'application/activity+json',
        href: actorUrl,
      },
      {
        rel: 'http://webfinger.net/rel/profile-page',
        type: 'text/html',
        href: `${REALM_PROTOCOL}${REALM_DOMAIN}`,
      },
    ],
  }, {
    headers: {
      'Content-Type': 'application/jrd+json',
    },
  });
}
