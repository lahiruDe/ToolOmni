import { TOOLS } from '@/constants/tools';
import { ToolCard } from '@/components/ToolCard';
import { notFound } from 'next/navigation';
import { CATEGORY_DETAILS } from '@/constants/tools';

interface CategoryPageProps {
    params: Promise<{
        category: string;
    }>;
}

export async function generateStaticParams() {
    const categories = ['pdf', 'video', 'image', 'ai', 'writing', 'file', 'utility'];
    return categories.map((cat) => ({
        category: cat,
    }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
    const { category } = await params;
    const categoryName = category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();

    const categoryDetail = CATEGORY_DETAILS.find(
        (c) => c.name.toLowerCase() === category.toLowerCase()
    );

    const categoryTools = TOOLS.filter(
        (t) => t.category.toLowerCase() === category.toLowerCase()
    );

    if (categoryTools.length === 0 && !categoryDetail) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-[#fafafa] dark:bg-zinc-950 pb-24">
            <section className="pt-24 pb-16 bg-white dark:bg-zinc-900">
                <div className="container mx-auto px-4 text-center">
                    <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-6">
                        {categoryName} Tools
                    </h1>
                    <p className="text-zinc-500 text-xl max-w-2xl mx-auto">
                        {categoryDetail?.description || `Explore our high-performance ${categoryName} solutions.`}
                    </p>
                </div>
            </section>

            <section className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {categoryTools.map((tool) => (
                        <ToolCard key={tool.id} tool={tool} />
                    ))}
                </div>

                {categoryTools.length === 0 && (
                    <div className="text-center py-20">
                        <p className="text-zinc-500">More tools are being added to this category soon!</p>
                    </div>
                )}
            </section>
        </div>
    );
}
