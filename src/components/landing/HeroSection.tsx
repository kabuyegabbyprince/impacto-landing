import React from 'react';
import { useTranslation } from 'react-i18next';
import { Search } from 'lucide-react';
import { Button } from '../ui';
import { PORTAL_LINKS } from '../../constants/links';

export const HeroSection: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="pt-36 pb-20 px-6 max-w-5xl mx-auto text-center flex flex-col items-center relative overflow-hidden">
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[550px] h-[250px] bg-emerald-500/10 dark:bg-emerald-400/5 blur-[100px] pointer-events-none rounded-full" />

      <h1 className="text-4xl md:text-5xl font-black tracking-tight text-gray-900 dark:text-white font-display mt-2 max-w-4xl leading-tight uppercase">
        {t('landing.title')}
      </h1>

      <p className="text-sm md:text-base text-gray-500 dark:text-slate-400 mt-4 max-w-2xl leading-normal">
        {t('landing.tagline')}
      </p>

      <div className="flex gap-4 mt-8 shrink-0">
        <a href="#discovery">
          <Button
            variant="primary"
            size="lg"
            className="bg-emerald-700 hover:bg-emerald-800 text-white"
            icon={<Search className="h-4 w-4" />}
          >
            {t('landing.cta_discover')}
          </Button>
        </a>
        <a href={PORTAL_LINKS.SIGN_UP}>
          <Button variant="outline" size="lg">
            {t('landing.cta_start')}
          </Button>
        </a>
      </div>

      {/* Highlight Tickers */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mt-16 pt-10 border-t border-gray-200/60 dark:border-slate-800/80 w-full text-center">
        <div className="flex flex-col">
          <span className="text-2xl font-black text-gray-900 dark:text-white">Hundreds</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            {t('landing.ticker_in_use')}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-gray-900 dark:text-white">100%</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            {t('landing.ticker_momo')}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-gray-900 dark:text-white">RWF 15M+</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            {t('landing.ticker_donations')}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-2xl font-black text-gray-900 dark:text-white">Active</span>
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mt-1">
            {t('landing.ticker_active')}
          </span>
        </div>
      </div>
    </section>
  );
};
