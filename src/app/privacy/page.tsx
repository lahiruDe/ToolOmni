'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Eye, Lock, Trash2, Cookie, Mail } from 'lucide-react';

export default function PrivacyPolicy() {
    const sections = [
        {
            icon: Eye,
            title: "Data Collection",
            content: "We believe in privacy first. ToolOmni does not require user registration. We do not collect personal information like your name, email address, or phone number unless you explicitly contact us via support."
        },
        {
            icon: Lock,
            title: "File Security",
            content: "Your files are your own. All file processing happens either locally in your browser or on our secure, encrypted servers. We use high-grade SSL encryption for all data transfers."
        },
        {
            icon: Trash2,
            title: "Auto-Deletion",
            content: "Security is our priority. All processed files and temporary data are automatically and permanently deleted from our servers 1 hour after processing is complete."
        },
        {
            icon: ShieldCheck,
            title: "Third-Party Services",
            content: "We may use third-party services like Google Analytics or AdSense to improve our services and keep them free. These services may use cookies to collect non-personal browser data."
        }
    ];

    return (
        <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 pt-32 pb-20">
            <div className="container mx-auto px-4 max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-20"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <ShieldCheck className="w-4 h-4" /> Privacy Protected
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
                        Privacy <span className="text-blue-600 italic">Policy</span>
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        At ToolOmni, your privacy is not just a policy—it's a fundamental principle.
                        We ensure your data remains yours and stays secure.
                    </p>
                </motion.div>

                {/* Main Content */}
                <div className="grid md:grid-cols-2 gap-8 mb-20">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-zinc-900 p-8 rounded-[2rem] border border-zinc-100 dark:border-zinc-800 shadow-xl shadow-zinc-200/50 dark:shadow-none group hover:border-blue-500 transition-all"
                        >
                            <div className="w-14 h-14 bg-blue-50 dark:bg-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                <section.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-4">{section.title}</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed font-medium">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Detailed Sections */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="prose dark:prose-invert max-w-none bg-white dark:bg-zinc-900/50 p-10 md:p-16 rounded-[3rem] border border-zinc-100 dark:border-zinc-800"
                >
                    <h2 className="text-3xl font-black mb-8">Detailed Information</h2>

                    <div className="space-y-12">
                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-sm font-black">01</span>
                                Information We Collect
                            </h3>
                            <p className="text-zinc-500 leading-relaxed pl-11">
                                We collect minimal information strictly for the purpose of providing and improving our tools. This includes basic browser information, device type, and tool-specific usage statistics (e.g., how many PDFs were merged) which are completely anonymized.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-sm font-black">02</span>
                                How We Use Your Data
                            </h3>
                            <p className="text-zinc-500 leading-relaxed pl-11">
                                ToolOmni does not sell, trade, or otherwise transfer your data to outside parties. We only use anonymized analytics to understand usage patterns and optimize our server infrastructure for better performance.
                            </p>
                        </section>

                        <section>
                            <h3 className="text-xl font-bold flex items-center gap-3 mb-4">
                                <span className="w-8 h-8 bg-zinc-100 dark:bg-zinc-800 rounded-lg flex items-center justify-center text-sm font-black">03</span>
                                Cookie Policy
                            </h3>
                            <p className="text-zinc-500 leading-relaxed pl-11">
                                We use cookies only where necessary for site functionality and analytics. You can choose to disable cookies in your browser settings, though this may impact some features of our tools.
                            </p>
                        </section>

                        <section className="pt-8 border-t border-zinc-100 dark:border-zinc-800">
                            <p className="text-sm text-zinc-400 italic">
                                Last updated: January 24, 2026. ToolOmni reserves the right to update this policy at any time. Significant changes will be announced on our blog.
                            </p>
                        </section>
                    </div>
                </motion.div>

                {/* Contact CTA */}
                <div className="mt-20 text-center">
                    <p className="text-zinc-500 mb-6 font-bold uppercase tracking-widest text-xs">Have questions?</p>
                    <a
                        href="mailto:support@toolomni.com"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-xl shadow-zinc-400/20 dark:shadow-none"
                    >
                        <Mail className="w-5 h-5" /> Contact Support
                    </a>
                </div>
            </div>
        </div>
    );
}
