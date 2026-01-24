import { GenericTool } from '@/components/GenericTool';
import { TOOLS } from '@/constants/tools';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

interface PageProps {
    params: Promise<{
        category: string;
        id: string;
    }>;
}

// 1. DYNAMIC METADATA GENERATION FOR SEO
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    const tool = TOOLS.find((t) => t.id === id);

    if (!tool) {
        return {
            title: 'Tool Not Found - ToolOmni',
        };
    }

    // Use the predefined SEO Title/Description or fallback to a generated one
    const title = tool.seoTitle || `${tool.title} - Free Online Tool`;
    const description = tool.seoDescription || `Use our free ${tool.title} tool to process your files securely online. No installation required.`;

    return {
        title: title,
        description: description,
        keywords: tool.keywords || [tool.title, `Free ${tool.title}`, `${tool.title} Online`, 'PDF Tools', 'ToolOmni', 'Merge PDF', 'Combine PDF', 'No Watermark'],
        openGraph: {
            title: title,
            description: description,
            type: 'website',
            siteName: 'ToolOmni',
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
        }
    };
}

export async function generateStaticParams() {
    return TOOLS.map((tool) => ({
        category: tool.category.toLowerCase(),
        id: tool.id,
    }));
}

export default async function ToolPage({ params }: PageProps) {
    const { id, category } = await params;

    const tool = TOOLS.find((t) => t.id === id);

    if (!tool || tool.category.toLowerCase() !== category.toLowerCase()) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pb-24">
            {/* Breadcrumb for better navigation SEO */}
            <div className="container mx-auto px-4 py-4">
                <nav className="text-sm text-zinc-500 mb-8 flex gap-2">
                    <a href="/" className="hover:text-blue-600">Home</a> /
                    <a href={`/tool/${category}`} className="hover:text-blue-600 capitalize">{category}</a> /
                    <span className="text-zinc-900 dark:text-zinc-300 font-bold">{tool.title}</span>
                </nav>
            </div>

            <GenericTool tool={tool} />
        </div>
    );
}
