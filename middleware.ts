import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const url = request.nextUrl;
  const host = request.headers.get('host') || ''; // Get host from headers
  const isLocalhost = host.includes('localhost');

  // Extract subdomain correctly
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

  console.log('host:', host, 'subdomain:', subdomain, 'pathname:', url.pathname);

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

  // ✅ Handle root domain (localhost:3000 or example.com)
  if ((isLocalhost && host === 'localhost:3000') || (!isLocalhost && !host.includes('.'))) {
    const demoUrl = new URL(url);
    demoUrl.host = isLocalhost ? 'demo.localhost:3000' : `demo.${host}`;
    return NextResponse.redirect(demoUrl);
  }

  // ✅ Redirect other subdomains to the signin page
  const signInUrl = new URL('/api/auth/signin', url);
  signInUrl.host = isLocalhost ? 'localhost:3000' : host.split('.').slice(-2).join('.');
  return NextResponse.redirect(signInUrl);
}

export const config = {
  matcher: [
    // Match all paths except those that should be ignored
    '/((?!api/auth|auth|_next|.*\\..*).*)',
  ],
};
