import React, { useState } from 'react';
import { Sparkles, Zap, Activity, Layers, CheckCircle2, ArrowRight, Gauge, Globe2 } from 'lucide-react';
import { FEATURES } from '../data/landingData';

interface FeatureShowcaseProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({ onOpenDemoModal }) => {
  const [activeFeatureId, setActiveFeatureId] = useState<string>(FEATURES[0].id);

  const activeFeature = FEATURES.find((f) => f.id === activeFeatureId) || FEATURES[0];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5" />;
      case 'Zap':
        return <Zap className="w-5 h-5" />;
      case 'Activity':
        return <Activity className="w-5 h-5" />;
      case 'Layers':
        return <Layers className="w-5 h-5" />;
      default:
        return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="features" className="py-20 md:py-28 bg-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
            <Gauge className="w-3.5 h-3.5" />
            Core Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
            Engineered for Uncompromising Growth
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            A unified stack that combines high-performance edge infrastructure, autonomous experimentation algorithms, and high-fidelity revenue telemetry.
          </p>
        </div>

        {/* Feature Navigation Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 max-w-5xl mx-auto mb-10">
          {FEATURES.map((feature) => {
            const isSelected = feature.id === activeFeatureId;
            return (
              <button
                key={feature.id}
                id={`feature-tab-${feature.id}`}
                onClick={() => setActiveFeatureId(feature.id)}
                className={`p-4 rounded-xl text-left border transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 ${
                  isSelected
                    ? 'bg-slate-900 border-indigo-500/80 shadow-lg shadow-indigo-950/50 ring-1 ring-indigo-500/50'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div
                    className={`p-2 rounded-lg ${
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {getIcon(feature.iconName)}
                  </div>
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded-full font-medium ${
                      isSelected
                        ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-500'
                    }`}
                  >
                    {feature.highlight}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{feature.shortDesc}</p>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Feature Deep Dive Showcase */}
        <div className="max-w-5xl mx-auto p-6 sm:p-8 lg:p-10 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-medium text-indigo-400">
                <span className="w-2 h-2 rounded-full bg-indigo-400" />
                <span>Feature Spotlight: {activeFeature.title}</span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
                {activeFeature.title}
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {activeFeature.description}
              </p>

              <div className="space-y-2.5">
                <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Included Architectural Modules:
                </div>
                <div className="space-y-2">
                  {activeFeature.previewData.tags.map((tag) => (
                    <div key={tag} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-indigo-400 flex-shrink-0" />
                      <span>{tag}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id={`feature-explore-btn-${activeFeature.id}`}
                  onClick={() => onOpenDemoModal('growth')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white rounded-lg border border-slate-700 text-sm font-medium transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Technical Documentation</span>
                  <ArrowRight className="w-4 h-4 text-indigo-400" />
                </button>
              </div>
            </div>

            {/* Right Live Visual Simulation */}
            <div className="lg:col-span-6 p-6 rounded-xl bg-slate-950 border border-slate-800 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-medium">
                  <Globe2 className="w-4 h-4 text-cyan-400" />
                  <span>Real-Time Node Telemetry</span>
                </div>
                <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/50">
                  Healthy • Active
                </span>
              </div>

              {/* Main Metric Spotlight */}
              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1">
                <div className="text-xs text-slate-400">{activeFeature.previewData.metricLabel}</div>
                <div className="flex items-baseline gap-3">
                  <div className="text-3xl sm:text-4xl font-bold font-display text-white">
                    {activeFeature.previewData.metric}
                  </div>
                  <div className="text-xs font-semibold text-emerald-400">
                    {activeFeature.previewData.change}
                  </div>
                </div>
              </div>

              {/* Trend Visualizer */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 flex justify-between">
                  <span>Dynamic Adaptive Convergence</span>
                  <span className="font-mono text-indigo-400">P99 Validated</span>
                </div>

                <div className="h-24 flex items-end gap-3 p-3 bg-slate-900/60 rounded-xl border border-slate-800/80">
                  {activeFeature.previewData.chartTrend.map((val, idx) => {
                    const max = Math.max(...activeFeature.previewData.chartTrend);
                    const heightPercent = Math.max(15, (val / max) * 100);
                    return (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                        <span className="text-[10px] font-mono text-slate-400">{val}</span>
                        <div
                          className="w-full bg-gradient-to-t from-indigo-600 to-cyan-400 rounded-t-sm transition-all duration-500"
                          style={{ height: `${heightPercent}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span>Auto-failover enabled</span>
                <span>SOC2 Type II Protected</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
