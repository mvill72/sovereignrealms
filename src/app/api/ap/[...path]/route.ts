/**
 * ActivityPub API Routes
 *
 * Handles all ActivityPub endpoints:
 * - /ap/actors/{handle} - Actor profile
 * - /ap/actors/{handle}/inbox - Inbox for incoming activities
 * - /ap/actors/{handle}/outbox - Outbox with public posts
 * - /ap/actors/{handle}/followers - Followers collection
 * - /ap/actors/{handle}/following - Following collection
 * - /ap/notes/{id} - Individual notes
 */

import { getFederation } from '@/federation/config';

const federation = getFederation();

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    await params; // Await params in Next.js 16
    return await federation.fetch(request, {
      contextData: undefined,
    });
  } catch (error) {
    console.error('ActivityPub GET error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  try {
    await params; // Await params in Next.js 16
    return await federation.fetch(request, {
      contextData: undefined,
    });
  } catch (error) {
    console.error('ActivityPub POST error:', error);
    return new Response('Internal Server Error', { status: 500 });
  }
}
