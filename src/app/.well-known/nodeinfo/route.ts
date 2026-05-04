/**
 * NodeInfo Discovery Endpoint
 *
 * Points to the actual NodeInfo document
 * Required for Fediverse instance discovery
 */

const REALM_DOMAIN = process.env.NEXT_PUBLIC_REALM_DOMAIN || 'localhost:3000';
const REALM_PROTOCOL = process.env.NEXT_PUBLIC_REALM_PROTOCOL || 'http://';

export async function GET() {
  return Response.json({
    links: [
      {
        rel: 'http://nodeinfo.diaspora.software/ns/schema/2.1',
        href: `${REALM_PROTOCOL}${REALM_DOMAIN}/nodeinfo/2.1`,
      },
    ],
  });
}
