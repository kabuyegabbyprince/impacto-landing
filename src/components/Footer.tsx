import React, { useState } from 'react';
import { Zap, Send, CheckCircle2, Shield } from 'lucide-react';

interface FooterProps {
  onOpenDemoModal: (plan?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenDemoModal }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
    }
  };

  return (
    <footer id="main-footer" className="bg-slate-950 border-t border-slate-900 pt-16 pb-12 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Newsletter & Pre-Footer Action */}
        <div className="p-8 sm:p-10 rounded-2xl bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          <div className="space-y-2 max-w-xl text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-white">
              Ready to Accelerate Your Funnel?
            </h3>
            <p className="text-sm text-slate-300">
              Join thousands of growth teams capturing higher conversion rates today. Free 14-day trial with full feature access.
            </p>
          </div>

          <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
            <button
              id="footer-launch-trial-btn"
              onClick={() => onOpenDemoModal('growth')}
              className="w-full sm:w-auto px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all cursor-pointer whitespace-nowrap"
            >
              Start Free Trial
            </button>
            <button
              id="footer-schedule-demo-btn"
              onClick={() => onOpenDemoModal()}
              className="w-full sm:w-auto px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-semibold text-sm rounded-xl transition-all cursor-pointer whitespace-nowrap"
            >
              Schedule Live Tour
            </button>
          </div>
        </div>

        {/* 4 Column Directory */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center">
                <Zap className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold font-display text-white">Impacto</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              The high-conversion landing engine engineered for forward-thinking B2B SaaS, e-commerce, and high-growth technology enterprises.
            </p>

            {/* Newsletter */}
            <div className="pt-2 space-y-2">
              <div className="text-xs font-semibold text-slate-300">Subscribe to Conversion Insights:</div>
              {!newsletterSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
                  <input
                    id="newsletter-email-input"
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Enter email..."
                    className="flex-1 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                  />
                  <button
                    id="newsletter-submit-btn"
                    type="submit"
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium border border-slate-700 transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              ) : (
                <div className="text-xs text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Subscribed! Check your inbox for weekly funnel teardowns.</span>
                </div>
              )}
            </div>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Product</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-white transition-colors">Autonomous Engine</a></li>
              <li><a href="#interactive-demo" className="hover:text-white transition-colors">Live Funnel Sandbox</a></li>
              <li><a href="#roi-calculator" className="hover:text-white transition-colors">ROI Calculator</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">Global Edge Network</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Pricing & Plans</a></li>
            </ul>
          </div>

          {/* Solutions Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Solutions</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#case-studies" className="hover:text-white transition-colors">B2B SaaS Growth</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">Fintech Acquisition</a></li>
              <li><a href="#case-studies" className="hover:text-white transition-colors">Enterprise Marketing</a></li>
              <li><a href="#features" className="hover:text-white transition-colors">CRM Automation</a></li>
              <li><a href="#faq" className="hover:text-white transition-colors">Security & SOC2</a></li>
            </ul>
          </div>

          {/* Resources & Legal */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-200">Resources</h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#faq" className="hover:text-white transition-colors">Knowledge Base & FAQ</a></li>
              <li><a href="#testimonials" className="hover:text-white transition-colors">Customer Stories</a></li>
              <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
              <li><a href="#" className="hover:text-white transition-colors">System Status (99.99%)</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Impacto Suite (kabuyegabbyprince/impacto-landing). All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1">
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              SOC2 Type II Certified
            </span>
            <span>GDPR & CCPA Compliant</span>
            <span>Edge Hosted</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
