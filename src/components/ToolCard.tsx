import Link from 'next/link';
import { Tool, ICON_MAP } from '@/constants/tools';
import { cn } from '@/lib/utils';
import { HelpCircle } from 'lucide-react';

interface ToolCardProps {
    tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
    const Icon = ICON_MAP[tool.iconName] || HelpCircle;

    // Determine color based on category for the title/text
    const categoryColorClass = {
        PDF: 'text-purple-600',
        Image: 'text-orange-500',
        Video: 'text-pink-600',
        AI: 'text-blue-600',
        Writing: 'text-cyan-600',
        Utility: 'text-zinc-600',
        File: 'text-indigo-600',
    }[tool.category as string] || 'text-blue-600';

    const categoryBgClass = {
        PDF: 'bg-purple-50',
        Image: 'bg-orange-50',
        Video: 'bg-pink-50',
        AI: 'bg-blue-50',
        Writing: 'bg-cyan-50',
        Utility: 'bg-zinc-50',
        File: 'bg-indigo-50',
    }[tool.category as string] || 'bg-blue-50';

    const iconColorClass = {
        PDF: 'text-purple-500',
        Image: 'text-orange-500',
        Video: 'text-pink-500',
        AI: 'text-blue-500',
        Writing: 'text-cyan-500',
        Utility: 'text-zinc-500',
        File: 'text-indigo-500',
    }[tool.category as string] || 'text-blue-500';

    return (
        <Link
            href={tool.href}
            className="group flex items-start gap-4 p-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl hover:shadow-lg transition-all duration-300"
        >
            <div className={cn("flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110 duration-300", categoryBgClass)}>
                <Icon className={cn("w-6 h-6", iconColorClass)} />
            </div>

            <div className="flex flex-col min-w-0 text-left">
                <h3 className="text-[15px] font-bold text-zinc-800 dark:text-zinc-100 truncate group-hover:text-blue-600 transition-colors">
                    {tool.title}
                </h3>
                <span className={cn("text-[11px] font-bold tracking-wide mb-1 transition-opacity", categoryColorClass)}>
                    {tool.category === 'Writing' ? 'AI Write' : `${tool.category} Tools`}
                </span>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-snug">
                    {tool.description}
                </p>
            </div>
        </Link>
    );
}
