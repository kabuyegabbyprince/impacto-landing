import React, { useState } from 'react';
import { Sliders, RefreshCw, Check, Sparkles, ArrowRight, Smartphone, Monitor } from 'lucide-react';

interface InteractiveLiveDemoProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const InteractiveLiveDemo: React.FC<InteractiveLiveDemoProps> = ({ onOpenDemoModal }) => {
  const [headlineStyle, setHeadlineStyle] = useState<'direct' | 'benefit' | 'social'>('benefit');
  const [accentTheme, setAccentTheme] = useState<'indigo' | 'emerald' | 'cyan' | 'rose'>('indigo');
  const [ctaCopy, setCtaCopy] = useState<'trial' | 'demo' | 'instant'>('trial');
  const [deviceView, setDeviceView] = useState<'desktop' | 'mobile'>('desktop');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulatedScore, setSimulatedScore] = useState(94);

  const headlineOptions = {
    benefit: 'Double Your Inbound Pipeline Without Adding Ad Spend',
    direct: 'The Fastest Modern Landing Experience for B2B Teams',
    social: 'Join 1,200+ Enterprise Leaders Scaling With Impacto',
  };

  const ctaOptions = {
    trial: 'Start Free 14-Day Trial',
    demo: 'Schedule VIP Product Tour',
    instant: 'Unlock Instant Access',
  };

  const themeColors = {
    indigo: {
      btn: 'bg-indigo-600 hover:bg-indigo-500 text-white',
      badge: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
      accentText: 'text-indigo-400',
      glow: 'from-indigo-600/30 to-purple-600/10',
    },
    emerald: {
      btn: 'bg-emerald-600 hover:bg-emerald-500 text-white',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      accentText: 'text-emerald-400',
      glow: 'from-emerald-600/30 to-teal-600/10',
    },
    cyan: {
      btn: 'bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold',
      badge: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/20',
      accentText: 'text-cyan-400',
      glow: 'from-cyan-600/30 to-blue-600/10',
    },
    rose: {
      btn: 'bg-rose-600 hover:bg-rose-500 text-white',
      badge: 'bg-rose-500/10 text-rose-300 border-rose-500/20',
      accentText: 'text-rose-400',
      glow: 'from-rose-600/30 to-orange-600/10',
    },
  };

  const runLiveAIPrediction = () => {
    setIsSimulating(true);
    setTimeout(() => {
      // Calculate simulated score based on combination
      let score = 88;
      if (headlineStyle === 'benefit') score += 5;
      if (ctaCopy === 'trial') score += 4;
      if (accentTheme === 'indigo' || accentTheme === 'cyan') score += 2;
      setSimulatedScore(score);
      setIsSimulating(false);
    }, 500);
  };

  return (
    <section id="interactive-demo" className="py-20 md:py-28 bg-slate-950 border-t border-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold uppercase tracking-wider">
            <Sliders className="w-3.5 h-3.5" />
            Interactive Funnel Studio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display text-white tracking-tight">
            Test Real-Time Funnel Dynamics
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Customize copy variations, visual themes, and viewport modes to test how Impacto adapts instantly to visitor cohorts.
          </p>
        </div>

        {/* Studio Workspace */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Editor Sidebar */}
          <div className="lg:col-span-4 p-6 bg-slate-900/80 border border-slate-800 rounded-2xl shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-sm font-bold text-white flex items-center gap-2">
                <Sliders className="w-4 h-4 text-indigo-400" />
                Funnel Parameter Controls
              </span>
              <button
                type="button"
                onClick={runLiveAIPrediction}
                disabled={isSimulating}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-medium flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className={`w-3 h-3 ${isSimulating ? 'animate-spin' : ''}`} />
                Recalculate
              </button>
            </div>

            {/* Headline Variant Picker */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Hero Headline Intent
              </label>
              <div className="space-y-1.5">
                {[
                  { id: 'benefit', label: 'Benefit-Driven', desc: 'Focuses on pipeline multiplier' },
                  { id: 'direct', label: 'Direct Product', desc: 'Focuses on B2B speed & stack' },
                  { id: 'social', label: 'Social Proof', desc: 'Focuses on 1,200+ companies' },
                ].map((option) => (
                  <button
                    key={option.id}
                    id={`demo-headline-${option.id}`}
                    type="button"
                    onClick={() => {
                      setHeadlineStyle(option.id as any);
                      runLiveAIPrediction();
                    }}
                    className={`w-full p-2.5 rounded-lg text-left text-xs transition-all flex items-center justify-between ${
                      headlineStyle === option.id
                        ? 'bg-indigo-600/20 border border-indigo-500 text-white font-medium'
                        : 'bg-slate-950/60 border border-slate-800/80 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{option.label}</div>
                      <div className="text-[11px] text-slate-400">{option.desc}</div>
                    </div>
                    {headlineStyle === option.id && <Check className="w-4 h-4 text-indigo-400" />}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA Micro-Copy */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Primary Call-to-Action
              </label>
              <div className="grid grid-cols-1 gap-1.5">
                {[
                  { id: 'trial', label: '14-Day Free Trial' },
                  { id: 'demo', label: 'VIP Product Tour' },
                  { id: 'instant', label: 'Instant Access' },
                ].map((cta) => (
                  <button
                    key={cta.id}
                    id={`demo-cta-${cta.id}`}
                    type="button"
                    onClick={() => {
                      setCtaCopy(cta.id as any);
                      runLiveAIPrediction();
                    }}
                    className={`p-2 rounded-lg text-xs text-left transition-all ${
                      ctaCopy === cta.id
                        ? 'bg-slate-800 border border-indigo-400 text-indigo-300 font-semibold'
                        : 'bg-slate-950/50 border border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {cta.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Color Selector */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Accent Aura Theme
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[
                  { id: 'indigo', bg: 'bg-indigo-500', name: 'Indigo' },
                  { id: 'cyan', bg: 'bg-cyan-500', name: 'Cyan' },
                  { id: 'emerald', bg: 'bg-emerald-500', name: 'Emerald' },
                  { id: 'rose', bg: 'bg-rose-500', name: 'Rose' },
                ].map((color) => (
                  <button
                    key={color.id}
                    id={`demo-theme-${color.id}`}
                    type="button"
                    onClick={() => {
                      setAccentTheme(color.id as any);
                      runLiveAIPrediction();
                    }}
                    className={`h-9 rounded-lg flex items-center justify-center transition-all ${color.bg} ${
                      accentTheme === color.id
                        ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900 scale-105'
                        : 'opacity-70 hover:opacity-100'
                    }`}
                    title={color.name}
                  >
                    {accentTheme === color.id && <Check className="w-4 h-4 text-white drop-shadow" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Score Output */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-slate-800 space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-400">
                <span>Predicted Conversion Strength</span>
                <span className="font-mono font-bold text-emerald-400">{simulatedScore}/100</span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 transition-all duration-500"
                  style={{ width: `${simulatedScore}%` }}
                />
              </div>
              <div className="text-[10px] text-slate-500 pt-1">
                Top 5% quartile for B2B SaaS landing benchmarks.
              </div>
            </div>
          </div>

          {/* Live Interactive Preview Canvas */}
          <div className="lg:col-span-8 space-y-4">
            {/* Viewport bar */}
            <div className="flex items-center justify-between bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium text-slate-300">Live Stage Preview</span>
              </div>

              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800">
                <button
                  id="preview-mode-desktop"
                  type="button"
                  onClick={() => setDeviceView('desktop')}
                  className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                    deviceView === 'desktop'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Desktop</span>
                </button>
                <button
                  id="preview-mode-mobile"
                  type="button"
                  onClick={() => setDeviceView('mobile')}
                  className={`p-1.5 rounded flex items-center gap-1 transition-all ${
                    deviceView === 'mobile'
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span className="text-[11px] hidden sm:inline">Mobile</span>
                </button>
              </div>
            </div>

            {/* Simulated Device Frame */}
            <div
              className={`mx-auto transition-all duration-300 ${
                deviceView === 'mobile' ? 'max-w-sm' : 'w-full'
              }`}
            >
              <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-2xl p-6 sm:p-10 relative">
                {/* Background Glow */}
                <div
                  className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${themeColors[accentTheme].glow} blur-3xl pointer-events-none rounded-full`}
                />

                <div className="space-y-6 relative z-10 text-center max-w-lg mx-auto">
                  <div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${themeColors[accentTheme].badge}`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Dynamic Live Variant Active</span>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white leading-tight">
                    {headlineOptions[headlineStyle]}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300">
                    Engineered with sub-50ms smart caching, automatic micro-copy tuning, and built-in conversion attribution.
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      id="preview-interactive-cta-btn"
                      type="button"
                      onClick={() => onOpenDemoModal('growth')}
                      className={`w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold shadow-lg transition-transform active:scale-95 cursor-pointer ${themeColors[accentTheme].btn}`}
                    >
                      {ctaOptions[ctaCopy]}
                    </button>
                    <button
                      type="button"
                      onClick={() => alert('Feature tour initialized! You can customize every section dynamically.')}
                      className="w-full sm:w-auto px-4 py-3 rounded-xl text-sm text-slate-300 bg-slate-900 border border-slate-800 hover:bg-slate-800 transition-colors"
                    >
                      View Live Metrics
                    </button>
                  </div>

                  {/* Micro proof badges */}
                  <div className="pt-4 border-t border-slate-800/80 flex items-center justify-center gap-6 text-[11px] text-slate-400">
                    <span>⚡ 38ms Edge Speed</span>
                    <span>🔒 SOC2 Compliant</span>
                    <span>📈 +48% Lift</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-slate-900/50 border border-slate-800">
              <span className="text-xs text-slate-300">
                Want to deploy these adaptive personalization presets directly to your domain?
              </span>
              <button
                id="demo-export-preset-btn"
                type="button"
                onClick={() => onOpenDemoModal('growth')}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-colors whitespace-nowrap cursor-pointer"
              >
                <span>Export & Deploy Template</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
