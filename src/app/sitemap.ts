import { MetadataRoute } from 'next';
import { TOOLS, CATEGORIES } from '@/constants/tools';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://toolomni.com';

    // Static pages
    const staticPages = [
        '',
        '/about',
        '/contact',
        '/privacy',
        '/terms',
        '/blog',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Tool category pages (/tool/pdf, etc.)
    const categoryPages = CATEGORIES.map((category) => ({
        url: `${baseUrl}/tool/${category.toLowerCase()}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    }));

    // Individual tool pages (/pdf/merge-pdf, etc.)
    const toolPages = TOOLS.map((tool) => ({
        url: `${baseUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
    }));

    return [...staticPages, ...categoryPages, ...toolPages];
}
