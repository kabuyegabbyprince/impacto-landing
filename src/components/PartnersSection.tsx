import React from 'react';
import { ShieldCheck, CheckCircle2 } from 'lucide-react';

export const PartnersSection: React.FC = () => {
  const partners = [
    { name: 'Rwanda Development Board (RDB)', type: 'Regulatory Compliance' },
    { name: 'Rwanda Cooperative Agency (RCA)', type: 'Cooperative Standards' },
    { name: 'MTN Mobile Money Rwanda', type: 'Payment Integration' },
    { name: 'Airtel Money Rwanda', type: 'Digital Disbursements' },
  ];

  return (
    <div className="p-6 md:p-8 bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 rounded-3xl">
      <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800 mb-6">
        <div className="flex items-center gap-2 text-xs font-bold font-display uppercase tracking-wider text-slate-800 dark:text-slate-200">
          <ShieldCheck className="h-4 w-4 text-[#156c45] dark:text-emerald-400" />
          <span>Ecosystem Alignment & Compliance Partners</span>
        </div>
        <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 font-bold bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
          Verified Protocol
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {partners.map((partner) => (
          <div
            key={partner.name}
            className="p-4 bg-white dark:bg-slate-800/80 rounded-2xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between gap-2 shadow-3xs"
          >
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {partner.name}
              </span>
            </div>
            <span className="text-[10px] text-slate-500 font-medium">
              {partner.type}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
