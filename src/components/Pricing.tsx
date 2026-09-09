import React, { useState } from 'react';
import { Check, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PRICING_PLANS } from '../data/landingData';

interface PricingProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const Pricing: React.FC<PricingProps> = ({ onOpenDemoModal }) => {
  const [billingCycle, setBillingCycle] = useState<'annual' | 'monthly'>('annual');

  return (
    <section id="pricing" className="py-20 md:py-28 bg-slate-900/50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Transparent Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            Predictable Plans for Every Stage
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Start with our 14-day free trial. Scale seamlessly as your visitor volume and revenue grow.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="pt-4 flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${billingCycle === 'monthly' ? 'text-white' : 'text-slate-400'}`}>
              Monthly Billing
            </span>
            <button
              id="pricing-billing-toggle-btn"
              type="button"
              onClick={() => setBillingCycle(billingCycle === 'annual' ? 'monthly' : 'annual')}
              className="relative w-14 h-7 bg-slate-800 rounded-full p-1 border border-slate-700 transition-colors cursor-pointer"
            >
              <div
                className={`w-5 h-5 bg-indigo-500 rounded-full shadow-md transition-transform duration-200 ${
                  billingCycle === 'annual' ? 'translate-x-7' : 'translate-x-0'
                }`}
              />
            </button>
            <span className={`text-sm font-medium flex items-center gap-1.5 ${billingCycle === 'annual' ? 'text-white' : 'text-slate-400'}`}>
              <span>Annual Billing</span>
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                Save 20%
              </span>
            </span>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-stretch">
          {PRICING_PLANS.map((plan) => {
            const isPopular = plan.popular;
            const price = billingCycle === 'annual' ? plan.annualPrice : plan.monthlyPrice;

            return (
              <div
                key={plan.id}
                id={`pricing-card-${plan.id}`}
                className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative transition-all duration-200 ${
                  isPopular
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-2 border-indigo-500 shadow-2xl shadow-indigo-950/60 ring-1 ring-indigo-500/50'
                    : 'bg-slate-950/80 border border-slate-800 shadow-xl'
                }`}
              >
                {/* Popular Badge */}
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-md">
                    {plan.badge || 'Most Popular'}
                  </div>
                )}

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold font-display text-white">{plan.name}</h3>
                    <p className="text-xs text-slate-400 mt-1 min-h-[32px]">{plan.tagline}</p>
                  </div>

                  {/* Price */}
                  <div className="pb-4 border-b border-slate-800 space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl sm:text-5xl font-extrabold font-display text-white">
                        ${price}
                      </span>
                      <span className="text-slate-400 text-sm font-medium">/ month</span>
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {billingCycle === 'annual' ? 'Billed annually ($' + (price * 12) + '/yr)' : 'Billed monthly'}
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-3">
                    <div className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                      Included in this plan:
                    </div>
                    <ul className="space-y-2.5">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300">
                          <Check className="w-4 h-4 text-indigo-400 flex-shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-8 mt-6 border-t border-slate-800/80 space-y-3">
                  <button
                    id={`pricing-btn-${plan.id}`}
                    onClick={() => onOpenDemoModal(plan.id)}
                    className={`w-full py-3 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      isPopular
                        ? 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30'
                        : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                    }`}
                  >
                    <span>{plan.ctaText}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <div className="text-center text-[11px] text-slate-500 flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>30-day money-back satisfaction guarantee</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
