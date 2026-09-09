import React, { useState } from 'react';
import { Calculator, TrendingUp, Users, Clock, ArrowRight, CheckCircle } from 'lucide-react';

interface RoiCalculatorProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const RoiCalculator: React.FC<RoiCalculatorProps> = ({ onOpenDemoModal }) => {
  const [monthlyVisitors, setMonthlyVisitors] = useState<number>(65000);
  const [currentConversionRate, setCurrentConversionRate] = useState<number>(2.2);
  const [dealValue, setDealValue] = useState<number>(350);
  const [expectedUpliftPercent, setExpectedUpliftPercent] = useState<number>(45);

  // Calculations
  const currentMonthlyConversions = (monthlyVisitors * (currentConversionRate / 100));
  const currentMonthlyRevenue = currentMonthlyConversions * dealValue;

  const newConversionRate = currentConversionRate * (1 + expectedUpliftPercent / 100);
  const newMonthlyConversions = (monthlyVisitors * (newConversionRate / 100));
  const newMonthlyRevenue = newMonthlyConversions * dealValue;

  const additionalMonthlyRevenue = Math.max(0, newMonthlyRevenue - currentMonthlyRevenue);
  const additionalAnnualRevenue = additionalMonthlyRevenue * 12;
  const additionalMonthlyLeads = Math.round(newMonthlyConversions - currentMonthlyConversions);
  const engineeringHoursSaved = Math.round(18 + (monthlyVisitors / 15000));

  // Approx Impacto cost based on volume
  const estimatedImpactoCost = monthlyVisitors > 100000 ? 149 * 12 : 49 * 12;
  const estimatedRoiMultiple = (additionalAnnualRevenue / estimatedImpactoCost).toFixed(1);

  return (
    <section id="roi-calculator" className="py-20 md:py-28 bg-slate-900/60 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Calculator className="w-3.5 h-3.5" />
            ROI & Revenue Uplift Estimator
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Calculate Your Return on Impacto
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Adjust the sliders below to see your projected revenue expansion, extra customer acquisitions, and annual return on investment.
          </p>
        </div>

        {/* Calculator Grid */}
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-slate-950/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center justify-between pb-3 border-b border-slate-800">
              <span>Your Funnel Parameters</span>
              <span className="text-xs font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/40">
                Interactive Model
              </span>
            </h3>

            {/* Slider 1: Monthly Visitors */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Monthly Funnel Visitors</label>
                <span className="font-mono font-bold text-indigo-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-sm">
                  {monthlyVisitors.toLocaleString()} visits
                </span>
              </div>
              <input
                id="calc-slider-visitors"
                type="range"
                min="5000"
                max="500000"
                step="5000"
                value={monthlyVisitors}
                onChange={(e) => setMonthlyVisitors(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>5K</span>
                <span>250K</span>
                <span>500K+</span>
              </div>
            </div>

            {/* Slider 2: Current Conversion Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Current Conversion Rate</label>
                <span className="font-mono font-bold text-cyan-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-sm">
                  {currentConversionRate.toFixed(1)}%
                </span>
              </div>
              <input
                id="calc-slider-conversion-rate"
                type="range"
                min="0.5"
                max="8.0"
                step="0.1"
                value={currentConversionRate}
                onChange={(e) => setCurrentConversionRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>0.5% (Low)</span>
                <span>2.5% (Average)</span>
                <span>8.0% (High)</span>
              </div>
            </div>

            {/* Slider 3: Average Order / Contract Value */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Avg Order / Contract Value (ACV)</label>
                <span className="font-mono font-bold text-emerald-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-sm">
                  ${dealValue.toLocaleString()}
                </span>
              </div>
              <input
                id="calc-slider-deal-value"
                type="range"
                min="25"
                max="5000"
                step="25"
                value={dealValue}
                onChange={(e) => setDealValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>$25</span>
                <span>$1,000</span>
                <span>$5,000+</span>
              </div>
            </div>

            {/* Slider 4: Expected Impacto Uplift */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <label className="text-slate-300 font-medium">Projected Uplift via Impacto Engine</label>
                <span className="font-mono font-bold text-amber-300 bg-slate-900 px-2.5 py-1 rounded border border-slate-800 text-sm">
                  +{expectedUpliftPercent}% Uplift
                </span>
              </div>
              <input
                id="calc-slider-uplift"
                type="range"
                min="15"
                max="85"
                step="5"
                value={expectedUpliftPercent}
                onChange={(e) => setExpectedUpliftPercent(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[11px] text-slate-500">
                <span>+15% (Conservative)</span>
                <span>+45% (Benchmark)</span>
                <span>+85% (Aggressive)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/90 rounded-xl border border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                New projected conversion rate:
              </span>
              <span className="font-mono font-bold text-white text-sm">
                {newConversionRate.toFixed(2)}%
              </span>
            </div>
          </div>

          {/* Results Summary Column */}
          <div className="lg:col-span-6 p-6 sm:p-8 bg-gradient-to-br from-indigo-950/60 via-slate-950 to-slate-950 border border-indigo-500/30 rounded-2xl shadow-2xl space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs uppercase tracking-wider font-semibold text-indigo-400">
                Projected Financial Return
              </span>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold">
                {estimatedRoiMultiple}x Estimated ROI
              </span>
            </div>

            {/* Big Headline Stat */}
            <div className="space-y-1">
              <div className="text-xs text-slate-400">Additional Annual Revenue Generated</div>
              <div className="text-4xl sm:text-5xl font-extrabold font-display bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300 bg-clip-text text-transparent">
                +${Math.round(additionalAnnualRevenue).toLocaleString()}
              </div>
              <div className="text-xs text-slate-400">
                That is <span className="font-semibold text-white">+${Math.round(additionalMonthlyRevenue).toLocaleString()}</span> extra revenue every single month.
              </div>
            </div>

            {/* Breakdown Cards */}
            <div className="grid grid-cols-2 gap-3.5 pt-2">
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Extra Inbound Leads</span>
                </div>
                <div className="text-xl font-bold font-display text-white">
                  +{additionalMonthlyLeads.toLocaleString()} /mo
                </div>
                <div className="text-[11px] text-slate-500">Qualified customers</div>
              </div>

              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800/90 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Engineering Saved</span>
                </div>
                <div className="text-xl font-bold font-display text-white">
                  {engineeringHoursSaved} hrs /mo
                </div>
                <div className="text-[11px] text-slate-500">Zero maintenance overhead</div>
              </div>
            </div>

            <div className="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/20 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-indigo-300">
                <TrendingUp className="w-4 h-4 text-indigo-400" />
                <span>Instant Payback Calculation</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Based on your selected volume, Impacto pays for itself in approximately <span className="font-bold text-white">3 to 5 days</span> of live traffic.
              </p>
            </div>

            <button
              id="roi-claim-results-cta-btn"
              onClick={() => onOpenDemoModal('growth')}
              className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer group"
            >
              <span>Unlock These Projections on Your Funnel</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
