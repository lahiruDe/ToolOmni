import Link from 'next/link';
import { Tool, ICON_MAP } from '@/constants/tools';
import { cn } from '@/lib/utils';
import { HelpCircle, ArrowRight } from 'lucide-react';

interface ToolCardProps {
    tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
    const Icon = ICON_MAP[tool.iconName] || HelpCircle;

    return (
        <Link
            href={tool.href}
            className="group relative flex flex-col p-8 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-[2rem] hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/[0.03] transition-all duration-500"
        >
            <div className="flex items-start justify-between mb-8">
                <div className="w-14 h-14 bg-zinc-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center transition-all group-hover:bg-blue-600 group-hover:scale-110 shadow-sm">
                    <Icon className="w-7 h-7 text-zinc-400 group-hover:text-white transition-colors" />
                </div>
                <div className="text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-blue-500 transition-colors">
                    {tool.category}
                </div>
            </div>

            <div className="flex-grow">
                <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-100 mb-3 group-hover:text-blue-600 transition-colors tracking-tight">
                    {tool.title}
                </h3>
                <p className="text-zinc-500 dark:text-zinc-400 text-sm font-medium leading-relaxed line-clamp-2">
                    {tool.description}
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                <span className="text-[11px] font-bold text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">
                    Use Tool
                </span>
                <ArrowRight className="w-4 h-4 text-zinc-200 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
            </div>
        </Link>
    );
}
