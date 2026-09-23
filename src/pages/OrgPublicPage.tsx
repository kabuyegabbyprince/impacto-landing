import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Share2,
  Heart,
  Globe,
  MapPin,
  Building2,
  AlertCircle,
  ArrowLeft,
  Lock,
  Check,
  Maximize2,
  X,
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useOrgStore } from '../store/orgStore';
import { LogoLoader } from '../components/LogoLoader';
import { OrganizationMarketplace } from '../components/marketplace/OrganizationMarketplace';
import {
  useOrganization,
  useNews,
  useGoals,
  useActivityLogs,
} from '../hooks/useImpactoData';
import { Button, Card, Badge, Modal, Tabs, EmptyState } from '../components/ui';
import { ResolvedImage } from '../components/ResolvedMedia';
import { getStoragePublicUrl } from '../lib/storageService';
import {
  getCategoryFallbackGallery,
  getCategoryFallbackCover,
  getCategoryFallbackLogo,
} from '../lib/imagePlaceholders';
import { Organization } from '../types';
import { PORTAL_LINKS } from '../constants/links';

export const OrgPublicPage: React.FC = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const { activeOrg, activeMember } = useOrgStore();

  const cleanSlug = slug?.startsWith('@') ? slug.slice(1) : slug;

  const { data: org, isLoading: loadingOrg } = useOrganization(cleanSlug);
  const { data: news } = useNews(org?.id);
  const { data: goals } = useGoals(org?.id);
  const { data: activities } = useActivityLogs(org?.id);

  const [activeTab, setActiveTab] = useState('about');
  const [successMsg, setSuccessMsg] = useState('');
  const [showJoinModal, setShowJoinModal] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Dynamic gallery parsing with authentic category fallbacks
  const parsedGalleryUrls: string[] = React.useMemo(() => {
    let urls: string[] = [];
    if (org?.gallery_urls) {
      if (Array.isArray(org.gallery_urls)) {
        urls = (org.gallery_urls as any[])
          .map((u) => (typeof u === 'string' ? u.trim() : typeof u?.url === 'string' ? u.url.trim() : ''))
          .filter((u) => Boolean(u));
      } else if (typeof org.gallery_urls === 'string') {
        try {
          const parsed = JSON.parse(org.gallery_urls);
          if (Array.isArray(parsed)) {
            urls = parsed
              .map((u) => (typeof u === 'string' ? u.trim() : typeof u?.url === 'string' ? u.url.trim() : ''))
              .filter((u) => Boolean(u));
          }
        } catch {
          urls = (org.gallery_urls as string)
            .split(',')
            .map((s) => s.trim())
            .filter(Boolean);
        }
      }
    }
    // If no custom photos uploaded, provide curated community category photos
    if (urls.length === 0 && org) {
      return getCategoryFallbackGallery(org.org_category);
    }
    return urls;
  }, [org?.gallery_urls, org?.org_category]);

  // Apply organization branding dynamically in head
  useEffect(() => {
    if (org) {
      const primary = org.primary_color || '#10b981';
      const secondary = org.secondary_color || '#ca8a04';
      document.documentElement.style.setProperty('--org-primary', primary);
      document.documentElement.style.setProperty('--org-primary-l', primary + '14');
      document.documentElement.style.setProperty('--org-secondary', secondary);
      document.documentElement.style.setProperty('--org-secondary-l', secondary + '14');
    }
  }, [org]);

  // Redirect selected tab if it is configured to be hidden
  useEffect(() => {
    if (activeTab === 'goals' && org && !(org.show_goals_publicly ?? true)) {
      setActiveTab('about');
    }
    if (activeTab === 'impact' && org && !(org.show_impact_publicly ?? true)) {
      setActiveTab('about');
    }
  }, [activeTab, org]);

  if (loadingOrg) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center">
        <LogoLoader
          message={t('loading_portal', 'Retrieving Organization Portal')}
          subMessage={t('loading_portal_sub', 'Secure white-labeled Organization ledger loading...')}
        />
      </div>
    );
  }

  if (!org) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <EmptyState
          icon={<AlertCircle className="h-8 w-8 text-amber-500" />}
          title="Organization Portal Not Found"
          message="The slug or workspace you queried is currently unavailable or doesn't exist."
          action={
            <Link to="/">
              <Button>Return Home</Button>
            </Link>
          }
        />
      </div>
    );
  }

  const isSuperadmin = user?.is_superadmin === true;
  const isMemberOrAdminOfThisOrg = activeOrg?.id === org?.id && activeMember !== null;
  const isAllowedToView =
    (org.public_page_enabled ?? true) || isSuperadmin || isMemberOrAdminOfThisOrg;

  if (!isAllowedToView) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-2xl p-8 text-center shadow-xl flex flex-col items-center gap-5">
          <div className="h-16 w-16 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/10 text-amber-500 rounded-3xl flex items-center justify-center shadow-lg">
            <Lock className="h-8 w-8 animate-pulse" />
          </div>
          <div className="flex flex-col gap-2">
            <h2 className="text-xl font-extrabold font-display leading-tight text-gray-900 dark:text-white">
              Organization Portal is Private
            </h2>
            <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-semibold">
              The workspace administrator of{' '}
              <span className="text-[var(--org-primary,#15803D)] font-bold">@{org.slug}</span> has set
              the public portal visibility to private.
            </p>
          </div>
          <p className="text-xs text-slate-400 font-normal max-w-sm">
            If you are an active member or workspace administrator of this Organization, please sign in
            to your workspace dashboard to access resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 w-full mt-2 select-none">
            <a href={PORTAL_LINKS.SIGN_IN} className="w-full">
              <Button className="w-full font-bold bg-[var(--org-primary,#15803D)] hover:opacity-95 text-white">
                Sign In to Workspace
              </Button>
            </a>
            <Link to="/" className="w-full">
              <Button variant="outline" className="w-full font-bold">
                Discover Organizations
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const defaultTaglines: Record<string, string> = {
    Environment:
      "Preserving Rwanda's landscapes, promoting sustainable practices, and securing a green future.",
    Education:
      "Expanding access to knowledge, empowering local schools, and building tomorrow's leaders.",
    Health:
      'Providing equitable healthcare, public health training, and community wellness programs.',
    'Social Action':
      'Mobilizing civic action, supporting vulnerable groups, and cultivating social harmony.',
    Enterprise:
      'Empowering local entrepreneurship, fostering trade cooperatives, and driving community wealth.',
  };

  const description =
    org.description ||
    org.tagline ||
    defaultTaglines[org.org_category] ||
    `We are a registered community organization in Rwanda focused on ${
      org.org_category || 'development'
    }. Through transparent leadership, collaborative programs, and verified civic involvement, we strive to build sustainable, high-impact communities across our region. Join us, review our progress, or support our goals below.`;

  const handleShare = () => {
    try {
      navigator.clipboard.writeText(window.location.href);
      setSuccessMsg('Link copied to clipboard!');
      setTimeout(() => setSuccessMsg(''), 3000);
    } catch {
      setSuccessMsg('Could not copy automatically.');
    }
  };

  const handleJoinRequest = () => {
    window.location.href = PORTAL_LINKS.REGISTER_ORG(org.id);
    setShowJoinModal(false);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-slate-950 pb-16 font-sans">
      <OrgBrandingHeader
        org={org}
        onShare={handleShare}
        onJoin={() => setShowJoinModal(true)}
      />

      {/* Quick alert */}
      {successMsg && (
        <div className="max-w-4xl mx-auto px-4 mt-4">
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 font-semibold rounded-lg flex items-center gap-2">
            <Check className="h-4.5 w-4.5" />
            {successMsg}
          </div>
        </div>
      )}

      {/* Dynamic Tabs list */}
      <div className="max-w-4xl mx-auto px-4 mt-6">
        <Tabs
          tabs={[
            { id: 'about', label: 'About' },
            ...((org.show_goals_publicly ?? true) ? [{ id: 'goals', label: 'Goals' }] : []),
            ...((org.show_impact_publicly ?? true) ? [{ id: 'impact', label: 'Impact Log' }] : []),
            { id: 'news', label: 'News Feed' },
            ...(org.marketplace_enabled ? [{ id: 'marketplace', label: 'Marketplace' }] : []),
          ]}
          active={activeTab}
          onChange={setActiveTab}
        />

        {/* Tab content renders */}
        {activeTab === 'marketplace' && org.marketplace_enabled && (
          <OrganizationMarketplace orgId={org.id} org={org} isPublic={true} />
        )}

        {activeTab === 'about' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
              {/* Main Column */}
              <div className="md:col-span-2 flex flex-col gap-6">
                <Card title="About Our Organization">
                  <p className="text-sm text-gray-700 dark:text-slate-200 leading-relaxed font-medium">
                    {description}
                  </p>
                  {org.mission && (
                    <div className="mt-4 p-4 bg-emerald-50/70 dark:bg-emerald-950/20 rounded-xl border border-emerald-200/60 dark:border-emerald-900/40">
                      <span className="text-[10px] font-bold text-emerald-800 dark:text-emerald-400 uppercase tracking-wider block font-display">
                        Mission Statement
                      </span>
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 mt-1 leading-snug">
                        {org.mission}
                      </p>
                    </div>
                  )}
                  {org.vision && (
                    <div className="mt-3.5 p-4 bg-amber-50/70 dark:bg-amber-950/20 rounded-xl border border-amber-200/60 dark:border-amber-900/40">
                      <span className="text-[10px] font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider block font-display">
                        Vision Statement
                      </span>
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-100 mt-1 leading-snug">
                        {org.vision}
                      </p>
                    </div>
                  )}
                </Card>

                {/* Integrated Organizational Gallery */}
                {parsedGalleryUrls.length > 0 && (
                  <Card
                    title={
                      <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-bold font-display text-gray-900 dark:text-white">
                          Organizational Gallery
                        </span>
                        <span className="text-[11px] font-semibold text-slate-400">
                          {parsedGalleryUrls.length} {parsedGalleryUrls.length === 1 ? 'photo' : 'photos'}
                        </span>
                      </div>
                    }
                  >
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-1">
                      {parsedGalleryUrls.map((url: string, idx: number) => (
                        <div
                          key={idx}
                          onClick={() => setPreviewImage(getStoragePublicUrl(url, 'gallery'))}
                          className="group aspect-square rounded-xl overflow-hidden border border-slate-200/80 dark:border-slate-800 bg-gray-100 dark:bg-slate-800 shadow-2xs relative cursor-pointer"
                        >
                          <ResolvedImage
                            src={url}
                            fallbackSrc={getCategoryFallbackGallery(org.org_category)[idx % getCategoryFallbackGallery(org.org_category).length]}
                            alt={`${org.name} gallery photo ${idx + 1}`}
                            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                            bucketName="gallery"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/35 transition-colors duration-200 flex items-center justify-center opacity-0 group-hover:opacity-100">
                            <div className="h-8 w-8 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 flex items-center justify-center shadow-md">
                              <Maximize2 className="h-4 w-4" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </Card>
                )}
              </div>

              {/* Sidebar Contact & Support */}
              <div className="flex flex-col gap-6">
                <Card title="Quick Info">
                  <div className="flex flex-col gap-3.5 text-xs md:text-sm font-medium">
                    <div className="flex items-center gap-2.5 text-gray-500 dark:text-slate-400">
                      <Building2 className="h-4.5 w-4.5 text-[var(--org-primary,#10b981)] shrink-0" />
                      <span className="text-gray-800 dark:text-slate-200 font-semibold">
                        {org.org_category}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-500 dark:text-slate-400">
                      <MapPin className="h-4.5 w-4.5 text-[var(--org-primary,#10b981)] shrink-0" />
                      <span className="text-gray-800 dark:text-slate-200">
                        {org.location_name || 'Kigali, Rwanda'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2.5 text-gray-500 dark:text-slate-400">
                      <Globe className="h-4.5 w-4.5 text-[var(--org-primary,#10b981)] shrink-0" />
                      <span className="text-gray-800 dark:text-slate-200 truncate font-semibold">
                        impact-o.app/@{org.slug}
                      </span>
                    </div>

                    {org.contact_us && (
                      <div className="mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-1 text-xs text-gray-600 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">
                        <span className="font-bold text-gray-900 dark:text-white">Contact Us:</span>
                        {org.contact_us}
                      </div>
                    )}
                  </div>
                </Card>

                {org.donations_enabled && (
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-sm border border-amber-400/30 text-center flex flex-col items-center gap-3">
                    <Heart className="h-8 w-8 text-amber-100 fill-amber-200" />
                    <div>
                      <h4 className="font-bold text-sm text-white">Fuel the Workspace</h4>
                      <p className="text-xs text-amber-50/90 mt-1">
                        MoMo Donations are active for this organization.
                      </p>
                    </div>
                    <Link to={`/@${org.slug}/donate`} className="w-full mt-1">
                      <Button
                        variant="secondary"
                        className="w-full font-bold bg-white text-amber-900 hover:bg-amber-50 border-none"
                      >
                        Donate Now
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'goals' && (
          <div className="flex flex-col gap-6">
            {goals && goals.length > 0 ? (
              (() => {
                const groups: Record<string, { type: string; label: string; goals: typeof goals }> = {};
                goals.forEach((g) => {
                  const gType = g.period_type || 'yearly';
                  const gLabel =
                    g.period_label ||
                    (gType === 'yearly'
                      ? `${new Date().getFullYear()}`
                      : `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`);
                  const key = `${gType}_${gLabel}`;
                  if (!groups[key]) {
                    groups[key] = { type: gType, label: gLabel, goals: [] };
                  }
                  groups[key].goals.push(g);
                });

                return Object.values(groups).map((periodGroup) => {
                  const pTotal = periodGroup.goals.length;
                  const pAvgAchievement =
                    pTotal > 0
                      ? Math.round(
                          periodGroup.goals.reduce((sum, g) => sum + (g.achievement_percentage || 0), 0) /
                            pTotal
                        )
                      : 0;

                  return (
                    <div
                      key={`${periodGroup.type}_${periodGroup.label}`}
                      className="bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs space-y-4"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-3">
                        <div className="flex items-center gap-2.5">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white capitalize">
                            {periodGroup.label} {periodGroup.type} Goals
                          </h3>
                          <Badge color={periodGroup.type === 'yearly' ? 'amber' : 'green'}>
                            {periodGroup.type.toUpperCase()}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold text-slate-500">Average Score:</span>
                          <span className="text-base font-black text-emerald-600 dark:text-emerald-400">
                            {pAvgAchievement}%
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {periodGroup.goals.map((goal) => {
                          const isCompleted =
                            goal.status === 'completed' || (goal.achievement_percentage || 0) >= 100;
                          return (
                            <div
                              key={goal.id}
                              className="p-3.5 rounded-xl border bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                            >
                              <div className="flex items-center gap-3 min-w-0 flex-1">
                                <div
                                  className={`h-2.5 w-2.5 rounded-full shrink-0 ${
                                    isCompleted ? 'bg-emerald-500' : 'bg-amber-500'
                                  }`}
                                />
                                <div className="min-w-0">
                                  <h4
                                    className={`text-sm font-bold text-slate-800 dark:text-slate-100 ${
                                      isCompleted ? 'line-through text-slate-400' : ''
                                    }`}
                                  >
                                    {goal.title}
                                  </h4>
                                  {goal.description && (
                                    <p className="text-xs text-slate-500 truncate">
                                      {goal.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                                  {goal.achievement_percentage || 0}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                });
              })()
            ) : (
              <EmptyState
                title="No Goals Logged"
                message="This Organization workspace has not shared any public goals yet."
              />
            )}
          </div>
        )}

        {activeTab === 'impact' && (
          <div className="flex flex-col gap-6">
            {activities && activities.length > 0 ? (
              <div className="bg-white dark:bg-slate-900 border rounded-2xl p-5 shadow-xs space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
                  Recent Verified Civic Actions
                </h3>
                {activities.map((act) => (
                  <div
                    key={act.id}
                    className="p-3.5 rounded-xl border bg-slate-50/50 dark:bg-slate-800/40 flex items-center justify-between gap-3 text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white block">
                        {act.action}
                      </span>
                      <span className="text-slate-500">{act.details || act.user_name}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {new Date(act.created_at).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState
                title="No Impact Records"
                message="This organization has not logged any public verification milestones yet."
              />
            )}
          </div>
        )}

        {activeTab === 'news' && (
          <div className="flex flex-col gap-6">
            {news && news.length > 0 ? (
              news
                .filter((post) => post.visibility === 'public')
                .map((post) => (
                  <Card
                    key={post.id}
                    title={post.title}
                    action={<Badge color="blue">{post.category}</Badge>}
                    padding={false}
                  >
                    {post.cover_url && (
                      <div className="h-48 w-full">
                        <img
                          src={post.cover_url}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm font-semibold text-gray-800 dark:text-slate-200 leading-normal">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-gray-400 leading-none">
                        <span>
                          Published: {new Date(post.published_at || '').toLocaleDateString()}
                        </span>
                        <div className="flex gap-4">
                          <span>Likes: {post.likes_count || 0}</span>
                          <span>Comments: {post.comments_count || 0}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))
            ) : (
              <EmptyState
                title="No news postings"
                message="This organization has not posted any announcements recently."
              />
            )}
          </div>
        )}
      </div>

      {/* Fullscreen Photo Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setPreviewImage(null)}
        >
          <button
            onClick={() => setPreviewImage(null)}
            className="absolute top-5 right-5 h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center backdrop-blur-md transition cursor-pointer border border-white/20 shadow-lg"
          >
            <X className="h-5 w-5" />
          </button>
          <div
            className="max-w-4xl max-h-[85vh] overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/50"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={previewImage}
              alt="Expanded view"
              className="max-h-[82vh] w-auto max-w-full object-contain rounded-xl"
            />
          </div>
        </div>
      )}

      {/* Join US Modal */}
      <Modal
        open={showJoinModal}
        onClose={() => setShowJoinModal(false)}
        title="Join Organization Workspace"
      >
        <div className="flex flex-col gap-4 text-sm leading-relaxed">
          <p className="text-gray-500 text-xs">
            Apply to become an active community member of <strong>{org.name}</strong> workspace on
            Impacto. Once approved, you will get access to full internal events calendars, documents
            tab, and localized member messaging boards.
          </p>
          <div className="flex items-center justify-end gap-3 mt-4">
            <Button variant="outline" onClick={() => setShowJoinModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleJoinRequest} className="bg-emerald-700 text-white font-bold">
              Submit Application
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

// Subcomponent: Org header
const OrgBrandingHeader: React.FC<{
  org: Organization;
  onShare: () => void;
  onJoin: () => void;
}> = ({ org, onShare, onJoin }) => {
  const [logoErr, setLogoErr] = useState(false);
  const rawLogo =
    org.logo_url || org.dashboard_logo || getCategoryFallbackLogo(org.org_category) || '/logo.png';
  const resolvedLogo =
    rawLogo && !rawLogo.startsWith('icon:') ? getStoragePublicUrl(rawLogo, 'avatars') : '';

  const getInitials = (name: string) => {
    return name
      ? name
          .split(' ')
          .map((n) => n[0])
          .slice(0, 2)
          .join('')
          .toUpperCase()
      : 'ORG';
  };

  const isGradientCover =
    org.cover_url && (org.cover_url.startsWith('from-') || !org.cover_url.includes('/'));

  const coverFallback = getCategoryFallbackCover(org.org_category);

  return (
    <div className="bg-white dark:bg-slate-900 border-b border-slate-200/80 dark:border-slate-800">
      {/* Cover picture */}
      <div className="h-56 md:h-72 w-full bg-slate-900 relative overflow-hidden">
        {org.cover_url ? (
          isGradientCover ? (
            <div className={`h-full w-full bg-gradient-to-r ${org.cover_url}`} />
          ) : (
            <ResolvedImage
              src={org.cover_url}
              fallbackSrc={coverFallback}
              alt={org.name}
              className="h-full w-full object-cover"
              bucketName="covers"
            />
          )
        ) : (
          <ResolvedImage
            src={coverFallback}
            alt={org.name}
            className="h-full w-full object-cover"
            bucketName="covers"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
        <Link
          to="/"
          className="absolute top-4 left-4 inline-flex items-center gap-2 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white text-xs font-bold px-4 py-2 rounded-full z-30 transition border border-white/20 shadow-xs"
        >
          <ArrowLeft className="h-4 w-4" /> Home
        </Link>
      </div>

      {/* Profile area */}
      <div className="max-w-4xl mx-auto px-4 pb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 -mt-20 md:-mt-24 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end gap-5">
          <div className="h-20 w-20 md:h-28 md:w-28 rounded-2xl bg-white dark:bg-slate-800 p-1.5 shadow-xl shrink-0 overflow-hidden flex items-center justify-center border border-slate-200/80 dark:border-slate-700">
            {resolvedLogo && !logoErr ? (
              <img
                src={resolvedLogo}
                alt={org.name}
                className="h-full w-full object-cover rounded-xl"
                onError={() => setLogoErr(true)}
              />
            ) : (
              <div
                className="h-full w-full rounded-xl flex items-center justify-center text-white text-3xl font-extrabold shadow-inner"
                style={{
                  background: `linear-gradient(135deg, var(--org-primary, #10b981) 0%, var(--org-secondary, #ca8a04) 100%)`,
                }}
              >
                {getInitials(org.name)}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-1 pb-1 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
            <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 dark:text-white leading-tight">
              {org.name}
            </h1>
            <p className="text-xs md:text-sm text-gray-700 dark:text-slate-300 font-medium">
              {org.tagline}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-3 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
          <Button variant="outline" size="sm" icon={<Share2 className="h-4 w-4" />} onClick={onShare}>
            Share
          </Button>
          {(org.allow_public_joining ?? true) && (
            <Button
              size="sm"
              onClick={onJoin}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold h-9"
            >
              Join Organization
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
