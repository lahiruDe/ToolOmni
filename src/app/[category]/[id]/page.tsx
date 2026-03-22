import { Metadata } from 'next';
import { ALL_SEO_PAGES, getSEOPageBySlug } from '@/constants/seo/registry';
import { TOOLS, ICON_MAP } from '@/constants/tools';
import { LayoutGrid, ArrowRight, ChevronDown } from 'lucide-react';
import { GenericTool } from '@/components/GenericTool';
import { FaqAccordion } from '@/components/FaqAccordion';
import { notFound } from 'next/navigation';

interface PageProps {
    params: Promise<{
        category: string;
        id: string;
    }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;
    
    const seoPage = getSEOPageBySlug(id);
    if (seoPage) {
        const keyword = seoPage.keyword;
        const brandSuffix = " | Online For Free | ToolOmni.co";
        const title = `${keyword}${brandSuffix}`;

        return {
            title: title,
            description: seoPage.meta_desc,
            keywords: [seoPage.keyword, 'ToolOmni', 'Free Online Tools'],
            openGraph: {
                title: title,
                description: seoPage.meta_desc,
                type: 'website',
                siteName: 'ToolOmni',
            },
            twitter: {
                card: 'summary_large_image',
                title: title,
                description: seoPage.meta_desc,
            }
        };
    }

    const tool = TOOLS.find((t) => t.id === id);

    if (!tool) {
        return {
            title: 'Tool Not Found - ToolOmni',
        };
    }

    const title = tool.seoTitle || `${tool.title} - Free Online Tool`;
    const description = tool.seoDescription || `Use our free ${tool.title} tool to process your files securely online. No installation required.`;

    return {
        title: title,
        description: description,
        keywords: tool.keywords || [tool.title, 'ToolOmni'],
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
    const toolParams = TOOLS.map((tool) => ({
        category: tool.category.toLowerCase(),
        id: tool.id,
    }));

    const seoParams = ALL_SEO_PAGES.map((page) => {
        const parentTool = TOOLS.find(t => t.id === page.parentToolId);
        return {
            category: parentTool ? parentTool.category.toLowerCase() : 'pdf',
            id: page.slug,
        };
    });

    return [...toolParams, ...seoParams];
}

export default async function ToolPage({ params }: PageProps) {
    const { id, category } = await params;

    let tool = TOOLS.find((t) => t.id === id);
    const seoPage = getSEOPageBySlug(id);

    // If it's an SEO page, we use its parent tool as base and override content
    if (seoPage) {
        const baseTool = TOOLS.find(t => t.id === seoPage.parentToolId);
        if (baseTool) {
            tool = {
                ...baseTool,
                id: baseTool.id, // KEEP original ID for engine logic
                title: seoPage.h1,
                // KEEP description so GenericTool shows the intro, or use seoPage summary
                description: `Professional ${seoPage.keyword} solution.`, 
                faqs: baseTool.faqs // Keep base FAQs for the tool area, SEO FAQs are below
            };
        }
    }

    if (!tool) {
        notFound();
    }

    // Define tools that should show the full SEO-style content even on their parent page
    const toolsWithFullContent = [
        'merge-pdf', 'split-pdf', 'compress-pdf', 'pdf-to-word', 'jpg-to-pdf', 
        'background-remover', 'compress-image', 'resize-image', 'crop-image',
        'upscale-image', 'blur-face', 'convert-to-webp', 'colorize-photo'
    ];
    const showFullContent = !!seoPage || toolsWithFullContent.includes(tool.id);

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pb-24">
            {/* Breadcrumb */}
            <div className="container mx-auto px-4 py-4">
                <nav className="text-sm text-zinc-500 mb-8 flex gap-2">
                    <a href="/" className="hover:text-blue-600">Home</a> /
                    <a href={`/tool/${category}`} className="hover:text-blue-600 capitalize">{category}</a> /
                    <span className="text-zinc-900 dark:text-zinc-300 font-bold">{tool.title}</span>
                </nav>
            </div>

            <GenericTool tool={tool} hideFaq={showFullContent} />

            {/* Content & Accordion FAQ (For SEO pages OR Tools with full content) */}
            {showFullContent && (
                <div className="container mx-auto px-4 mt-12 max-w-4xl">
                    <div 
                        className="prose prose-zinc dark:prose-invert max-w-none 
                                    bg-white dark:bg-zinc-900/50 p-6 md:p-10 rounded-[1.5rem] 
                                    border border-zinc-100 dark:border-zinc-800 shadow-sm mb-12
                                    [&>h2]:text-2xl [&>h2]:font-black [&>h2]:mb-4 [&>h2]:tracking-tight
                                    [&>h3]:text-lg [&>h3]:font-bold [&>h3]:mt-6 [&>h3]:mb-3
                                    [&>p]:text-zinc-500 [&>p]:dark:text-zinc-400 [&>p]:leading-relaxed [&>p]:mb-3"
                        dangerouslySetInnerHTML={{ __html: seoPage?.content || tool.content.description }}
                    />

                    {/* FAQ Section */}
                    {(seoPage?.faqs || tool.faqs) && (
                        <div className="mt-16">
                            <div className="text-center mb-10">
                                <h2 className="text-2xl md:text-3xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
                                    Frequently Asked Questions
                                </h2>
                                <p className="text-zinc-400 text-sm font-medium">Specific answers for {seoPage?.keyword || tool.title}</p>
                            </div>
                            
                            <FaqAccordion faqs={seoPage?.faqs || tool.faqs || []} />
                        </div>
                    )}

                    {/* Dynamic Category Sorter - Internal Linking to other SEO pages of the same tool */}
                    <div className="mt-20 border-t border-zinc-100 dark:border-zinc-800 pt-16">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                            <div>
                                <h2 className="text-2xl font-black text-zinc-900 dark:text-white tracking-tight">Explore More Solutions</h2>
                                <p className="text-zinc-500 text-sm font-medium">Specialized tools for professional results.</p>
                            </div>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                            {ALL_SEO_PAGES.filter(p => p.parentToolId === (seoPage?.parentToolId || tool.id)).map((page) => (
                                <a 
                                    key={page.slug}
                                    href={`/${category}/${page.slug}`}
                                    className="group p-4 bg-white dark:bg-zinc-900/40 rounded-xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500/30 transition-all flex items-center justify-between"
                                >
                                    <span className="text-xs font-bold text-zinc-500 dark:text-zinc-400 group-hover:text-blue-600 transition-colors uppercase tracking-tight line-clamp-1">
                                        {page.keyword}
                                    </span>
                                    <ArrowRight className="w-3 h-3 text-zinc-300 group-hover:text-blue-600 transition-all -translate-x-1 group-hover:translate-x-0" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
