import React, { useState } from 'react';
import { X, CheckCircle2, Sparkles, Send, Shield } from 'lucide-react';
import { PRICING_PLANS } from '../data/landingData';

interface LeadCaptureModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlanId?: string;
}

export const LeadCaptureModal: React.FC<LeadCaptureModalProps> = ({
  isOpen,
  onClose,
  selectedPlanId,
}) => {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [monthlyTraffic, setMonthlyTraffic] = useState('50k-250k');
  const [interestGoal, setInterestGoal] = useState('boost-conversions');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const currentPlan = PRICING_PLANS.find((p) => p.id === selectedPlanId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden p-6 sm:p-8">
        {/* Close Button */}
        <button
          id="modal-close-btn"
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-indigo-400">
                <Sparkles className="w-3.5 h-3.5" />
                {currentPlan ? `Selected: ${currentPlan.name} Plan` : 'Impacto Growth Suite'}
              </div>
              <h3 className="text-2xl font-bold font-display text-white">
                Launch Your High-Impact Funnel
              </h3>
              <p className="text-xs sm:text-sm text-slate-400">
                Fill out the quick details below for instant sandbox access and an automated funnel audit.
              </p>
            </div>

            <form id="lead-capture-form" onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Your Full Name</label>
                  <input
                    id="lead-input-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Jane Doe"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Work Email</label>
                  <input
                    id="lead-input-email"
                    type="email"
                    required
                    value={workEmail}
                    onChange={(e) => setWorkEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Company Name</label>
                  <input
                    id="lead-input-company"
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Acme Inc."
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-medium text-slate-300">Estimated Monthly Traffic</label>
                  <select
                    id="lead-select-traffic"
                    value={monthlyTraffic}
                    onChange={(e) => setMonthlyTraffic(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                  >
                    <option value="under-50k">&lt; 50,000 visitors</option>
                    <option value="50k-250k">50,000 - 250,000 visitors</option>
                    <option value="250k-1m">250,000 - 1,000,000 visitors</option>
                    <option value="1m-plus">1,000,000+ visitors (Enterprise)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-slate-300">Primary Objective</label>
                <select
                  id="lead-select-goal"
                  value={interestGoal}
                  onChange={(e) => setInterestGoal(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
                >
                  <option value="boost-conversions">Increase Landing Page Conversion Rate</option>
                  <option value="speed-performance">Accelerate Edge Load Speed & Core Web Vitals</option>
                  <option value="autonomous-ab">Autonomous A/B & Multivariate Personalization</option>
                  <option value="crm-orchestration">Automate Lead Capture & CRM Routing</option>
                </select>
              </div>

              <div className="pt-2">
                <button
                  id="lead-submit-btn"
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Start Free Trial & Request Audit</span>
                </button>
              </div>

              <div className="flex items-center justify-center gap-4 text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Shield className="w-3 h-3 text-emerald-400" />
                  No credit card required
                </span>
                <span>•</span>
                <span>Cancel anytime</span>
                <span>•</span>
                <span>SOC2 Compliant</span>
              </div>
            </form>
          </div>
        ) : (
          <div className="text-center py-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-white">
                Welcome Aboard, {fullName.split(' ')[0] || 'Friend'}!
              </h3>
              <p className="text-sm text-slate-300 max-w-sm mx-auto">
                We've provisioned your staging sandbox. A verification link and your automated funnel audit report have been sent to <span className="text-indigo-400 font-medium">{workEmail}</span>.
              </p>
            </div>

            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-left text-xs space-y-2">
              <div className="font-semibold text-slate-200">Next Steps:</div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Sandbox workspace provisioned on European Edge Node</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Pre-configured template: {currentPlan?.name || 'Growth Suite'}</span>
              </div>
            </div>

            <button
              id="modal-finish-btn"
              type="button"
              onClick={handleReset}
              className="w-full py-3 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-sm rounded-xl border border-slate-700 transition-colors"
            >
              Continue Exploring Impacto
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
