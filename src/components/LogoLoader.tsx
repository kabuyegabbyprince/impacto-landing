import React from 'react';

interface LogoLoaderProps {
  message?: string;
  subMessage?: string;
}

export const LogoLoader: React.FC<LogoLoaderProps> = ({
  message = 'Loading Impacto...',
  subMessage = 'Connecting to verified cooperative ledger...',
}) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 text-center select-none">
      <div className="relative flex items-center justify-center">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 dark:bg-emerald-400/10 border border-emerald-500/30 flex items-center justify-center shadow-lg animate-pulse">
          <svg className="h-9 w-9 text-[#156c45] dark:text-emerald-400" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="35" r="25" stroke="currentColor" strokeWidth="8" />
            <circle cx="35" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
            <circle cx="65" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
            <polygon points="53,48 47,48 50,42" fill="#F59E0B" />
          </svg>
        </div>
        <div className="absolute inset-0 rounded-3xl border-2 border-emerald-500/30 border-t-emerald-600 animate-spin" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display font-bold text-sm md:text-base text-slate-900 dark:text-white">
          {message}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
          {subMessage}
        </p>
      </div>
    </div>
  );
};
