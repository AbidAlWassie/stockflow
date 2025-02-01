import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || ''; // Get the host from headers
  const baseDomain = process.env.BASE_DOMAIN || 'frostcore.tech'; // Use environment variable for base domain

  // Check if the request is from localhost
  const isLocalhost = host.includes('localhost');

  // Extract the subdomain
  let subdomain = '';
  if (isLocalhost) {
    const parts = host.split(':'); // Handle localhost:3000
    subdomain = parts[0] === 'demo' ? 'demo' : '';
  } else {
    const parts = host.split('.');
    if (parts.length > 2) {
      subdomain = parts.slice(0, -2).join('.');
    }
  }

  console.log('Host:', host, 'Subdomain:', subdomain, 'Pathname:', url.pathname);

  // ✅ Allow access to auth-related paths and static files
  if (
    url.pathname.startsWith('/api/auth') ||
    url.pathname.startsWith('/auth') ||
    url.pathname.startsWith('/_next') ||
    url.pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // ✅ Always allow "demo" subdomain
  if (subdomain === 'demo' || host.startsWith('demo.')) {
    return NextResponse.next();
  }

  // ✅ Handle requests to the root domain
  if ((isLocalhost && host === 'localhost:3000') || (!isLocalhost && host === baseDomain)) {
    const demoUrl = new URL(url);
    demoUrl.host = isLocalhost ? 'demo.localhost:3000' : `demo.${baseDomain}`;
    return NextResponse.redirect(demoUrl);
  }

  // ✅ Redirect other subdomains to the signin page
  const signInUrl = new URL('/api/auth/signin', url);
  signInUrl.host = isLocalhost ? 'localhost:3000' : baseDomain;
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    // Match all paths except those that should be ignored
    '/((?!api/auth|auth|_next|.*\\..*).*)',
  ],
};
