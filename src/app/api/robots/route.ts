import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://darth-lisan.dev';
  
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml

# Crawl-delay for better server performance
Crawl-delay: 1

# Block access to admin areas
Disallow: /admin/
Disallow: /api/auth/
Disallow: /_next/
Disallow: /static/

# Imperial Archives - Allow all public content
Allow: /
Allow: /about
Allow: /skills
Allow: /projects
Allow: /contact`;

  return new NextResponse(robots, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=86400',
    },
  });
} 