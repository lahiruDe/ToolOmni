import { MetadataRoute } from 'next';
import { TOOLS } from '@/constants/tools';
import { ALL_SEO_PAGES } from '@/constants/seo/registry';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://toolomni.co';

    // 1. Static pages
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

    // 2. Individual primary tool pages (/pdf/merge-pdf, etc.)
    const toolPages = TOOLS.map((tool) => ({
        url: `${baseUrl}${tool.href}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }));

    // 3. Programmatic SEO sub-pages (/pdf/merge-pdf-without-watermark-free, etc.)
    const seoPages = ALL_SEO_PAGES.map((page) => {
        const parentTool = TOOLS.find(t => t.id === page.parentToolId);
        const category = parentTool ? parentTool.category.toLowerCase() : 'pdf';
        return {
            url: `${baseUrl}/${category}/${page.slug}`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.7,
        };
    });

    return [...staticPages, ...toolPages, ...seoPages];
}
