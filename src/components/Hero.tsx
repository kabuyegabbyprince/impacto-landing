import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Sparkles, Zap, Play, TrendingUp, BarChart3 } from 'lucide-react';
import { TRUSTED_COMPANIES, CORE_METRICS } from '../data/landingData';

interface HeroProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenDemoModal }) => {
  const [emailInput, setEmailInput] = useState('');
  const [activeSpeedMode, setActiveSpeedMode] = useState<'standard' | 'impacto'>('impacto');
  const [benchmarkResult, setBenchmarkResult] = useState<string | null>(null);

  const handleInstantLaunch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      alert('Please enter a valid work email address.');
      return;
    }
    onOpenDemoModal('starter');
  };

  const handleRunSpeedBenchmark = () => {
    setBenchmarkResult('Testing global edge latency...');
    setTimeout(() => {
      setBenchmarkResult('Latency: 38ms (Impacto Edge) vs 1,420ms (Legacy Stack) — 37x Faster!');
    }, 600);
  };

  return (
    <section
      id="hero-section"
      className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"
    >
      {/* Background Glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-indigo-500/15 blur-[130px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/4 w-[300px] h-[250px] bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Announcement Pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-indigo-500/30 text-indigo-300 text-xs sm:text-sm font-medium shadow-inner shadow-indigo-500/10 hover:border-indigo-500/50 transition-colors">
            <Sparkles className="w-4 h-4 text-indigo-400" />
            <span>Impacto Engine 2.4 is Live</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Autonomous Funnel Optimization</span>
            <ArrowRight className="w-3.5 h-3.5 text-indigo-400" />
          </div>

          {/* Main Hero Headline */}
          <h1
            id="hero-main-title"
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]"
          >
            Turn Every Visitor Into <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-200 bg-clip-text text-transparent">
              High-Value Customers
            </span>
          </h1>

          {/* Subtitle */}
          <p
            id="hero-subtitle"
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed"
          >
            Deploy ultra-fast, intelligent landing funnels with autonomous multivariate optimization, sub-50ms edge delivery, and verified 3.4x conversion uplift.
          </p>

          {/* Quick Lead Action Form */}
          <div className="pt-2 max-w-md mx-auto">
            <form
              id="hero-quick-signup-form"
              onSubmit={handleInstantLaunch}
              className="flex flex-col sm:flex-row items-center gap-2 p-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl shadow-2xl shadow-black/60 focus-within:border-indigo-500 transition-all"
            >
              <input
                id="hero-email-input"
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="Enter your work email..."
                required
                className="w-full sm:flex-1 bg-transparent px-3.5 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none"
              />
              <button
                id="hero-submit-cta-btn"
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-lg shadow-md shadow-indigo-600/30 flex items-center justify-center gap-2 whitespace-nowrap transition-colors cursor-pointer"
              >
                <span>Get Started Free</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 mt-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                14-day full feature trial
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Ready in 5 minutes
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Hero Visual Showcase Card */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="relative rounded-2xl p-1 bg-gradient-to-b from-indigo-500/30 via-slate-800 to-slate-900/40 shadow-2xl shadow-indigo-950/50">
            <div className="rounded-[14px] bg-slate-950 p-4 sm:p-6 lg:p-8 border border-slate-800/80">
              {/* Header Bar of the Mock Dashboard */}
              <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400 font-medium">
                    impacto://app.production.live-funnel
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-400 mr-1 hidden sm:inline">Engine Mode:</span>
                  <div className="flex bg-slate-900 p-1 rounded-lg border border-slate-800">
                    <button
                      id="hero-toggle-standard"
                      type="button"
                      onClick={() => setActiveSpeedMode('standard')}
                      className={`px-3 py-1 text-xs rounded font-medium transition-all ${
                        activeSpeedMode === 'standard'
                          ? 'bg-slate-800 text-slate-300'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      Legacy Stack
                    </button>
                    <button
                      id="hero-toggle-impacto"
                      type="button"
                      onClick={() => setActiveSpeedMode('impacto')}
                      className={`px-3 py-1 text-xs rounded font-semibold transition-all flex items-center gap-1 ${
                        activeSpeedMode === 'impacto'
                          ? 'bg-indigo-600 text-white shadow-sm'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      <Zap className="w-3 h-3" />
                      Impacto Edge
                    </button>
                  </div>
                </div>
              </div>

              {/* Dynamic Interactive Dashboard Preview */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mt-6">
                {/* Metric 1 */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Active Conversion Rate</span>
                    <span className="text-emerald-400 font-medium flex items-center gap-0.5">
                      <TrendingUp className="w-3.5 h-3.5" />
                      {activeSpeedMode === 'impacto' ? '+48.2%' : '+1.4%'}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {activeSpeedMode === 'impacto' ? '6.84%' : '2.10%'}
                  </div>
                  <div className="mt-3 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full transition-all duration-700 ${
                        activeSpeedMode === 'impacto' ? 'w-[78%] bg-indigo-500' : 'w-[25%] bg-slate-600'
                      }`}
                    />
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    {activeSpeedMode === 'impacto' ? 'Adaptive Bandits Running' : 'Static template (no AI)'}
                  </div>
                </div>

                {/* Metric 2 */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Edge TTFB Latency</span>
                    <span className="text-cyan-400 font-mono text-[11px]">
                      {activeSpeedMode === 'impacto' ? '99.8% Cached' : 'No Global Cache'}
                    </span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {activeSpeedMode === 'impacto' ? '38ms' : '1,420ms'}
                  </div>
                  <div className="mt-3 flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        activeSpeedMode === 'impacto' ? 'bg-emerald-400' : 'bg-rose-500'
                      }`}
                    />
                    <span className="text-[11px] text-slate-400">
                      {activeSpeedMode === 'impacto' ? 'Global 24-region Anycast' : 'Single origin server'}
                    </span>
                  </div>
                  <div className="mt-2 text-[11px] text-slate-500">Core Web Vitals: 100/100</div>
                </div>

                {/* Metric 3 */}
                <div className="p-4 rounded-xl bg-slate-900/70 border border-slate-800/80">
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                    <span>Monthly Pipeline Value</span>
                    <span className="text-indigo-400 text-[11px] font-mono">Real-Time Sync</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-bold font-display text-white">
                    {activeSpeedMode === 'impacto' ? '$428,500' : '$132,000'}
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                    <span>Attributed MQLs:</span>
                    <span className="font-semibold text-slate-200">
                      {activeSpeedMode === 'impacto' ? '642 Leads' : '198 Leads'}
                    </span>
                  </div>
                  <div className="text-[11px] text-emerald-400 mt-2 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Automatic CRM Qualification Active
                  </div>
                </div>
              </div>

              {/* Bottom Interactive Benchmarking Bar */}
              <div className="mt-6 pt-5 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <BarChart3 className="w-4 h-4 text-indigo-400" />
                  <span>
                    {benchmarkResult || 'Live latency & optimization telemetry benchmark simulator'}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="hero-run-benchmark-btn"
                    type="button"
                    onClick={handleRunSpeedBenchmark}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-200 rounded-lg border border-slate-700 transition-colors flex items-center gap-1.5"
                  >
                    <Play className="w-3 h-3 text-cyan-400" />
                    Run Live Benchmark
                  </button>

                  <button
                    id="hero-explore-demo-btn"
                    type="button"
                    onClick={() => onOpenDemoModal('growth')}
                    className="px-3.5 py-1.5 bg-indigo-600/90 hover:bg-indigo-600 text-xs font-semibold text-white rounded-lg transition-colors flex items-center gap-1"
                  >
                    Deploy This Template
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Key Metrics Strip */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 pt-10 border-t border-slate-800/60 max-w-5xl mx-auto">
          {CORE_METRICS.map((metric) => (
            <div key={metric.label} className="text-center space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold font-display bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {metric.value}
              </div>
              <div className="text-sm font-semibold text-slate-200">{metric.label}</div>
              <div className="text-xs text-slate-500">{metric.detail}</div>
            </div>
          ))}
        </div>

        {/* Trusted By Strip */}
        <div className="mt-16 text-center">
          <p className="text-xs uppercase tracking-widest text-slate-400 font-semibold mb-6">
            Trusted by modern high-growth teams and innovative enterprises
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-80 hover:opacity-100 transition-opacity">
            {TRUSTED_COMPANIES.map((company) => (
              <div
                key={company.name}
                className="flex items-center gap-2 text-slate-400 hover:text-slate-200 text-sm sm:text-base font-semibold transition-colors"
              >
                <span>{company.symbol}</span>
                <span className="font-normal text-xs text-slate-500 hidden sm:inline">| {company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
