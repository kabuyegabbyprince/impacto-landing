import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  Heart,
  Users,
  FileSpreadsheet,
  Vote,
  QrCode,
  Check,
  Sparkles,
} from 'lucide-react';

export const FeatureBentoGrid: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section
      id="capabilities"
      className="py-20 bg-slate-50/60 dark:bg-slate-900/90 border-t border-b border-gray-200/60 dark:border-slate-800/60 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/80 text-[11px] font-bold tracking-widest text-[#156c45] dark:text-emerald-400 uppercase font-mono shadow-3xs">
            <Sparkles className="h-3 w-3" />
            {t('landing.capabilities_badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold font-display text-gray-900 dark:text-white mt-3 tracking-tight">
            {t('landing.capabilities_title')}
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mt-2.5 leading-relaxed">
            {t('landing.capabilities_desc')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Feature 1: Branded Public Portals */}
          <div
            id="capability-card-portals"
            className="card-glow bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-80" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-[#156c45] dark:text-emerald-400 h-10 w-10 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-700/50">
                  <Check className="h-3 w-3" /> Free Forever Plan
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">
                {t('landing.card1_title')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                {t('landing.card1_desc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/50">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                /@slug Web Domain
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Donor Wall
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Public News
              </span>
            </div>
          </div>

          {/* Feature 2: Auditable Mobile Money Gates */}
          <div
            id="capability-card-momo"
            className="card-glow bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600 opacity-80" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-700 dark:text-emerald-400 h-10 w-10 flex items-center justify-center shrink-0">
                  <Heart className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-700/50">
                  <Check className="h-3 w-3" /> Free Forever Plan
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">
                {t('landing.card2_title')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                {t('landing.card2_desc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/50">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                MTN MoMo & Airtel
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Ref Code Matching
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Audited Slips
              </span>
            </div>
          </div>

          {/* Feature 3: Interactive Member Rosters */}
          <div
            id="capability-card-roster"
            className="card-glow bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-80" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-700 dark:text-emerald-400 h-10 w-10 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-700/50">
                  <Check className="h-3 w-3" /> Free Forever Plan
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">
                {t('landing.card3_title')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                {t('landing.card3_desc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/50">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Unlimited Directory
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Roles & Badges
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Offboarding Logs
              </span>
            </div>
          </div>

          {/* Feature 4: Branded Office & Letterhead Studio */}
          <div
            id="capability-card-office"
            className="card-glow bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600 opacity-80" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-700 dark:text-emerald-400 h-10 w-10 flex items-center justify-center shrink-0">
                  <FileSpreadsheet className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-700/50">
                  <Check className="h-3 w-3" /> Free Forever Plan
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">
                {t('landing.card4_title')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                {t('landing.card4_desc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/50">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Official Letterhead
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Member Mailings
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Excel & PDF Export
              </span>
            </div>
          </div>

          {/* Feature 5: Democratic Digital Voting & Quorum */}
          <div
            id="capability-card-voting"
            className="card-glow bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-500 opacity-80" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-emerald-700 dark:text-emerald-400 h-10 w-10 flex items-center justify-center shrink-0">
                  <Vote className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-700/50">
                  <Check className="h-3 w-3" /> Free Forever Plan
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">
                {t('landing.card5_title')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                {t('landing.card5_desc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/50">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Secret Ballots
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Quorum Verifier
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Audited Tallies
              </span>
            </div>
          </div>

          {/* Feature 6: Dynamic QR Attendance & Event Radar */}
          <div
            id="capability-card-attendance"
            className="card-glow bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 p-6 rounded-2xl flex flex-col justify-between gap-5 shadow-xs hover:shadow-md transition duration-200 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-emerald-600 opacity-80" />
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl text-[#156c45] dark:text-emerald-400 h-10 w-10 flex items-center justify-center shrink-0">
                  <QrCode className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-900/40 px-2 py-0.5 rounded-md border border-emerald-200/60 dark:border-emerald-700/50">
                  <Check className="h-3 w-3" /> Free Forever Plan
                </span>
              </div>
              <h3 className="font-bold text-gray-900 dark:text-white text-base font-display">
                {t('landing.card6_title')}
              </h3>
              <p className="text-xs text-gray-600 dark:text-slate-300 leading-relaxed mt-2">
                {t('landing.card6_desc')}
              </p>
            </div>
            <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100 dark:border-slate-700/50">
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Dynamic QR Gates
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Mobile Check-In
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                Real-Time Ledger
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
