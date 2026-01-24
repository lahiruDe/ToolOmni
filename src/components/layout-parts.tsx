import Link from 'next/link';
import { Search, Menu, Wrench, ChevronRight, Zap, ShieldCheck, Infinity as InfinityIcon } from 'lucide-react';
import { TOOLS } from '@/constants/tools';

export function Navbar() {
    return (
        <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                        <Wrench className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-black tracking-tight text-zinc-900 dark:text-white">
                        TOOL<span className="text-blue-600">OMNI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/tool/pdf" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">PDF Tools</Link>
                    <Link href="/tool/image" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Image Tools</Link>
                    <Link href="/tool/video" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Video Tools</Link>
                    <Link href="/tool/ai" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">AI Tools</Link>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors">
                        <Search className="w-5 h-5" />
                    </button>
                    <button className="md:hidden p-2 text-zinc-600 dark:text-zinc-400">
                        <Menu className="w-6 h-6" />
                    </button>
                    <Link
                        href="/premium"
                        className="hidden sm:block px-6 py-2.5 bg-blue-600 text-white text-sm font-black rounded-full hover:bg-blue-700 transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    const categories = ['PDF', 'Image', 'Video', 'AI', 'Writing'];

    return (
        <footer className="w-full bg-white dark:bg-zinc-950">
            {/* Premium CTA Section - Matching Image Style */}


            {/* Main Footer Links */}
            <div className="container mx-auto px-4 pt-16 pb-12 border-t border-zinc-100 dark:border-zinc-800">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-12 mb-20">
                    <div className="col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <Wrench className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white uppercase">
                                TOOL<span className="text-blue-600">OMNI</span>
                            </span>
                        </Link>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-xs mb-8 leading-relaxed">
                            ToolOmni provides free online conversion, pdf, and other handy tools to help you solve problems of all types.
                            All files both processed and unprocessed are deleted after 1 hour.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest text-sm">Navigate</h4>
                        <ul className="space-y-4 text-sm font-bold text-zinc-500 dark:text-zinc-400">
                            <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="hover:text-blue-600 transition-colors">TOS</Link></li>
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link></li>
                            <li><Link href="/about" className="hover:text-blue-600 transition-colors">About</Link></li>
                        </ul>
                    </div>

                    <div className="col-span-1 md:col-span-3 lg:col-span-3 grid grid-cols-2 md:grid-cols-3 gap-8">
                        {categories.slice(0, 3).map((cat) => (
                            <div key={cat}>
                                <h4 className="font-bold text-zinc-900 dark:text-white mb-6 uppercase tracking-widest text-sm">{cat} Tools</h4>
                                <ul className="space-y-4 text-xs font-bold text-zinc-400">
                                    {TOOLS.filter(t => t.category === cat).slice(0, 5).map(tool => (
                                        <li key={tool.id}>
                                            <Link href={tool.href} className="hover:text-blue-600 transition-colors">{tool.title}</Link>
                                        </li>
                                    ))}
                                    <li><Link href={`/tool/${cat.toLowerCase()}`} className="text-blue-600 group flex items-center gap-1">
                                        More <ChevronRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                                    </Link></li>
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-zinc-100 dark:border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6">
                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center">
                                <Wrench className="w-4 h-4 text-white" />
                            </div>
                            <span className="font-bold text-zinc-900 dark:text-white uppercase tracking-tighter">ToolOmni</span>
                        </div>
                        <p className="text-xs text-zinc-400 font-bold">
                            © {new Date().getFullYear()} ToolOmni. All rights reserved.
                        </p>
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <Link href="/privacy" className="hover:text-blue-600">Privacy</Link>
                        <Link href="/terms" className="hover:text-blue-600">Terms</Link>
                        <Link href="/contact" className="hover:text-blue-600">Support</Link>
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white cursor-pointer">
                            <ChevronRight className="w-4 h-4 -rotate-90" />
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
