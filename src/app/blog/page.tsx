'use client';

import { motion } from 'framer-motion';
import { Calendar, User, Clock, ChevronRight, Search, Tag } from 'lucide-react';

export default function BlogPage() {
    const posts = [
        {
            id: 1,
            title: "10 AI Writing Hacks for 2026",
            excerpt: "Learn how to use AI assistants to double your writing speed without losing the human touch.",
            category: "AI",
            date: "Jan 24, 2026",
            author: "Admin",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            title: "Why PDF Is Still the King of Documents",
            excerpt: "Despite dozens of new formats, PDF remains the standard. We explore why it's not going anywhere.",
            category: "Workflow",
            date: "Jan 22, 2026",
            author: "Team",
            readTime: "8 min",
            image: "https://images.unsplash.com/photo-1568667256549-094345857637?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            title: "Optimizing Images for Web Performance",
            excerpt: "A comprehensive guide on choosing between WEBP, PNG, and JPG for your next project.",
            category: "Image",
            date: "Jan 18, 2026",
            author: "Editor",
            readTime: "6 min",
            image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800"
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <Tag className="w-4 h-4" /> ToolOmni Journal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
                        Insights & <span className="text-blue-600 italic">Updates</span>
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto mb-12">
                        Your go-to source for productivity tips, digital workflow guides, and ToolOmni product news.
                    </p>

                    {/* Search Bar */}
                    <div className="max-w-xl mx-auto relative group">
                        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 group-focus-within:text-blue-600 transition-colors" />
                        <input
                            type="text"
                            placeholder="Search articles..."
                            className="w-full pl-16 pr-6 py-5 bg-white dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all shadow-xl shadow-zinc-200/50 dark:shadow-none text-lg font-medium"
                        />
                    </div>
                </motion.div>

                {/* Featured Post (Visual only) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-20 relative aspect-[21/9] rounded-[3rem] overflow-hidden group cursor-pointer border border-zinc-100 dark:border-zinc-800 shadow-2xl"
                >
                    <img src={posts[0].image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Featured" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-12 text-white max-w-2xl">
                        <div className="flex items-center gap-4 mb-4">
                            <span className="px-3 py-1 bg-blue-600 text-[10px] font-black uppercase tracking-widest rounded-full">Featured</span>
                            <span className="text-xs font-bold opacity-80 flex items-center gap-1"><Calendar className="w-3 h-3" /> {posts[0].date}</span>
                        </div>
                        <h2 className="text-4xl font-black mb-4 leading-tight">{posts[0].title}</h2>
                        <p className="text-lg opacity-80 font-medium mb-6 line-clamp-2">{posts[0].excerpt}</p>
                        <button className="flex items-center gap-2 font-black text-sm uppercase tracking-widest hover:gap-4 transition-all">
                            Read Article <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, idx) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-zinc-900 rounded-[2.5rem] overflow-hidden border border-zinc-100 dark:border-zinc-800 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all flex flex-col group"
                        >
                            <div className="aspect-video relative overflow-hidden">
                                <img src={post.image} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" alt={post.title} />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-zinc-900 dark:text-white border border-zinc-100 dark:border-zinc-800 shadow-sm">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8 flex-grow flex flex-col">
                                <div className="flex items-center gap-4 text-xs font-bold text-zinc-400 mb-6">
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {post.readTime}</span>
                                </div>
                                <h3 className="text-2xl font-black text-zinc-900 dark:text-white mb-4 line-clamp-2 leading-tight group-hover:text-blue-600 transition-colors">
                                    {post.title}
                                </h3>
                                <p className="text-zinc-500 font-medium mb-8 line-clamp-3 leading-relaxed">
                                    {post.excerpt}
                                </p>
                                <div className="mt-auto pt-6 border-t border-zinc-50 dark:border-zinc-800 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/20 flex items-center justify-center">
                                            <User className="w-4 h-4 text-blue-600" />
                                        </div>
                                        <span className="text-xs font-black uppercase tracking-widest text-zinc-400">{post.author}</span>
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Pagination Placeholder */}
                <div className="mt-20 flex justify-center">
                    <button className="px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all">
                        Load More Articles
                    </button>
                </div>
            </div>
        </div>
    );
}
