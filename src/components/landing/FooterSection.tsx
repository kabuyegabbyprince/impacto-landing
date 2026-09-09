import React from 'react';
import { useTranslation } from 'react-i18next';
import { PORTAL_LINKS } from '../../constants/links';

interface FooterSectionProps {
  onOpenContact: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onOpenContact,
  onOpenTerms,
  onOpenPrivacy,
}) => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 pt-16 pb-8 px-6 md:px-12 select-none">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 border-b border-slate-800 pb-12 mb-8">
        {/* Brand Col */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <svg className="h-7 w-7 text-emerald-500 shrink-0" viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="35" r="25" stroke="currentColor" strokeWidth="8" />
              <circle cx="35" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
              <circle cx="65" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
              <polygon points="53,48 47,48 50,42" fill="#F59E0B" />
            </svg>
            <span className="font-display font-extrabold text-lg tracking-tight text-white uppercase">
              IMPACT<span className="text-emerald-500 font-black">O</span>
            </span>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Equipping registered Rwandan cooperatives, local forest initiatives, and social welfare
            organizations with beautiful workspaces that verify impact digitally.
          </p>
          <span className="text-[10px] font-semibold text-slate-500 font-mono uppercase tracking-wide">
            Kigali Office • Rwanda
          </span>
        </div>

        {/* Module Links */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Core Modules
          </span>
          <ul className="text-xs text-slate-400 flex flex-col gap-2 font-medium">
            <li>
              <a href={PORTAL_LINKS.SIGN_IN} className="hover:text-white transition">
                Member CRM Directory
              </a>
            </li>
            <li>
              <a href={PORTAL_LINKS.SIGN_IN} className="hover:text-white transition">
                Mobile Money Ledgers
              </a>
            </li>
            <li>
              <a href={PORTAL_LINKS.SIGN_IN} className="hover:text-white transition">
                QR Attendance Registers
              </a>
            </li>
            <li>
              <a href={PORTAL_LINKS.SIGN_IN} className="hover:text-white transition">
                Annual Report Compiler
              </a>
            </li>
            <li>
              <a href={PORTAL_LINKS.SIGN_IN} className="hover:text-white transition">
                Interactive Goals Tracker
              </a>
            </li>
          </ul>
        </div>

        {/* Platform Directory Links */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Verified Directory
          </span>
          <ul className="text-xs text-slate-400 flex flex-col gap-2 font-medium">
            <li>
              <a href="#discovery" className="hover:text-white transition">
                Environments & Forestry
              </a>
            </li>
            <li>
              <a href="#discovery" className="hover:text-white transition">
                Education & Mentorship
              </a>
            </li>
            <li>
              <a href="#discovery" className="hover:text-white transition">
                Health Care Cooperatives
              </a>
            </li>
            <li>
              <a href="#discovery" className="hover:text-white transition">
                Social Action & Welfare
              </a>
            </li>
            <li>
              <a href="#discovery" className="hover:text-white transition">
                Enterprise Cooperatives
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Col */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-bold text-white uppercase tracking-wider font-display">
            Get Support
          </span>
          <p className="text-xs text-slate-400 leading-relaxed font-medium">
            {t('landing.footer_desc')}
          </p>
          <button
            onClick={onOpenContact}
            className="mt-1 w-full bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold py-2 px-3 rounded-xl transition duration-150 transform hover:scale-[1.02] text-center cursor-pointer select-none"
          >
            {t('landing.footer_btn')}
          </button>
          <div className="text-xs font-mono font-bold text-emerald-500 mt-1">
            {PORTAL_LINKS.CONTACT_SUPPORT_EMAIL}
          </div>
          <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
            Multi-language support available in Kinyarwanda, English, and French.
          </p>
        </div>
      </div>

      {/* Lower copyright row */}
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-500">
        <p>© 2026 Virellix Inc. All rights reserved. Registered trademark under Rwanda RDB.</p>
        <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-wider">
          <button
            onClick={onOpenTerms}
            className="hover:text-emerald-400 underline transition cursor-pointer"
          >
            Terms of Service
          </button>
          <button
            onClick={onOpenPrivacy}
            className="hover:text-emerald-400 underline transition cursor-pointer"
          >
            Privacy Policy
          </button>
          <span>Rwandan SaaS Protocol</span>
        </div>
      </div>
    </footer>
  );
};
