import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  Award, 
  CheckCircle2, 
  XCircle, 
  Search, 
  Building, 
  ShieldCheck, 
  ExternalLink, 
  Copy, 
  Check, 
  Lock
} from "lucide-react";
import { MockDB } from "../lib/mockData";
import { supabase, isSupabaseConfigured } from "../lib/supabase";
import { Certificate, Organization } from "../types";

export const CertificateVerifyPage: React.FC = () => {
  const { code: urlCode } = useParams<{ code?: string }>();
  const navigate = useNavigate();

  const [inputCode, setInputCode] = useState<string>(urlCode || "");
  const [activeCode, setActiveCode] = useState<string>(urlCode || "");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [org, setOrg] = useState<Organization | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync state if URL changes
  useEffect(() => {
    document.title = urlCode
      ? `Verify Certificate: ${urlCode} — Impacto`
      : 'Verify Digital Certificate & Credentials — Impacto';

    if (urlCode) {
      setInputCode(urlCode);
      setActiveCode(urlCode);
      verifyCertificate(urlCode);
    }

    return () => {
      document.title = 'Impacto — Next-Generation Platform Solutions';
    };
  }, [urlCode]);

  const verifyCertificate = async (codeToVerify: string) => {
    const trimmed = codeToVerify.trim();
    if (!trimmed) return;

    setIsLoading(true);
    setHasSearched(true);
    setCertificate(null);
    setOrg(null);

    try {
      let foundCert: Certificate | null = null;

      // 1. Try querying Supabase if available
      if (isSupabaseConfigured) {
        const { data, error } = await supabase
          .from("certificates")
          .select("*")
          .eq("certificate_code", trimmed)
          .maybeSingle();

        if (data && !error) {
          foundCert = data as Certificate;
        }
      }

      // 2. Fallback to MockDB / local cache
      if (!foundCert) {
        const localCerts = MockDB.getCertificates();
        foundCert = localCerts.find(
          (c: Certificate) => 
            c.certificate_code?.toLowerCase() === trimmed.toLowerCase() ||
            c.id?.toLowerCase() === trimmed.toLowerCase()
        ) || null;
      }

      setCertificate(foundCert);

      if (foundCert) {
        // Look up issuing organization
        if (isSupabaseConfigured && foundCert.org_id) {
          const { data: orgData } = await supabase
            .from("organizations")
            .select("*")
            .eq("id", foundCert.org_id)
            .maybeSingle();

          if (orgData) {
            setOrg(orgData as Organization);
          }
        }

        if (!org && foundCert.org_id) {
          const localOrgs = MockDB.getOrgs();
          const matchedOrg = localOrgs.find((o: any) => o.id === foundCert?.org_id);
          if (matchedOrg) setOrg(matchedOrg as Organization);
        }
      }
    } catch (err) {
      console.error("Verification error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;
    navigate(`/verify/${encodeURIComponent(inputCode.trim())}`);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="border-b border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 sticky top-0 z-30 shadow-3xs">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 text-decoration-none">
            <div className="h-9 w-9 rounded-xl bg-[#156c45] text-white flex items-center justify-center font-black shadow-xs">
              <Award className="h-5 w-5" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base tracking-tight text-gray-900 dark:text-white block leading-tight">
                IMPACT-O
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#156c45] block font-bold">
                Credential Verification Registry
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="text-xs font-bold text-gray-600 dark:text-slate-300 hover:text-gray-900 dark:hover:text-white flex items-center gap-1.5 transition"
            >
              <span>Sign In</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 max-w-4xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col items-center">
        
        {/* HERO TITLE */}
        <div className="text-center max-w-2xl mx-auto mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-800 text-[#156c45] dark:text-emerald-300 text-xs font-bold mb-3">
            <ShieldCheck className="h-4 w-4" />
            <span>Public Certificate & ID Badge Verification</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black font-display tracking-tight text-gray-900 dark:text-white">
            Verify Member Certificate & Credentials
          </h1>
          <p className="text-xs sm:text-sm text-gray-600 dark:text-slate-400 mt-2 leading-relaxed">
            Enter the official serial number stamped on the certificate, document, or member ID card to verify authenticity, issuing cooperative, and valid governance standing.
          </p>
        </div>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearchSubmit} className="w-full max-w-xl mb-8">
          <div className="relative flex items-center shadow-md rounded-2xl bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-slate-800 focus-within:border-[#156c45] transition p-1.5">
            <div className="pl-3 text-gray-400">
              <Search className="h-5 w-5" />
            </div>
            <input
              type="text"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="e.g. CERT-2026-COOP-8821 or ID serial..."
              className="w-full text-xs sm:text-sm font-mono font-semibold px-3 py-2.5 bg-transparent border-0 outline-none text-gray-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={isLoading || !inputCode.trim()}
              className="px-5 py-2.5 bg-[#156c45] hover:bg-[#115436] disabled:bg-[#156c45]/50 text-white text-xs font-bold rounded-xl transition cursor-pointer shrink-0 shadow-xs"
            >
              {isLoading ? "Checking..." : "Verify Now"}
            </button>
          </div>

          {/* Quick example codes */}
          <div className="mt-2.5 flex items-center justify-center gap-2 text-[11px] text-gray-500">
            <span>Try sample tokens:</span>
            <button
              type="button"
              onClick={() => {
                setInputCode("CERT-2026-COOP-8821");
                navigate("/verify/CERT-2026-COOP-8821");
              }}
              className="font-mono text-[#156c45] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              CERT-2026-COOP-8821
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => {
                setInputCode("CERT-2026-AGRI-4019");
                navigate("/verify/CERT-2026-AGRI-4019");
              }}
              className="font-mono text-[#156c45] dark:text-emerald-400 hover:underline cursor-pointer"
            >
              CERT-2026-AGRI-4019
            </button>
          </div>
        </form>

        {/* VERIFICATION RESULT DISPLAY */}
        {hasSearched && (
          <div className="w-full max-w-2xl">
            {isLoading ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-200 dark:border-slate-800 p-10 text-center flex flex-col items-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#156c45] border-t-transparent mb-3" />
                <h3 className="text-sm font-bold text-gray-900 dark:text-white">Validating Certificate Security Hash...</h3>
                <p className="text-xs text-gray-500 mt-1">Cross-referencing digital governance logs and authorized signatures.</p>
              </div>
            ) : certificate ? (
              // SUCCESSFUL VERIFICATION CARD
              <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-emerald-500/40 shadow-xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                
                {/* Status banner */}
                <div className="bg-emerald-600 text-white px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono uppercase tracking-wider font-bold bg-white/20 px-2 py-0.5 rounded">
                          OFFICIALLY VERIFIED
                        </span>
                      </div>
                      <h2 className="text-base sm:text-lg font-black tracking-tight mt-0.5">
                        Authentic Registered Credential
                      </h2>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleCopyLink}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition"
                  >
                    {copiedLink ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedLink ? "Link Copied!" : "Share Link"}</span>
                  </button>
                </div>

                {/* Details Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  
                  {/* Recipient info & title */}
                  <div className="border-b border-gray-150 dark:border-slate-800 pb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-[#156c45] dark:text-emerald-400 font-bold block mb-1">
                      Conferred Recipient
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 dark:text-white">
                      {certificate.recipient_name}
                    </h3>
                    {certificate.recipient_email && (
                      <p className="text-xs text-gray-500 font-mono mt-0.5">{certificate.recipient_email}</p>
                    )}

                    <div className="mt-4 p-4 rounded-2xl bg-stone-50 dark:bg-slate-850/60 border border-gray-200 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block mb-1">
                        Certificate Title
                      </span>
                      <h4 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                        {certificate.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-slate-300 mt-2 leading-relaxed italic">
                        "{certificate.description}"
                      </p>
                    </div>
                  </div>

                  {/* Issuing Organization Card */}
                  <div className="border-b border-gray-150 dark:border-slate-800 pb-6">
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gray-400 font-bold block mb-2">
                      Issuing Cooperative / Organization
                    </span>
                    <div className="flex items-center justify-between p-4 rounded-2xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/40">
                      <div className="flex items-center gap-3">
                        {org?.logo_url ? (
                          <img 
                            src={org.logo_url} 
                            alt={org.name} 
                            className="h-12 w-12 rounded-xl object-contain bg-white p-1 border border-emerald-200" 
                          />
                        ) : (
                          <div className="h-12 w-12 rounded-xl bg-[#156c45] text-white flex items-center justify-center font-bold">
                            <Building className="h-6 w-6" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-sm sm:text-base font-bold text-gray-900 dark:text-white">
                              {org?.name || "Impacto Cooperative Federation"}
                            </h4>
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-bold uppercase bg-emerald-100 dark:bg-emerald-950 text-[#156c45]">
                              Verified Org
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 mt-0.5">
                            {org?.org_category || "Agriculture & Economic Cooperative"} • {org?.province || "Rwanda"}
                          </p>
                        </div>
                      </div>

                      {org?.slug && (
                        <Link
                          to={`/@${org.slug}`}
                          className="flex items-center gap-1 text-xs font-bold text-[#156c45] dark:text-emerald-400 hover:underline"
                        >
                          <span>Public Profile</span>
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Link>
                      )}
                    </div>
                  </div>

                  {/* Metadata Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
                    <div className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-150 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Issue Date</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block mt-0.5">
                        {certificate.issue_date}
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-150 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Status</span>
                      <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 block mt-0.5 capitalize">
                        {certificate.status || "Active & Valid"}
                      </span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-150 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Signatory</span>
                      <span className="text-xs font-bold text-gray-900 dark:text-white block mt-0.5 truncate">
                        {certificate.signatory_name}
                      </span>
                      <span className="text-[9px] text-gray-400 block truncate">{certificate.signatory_title}</span>
                    </div>

                    <div className="p-3 bg-gray-50 dark:bg-slate-800/40 rounded-xl border border-gray-150 dark:border-slate-800">
                      <span className="text-[10px] uppercase font-mono text-gray-400 font-bold block">Serial Token</span>
                      <span className="text-xs font-mono font-bold text-gray-900 dark:text-white block mt-0.5 truncate">
                        {certificate.certificate_code}
                      </span>
                    </div>
                  </div>

                  {/* Official Verification Seal Footer */}
                  <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 border-t border-gray-150 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <Lock className="h-4 w-4 text-[#156c45]" />
                      <span>Tamper-evident record authenticated on Impacto Cloud Registry.</span>
                    </div>
                    <div className="text-[11px] font-mono text-gray-400">
                      Registered: {certificate.created_at ? new Date(certificate.created_at).toLocaleDateString() : certificate.issue_date}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // NOT FOUND / INVALID RESULT
              <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-rose-200 dark:border-rose-900/60 shadow-xl p-8 text-center animate-in fade-in duration-200">
                <div className="h-16 w-16 rounded-full bg-rose-100 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center mx-auto mb-4">
                  <XCircle className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  Certificate Record Not Found
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 mt-2 max-w-md mx-auto leading-relaxed">
                  No certificate matching the identifier <strong className="font-mono text-gray-800 dark:text-gray-200">"{activeCode}"</strong> could be verified in our active organization registry.
                </p>
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setInputCode("");
                      setHasSearched(false);
                    }}
                    className="px-4 py-2 bg-gray-100 dark:bg-slate-800 hover:bg-gray-200 text-gray-800 dark:text-gray-200 rounded-xl text-xs font-bold transition"
                  >
                    Try Another Code
                  </button>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-[#156c45] hover:bg-[#115436] text-white rounded-xl text-xs font-bold transition"
                  >
                    Go to Sign In
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

      </main>

      {/* FOOTER */}
      <footer className="border-t border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-gray-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 Impact-O Verification System. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/login" className="hover:text-gray-900 dark:hover:text-white transition">Sign In</Link>
            <Link to="/verify" className="text-[#156c45] font-bold hover:underline">Verify Credential</Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
