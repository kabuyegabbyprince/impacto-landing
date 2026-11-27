import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2,
  XCircle,
  Search,
  Building2,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  Lock,
  Printer,
  ArrowRight,
  Mail,
  Phone,
} from 'lucide-react';
import { MockDB } from '../lib/mockData';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Certificate, Organization } from '../types';
import { useAuthStore } from '../store/authStore';
import { PORTAL_LINKS } from '../constants/links';

const SAMPLE_TOKENS = ['CERT-2026-COOP-8821', 'CERT-2026-AGRI-4019'];

export const CertificateVerifyPage: React.FC = () => {
  const { code: urlCode } = useParams<{ code?: string }>();
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { updateUserLanguage } = useAuthStore();

  const [logoError, setLogoError] = useState(false);
  const [orgLogoError, setOrgLogoError] = useState(false);
  const [inputCode, setInputCode] = useState<string>(urlCode || '');
  const [activeCode, setActiveCode] = useState<string>(urlCode || '');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const lang = i18n.language?.startsWith('rw')
    ? 'rw'
    : i18n.language?.startsWith('fr')
      ? 'fr'
      : 'en';

  const copy = {
    en: {
      navHome: 'Home',
      navVerify: 'Verify Credential',
      navPortal: 'App Portal',
      signIn: 'Sign In',
      getStarted: 'Get Started',
      eyebrow: 'Impacto Public Credential Registry',
      title: 'Verify Member Certificates & Official IDs',
      subtitle:
        'Enter the serial code stamped on an Impacto certificate, governance record, or member ID card to confirm authenticity and issuing organization.',
      placeholder: 'Enter serial e.g. CERT-2026-COOP-8821',
      verifyBtn: 'Verify Now',
      checkingBtn: 'Checking...',
      sampleLabel: 'Sample tokens:',
      validatingTitle: 'Validating Credential Serial...',
      validatingSub: 'Cross-referencing registered certificates and issuing organization records.',
      verifiedLabel: 'Officially Verified',
      verifiedHeading: 'Authentic Registered Credential',
      shareBtn: 'Copy Link',
      copiedBtn: 'Copied',
      printBtn: 'Print',
      recipientLabel: 'Conferred Recipient',
      certTitleLabel: 'Certificate Title',
      issuingOrgLabel: 'Issuing Organization / Cooperative',
      verifiedOrgLabel: 'Verified Org',
      publicProfileBtn: 'Public Profile',
      issueDateLabel: 'Issue Date',
      statusLabel: 'Status',
      signatoryLabel: 'Authorized Signatory',
      serialLabel: 'Serial Token',
      sealText: 'Tamper-evident credential authenticated on the Impacto Cloud Registry.',
      registeredLabel: 'Registered',
      notFoundTitle: 'Certificate Record Not Found',
      notFoundDesc:
        'No active credential matching that serial identifier could be verified in our organization registry.',
      resetBtn: 'Clear Search',
      returnHomeBtn: 'Return Home',
    },
    fr: {
      navHome: 'Accueil',
      navVerify: 'Vérifier un titre',
      navPortal: 'Portail App',
      signIn: 'Connexion',
      getStarted: 'Commencer',
      eyebrow: 'Registre Public de Vérification Impacto',
      title: 'Vérifier les certificats et cartes membres',
      subtitle:
        'Saisissez le numéro de série figurant sur le certificat, document officiel ou badge membre pour confirmer son authenticité.',
      placeholder: 'Ex : CERT-2026-COOP-8821',
      verifyBtn: 'Vérifier',
      checkingBtn: 'Vérification...',
      sampleLabel: 'Exemples :',
      validatingTitle: 'Validation du numéro de série...',
      validatingSub: "Vérification auprès du registre officiel et de l'organisation émettrice.",
      verifiedLabel: 'Officiellement Vérifié',
      verifiedHeading: 'Certificat Authentique Enregistré',
      shareBtn: 'Copier le lien',
      copiedBtn: 'Copié',
      printBtn: 'Imprimer',
      recipientLabel: 'Bénéficiaire',
      certTitleLabel: 'Intitulé du certificat',
      issuingOrgLabel: 'Organisation / Coopérative émettrice',
      verifiedOrgLabel: 'Org Vérifiée',
      publicProfileBtn: 'Profil public',
      issueDateLabel: "Date d'émission",
      statusLabel: 'Statut',
      signatoryLabel: 'Signataire autorisé',
      serialLabel: 'Numéro de série',
      sealText: 'Document authentifié sur le registre cloud Impacto.',
      registeredLabel: 'Enregistré',
      notFoundTitle: 'Certificat introuvable',
      notFoundDesc:
        "Aucun certificat actif correspondant à cet identifiant n'a pu être vérifié dans notre registre.",
      resetBtn: 'Effacer',
      returnHomeBtn: "Retour à l'accueil",
    },
    rw: {
      navHome: 'Ahabanza',
      navVerify: 'Emeza Impamyabumenyi',
      navPortal: 'Porogaramu',
      signIn: 'Injira',
      getStarted: 'Tangira',
      eyebrow: 'Ububiko Rusange bwo Kwemeza Inyandiko · Impacto',
      title: 'Genzura Impamyabumenyi n’Amakarita y’Abanyamuryango',
      subtitle:
        'Andika nomero yihariye iri ku mpamyabumenyi cyangwa ikarita y’umunyamuryango kugira ngo wemeze ukuri kwayo n’umuryango wayitanze.',
      placeholder: 'Urugero: CERT-2026-COOP-8821',
      verifyBtn: 'Suzuma',
      checkingBtn: 'Birimo kugenzurwa...',
      sampleLabel: 'Ingero:',
      validatingTitle: 'Harimo kugenzurwa ubuziranenge...',
      validatingSub: 'Kugenzura mu bubiko bw’impamyabumenyi n’umuryango wayitanze.',
      verifiedLabel: 'Yemejwe ku Mugaragaro',
      verifiedHeading: 'Impamyabumenyi Yizewe Yanditswe',
      shareBtn: 'Koporora Ihuza',
      copiedBtn: 'Byakoporowe',
      printBtn: 'Capisha',
      recipientLabel: 'Uwahawe Impamyabumenyi',
      certTitleLabel: 'Umutwe w’Impamyabumenyi',
      issuingOrgLabel: 'Umuryango / Koperative Yayitanze',
      verifiedOrgLabel: 'Yemejwe',
      publicProfileBtn: 'Urubuga Rusange',
      issueDateLabel: 'Itariki Yatangiweho',
      statusLabel: 'Imiterere',
      signatoryLabel: 'Uwasinye',
      serialLabel: 'Nomero Yihariye',
      sealText: 'Inyandiko yemejwe mu bubiko bwa Impacto Cloud.',
      registeredLabel: 'Yanditswe',
      notFoundTitle: 'Impamyabumenyi Ntibonetse',
      notFoundDesc:
        'Nta mpamyabumenyi ihuje n’iyi nomero yabonetse mu bubiko bw’imiryango yacu.',
      resetBtn: 'Siba Ishakisha',
      returnHomeBtn: 'Subira Ahabanza',
    },
  }[lang];

  // Sync SEO meta tags and lookup when URL changes
  useEffect(() => {
    const pageTitle = urlCode
      ? `Verify Certificate ${urlCode} — Impacto`
      : 'Verify Digital Certificates & Organization Credentials — Impacto';
    const pageDesc =
      'Publicly verify Impacto member certificates, cooperative credentials, and official organization IDs in real time.';
    const canonicalUrl = urlCode
      ? `https://impacto.rw/verify/${encodeURIComponent(urlCode)}`
      : 'https://impacto.rw/verify';

    document.title = pageTitle;

    const setMeta = (key: string, content: string, isProperty = false) => {
      const selector = isProperty ? `meta[property="${key}"]` : `meta[name="${key}"]`;
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        if (isProperty) el.setAttribute('property', key);
        else el.setAttribute('name', key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('title', pageTitle);
    setMeta('description', pageDesc);
    setMeta('og:title', pageTitle, true);
    setMeta('og:description', pageDesc, true);
    setMeta('og:url', canonicalUrl, true);
    setMeta('twitter:title', pageTitle);
    setMeta('twitter:description', pageDesc);
    setMeta('twitter:url', canonicalUrl);

    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', canonicalUrl);

    if (urlCode) {
      setInputCode(urlCode);
      setActiveCode(urlCode);
      verifyCertificate(urlCode);
    } else {
      setHasSearched(false);
      setCertificate(null);
      setOrg(null);
    }

    return () => {
      document.title =
        'Impacto — Organization Management System & Cooperative Platform (impacto.rw)';
      if (canonical) canonical.setAttribute('href', 'https://impacto.rw/');
    };
  }, [urlCode]);

  const verifyCertificate = async (codeToVerify: string) => {
    const trimmed = codeToVerify.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setHasSearched(true);
    setCertificate(null);
    setOrg(null);
    setOrgLogoError(false);

    try {
      let foundCert: Certificate | null = null;

      // 1. Query Supabase if configured
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from('certificates')
          .select('*')
          .eq('certificate_code', trimmed)
          .maybeSingle();

        if (data && !error) {
          foundCert = data as Certificate;
        }
      }

      // 2. Fallback to MockDB / local cache
      if (!foundCert) {
        const localCerts = MockDB.getCertificates();
        foundCert =
          localCerts.find(
            (c: Certificate) =>
              c.certificate_code?.toLowerCase() === trimmed.toLowerCase() ||
              c.id?.toLowerCase() === trimmed.toLowerCase()
          ) || null;
      }

      setCertificate(foundCert);

      // 3. Resolve issuing organization via local variable (avoids stale React closure)
      if (foundCert?.org_id) {
        let resolvedOrg: Organization | null = null;

        if (isSupabaseConfigured) {
          const { data: orgData } = await supabase
            .from('organizations')
            .select('*')
            .eq('id', foundCert.org_id)
            .maybeSingle();

          if (orgData) {
            resolvedOrg = orgData as Organization;
          }
        }

        if (!resolvedOrg) {
          const localOrgs = MockDB.getOrgs();
          const matchedOrg = localOrgs.find((o: Organization) => o.id === foundCert?.org_id);
          if (matchedOrg) {
            resolvedOrg = matchedOrg;
          }
        }

        setOrg(resolvedOrg);
      }
    } catch (err) {
      console.error('Verification error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = inputCode.trim();
    if (!cleaned) return;
    navigate(`/verify/${encodeURIComponent(cleaned)}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const publicOrgUrl = org?.slug ? PORTAL_LINKS.GET_PUBLIC_ORG_URL(org.slug) : null;

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      {/* HEADER NAVBAR matching Impacto design system */}
      <header className="print:hidden sticky top-0 z-40 h-16 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-6 md:px-12 flex items-center justify-between">
        <div className="flex items-center gap-6">
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

          <nav className="hidden md:flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300">
            <Link
              to="/"
              className="px-3 py-1.5 rounded-lg hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
            >
              {copy.navHome}
            </Link>
            <Link
              to="/verify"
              className="px-3 py-1.5 rounded-lg text-[#156c45] dark:text-emerald-400 bg-emerald-50/80 dark:bg-emerald-950/40 font-bold"
            >
              {copy.navVerify}
            </Link>
            <a
              href={PORTAL_LINKS.DASHBOARD}
              className="px-3 py-1.5 rounded-lg hover:text-[#156c45] dark:hover:text-emerald-400 hover:bg-slate-100/70 dark:hover:bg-slate-800/60 transition-colors"
            >
              {copy.navPortal}
            </a>
          </nav>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Language Switcher */}
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

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col items-center">
        {/* HERO HEADER */}
        <div className="print:hidden text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-widest text-[#156c45] dark:text-emerald-400 mb-3">
            <ShieldCheck className="h-4 w-4" />
            <span>{copy.eyebrow}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold font-display tracking-tight text-slate-900 dark:text-white leading-tight">
            {copy.title}
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-3 leading-relaxed">
            {copy.subtitle}
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="print:hidden w-full max-w-xl mb-10">
          <div className="relative flex items-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus-within:border-[#156c45] dark:focus-within:border-emerald-500 shadow-xs transition-colors p-1.5">
            <div className="pl-3 text-slate-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={copy.placeholder}
              aria-label="Certificate serial code"
              className="w-full text-xs sm:text-sm font-mono font-semibold px-3 py-2.5 bg-transparent border-0 outline-none text-slate-900 dark:text-white placeholder:text-slate-400"
            />
            <button
              type="submit"
              disabled={isLoading || !inputCode.trim()}
              className="px-5 py-2.5 bg-[#156c45] hover:bg-[#115636] disabled:opacity-50 text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0 shadow-3xs"
            >
              {isLoading ? copy.checkingBtn : copy.verifyBtn}
            </button>
          </div>

          {/* Sample serial tokens */}
          <div className="mt-3 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
            <span>{copy.sampleLabel}</span>
            {SAMPLE_TOKENS.map((token, idx) => (
              <React.Fragment key={token}>
                <button
                  type="button"
                  onClick={() => {
                    setInputCode(token);
                    navigate(`/verify/${token}`);
                  }}
                  className="font-mono font-semibold text-[#156c45] dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  {token}
                </button>
                {idx < SAMPLE_TOKENS.length - 1 && <span aria-hidden="true">·</span>}
              </React.Fragment>
            ))}
          </div>
        </form>

        {/* VERIFICATION RESULT DISPLAY */}
        {hasSearched && (
          <div className="w-full max-w-2xl">
            {isLoading ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-10 text-center flex flex-col items-center shadow-xs">
                <div className="h-9 w-9 animate-spin rounded-full border-[3px] border-[#156c45] border-t-transparent mb-4" />
                <h2 className="font-display text-sm font-bold text-slate-900 dark:text-white">
                  {copy.validatingTitle}
                </h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {copy.validatingSub}
                </p>
              </div>
            ) : certificate ? (
              /* VERIFIED CREDENTIAL DOSSIER */
              <article className="bg-white dark:bg-slate-900 rounded-2xl border border-emerald-500/35 dark:border-emerald-500/30 shadow-sm overflow-hidden">
                {/* Status Banner */}
                <div className="bg-[#156c45] dark:bg-emerald-800 text-white px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="h-10 w-10 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-emerald-100 font-bold">
                        <span>{copy.verifiedLabel}</span>
                        <span>·</span>
                        <span className="tabular-nums">{certificate.certificate_code}</span>
                      </div>
                      <h2 className="font-display text-base sm:text-lg font-extrabold tracking-tight mt-0.5">
                        {copy.verifiedHeading}
                      </h2>
                    </div>
                  </div>

                  <div className="print:hidden flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => window.print()}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/15 hover:bg-white/25 text-white rounded-lg text-xs font-semibold transition cursor-pointer"
                    >
                      <Printer className="h-3.5 w-3.5" />
                      <span>{copy.printBtn}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyLink}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white text-[#156c45] hover:bg-emerald-50 rounded-lg text-xs font-bold transition cursor-pointer"
                    >
                      {copiedLink ? (
                        <Check className="h-3.5 w-3.5" />
                      ) : (
                        <Copy className="h-3.5 w-3.5" />
                      )}
                      <span>{copiedLink ? copy.copiedBtn : copy.shareBtn}</span>
                    </button>
                  </div>
                </div>

                {/* Dossier Content */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Recipient & Title */}
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-widest text-[#156c45] dark:text-emerald-400 font-bold block mb-1">
                          {copy.recipientLabel}
                        </span>
                        <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white tracking-tight">
                          {certificate.recipient_name}
                        </h3>
                        {certificate.recipient_email && (
                          <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-1">
                            {certificate.recipient_email}
                          </p>
                        )}
                      </div>

                      {!logoError && (
                        <img
                          src="/logo.png"
                          alt="Impacto"
                          onError={() => setLogoError(true)}
                          className="h-7 w-auto object-contain opacity-80 hidden sm:block shrink-0"
                        />
                      )}
                    </div>

                    <div className="mt-5 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                        {copy.certTitleLabel}
                      </span>
                      <h4 className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                        {certificate.title}
                      </h4>
                      {certificate.description && (
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                          {certificate.description}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Issuing Organization */}
                  <div className="border-b border-slate-100 dark:border-slate-800 pb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-slate-400 font-bold block mb-2.5">
                      {copy.issuingOrgLabel}
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40">
                      <div className="flex items-center gap-3.5 min-w-0">
                        {org?.logo_url && !orgLogoError ? (
                          <img
                            src={org.logo_url}
                            alt={org.name}
                            referrerPolicy="no-referrer"
                            onError={() => setOrgLogoError(true)}
                            className="h-12 w-12 rounded-xl object-contain bg-white p-1 border border-emerald-200 dark:border-emerald-800 shrink-0"
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-xl bg-[#156c45] text-white flex items-center justify-center shrink-0">
                            <Building2 className="h-5 w-5" />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                            <h4 className="font-display text-sm sm:text-base font-bold text-slate-900 dark:text-white truncate">
                              {org?.name || 'Impacto Registered Organization'}
                            </h4>
                            <span className="text-[11px] font-mono font-bold text-[#156c45] dark:text-emerald-400">
                              · {copy.verifiedOrgLabel}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                            {org?.org_category || 'Cooperative & Community Organization'} ·{' '}
                            {org?.province || 'Rwanda'}
                          </p>
                        </div>
                      </div>

                      {publicOrgUrl && org?.slug && (
                        <a
                          href={publicOrgUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="print:hidden inline-flex items-center gap-1.5 text-xs font-bold text-[#156c45] dark:text-emerald-400 hover:underline shrink-0"
                        >
                          <span>
                            {PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}/@{org.slug}
                          </span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-left">
                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                        {copy.issueDateLabel}
                      </span>
                      <span className="text-xs font-bold font-mono tabular-nums text-slate-900 dark:text-white block mt-1">
                        {certificate.issue_date}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                        {copy.statusLabel}
                      </span>
                      <span className="text-xs font-bold text-[#156c45] dark:text-emerald-400 block mt-1 capitalize">
                        {certificate.status || 'Active & Valid'}
                      </span>
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                        {copy.signatoryLabel}
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white block mt-1 truncate">
                        {certificate.signatory_name}
                      </span>
                      {certificate.signatory_title && (
                        <span className="text-[10px] text-slate-400 block truncate">
                          {certificate.signatory_title}
                        </span>
                      )}
                    </div>

                    <div className="p-3.5 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-slate-200/70 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                        {copy.serialLabel}
                      </span>
                      <span className="text-xs font-mono font-bold tabular-nums text-slate-900 dark:text-white block mt-1 truncate">
                        {certificate.certificate_code}
                      </span>
                    </div>
                  </div>

                  {/* Seal Footer */}
                  <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#156c45] dark:text-emerald-400 shrink-0" />
                      <span>{copy.sealText}</span>
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 tabular-nums shrink-0">
                      {copy.registeredLabel}:{' '}
                      {certificate.created_at
                        ? new Date(certificate.created_at).toLocaleDateString()
                        : certificate.issue_date}
                    </div>
                  </div>
                </div>
              </article>
            ) : (
              /* NOT FOUND STATE */
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-rose-200 dark:border-rose-900/60 shadow-xs p-8 text-center">
                <div className="h-14 w-14 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-800/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-7 w-7" />
                </div>
                <h2 className="font-display text-lg font-extrabold text-slate-900 dark:text-white">
                  {copy.notFoundTitle}
                </h2>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 max-w-md mx-auto leading-relaxed">
                  {copy.notFoundDesc}
                </p>
                {activeCode && (
                  <p className="mt-2 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                    "{activeCode}"
                  </p>
                )}
                <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setInputCode('');
                      setHasSearched(false);
                      navigate('/verify');
                    }}
                    className="px-4 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-bold transition cursor-pointer"
                  >
                    {copy.resetBtn}
                  </button>
                  <Link
                    to="/"
                    className="px-4 py-2.5 bg-[#156c45] hover:bg-[#115636] text-white rounded-xl text-xs font-bold transition"
                  >
                    {copy.returnHomeBtn}
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="print:hidden border-t border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 px-6 md:px-12 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 Impacto · Virellix Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-[11px]">
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
            <a
              href={PORTAL_LINKS.SIGN_IN}
              className="text-[#156c45] dark:text-emerald-400 font-bold hover:underline"
            >
              {PORTAL_LINKS.PUBLIC_PORTAL_DOMAIN}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
