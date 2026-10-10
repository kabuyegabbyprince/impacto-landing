import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { PORTAL_LINKS } from '../../constants/links';

export const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { updateUserLanguage } = useAuthStore();
  const [logoError, setLogoError] = useState(false);

  const handleLanguageSwitch = (lng: 'en' | 'fr' | 'rw') => {
    updateUserLanguage(lng);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between px-6 md:px-12 z-50 select-none shrink-0 transition-all duration-200 shadow-3xs">
      <Link to="/" className="flex items-center gap-2.5 group">
        {!logoError ? (
          <img
            src="/logo.png"
            onError={() => setLogoError(true)}
            className="h-8 w-auto shrink-0 max-w-[140px] object-contain transition-transform group-hover:scale-105"
            alt="Impacto Logo"
            loading="eager"
            decoding="async"
          />
        ) : (
          <div className="flex items-center gap-2">
            <svg
              className="h-8 w-8 text-[#156c45] dark:text-emerald-500 shrink-0 transition-transform group-hover:scale-105"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="50" cy="35" r="25" stroke="currentColor" strokeWidth="8" />
              <circle cx="35" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
              <circle cx="65" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
              <polygon points="53,48 47,48 50,42" fill="#F59E0B" />
            </svg>
            <span className="font-display font-extrabold text-2xl tracking-tight text-gray-900 dark:text-white">
              IMPACT<span className="text-[#156c45] dark:text-emerald-500 font-black">O</span>
            </span>
          </div>
        )}
      </Link>

      {/* Navigation Content Links */}
      <div className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
        <a
          href="#capabilities"
          className="px-3 py-1.5 rounded-lg hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors duration-150"
        >
          {t('landing.nav_capabilities')}
        </a>
        <a
          href="#discovery"
          className="px-3 py-1.5 rounded-lg hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors duration-150"
        >
          {t('landing.nav_discover')}
        </a>
        <a
          href="#pricing"
          className="px-3 py-1.5 rounded-lg hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors duration-150"
        >
          {t('landing.nav_pricing')}
        </a>
        <a
          href="#faqs"
          className="px-3 py-1.5 rounded-lg hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors duration-150"
        >
          {t('landing.nav_faqs')}
        </a>
      </div>

      {/* Action Button Header */}
      <div className="flex items-center gap-2.5">
        {/* Language Switcher Segmented Control */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/70 select-none">
          <button
            onClick={() => handleLanguageSwitch('en')}
            title="English"
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer ${
              i18n.language === 'en'
                ? 'bg-white dark:bg-slate-700 text-[#156c45] dark:text-emerald-400 shadow-3xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            EN
          </button>
          <button
            onClick={() => handleLanguageSwitch('fr')}
            title="Français"
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer ${
              i18n.language?.startsWith('fr')
                ? 'bg-white dark:bg-slate-700 text-[#156c45] dark:text-emerald-400 shadow-3xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            FR
          </button>
          <button
            onClick={() => handleLanguageSwitch('rw')}
            title="Kinyarwanda"
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer ${
              i18n.language?.startsWith('rw')
                ? 'bg-white dark:bg-slate-700 text-[#156c45] dark:text-emerald-400 shadow-3xs'
                : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
            }`}
          >
            RW
          </button>
        </div>

        {/* Portal Sign In Link */}
        <a href={PORTAL_LINKS.SIGN_IN}>
          <button className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 rounded-xl transition-all cursor-pointer">
            {t('auth.login')}
          </button>
        </a>

        {/* Portal Sign Up Link */}
        <a href={PORTAL_LINKS.SIGN_UP}>
          <button className="flex items-center gap-1.5 bg-[#156c45] hover:bg-[#115636] active:scale-[0.98] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-3xs hover:shadow-xs transition-all cursor-pointer">
            <span>{t('landing.nav_get_started')}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </a>
      </div>
    </nav>
  );
};
