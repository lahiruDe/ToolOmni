'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    faqs: FaqItem[];
}

export function FaqAccordion({ faqs }: FaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    return (
        <div className="space-y-3">
            {faqs.map((faq, idx) => {
                const isOpen = openIndex === idx;
                
                return (
                    <div 
                        key={idx} 
                        className={`group bg-white dark:bg-zinc-900/50 rounded-xl border transition-all duration-300 overflow-hidden ${
                            isOpen 
                                ? 'border-blue-500/50 ring-1 ring-blue-500/20 shadow-lg shadow-blue-500/5' 
                                : 'border-zinc-100 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700'
                        }`}
                    >
                        <button 
                            onClick={() => setOpenIndex(isOpen ? null : idx)}
                            className="w-full flex items-center justify-between p-5 text-left cursor-pointer list-none focus:outline-none"
                        >
                            <h3 className={`text-base font-bold transition-colors ${
                                isOpen ? 'text-blue-600 dark:text-blue-400' : 'text-zinc-800 dark:text-zinc-200'
                            }`}>
                                {faq.question}
                            </h3>
                            <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${
                                isOpen ? 'rotate-180 text-blue-500' : ''
                            }`} />
                        </button>
                        
                        <div 
                            className={`transition-all duration-300 ease-in-out ${
                                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                            }`}
                        >
                            <div className="px-5 pb-5 text-zinc-500 dark:text-zinc-400 text-sm leading-relaxed font-medium">
                                <div className="h-px bg-zinc-100 dark:bg-zinc-800 mb-4" />
                                {faq.answer}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
