import React from 'react';
import { Star, MessageSquareHeart } from 'lucide-react';
import { TESTIMONIALS } from '../data/landingData';

export const Testimonials: React.FC = () => {
  return (
    <section id="testimonials" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            Customer Experiences
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Loved by Growth Marketers & Engineers Alike
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            See how teams use Impacto to eliminate developer bottlenecks and accelerate conversion rates.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {TESTIMONIALS.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950 border border-slate-800 shadow-xl flex flex-col justify-between space-y-6 relative hover:border-slate-700 transition-colors"
            >
              <div className="space-y-4">
                {/* Rating stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                <p className="text-slate-300 text-sm sm:text-base leading-relaxed italic">
                  "{item.content}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-3">
                {/* Highlight metric pill */}
                <div className="p-2.5 rounded-lg bg-indigo-950/40 border border-indigo-500/20 flex items-center justify-between">
                  <span className="text-xs text-slate-400">{item.metricLabel}</span>
                  <span className="text-sm font-bold text-indigo-300 font-display">{item.metric}</span>
                </div>

                {/* Profile */}
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-700"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <h4 className="font-semibold text-white text-sm">{item.name}</h4>
                    <p className="text-xs text-slate-400">
                      {item.role}, <span className="text-slate-300">{item.company}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
