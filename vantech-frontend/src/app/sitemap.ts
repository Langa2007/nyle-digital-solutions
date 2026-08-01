import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vantechsoftwares.vercel.app';
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

  const staticRoutes = [
    '',
    '/services',
    '/portfolio',
    '/blog',
    '/careers',
    '/contact',
    '/privacy-policy',
    '/terms',
  ].map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  let dynamicRoutes: MetadataRoute.Sitemap = [];

  try {
    const res = await fetch(`${apiUrl}/portfolio`, { next: { revalidate: 3600 } });
    if (res.ok) {
      const json = await res.json();
      const projects = json.data || [];
      dynamicRoutes = projects.map((project: any) => ({
        url: `${siteUrl}/portfolio/${project.id || project.slug}`,
        lastModified: project.updatedAt || new Date().toISOString(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }));
    }
  } catch (error) {
    console.error('Failed to fetch portfolio for sitemap', error);
  }

  return [...staticRoutes, ...dynamicRoutes];
}
