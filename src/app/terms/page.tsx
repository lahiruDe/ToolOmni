'use client';

import { motion } from 'framer-motion';
import { FileText, CheckCircle, AlertCircle, Scale, Globe, Zap } from 'lucide-react';

export default function TermsOfService() {
    const highlights = [
        {
            icon: Zap,
            title: "Free Access",
            content: "Most ToolOmni features are free to use without registration for personal and commercial projects."
        },
        {
            icon: Scale,
            title: "Fair Usage",
            content: "We provide high-performance tools. We ask that users do not abuse our servers via automated scripts or bots."
        },
        {
            icon: CheckCircle,
            title: "Content Ownership",
            content: "You retain 100% ownership of any content you process through our tools. We claim no rights to your files."
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
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-full text-xs font-black uppercase tracking-widest mb-6">
                        <FileText className="w-4 h-4" /> Legal Agreement
                    </div>
                    <h1 className="text-5xl md:text-6xl font-black text-zinc-900 dark:text-white mb-8 leading-tight">
                        Terms of <span className="text-blue-600 italic">Service</span>
                    </h1>
                    <p className="text-xl text-zinc-500 max-w-2xl mx-auto leading-relaxed">
                        By using ToolOmni, you agree to our terms. We keep them simple and transparent because we respect your time.
                    </p>
                </motion.div>

                {/* Highlights */}
                <div className="grid md:grid-cols-3 gap-6 mb-20">
                    {highlights.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white dark:bg-zinc-900 p-8 rounded-[2.5rem] border border-zinc-100 dark:border-zinc-800 text-center shadow-lg shadow-zinc-200/30 dark:shadow-none"
                        >
                            <div className="w-12 h-12 bg-blue-600 text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-500/20">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <h3 className="font-bold text-zinc-900 dark:text-white mb-3">{item.title}</h3>
                            <p className="text-sm text-zinc-500 leading-relaxed font-medium">{item.content}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Main Content Sections */}
                <div className="space-y-12">
                    <motion.section
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800"
                    >
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-4">
                            <AlertCircle className="w-6 h-6 text-blue-600" />
                            1. Acceptance of Terms
                        </h2>
                        <p className="text-zinc-500 leading-relaxed mb-6">
                            By accessing and using ToolOmni (the "Website" or "Service"), you acknowledge that you have read, understood, and agree to be bound by these Terms of Service. If you do not agree, please stop using the service immediately.
                        </p>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800"
                    >
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-4">
                            <Globe className="w-6 h-6 text-blue-600" />
                            2. Permitted Use
                        </h2>
                        <ul className="space-y-4 text-zinc-500">
                            <li className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span>You may use our tools for both personal and professional work.</span>
                            </li>
                            <li className="flex gap-3">
                                <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                <span>You are responsible for the content you process and must ensure you have the legal right to do so.</span>
                            </li>
                            <li className="flex gap-3">
                                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                <span>Any attempt to reverse engineer, scrape, or overwhelm our servers is strictly prohibited.</span>
                            </li>
                        </ul>
                    </motion.section>

                    <motion.section
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="bg-white dark:bg-zinc-900 p-10 rounded-[3rem] border border-zinc-100 dark:border-zinc-800"
                    >
                        <h2 className="text-2xl font-black text-zinc-900 dark:text-white mb-6 flex items-center gap-4">
                            <Zap className="w-6 h-6 text-blue-600" />
                            3. Disclaimer of Warranty
                        </h2>
                        <p className="text-zinc-500 leading-relaxed italic">
                            ToolOmni provides its services "as is" and "as available." While we strive for 100% accuracy and uptime, we make no guarantees regarding the performance or suitability of our tools for specific tasks. We are not liable for any data loss or indirect damages resulting from the use of our services.
                        </p>
                    </motion.section>

                    <p className="text-center text-sm text-zinc-400 pt-8">
                        Questions about our terms? Please contact us at <span className="text-blue-600 font-bold">legal@toolomni.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
