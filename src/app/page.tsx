'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Zap, ShieldCheck, Globe, HelpCircle } from 'lucide-react';
import { TOOLS, CATEGORIES, CATEGORY_DETAILS, ICON_MAP } from '@/constants/tools';
import { ToolCard } from '@/components/ToolCard';
import { cn } from '@/lib/utils';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredTools = TOOLS.filter(tool => {
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || tool.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col min-h-screen bg-[#fafafa] dark:bg-zinc-950">

      {/* 🏔️ Compact Hero Section */}
      <section className="pt-32 pb-16 bg-white dark:bg-zinc-900 border-b border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-black text-zinc-900 dark:text-white mb-6 tracking-tight leading-tight"
            >
              Every tool you need. <br />
              <span className="text-blue-600">Simplified.</span>
            </motion.h1>
            <p className="text-lg text-zinc-500 mb-10 max-w-xl mx-auto font-medium">
              Professional PDF, Image, and Video tools. <br className="hidden md:block" />
              No registration, 100% free, and completely secure.
            </p>

            {/* Centered Compact Search */}
            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <Search className="w-5 h-5 text-zinc-300 group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search for a tool (e.g. merge pdf, remove bg)..."
                className="w-full pl-14 pr-6 py-4 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all text-base font-medium"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </section>

      {/* 🧩 Category Quick Filter */}
      <section className="container mx-auto px-6 py-12 max-w-6xl">
        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={() => setActiveCategory('All')}
            className={cn(
              "px-6 py-2.5 rounded-full text-xs font-bold transition-all border",
              activeCategory === 'All'
                ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-blue-500"
            )}
          >
            All Tools
          </button>
          {CATEGORY_DETAILS.map((cat) => {
            const Icon = ICON_MAP[cat.iconName] || HelpCircle;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name as any)}
                className={cn(
                  "flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-bold transition-all border",
                  activeCategory === cat.name
                    ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:border-blue-500"
                )}
              >
                <Icon className="w-3.5 h-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>
      </section>

      {/* 🛠️ Modern Tools Grid */}
      <section id="tools" className="container mx-auto px-6 pb-24 max-w-7xl">
        <div className="flex items-center justify-between mb-8 px-2 border-b border-zinc-100 dark:border-zinc-800 pb-4">
          <h2 className="text-xl font-bold text-zinc-900 dark:text-white">{activeCategory} Tools</h2>
          <div className="text-[10px] font-black uppercase tracking-widest text-zinc-300">
            {filteredTools.length} Resources Available
          </div>
        </div>

        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence mode='popLayout'>
            {filteredTools.map((tool) => (
              <motion.div
                key={tool.id}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <ToolCard tool={tool} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredTools.length === 0 && (
          <div className="text-center py-32">
            <p className="text-zinc-300 text-xl font-bold italic mb-4">No tools found matching your search.</p>
            <button onClick={() => setSearchQuery('')} className="text-blue-600 font-bold hover:underline">Clear all filters</button>
          </div>
        )}
      </section>

      {/* 🛡️ Subtle Values */}
      <section className="bg-white dark:bg-zinc-900/30 py-20 border-t border-zinc-100 dark:border-zinc-800">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { icon: ShieldCheck, title: "Privacy First", desc: "Your files never touch our permanent storage. Everything is cleared instantly after processing." },
              { icon: Zap, title: "Pure Speed", desc: "No queues, no waiting. Process your files at lightning speed using our high-performance engine." },
              { icon: Globe, title: "Universal Access", desc: "Professional tools that work on any browser, any device, with no software installation required." }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="w-10 h-10 bg-blue-50 dark:bg-zinc-800 rounded-xl flex items-center justify-center mb-6 border border-blue-100 dark:border-zinc-700">
                  <item.icon className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-3 tracking-tight">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
