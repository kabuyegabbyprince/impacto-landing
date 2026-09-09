import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';
import { Button } from '../ui';
import { useCurrencyStore } from '../../store/currencyStore';
import { PORTAL_LINKS } from '../../constants/links';

export const PricingSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { convertToRWF, formatAmount, activeCurrency } = useCurrencyStore();

  const isRw = i18n.language?.startsWith('rw');
  const isFr = i18n.language?.startsWith('fr');

  return (
    <section
      id="pricing"
      className="py-20 bg-gray-50/55 dark:bg-slate-950 border-t border-gray-150 dark:border-slate-900 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-mono tracking-widest text-[#15803D] uppercase block font-bold">
            {t('landing.pricing_badge')}
          </span>
          <h2 className="text-2xl md:text-3xl font-bold font-display mt-1 text-gray-950 dark:text-white">
            {t('landing.pricing_title')}
          </h2>
          <p className="text-xs text-gray-500 mt-2 max-w-md mx-auto">
            {t('landing.pricing_desc')}
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 select-none">
          {/* 1. Free Forever */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-600 transition">
            <div>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                {isRw ? 'Ubuntu' : isFr ? 'Gratuit pour toujours' : 'Free Forever'}
              </span>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mt-1">
                {isRw ? 'Plan y\'Ubuntu' : isFr ? 'Plan Gratuit' : 'Free Forever Plan'}
              </h3>
              <p className="text-2xl font-black text-slate-950 dark:text-white mt-3">
                {formatAmount(convertToRWF(0, 'RWF'), 'USD')}
                <span className="text-xs font-semibold text-gray-400">
                  {isRw ? ' / burundu' : isFr ? ' / pour toujours' : ' / forever'}
                </span>
              </p>
              <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                {formatAmount(convertToRWF(0, 'RWF'), activeCurrency)}
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
                <p className="text-xs font-bold text-gray-800 dark:text-slate-200">
                  {isRw ? 'Ibikubiyemo:' : isFr ? 'Comprend :' : 'Includes:'}
                </p>
                <ul className="text-[11px] text-slate-500 flex flex-col gap-2 mt-2 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Kugeza ku banyamuryango 30' : isFr ? 'Jusqu\'à 30 membres' : 'Up to 30 active members'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Gucunga umuryango bwite' : isFr ? 'Gestion basique' : 'Basic directory & chat'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Ubushobozi bw\'ibanze (100MB)' : isFr ? 'Stockage 100 Mo' : '100MB storage cap'}
                  </li>
                </ul>
              </div>
            </div>
            <a href={PORTAL_LINKS.SIGN_UP} className="mt-8">
              <Button variant="outline" className="w-full text-xs font-bold py-2">
                {isRw ? 'Tangira Ubuntu' : isFr ? 'Démarrer Gratuitement' : 'Get Started Free'}
              </Button>
            </a>
          </div>

          {/* 2. Starter */}
          <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 p-6 rounded-2xl flex flex-col justify-between hover:border-emerald-600 transition">
            <div>
              <span className="text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest block font-bold">
                {isRw ? 'Ihuriro rito ry\'Abaturage' : isFr ? 'Rassemblement Local' : 'Local Grassroots'}
              </span>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mt-1">
                {isRw ? 'Ifatabuguzi ry\'Imberabutsa' : isFr ? 'Formule Starter' : 'Starter Plan'}
              </h3>
              <p className="text-2xl font-black text-slate-950 dark:text-white mt-3">
                {formatAmount(convertToRWF(10, 'USD'), 'USD')}
                <span className="text-xs font-semibold text-gray-400">
                  {isRw ? ' / ukwezi' : isFr ? ' / mois' : ' / mo'}
                </span>
              </p>
              <p className="text-[10px] text-emerald-600 font-semibold font-mono mt-0.5">
                {formatAmount(convertToRWF(10, 'USD'), activeCurrency)}
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
                <p className="text-xs font-bold text-gray-800 dark:text-slate-200">
                  {isRw ? 'Ibikubiyemo:' : isFr ? 'Comprend :' : 'Includes:'}
                </p>
                <ul className="text-[11px] text-slate-500 flex flex-col gap-2 mt-2 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Kugeza ku banyamuryango 100' : isFr ? 'Jusqu\'à 100 membres' : 'Up to 100 members'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Igitabo cy\'imari n\'ibikorwa' : isFr ? 'Grand livre local & événements' : 'Local ledger & events'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? '1 GB y\'ubushiko' : isFr ? 'Stockage 1 Go' : '1 GB storage cap'}
                  </li>
                </ul>
              </div>
            </div>
            <a href={PORTAL_LINKS.SIGN_UP} className="mt-8">
              <Button variant="outline" className="w-full text-xs font-bold py-2">
                {isRw ? 'Tangiza Plan' : isFr ? 'Lancer Starter' : 'Launch Starter'}
              </Button>
            </a>
          </div>

          {/* 3. Growth */}
          <div className="bg-white dark:bg-slate-900 border-2 border-[#15803D] p-6 rounded-2xl relative flex flex-col justify-between shadow-sm">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#15803D] text-white px-3 py-0.5 text-[8px] uppercase font-bold tracking-widest rounded-full">
              {isRw ? 'Icyerekezo Cyiza' : isFr ? 'Hautement Recommandé' : 'Highly Recommended'}
            </span>
            <div>
              <span className="text-[9px] font-bold text-[#15803D] uppercase tracking-widest block font-bold">
                {isRw ? 'Umuryango Uri Gukura' : isFr ? 'Organisation en Croissance' : 'Scaling Organization'}
              </span>
              <h3 className="text-base font-extrabold text-gray-900 dark:text-white mt-1">
                {isRw ? 'Ifatabuguzi ry\'Iterambere' : isFr ? 'Formule Growth' : 'Growth Plan'}
              </h3>
              <p className="text-2xl font-black text-slate-950 dark:text-white mt-3">
                {formatAmount(convertToRWF(25, 'USD'), 'USD')}
                <span className="text-xs font-semibold text-gray-400">
                  {isRw ? ' / ukwezi' : isFr ? ' / mois' : ' / mo'}
                </span>
              </p>
              <p className="text-[10px] text-[#15803D] font-mono font-bold mt-0.5">
                {formatAmount(convertToRWF(25, 'USD'), activeCurrency)}
              </p>
              <div className="mt-5 pt-4 border-t border-gray-100 dark:border-slate-800">
                <p className="text-xs font-bold text-gray-800 dark:text-slate-200">
                  {isRw ? 'Ibikubiyemo:' : isFr ? 'Comprend :' : 'Includes:'}
                </p>
                <ul className="text-[11px] text-slate-500 flex flex-col gap-2 mt-2 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Kugeza ku banyamuryango 500' : isFr ? 'Jusqu\'à 500 membres' : 'Up to 500 members'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Ubufasha bwa Guider (Baza Assistant)' : isFr ? 'Assistant Guider (Baza)' : 'Guider (Baza Assistant)'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Ipima ry\'Imisanzu ry\'Umucungamari' : isFr ? 'Indicateur de cotisations comptable' : 'Accountant Dues Health Meter'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? 'Ibiganiro bitsinda birakora' : isFr ? 'Messagerie de groupe active' : 'Group messaging active'}
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-emerald-600 shrink-0" />{' '}
                    {isRw ? '5 GB y\'ubushiko' : isFr ? 'Stockage 5 Go' : '5 GB storage cap'}
                  </li>
                </ul>
              </div>
            </div>
            <a href={PORTAL_LINKS.SIGN_UP} className="mt-8">
              <Button className="w-full bg-[#15803D] hover:bg-[#14532D] text-xs font-bold py-2">
                {isRw ? 'Tangiza Iterambere' : isFr ? 'Lancer Growth' : 'Launch Growth'}
              </Button>
            </a>
          </div>

          {/* 4. Pro Plan */}
          <div className="bg-[#0F172A] border-2 border-amber-500/80 p-6 rounded-2xl flex flex-col justify-between text-white hover:border-amber-400 transition shadow-lg relative">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 px-3 py-0.5 text-[8px] uppercase font-black tracking-widest rounded-full">
              PRO PLAN
            </span>
            <div>
              <span className="text-[9px] font-bold text-amber-400 uppercase tracking-widest block font-bold">
                {isRw ? 'Icyerekezo Cyihariye' : isFr ? 'Sécurité Maximale & Pro' : 'Pro Plan & Ultimate Security'}
              </span>
              <h3 className="text-base font-extrabold text-slate-50 mt-1">
                {isRw ? 'Ifatabuguzi rya Pro' : isFr ? 'Licence Pro' : 'Pro Plan License'}
              </h3>
              <p className="text-2xl font-black text-white mt-3">
                {formatAmount(convertToRWF(40, 'USD'), 'USD')}
                <span className="text-xs font-semibold text-slate-400">
                  {isRw ? ' / ukwezi' : isFr ? ' / mois' : ' / mo'}
                </span>
              </p>
              <p className="text-[10px] text-amber-400 font-mono font-bold mt-0.5">
                {formatAmount(convertToRWF(40, 'USD'), activeCurrency)}
              </p>
              <div className="mt-5 pt-4 border-t border-slate-800">
                <p className="text-xs font-bold text-slate-200">
                  {isRw ? 'Ibikubiyemo byose bya Pro:' : isFr ? 'Avantages Pro :' : 'Pro Plan Features & Perks:'}
                </p>
                <ul className="text-[11px] text-slate-300 flex flex-col gap-2 mt-2 font-medium">
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />{' '}
                    <strong>
                      {isRw ? 'Ubufasha bwihariye bw\'end-to-end encryption' : 'Highly secure end-to-end encryption'}
                    </strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />{' '}
                    <strong>
                      {isRw ? 'Gucunga amakuru yihariye (Auto-personalized data)' : 'Auto-personalized data management'}
                    </strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />{' '}
                    <strong>{isRw ? 'Itsinda ry\'icyiciro cya Pro' : 'Treated as Pro group tier'}</strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />{' '}
                    <strong>
                      {isRw ? 'Uburenganzira bwuzuye kuri buri kintu' : 'Unlimited on all features & storage'}
                    </strong>
                  </li>
                  <li className="flex items-center gap-1.5">
                    <Check className="h-3.5 w-3.5 text-amber-400 shrink-0" />{' '}
                    <strong>{isRw ? 'Umuhuza w\'umuyobozi bwite' : 'Admin direct contact (Pro Plan)'}</strong>
                  </li>
                </ul>
              </div>
            </div>
            <a href={PORTAL_LINKS.SIGN_UP} className="mt-8">
              <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black py-2.5 shadow-md">
                {isRw ? 'Tangiza Pro Plan' : isFr ? 'Choisir le Plan Pro' : 'Get Pro Plan'}
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
