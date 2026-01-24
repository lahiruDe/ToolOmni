'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, ArrowRight, Sparkles, Zap, ShieldCheck, Globe, HelpCircle } from 'lucide-react';
import { TOOLS, CATEGORY_DETAILS, CATEGORIES, ToolCategory, ICON_MAP } from '@/constants/tools';
import { ToolCard } from '@/components/ToolCard';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<ToolCategory | 'All'>('All');

  const filteredTools = useMemo(() => {
    return TOOLS.filter(tool => {
      const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tool.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="flex flex-col gap-0 pb-24 bg-[#fafafa] dark:bg-zinc-950">

      {/* 🚀 Original ToolOmni Style Hero */}
      <section className="relative pt-28 pb-24 overflow-hidden bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_10%_20%,rgba(59,130,246,0.03),transparent_25%),radial-gradient(circle_at_90%_80%,rgba(139,92,246,0.03),transparent_25%)]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 mb-8"
            >
              <Sparkles className="w-4 h-4 text-blue-600" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">The Ultimate Toolset</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="text-5xl md:text-8xl font-bold text-zinc-900 dark:text-white mb-8 tracking-tight leading-[0.9]"
            >
              Master Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">Digital Workflow</span> <br className="hidden md:block" />
              Without Limits.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-lg md:text-xl text-zinc-500 dark:text-zinc-400 mb-12 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              Access over 100+ professional tools for PDF, Image, Video, and AI. No registration required.
              <span className="text-zinc-900 dark:text-zinc-200 block mt-2">Simplify complex tasks in just a few clicks.</span>
            </motion.p>

            <div className="relative max-w-3xl mx-auto group mb-12">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-center bg-white dark:bg-zinc-800 border-2 border-zinc-100 dark:border-zinc-700 rounded-[2rem] p-3 shadow-2xl shadow-blue-500/10 focus-within:border-blue-500 transition-all">
                <div className="pl-5 pr-3">
                  <Search className="w-6 h-6 text-zinc-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  placeholder="Tell us what you need to solve today..."
                  className="flex-grow py-4 bg-transparent outline-none text-xl text-zinc-900 dark:text-white placeholder:text-zinc-400 font-medium"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="px-10 py-4 bg-zinc-900 dark:bg-blue-600 hover:bg-zinc-800 dark:hover:bg-blue-500 text-white font-bold rounded-2xl transition-all shadow-lg flex items-center gap-2">
                  Search <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-8 text-[11px] font-bold text-zinc-400 uppercase tracking-widest">
              <span className="flex items-center gap-2"><Zap className="w-4 h-4 text-orange-400" /> Instant Results</span>
              <span className="flex items-center gap-2"><ShieldCheck className="w-4 h-4 text-emerald-500" /> Encrypted & Secure</span>
              <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-blue-400" /> Global Standards</span>
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 Category Navigation Boxes - Updated to Navigate to Category Pages */}
      <section className="container mx-auto px-4 -mt-12 mb-20 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {CATEGORY_DETAILS.map((cat, i) => {
            const Icon = ICON_MAP[cat.iconName] || HelpCircle;
            return (
              <Link
                key={cat.name}
                href={`/tool/${cat.name.toLowerCase()}`}
                className="block no-underline"
              >
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i }}
                  className={cn(
                    "group relative p-8 rounded-[2.5rem] border transition-all cursor-pointer overflow-hidden text-center bg-white/90 dark:bg-zinc-900/90 border-zinc-100 dark:border-zinc-800 backdrop-blur-xl hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:scale-[1.02]"
                  )}
                >
                  <div className={cn("w-16 h-16 mx-auto rounded-3xl flex items-center justify-center mb-6 transition-all group-hover:scale-110 group-hover:rotate-6", cat.color, "bg-opacity-10 dark:bg-opacity-20")}>
                    <Icon className={cn("w-8 h-8", cat.color.replace('bg-', 'text-'))} />
                  </div>
                  <h3 className="font-black text-xl text-zinc-900 dark:text-white mb-2">{cat.name}</h3>
                  <p className="text-[10px] uppercase font-black text-blue-600 tracking-[0.2em] opacity-60 group-hover:opacity-100 transition-opacity">
                    {cat.count}
                  </p>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* 💎 Tools Discovery Area */}
      <section className="container mx-auto px-4 mb-32">
        <div className="flex flex-col md:flex-row md:items-end justify-between items-center mb-16 gap-8">
          <div className="text-center md:text-left">
            <h2 className="text-4xl font-black text-zinc-900 dark:text-white tracking-tight mb-3">
              Explore All <span className="text-blue-600">Tools</span>
            </h2>
            <p className="text-zinc-500 font-medium">Quick access to our most popular digital solutions.</p>
          </div>

          <div className="flex items-center gap-3 p-1.5 bg-zinc-100 dark:bg-zinc-800 rounded-[1.5rem] border border-zinc-200/50 dark:border-zinc-700/50 overflow-x-auto no-scrollbar max-w-full">
            <button
              onClick={() => setActiveCategory('All')}
              className={cn("px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap", activeCategory === 'All' ? "bg-white dark:bg-zinc-700 shadow-md text-blue-600" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200")}
            >
              Discovery
            </button>
            {CATEGORIES.map(c => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={cn("px-8 py-3 rounded-xl text-xs font-black transition-all whitespace-nowrap", activeCategory === c ? "bg-white dark:bg-zinc-700 shadow-md text-blue-600" : "text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200")}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredTools.slice(0, 24).map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length > 24 && (
          <div className="mt-16 text-center">
            <button
              onClick={() => {
                if (activeCategory !== 'All') window.location.href = `/tool/${activeCategory.toLowerCase()}`;
              }}
              className="px-12 py-5 bg-white dark:bg-zinc-900 border-2 border-zinc-100 dark:border-zinc-800 rounded-2xl font-black text-zinc-900 dark:text-white hover:border-blue-500 transition-all flex items-center gap-3 mx-auto shadow-xl shadow-zinc-500/5 uppercase tracking-widest text-xs"
            >
              View All {activeCategory === 'All' ? 'Tools' : `${activeCategory} Tools`} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* 🛡️ Value/Trust Section */}
      <section className="bg-zinc-900 text-white py-32 rounded-[3rem] mx-4 mb-24 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="container mx-auto px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-5xl md:text-6xl font-black mb-8 leading-[0.9] tracking-tighter">
                Professional grade <br />
                efficiency, <span className="text-blue-500">for free.</span>
              </h2>
              <div className="grid sm:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="text-xl font-bold">Privacy by Design</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">We never store your files. Everything is wiped within seconds.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-orange-500/20 flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-400" />
                  </div>
                  <h4 className="text-xl font-bold">Lightning Speed</h4>
                  <p className="text-zinc-400 text-sm leading-relaxed">Optimized servers ensure your tasks are completed faster.</p>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 grid grid-cols-2 gap-6">
              {[
                { label: "Tasks Hourly", value: "15k+" },
                { label: "Countries Served", value: "190+" },
                { label: "File Extensions", value: "50+" },
                { label: "Safe Transfers", value: "100%" }
              ].map((stat, i) => (
                <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-md text-center">
                  <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
