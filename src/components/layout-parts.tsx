import Link from 'next/link';
import { Search, Menu, Wrench, ChevronRight } from 'lucide-react';
import { TOOLS } from '@/constants/tools';

export function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full border-b border-zinc-100 dark:border-zinc-800 bg-white/70 dark:bg-zinc-950/70 backdrop-blur-xl">
            <div className="container mx-auto px-6 h-14 flex items-center justify-between">
                <Link href="/" className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/20">
                        <Wrench className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
                        TOOL<span className="text-blue-600">OMNI</span>
                    </span>
                </Link>

                <div className="hidden md:flex items-center gap-8">
                    <Link href="/tool/pdf" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">PDF Tools</Link>
                    <Link href="/tool/image" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Image Tools</Link>
                    <Link href="/tool/video" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">Video Tools</Link>
                    <Link href="/tool/ai" className="text-sm font-bold text-zinc-600 dark:text-zinc-400 hover:text-blue-600 transition-colors">AI Tools</Link>
                </div>
            </div>
        </nav>
    );
}

export function Footer() {
    return (
        <footer className="w-full bg-white dark:bg-zinc-950 border-t border-zinc-100 dark:border-zinc-900 py-24">
            <div className="container mx-auto px-6 max-w-6xl">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20 text-center md:text-left">
                    <div className="col-span-2 md:col-span-1">
                        <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white text-center">
                            TOOL<span className="text-blue-600">OMNI</span>
                        </span>
                        <p className="mt-4 text-xs text-zinc-400 font-medium leading-relaxed max-w-[200px] mx-auto md:mx-0">
                            Professional tools for everyday tasks.
                            Built for privacy and speed.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-6">Tools</h4>
                        <ul className="space-y-3">
                            <li><Link href="/tool/pdf" className="text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors">PDF Tools</Link></li>
                            <li><Link href="/tool/image" className="text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors">Image Tools</Link></li>
                            <li><Link href="/tool/video" className="text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors">Video Tools</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 mb-6">Company</h4>
                        <ul className="space-y-3">
                            <li><Link href="/about" className="text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors">About Us</Link></li>
                            <li><Link href="/privacy" className="text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                            <li><Link href="/terms" className="text-xs font-bold text-zinc-500 hover:text-blue-600 transition-colors">Terms of Service</Link></li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-zinc-50 dark:border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-bold text-zinc-300 uppercase tracking-widest">
                        &copy; {new Date().getFullYear()} ToolOmni. All rights reserved.
                    </p>
                    <div className="flex gap-6">
                        <span className="text-[10px] font-bold text-zinc-400">STATUS: ALL SYSTEMS NOMINAL</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
