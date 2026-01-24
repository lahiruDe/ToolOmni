'use client';

import { motion } from 'framer-motion';
import { Rocket, Heart, Code2, Coffee, Sparkles, Github, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20 overflow-hidden">
            <div className="container mx-auto px-4 max-w-5xl relative">
                {/* Background Decorative Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -mr-48 -mt-24 pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full -ml-48 -mb-24 pointer-events-none" />

                <div className="flex flex-col md:flex-row gap-16 items-center mb-32">
                    {/* Image / Avatar Placeholder */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-1/2 flex justify-center"
                    >
                        <div className="relative group">
                            <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-6 group-hover:rotate-3 transition-transform duration-500 shadow-2xl shadow-blue-500/20" />
                            <div className="relative w-72 h-96 bg-zinc-900 rounded-[3rem] overflow-hidden border-4 border-white dark:border-zinc-800 shadow-2xl flex items-center justify-center">
                                {/* Gradient Placeholder for User's Image */}
                                <div className="absolute inset-0 bg-gradient-to-br from-zinc-800 to-zinc-950 flex flex-col items-center justify-center p-8 text-center">
                                    <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center mb-6 border border-zinc-700">
                                        <Code2 className="w-10 h-10 text-blue-500" />
                                    </div>
                                    <h3 className="text-white text-xl font-black mb-2">Build with Love</h3>
                                    <p className="text-zinc-500 text-sm font-bold">BY THE TOOLOMNI CREATOR</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bio */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="w-full md:w-1/2"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                            <Sparkles className="w-4 h-4 text-yellow-500" /> The Story Behind ToolOmni
                        </div>
                        <h1 className="text-5xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
                            Hi, I'm the <br /><span className="text-blue-600 italic">Visionary</span> behind this.
                        </h1>
                        <p className="text-xl text-zinc-500 mb-8 leading-relaxed">
                            I built ToolOmni because I was tired of slow, ad-heavy, and clunky web tools.
                            I wanted to create a platform that feels <span className="text-zinc-900 dark:text-white font-bold">premium, fast, and secure</span>—all for free.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-12 h-12 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 hover:text-blue-600 hover:border-blue-500 transition-all shadow-sm">
                                    <Icon className="w-6 h-6" />
                                </a>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Values Section */}
                <div className="grid md:grid-cols-3 gap-12 mb-32">
                    {[
                        { icon: Rocket, title: "Speed Matters", desc: "Every millisecond counts. We optimize every tool to be lightning fast." },
                        { icon: Heart, title: "Pure Purpose", desc: "No complex signups or hidden fees. Just clean tools for productive people." },
                        { icon: Code2, title: "Craftsmanship", desc: "Every pixel and every line of code is written with attention to detail." }
                    ].map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-zinc-100/50 dark:bg-zinc-900/30 p-10 rounded-[3rem] border border-zinc-200 dark:border-zinc-800"
                        >
                            <div className="w-14 h-14 bg-white dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-8 shadow-sm text-blue-600">
                                <item.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">{item.title}</h3>
                            <p className="text-zinc-500 leading-relaxed font-medium">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Tech Stack / Skills Section */}
                <div className="mb-32">
                    <h3 className="text-center text-sm font-black uppercase tracking-[0.3em] text-zinc-400 mb-12">Fueled by Modern Technology</h3>
                    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
                        {[
                            { name: "Next.js", color: "hover:bg-black hover:text-white" },
                            { name: "TypeScript", color: "hover:bg-blue-600 hover:text-white" },
                            { name: "Tailwind CSS", color: "hover:bg-cyan-500 hover:text-white" },
                            { name: "Framer Motion", color: "hover:bg-indigo-600 hover:text-white" },
                            { name: "OpenAI", color: "hover:bg-emerald-600 hover:text-white" },
                            { name: "Cloudflare", color: "hover:bg-orange-500 hover:text-white" }
                        ].map((tech, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className={cn(
                                    "px-8 py-3 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl font-black text-sm text-zinc-600 dark:text-zinc-400 cursor-default transition-all duration-300",
                                    tech.color
                                )}
                            >
                                {tech.name}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Final Quote */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="bg-blue-600 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                    <Coffee className="w-16 h-16 mx-auto mb-10 text-blue-300 opacity-50" />
                    <h2 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                        "Tools don't just solve problems, they empower people to create more."
                    </h2>
                    <p className="text-blue-100 text-xl font-bold uppercase tracking-widest">
                        — ToolOmni Creator
                    </p>
                </motion.div>
            </div>
        </div>
    );
}
