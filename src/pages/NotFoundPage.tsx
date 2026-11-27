import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ArrowRight,
  Compass,
  ExternalLink,
  Mail,
  Phone,
  Search,
  ShieldCheck,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { PORTAL_LINKS } from '../constants/links';

interface NotFoundPageProps {
  missingSlug?: string;
}

export const NotFoundPage: React.FC<NotFoundPageProps> = ({ missingSlug }) => {
  const { i18n } = useTranslation();
  const { updateUserLanguage } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const [logoError, setLogoError] = useState(false);
  const [verifyQuery, setVerifyQuery] = useState('');

  const lang = i18n.language?.startsWith('rw')
    ? 'rw'
    : i18n.language?.startsWith('fr')
      ? 'fr'
      : 'en';

  const copy = {
    en: {
      eyebrow: 'HTTP 404 · Route Not Found',
      title: missingSlug
        ? `Workspace @${missingSlug} was not found here`
        : 'This page is not in our public registry',
      subtitle: missingSlug
        ? `Public organization profiles are hosted on ${PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@${missingSlug}, or the organization slug you entered may have moved or been archived.`
        : 'The link you followed may be broken, outdated, or moved to the main Impacto workspace portal.',
      homeBtn: 'Return to Homepage',
      verifyBtn: 'Verify a Certificate',
      portalBtn: 'Open App Portal',
      publicSlugBtn: `Try ${PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@${missingSlug}`,
      lookupLabel: 'Looking for a member certificate or credential?',
      lookupPlaceholder: 'Enter serial e.g. CERT-2026-COOP-8821',
      lookupAction: 'Verify',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      linksTitle: 'Helpful Destinations',
      homeDesc: 'Explore Impacto organization management tools & pricing',
      verifyDesc: 'Validate official cooperative certificates & member IDs',
      portalDesc: 'Sign in or launch your workspace at app.impacto.rw',
    },
    fr: {
      eyebrow: 'HTTP 404 · Page Introuvable',
      title: missingSlug
        ? `L'espace @${missingSlug} est introuvable ici`
        : "Cette page n'existe pas dans notre registre public",
      subtitle: missingSlug
        ? `Les profils publics des organisations sont hébergés sur ${PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@${missingSlug}, ou l'identifiant saisi a peut-être été déplacé.`
        : "Le lien que vous avez suivi est peut-être incorrect, expiré ou déplacé vers le portail principal d'Impacto.",
      homeBtn: "Retour à l'accueil",
      verifyBtn: 'Vérifier un certificat',
      portalBtn: 'Ouvrir le portail App',
      publicSlugBtn: `Essayer ${PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@${missingSlug}`,
      lookupLabel: 'Vous recherchez un certificat ou une attestation ?',
      lookupPlaceholder: 'Ex : CERT-2026-COOP-8821',
      lookupAction: 'Vérifier',
      signIn: 'Connexion',
      getStarted: 'Commencer',
      linksTitle: 'Liens utiles',
      homeDesc: 'Découvrir la plateforme Impacto et les tarifs',
      verifyDesc: 'Vérifier les certificats et cartes membres officiels',
      portalDesc: 'Accéder à votre espace sur app.impacto.rw',
    },
    rw: {
      eyebrow: 'HTTP 404 · Ipaji Ntibonetse',
      title: missingSlug
        ? `Umuryango @${missingSlug} ntubonetse hano`
        : 'Iri paji ntiriboneka mu bubiko bwacu',
      subtitle: missingSlug
        ? `Imbuga rusange z'imiryango ziboneka kuri ${PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@${missingSlug}, cyangwa izina wanditse ryarahindutse.`
        : 'Ihuza wakoresheje rishobora kuba ritagikora cyangwa ryimuriwe kuri porogaramu nyamukuru ya Impacto.',
      homeBtn: 'Subira Ahabanza',
      verifyBtn: 'Emeza Impamyabumenyi',
      portalBtn: 'Fungura Porogaramu',
      publicSlugBtn: `Reba kuri ${PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@${missingSlug}`,
      lookupLabel: 'Ushaka kugenzura impamyabumenyi cyangwa ikarita y’umunyamuryango?',
      lookupPlaceholder: 'Andika kode urugero: CERT-2026-COOP-8821',
      lookupAction: 'Suzuma',
      signIn: 'Injira',
      getStarted: 'Tangira',
      linksTitle: 'Aho wakomereza',
      homeDesc: 'Menya imikorere ya Impacto n’ibiciro byayo',
      verifyDesc: 'Genzura impamyabumenyi zatanzwe n’amakoperative',
      portalDesc: 'Injira mu rubuga rwawe kuri app.impacto.rw',
    },
  }[lang];

  useEffect(() => {
    const prevTitle = document.title;
    document.title = '404 — Page Not Found | Impacto';

    let robotsMeta = document.querySelector('meta[name="robots"]');
    const prevRobots = robotsMeta?.getAttribute('content') || '';
    if (!robotsMeta) {
      robotsMeta = document.createElement('meta');
      robotsMeta.setAttribute('name', 'robots');
      document.head.appendChild(robotsMeta);
    }
    robotsMeta.setAttribute('content', 'noindex, nofollow');

    return () => {
      document.title =
        prevTitle || 'Impacto — Organization Management System & Cooperative Platform (impacto.rw)';
      if (robotsMeta) {
        robotsMeta.setAttribute(
          'content',
          prevRobots || 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        );
      }
    };
  }, []);

  const handleQuickVerify = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = verifyQuery.trim();
    if (!cleaned) return;
    navigate(`/verify/${encodeURIComponent(cleaned)}`);
  };

  const displayPath = missingSlug ? `/@${missingSlug}` : location.pathname || '/unknown';

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* Top Navigation matching Landing Navbar */}
      <header className="sticky top-0 z-40 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-6 md:px-12 flex items-center justify-between">
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
                className="h-8 w-8 text-[#156c45] dark:text-emerald-500 shrink-0"
                viewBox="0 0 100 100"
                fill="none"
              >
                <circle cx="50" cy="35" r="25" stroke="currentColor" strokeWidth="8" />
                <circle cx="35" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
                <circle cx="65" cy="65" r="25" stroke="currentColor" strokeWidth="8" />
                <polygon points="53,48 47,48 50,42" fill="#F59E0B" />
              </svg>
              <span className="font-display font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                IMPACT<span className="text-[#156c45] dark:text-emerald-500 font-black">O</span>
              </span>
            </div>
          )}
        </Link>

        <div className="flex items-center gap-2.5">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800/80 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700/70 select-none">
            {(['en', 'fr', 'rw'] as const).map((lng) => (
              <button
                key={lng}
                type="button"
                onClick={() => updateUserLanguage(lng)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg transition-all duration-150 cursor-pointer uppercase ${
                  lang === lng
                    ? 'bg-white dark:bg-slate-700 text-[#156c45] dark:text-emerald-400 shadow-3xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          <a
            href={PORTAL_LINKS.SIGN_IN}
            className="hidden sm:inline-flex px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/80 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            {copy.signIn}
          </a>

          <a
            href={PORTAL_LINKS.SIGN_UP}
            className="inline-flex items-center gap-1.5 bg-[#156c45] hover:bg-[#115636] text-white font-bold text-xs px-4 py-2 rounded-xl shadow-3xs transition-all"
          >
            <span>{copy.getStarted}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </header>

      {/* Main 404 Editorial Grid */}
      <main className="flex-1 flex items-center justify-center px-6 py-12 md:py-20">
        <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-[#156c45] dark:text-emerald-400">
              {copy.eyebrow}
            </span>

            <div className="mt-3 flex items-baseline gap-4">
              <span className="font-display font-extrabold text-6xl sm:text-7xl md:text-8xl tracking-tight text-slate-900 dark:text-white tabular-nums leading-none">
                404
              </span>
              <span className="font-mono text-xs sm:text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-3 py-1 rounded-lg break-all">
                {displayPath}
              </span>
            </div>

            <h1 className="mt-5 font-display font-extrabold text-2xl sm:text-3xl tracking-tight text-slate-900 dark:text-white leading-tight">
              {copy.title}
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed max-w-xl">
              {copy.subtitle}
            </p>

            {/* Primary & Secondary Actions */}
            <div className="mt-7 flex flex-wrap items-center gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-2 bg-[#156c45] hover:bg-[#115636] active:scale-[0.99] text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl shadow-xs transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>{copy.homeBtn}</span>
              </Link>

              {missingSlug ? (
                <a
                  href={PORTAL_LINKS.GET_PUBLIC_ORG_URL(missingSlug)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <span>{copy.publicSlugBtn}</span>
                  <ExternalLink className="h-3.5 w-3.5 text-[#156c45] dark:text-emerald-400" />
                </a>
              ) : (
                <Link
                  to="/verify"
                  className="inline-flex items-center gap-2 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-800 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all"
                >
                  <ShieldCheck className="h-4 w-4 text-[#156c45] dark:text-emerald-400" />
                  <span>{copy.verifyBtn}</span>
                </Link>
              )}

              <a
                href={PORTAL_LINKS.SIGN_IN}
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#156c45] dark:text-emerald-400 hover:underline px-2 py-2"
              >
                <span>{copy.portalBtn}</span>
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>

            {/* Inline Quick Certificate Lookup */}
            <form onSubmit={handleQuickVerify} className="mt-8 w-full max-w-md">
              <label
                htmlFor="notfound-verify-input"
                className="block text-xs font-semibold text-slate-500 dark:text-slate-400 mb-2"
              >
                {copy.lookupLabel}
              </label>
              <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:border-[#156c45] dark:focus-within:border-emerald-500 rounded-xl p-1 shadow-3xs transition-colors">
                <Search className="h-4 w-4 text-slate-400 ml-2.5 shrink-0" />
                <input
                  id="notfound-verify-input"
                  type="text"
                  value={verifyQuery}
                  onChange={(e) => setVerifyQuery(e.target.value)}
                  placeholder={copy.lookupPlaceholder}
                  className="flex-1 bg-transparent border-0 outline-none px-2.5 py-2 text-xs font-mono text-slate-900 dark:text-white placeholder:text-slate-400"
                />
                <button
                  type="submit"
                  disabled={!verifyQuery.trim()}
                  className="px-3.5 py-1.5 bg-slate-900 dark:bg-emerald-600 hover:bg-slate-800 dark:hover:bg-emerald-500 disabled:opacity-40 text-white text-xs font-bold rounded-lg transition cursor-pointer shrink-0"
                >
                  {copy.lookupAction}
                </button>
              </div>
            </form>
          </div>

          {/* Right Directory Card Column */}
          <div className="lg:col-span-5">
            <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-5">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="h-9 w-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200/70 dark:border-emerald-800/60 text-[#156c45] dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <Compass className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-sm text-slate-900 dark:text-white">
                      {copy.linksTitle}
                    </h2>
                    <p className="text-[11px] font-mono text-slate-400">impacto.rw · app.impacto.rw</p>
                  </div>
                </div>
                <span className="font-mono text-[11px] font-bold text-slate-400 tabular-nums">
                  ERR 404
                </span>
              </div>

              <div className="space-y-2.5">
                <Link
                  to="/"
                  className="group flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all"
                >
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#156c45] dark:group-hover:text-emerald-400 transition-colors">
                      Impacto Overview
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {copy.homeDesc}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#156c45] dark:group-hover:text-emerald-400 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <Link
                  to="/verify"
                  className="group flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all"
                >
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#156c45] dark:group-hover:text-emerald-400 transition-colors">
                      Certificate Verification (/verify)
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {copy.verifyDesc}
                    </p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-[#156c45] dark:group-hover:text-emerald-400 shrink-0 mt-0.5 transition-transform group-hover:translate-x-0.5" />
                </Link>

                <a
                  href={PORTAL_LINKS.SIGN_IN}
                  className="group flex items-start justify-between gap-3 p-3.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-emerald-500/40 hover:bg-emerald-50/40 dark:hover:bg-emerald-950/20 transition-all"
                >
                  <div>
                    <span className="font-display font-bold text-xs text-slate-900 dark:text-white group-hover:text-[#156c45] dark:group-hover:text-emerald-400 transition-colors">
                      App & Public Org Portal ({PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN})
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-snug">
                      {copy.portalDesc}
                    </p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-slate-400 group-hover:text-[#156c45] dark:group-hover:text-emerald-400 shrink-0 mt-0.5" />
                </a>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-2 text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <a
                  href={`mailto:${PORTAL_LINKS.CONTACT_SUPPORT_EMAIL}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#156c45] dark:hover:text-emerald-400 transition-colors"
                >
                  <Mail className="h-3.5 w-3.5" />
                  <span>{PORTAL_LINKS.CONTACT_SUPPORT_EMAIL}</span>
                </a>
                <a
                  href={`tel:${PORTAL_LINKS.CONTACT_SUPPORT_PHONE}`}
                  className="inline-flex items-center gap-1.5 hover:text-[#156c45] dark:hover:text-emerald-400 transition-colors"
                >
                  <Phone className="h-3.5 w-3.5" />
                  <span>{PORTAL_LINKS.CONTACT_SUPPORT_PHONE}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quiet Footer */}
      <footer className="border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-5 px-6 md:px-12 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Impacto · Virellix Inc. All rights reserved.</p>
          <div className="flex items-center gap-4 font-mono text-[11px]">
            <Link to="/" className="hover:text-[#156c45] dark:hover:text-emerald-400 transition-colors">
              impacto.rw
            </Link>
            <span>·</span>
            <Link to="/verify" className="hover:text-[#156c45] dark:hover:text-emerald-400 transition-colors">
              /verify
            </Link>
            <span>·</span>
            <a
              href={PORTAL_LINKS.SIGN_IN}
              className="hover:text-[#156c45] dark:hover:text-emerald-400 transition-colors"
            >
              {PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
