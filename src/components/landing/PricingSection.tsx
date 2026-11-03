import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Check, ChevronDown, ChevronUp, Users, HardDrive, ArrowRight } from 'lucide-react';
import { Button } from '../ui';
import { useCurrencyStore } from '../../store/currencyStore';
import { PORTAL_LINKS } from '../../constants/links';

export const PricingSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { convertToRWF, formatAmount, activeCurrency } = useCurrencyStore();

  const isRw = i18n.language?.startsWith('rw');
  const isFr = i18n.language?.startsWith('fr');

  const [expandedPlans, setExpandedPlans] = useState<Record<string, boolean>>({
    free: false,
    growth: false,
    pro: false,
  });

  const togglePlanExpansion = (planId: string) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [planId]: !prev[planId],
    }));
  };

  return (
    <section
      id="pricing"
      className="py-24 bg-white dark:bg-slate-950 border-t border-slate-150 dark:border-slate-900 px-6"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="text-xs font-mono font-bold tracking-widest text-emerald-700 dark:text-emerald-400 uppercase">
            {t('landing.pricing_badge')}
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display mt-2 text-slate-950 dark:text-white tracking-tight">
            {t('landing.pricing_title')}
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 max-w-lg mx-auto leading-relaxed">
            {t('landing.pricing_desc')}
          </p>
        </div>

        {/* Modern Spacious Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch select-none">
          
          {/* ======================================================== */}
          {/* PLAN 1: FREE FOREVER                                     */}
          {/* ======================================================== */}
          <div className="bg-slate-50/50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 p-8 rounded-3xl flex flex-col justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300">
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                {isRw ? 'Plan y\'Ubuntu' : isFr ? 'Plan Gratuit' : 'Free Plan'}
              </h3>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">$0</span>
                <span className="text-xs font-medium text-slate-500">
                  {isRw ? '/ burundu' : isFr ? '/ pour toujours' : '/ forever'}
                </span>
              </div>
              
              <p className="text-xs text-slate-500 font-mono mt-1">
                {formatAmount(convertToRWF(0, 'RWF'), activeCurrency)} • Zero cost forever
              </p>

              {/* Limits info */}
              <div className="mt-6 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300 font-medium py-3 border-y border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Up to 30 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>100 MB storage</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Grassroots community groups and cooperatives testing basic coordination.
              </p>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white mb-4">
                  Included Features:
                </p>

                <ul className="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-3 font-normal">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Member Directory with role assignment (Admin, Member, Accountant).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Announcements news feed & broadcast communication.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Standard community chat channels for internal coordination.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Strategic Goals Tracker (view-only dashboard overview).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Event listings & basic member RSVPs.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Member Dues & fee invoicing schedules.</span>
                  </li>
                </ul>

                {expandedPlans.free && (
                  <ul className="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-3 mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-200 font-normal">
                    <li className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>MoMo & bank receipt upload for accountant verification.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Safe Read-Only Data Preservation (zero record deletion upon trial end).</span>
                    </li>
                  </ul>
                )}

                <button
                  type="button"
                  onClick={() => togglePlanExpansion('free')}
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition cursor-pointer select-none"
                >
                  {expandedPlans.free ? (
                    <>
                      <span>Hide additional features</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>+2 more features</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <a href={PORTAL_LINKS.SIGN_UP} className="mt-10">
              <Button variant="outline" className="w-full text-xs font-semibold py-3 rounded-xl">
                Get Started Free
              </Button>
            </a>
          </div>


          {/* ======================================================== */}
          {/* PLAN 2: GROWTH TIER                                      */}
          {/* ======================================================== */}
          <div className="bg-slate-50/50 dark:bg-slate-900/60 border-2 border-emerald-600 dark:border-emerald-500 p-8 rounded-3xl flex flex-col justify-between shadow-sm transition-all duration-300 relative">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white font-display">
                  {isRw ? 'Ifatabuguzi ry\'Iterambere' : isFr ? 'Plan Growth' : 'Growth Plan'}
                </h3>
                <span className="text-[10px] font-mono font-semibold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 px-2.5 py-1 rounded-full">
                  30-Day Free Trial
                </span>
              </div>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">$10</span>
                <span className="text-xs font-medium text-slate-500">
                  {isRw ? '/ ukwezi' : isFr ? '/ mois' : '/ month'}
                </span>
              </div>
              
              <p className="text-xs text-emerald-700 dark:text-emerald-400 font-mono mt-1 font-medium">
                {formatAmount(convertToRWF(10, 'USD'), activeCurrency)} • {formatAmount(convertToRWF(10, 'USD'), 'USD')}
              </p>

              {/* Limits info */}
              <div className="mt-6 flex items-center gap-6 text-xs text-slate-600 dark:text-slate-300 font-medium py-3 border-y border-slate-200/60 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>Up to 500 members</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>5 GB cloud storage</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-normal">
                Active local cooperatives, farmer groups, and growing associations.
              </p>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-slate-200/60 dark:border-slate-800">
                <p className="text-xs font-semibold text-slate-900 dark:text-white mb-4 flex items-center justify-between">
                  <span>All Free Features, Plus:</span>
                  <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-mono font-medium">+7 more</span>
                </p>

                <ul className="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-3 font-normal">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Event Attendance & Live Check-in with QR code scanners.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Excel Attendance & Member Dues Data Export (.xlsx / .csv).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Meeting Minutes Recorder with assigned action item tracking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Interactive Voice Notes & Live Polls in community channels.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Double-Entry Financial Accounting Ledger with category breakdown.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Document/Office Suite (Official Letterhead writer & sheets).</span>
                  </li>
                </ul>

                {expandedPlans.growth && (
                  <ul className="text-xs text-slate-600 dark:text-slate-300 flex flex-col gap-3 mt-3 pt-3 border-t border-dashed border-slate-200 dark:border-slate-800 animate-in fade-in duration-200 font-normal">
                    <li className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Real-Time Security & System Audit Logs for leadership accountability.</span>
                    </li>
                  </ul>
                )}

                <button
                  type="button"
                  onClick={() => togglePlanExpansion('growth')}
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 transition cursor-pointer select-none"
                >
                  {expandedPlans.growth ? (
                    <>
                      <span>Hide additional features</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>+1 more feature</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <a href={PORTAL_LINKS.SIGN_UP} className="mt-10">
              <Button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-semibold py-3 rounded-xl shadow-sm">
                Start 30-Day Free Trial
              </Button>
            </a>
          </div>


          {/* ======================================================== */}
          {/* PLAN 3: PRO TIER                                         */}
          {/* ======================================================== */}
          <div className="bg-[#0F172A] border border-slate-800 p-8 rounded-3xl flex flex-col justify-between text-white shadow-xl transition-all duration-300 relative">
            <div>
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white font-display">
                  {isRw ? 'Ifatabuguzi rya Pro' : isFr ? 'Licence Pro' : 'Pro Plan'}
                </h3>
                <span className="text-[10px] font-mono font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30 px-2.5 py-1 rounded-full">
                  Enterprise Velocity
                </span>
              </div>
              
              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-4xl font-extrabold text-white tracking-tight">$25</span>
                <span className="text-xs font-medium text-slate-400">
                  {isRw ? '/ ukwezi' : isFr ? '/ mois' : '/ month'}
                </span>
              </div>
              
              <p className="text-xs text-amber-400 font-mono mt-1 font-medium">
                {formatAmount(convertToRWF(25, 'USD'), activeCurrency)} • {formatAmount(convertToRWF(25, 'USD'), 'USD')}
              </p>

              {/* Limits info */}
              <div className="mt-6 flex items-center gap-6 text-xs text-slate-300 font-medium py-3 border-y border-slate-800">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Unlimited members</span>
                </div>
                <div className="flex items-center gap-2">
                  <HardDrive className="h-4 w-4 text-amber-400 shrink-0" />
                  <span>Unlimited storage</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-400 leading-relaxed font-normal">
                Large unions, agricultural federations, institutions, and high-scale NGOs.
              </p>

              {/* Features */}
              <div className="mt-6 pt-6 border-t border-slate-800">
                <p className="text-xs font-semibold text-slate-200 mb-4 flex items-center justify-between">
                  <span>All Growth Features, Plus:</span>
                  <span className="text-[10px] text-amber-400 font-mono font-medium">+7 more</span>
                </p>

                <ul className="text-xs text-slate-300 flex flex-col gap-3 font-normal">
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Automated Certificate Generation & Public Verification Portal.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Hardware, Equipment & Asset Inventory Tracker with depreciation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Advanced Financial Ledger Reports & interactive charts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Mobile Money Live Gateway (Direct MTN & Airtel MoMo push prompts).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Public Cooperative Marketplace & Storefront showcase.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                    <span>Full Audit Trail Dossiers (CSV & JSON export, multi-tenant compliance).</span>
                  </li>
                </ul>

                {expandedPlans.pro && (
                  <ul className="text-xs text-slate-300 flex flex-col gap-3 mt-3 pt-3 border-t border-dashed border-slate-800 animate-in fade-in duration-200 font-normal">
                    <li className="flex items-start gap-2.5">
                      <Check className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>End-to-End Encryption & 24/7 Priority Hotline Support.</span>
                    </li>
                  </ul>
                )}

                <button
                  type="button"
                  onClick={() => togglePlanExpansion('pro')}
                  className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition cursor-pointer select-none"
                >
                  {expandedPlans.pro ? (
                    <>
                      <span>Hide additional features</span>
                      <ChevronUp className="h-3.5 w-3.5" />
                    </>
                  ) : (
                    <>
                      <span>+1 more feature</span>
                      <ChevronDown className="h-3.5 w-3.5" />
                    </>
                  )}
                </button>
              </div>
            </div>

            <a href={PORTAL_LINKS.SIGN_UP} className="mt-10">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold py-3 rounded-xl shadow-md flex items-center justify-center gap-1.5">
                <span>Get Pro Plan</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};
