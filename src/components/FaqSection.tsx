import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS } from '../data/landingData';

interface FaqSectionProps {
  onOpenDemoModal: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenDemoModal }) => {
  const [openFaqId, setOpenFaqId] = useState<string | null>(FAQS[0].id);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFaqs = FAQS.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Clear Answers to Key Questions
          </h2>
          <p className="text-slate-300 text-base">
            Everything you need to know about implementing and scaling with the Impacto Engine.
          </p>

          {/* Quick Search */}
          <div className="pt-2 max-w-md mx-auto">
            <input
              id="faq-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search topics (e.g. security, CRM, uptime)..."
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {filteredFaqs.length === 0 ? (
            <div className="text-center py-8 text-sm text-slate-400">
              No matching questions found. Try searching another keyword or reach out to our team.
            </div>
          ) : (
            filteredFaqs.map((faq) => {
              const isOpen = openFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="rounded-xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-colors"
                >
                  <button
                    id={`faq-toggle-${faq.id}`}
                    type="button"
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/90 transition-colors"
                  >
                    <span className="font-semibold text-white text-sm sm:text-base">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-indigo-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : 'rotate-0'
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-sm text-slate-300 leading-relaxed border-t border-slate-800/40 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Help Banner */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-indigo-950/60 to-slate-900 border border-indigo-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-indigo-600/30 text-indigo-400">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-white">Have a specific architectural requirement?</div>
              <div className="text-xs text-slate-400">Our engineering and solutions architects are here to help.</div>
            </div>
          </div>

          <button
            id="faq-contact-solutions-btn"
            type="button"
            onClick={onOpenDemoModal}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer"
          >
            Talk to Solutions Engineer
          </button>
        </div>
      </div>
    </section>
  );
};
