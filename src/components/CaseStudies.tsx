import React, { useState } from 'react';
import { Award, ArrowRight, Building2, CheckCircle2, TrendingUp } from 'lucide-react';
import { CASE_STUDIES } from '../data/landingData';

interface CaseStudiesProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const CaseStudies: React.FC<CaseStudiesProps> = ({ onOpenDemoModal }) => {
  const [selectedCaseId, setSelectedCaseId] = useState<string>(CASE_STUDIES[0].id);

  const selectedCase = CASE_STUDIES.find((c) => c.id === selectedCaseId) || CASE_STUDIES[0];

  return (
    <section id="case-studies" className="py-20 md:py-28 bg-slate-900/40 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Award className="w-3.5 h-3.5" />
            Proven Impact & Case Studies
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            How Industry Leaders Win With Impacto
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Real results from fast-growing scaleups and established enterprises who transformed their acquisition funnel.
          </p>
        </div>

        {/* Case Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
          {CASE_STUDIES.map((item) => {
            const isSelected = item.id === selectedCaseId;
            return (
              <button
                key={item.id}
                id={`case-tab-${item.id}`}
                onClick={() => setSelectedCaseId(item.id)}
                className={`px-5 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2.5 border ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-900/50'
                    : 'bg-slate-900/80 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span>{item.company}</span>
                <span className="text-xs opacity-75 font-normal">({item.industry})</span>
              </button>
            );
          })}
        </div>

        {/* Selected Case Study Spotlight Card */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-10 rounded-2xl bg-slate-950 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Story Description */}
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-slate-800 text-xs font-semibold text-slate-300 border border-slate-700">
                  {selectedCase.industry}
                </span>
                <span className="text-xs font-mono text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Case Study
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {selectedCase.company}
              </h3>

              <div className="space-y-4 text-sm text-slate-300">
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-rose-400">
                    The Challenge
                  </div>
                  <p className="leading-relaxed text-slate-300">{selectedCase.challenge}</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80 space-y-1.5">
                  <div className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                    The Impacto Solution
                  </div>
                  <p className="leading-relaxed text-slate-300">{selectedCase.solution}</p>
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="case-study-cta-btn"
                  onClick={() => onOpenDemoModal('growth')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-sm font-medium transition-colors cursor-pointer"
                >
                  <span>Replicate This Strategy</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Results Column */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 p-6 sm:p-8 rounded-xl border border-slate-800 space-y-6">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
                <TrendingUp className="w-4 h-4" />
                Quantifiable Outcomes
              </div>

              <div className="space-y-4">
                {selectedCase.results.map((res, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 space-y-1">
                    <div className="text-3xl sm:text-4xl font-extrabold font-display bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
                      {res.metric}
                    </div>
                    <div className="text-sm font-semibold text-slate-200">{res.label}</div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-indigo-950/30 rounded-lg border border-indigo-500/20 text-xs text-indigo-300 text-center">
                Audited & verified against quarterly GA4 telemetry.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
