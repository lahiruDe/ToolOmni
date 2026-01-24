'use client';

import { motion } from 'framer-motion';
import { Mail, MessageSquare, Globe, Send, Headset, Zap } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
    const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');
        setTimeout(() => setFormStatus('sent'), 1500);
    };

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="flex flex-col lg:flex-row gap-16">
                    {/* Left: Info */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-5/12"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-8">
                            <Headset className="w-4 h-4" /> Support Hub
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
                            Get in <span className="text-blue-600 italic">Touch</span>
                        </h1>
                        <p className="text-xl text-zinc-500 mb-12 leading-relaxed">
                            Have a feature request? Found a bug? Or just want to say hi?
                            We love hearing from our users.
                        </p>

                        <div className="space-y-8">
                            {[
                                { icon: Mail, label: "Email Support", value: "support@toolomni.com", link: "mailto:support@toolomni.com" },
                                { icon: MessageSquare, label: "Community", value: "Join our Discord", link: "#" },
                                { icon: Globe, label: "Social", value: "@toolomni on Twitter", link: "#" }
                            ].map((item, i) => (
                                <a key={i} href={item.link} className="flex items-center gap-6 p-6 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-100 dark:border-zinc-800 hover:border-blue-500 hover:shadow-xl hover:shadow-blue-500/5 transition-all group">
                                    <div className="w-14 h-14 bg-zinc-100 dark:bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-600 dark:text-zinc-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        <item.icon className="w-7 h-7" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-1">{item.label}</p>
                                        <p className="text-lg font-bold text-zinc-900 dark:text-white">{item.value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="lg:w-7/12"
                    >
                        <div className="bg-white dark:bg-zinc-900 p-10 md:p-14 rounded-[3.5rem] shadow-2xl shadow-zinc-200/50 dark:shadow-none border border-zinc-100 dark:border-zinc-800">
                            {formStatus === 'sent' ? (
                                <div className="text-center py-20 animate-fadeIn">
                                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
                                        <Send className="w-10 h-10" />
                                    </div>
                                    <h2 className="text-3xl font-black text-zinc-900 dark:text-white mb-4">Message Sent!</h2>
                                    <p className="text-zinc-500 font-medium">We'll get back to you as soon as possible.</p>
                                    <button
                                        onClick={() => setFormStatus('idle')}
                                        className="mt-10 text-sm font-black text-blue-600 uppercase tracking-widest hover:underline"
                                    >
                                        Send another message
                                    </button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-8">
                                    <div className="grid md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-zinc-500 uppercase tracking-widest ml-1">Your Name</label>
                                            <input required type="text" className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium" placeholder="John Doe" />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-black text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                                            <input required type="email" className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium" placeholder="john@example.com" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-zinc-500 uppercase tracking-widest ml-1">Subject</label>
                                        <select className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium appearance-none">
                                            <option>General Inquiry</option>
                                            <option>Feature Request</option>
                                            <option>Report a Bug</option>
                                            <option>Premium Support</option>
                                        </select>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-sm font-black text-zinc-500 uppercase tracking-widest ml-1">Your Message</label>
                                        <textarea required rows={6} className="w-full px-6 py-4 bg-zinc-50 dark:bg-zinc-800 rounded-2xl border border-zinc-100 dark:border-zinc-700 outline-none focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 transition-all text-zinc-900 dark:text-white font-medium resize-none" placeholder="Tell us more..."></textarea>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={formStatus === 'sending'}
                                        className="w-full py-5 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-black rounded-2xl shadow-xl shadow-blue-500/30 transition-all flex items-center justify-center gap-3 text-lg"
                                    >
                                        {formStatus === 'sending' ? (
                                            <>
                                                <Zap className="w-6 h-6 animate-spin" /> Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-6 h-6" /> Send Message
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
