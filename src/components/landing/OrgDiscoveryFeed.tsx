import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Search, Eye } from 'lucide-react';
import { useOrganizations } from '../../hooks/useImpactoData';
import { Input, Card, Badge, Button, EmptyState } from '../ui';
import { ResolvedImage } from '../ResolvedMedia';
import { PORTAL_LINKS } from '../../constants/links';

export const OrgDiscoveryFeed: React.FC = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const { data: orgs, isLoading } = useOrganizations();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const isRw = i18n.language?.startsWith('rw');
  const isFr = i18n.language?.startsWith('fr');

  const categories = ['All', 'Environment', 'Education', 'Health', 'Social Action', 'Enterprise'];

  const getCategoryLabel = (cat: string) => {
    if (isRw) {
      switch (cat) {
        case 'All':
          return 'Byose';
        case 'Environment':
          return 'Ibidukikije';
        case 'Education':
          return 'Uburezi';
        case 'Health':
          return 'Ubuzima';
        case 'Social Action':
          return 'Imibereho Myiza';
        case 'Enterprise':
          return 'Koperative n\'Ubucuruzi';
        default:
          return cat;
      }
    }
    if (isFr) {
      switch (cat) {
        case 'All':
          return 'Tout';
        case 'Environment':
          return 'Environnement';
        case 'Education':
          return 'Éducation';
        case 'Health':
          return 'Santé';
        case 'Social Action':
          return 'Action Sociale';
        case 'Enterprise':
          return 'Entreprise';
        default:
          return cat;
      }
    }
    return cat;
  };

  const filteredOrgs = useMemo(() => {
    if (!orgs) return [];
    const validOrgs = orgs.filter((o) => {
      const isPublic = o.is_public_directory !== false && o.allow_public_joining !== false;
      const matchesSearch =
        !searchQuery ||
        o.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (o.tagline && o.tagline.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'All' || o.org_category === selectedCategory;
      return isPublic && matchesSearch && matchesCategory;
    });

    if (validOrgs.length <= 6) return validOrgs;

    // Pick 6 randomly from available public organizations
    const shuffled = [...validOrgs].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 6);
  }, [orgs, searchQuery, selectedCategory]);

  return (
    <section
      id="discovery"
      className="py-16 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800 px-6"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8.5">
          <div>
            <h2 className="text-xl md:text-2xl font-bold font-display text-gray-900 dark:text-white">
              {t('landing.featured')}
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">{t('landing.directory_desc')}</p>
          </div>

          {/* Quick Search Input */}
          <div className="w-full md:w-80 select-none">
            <Input
              type="text"
              placeholder={t('landing.search_placeholder')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              prefixIcon={<Search className="h-4 w-4 text-gray-400" />}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex gap-2.5 overflow-x-auto pb-4 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full shrink-0 border cursor-pointer transition ${
                selectedCategory === cat
                  ? 'bg-[#15803D] border-[#15803D] text-white shadow-xs'
                  : 'bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-300 hover:bg-gray-100'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>

        {/* Org Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, idx) => (
              <div
                key={idx}
                className="h-64 bg-gray-50 dark:bg-slate-800 border rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : filteredOrgs.length === 0 ? (
          <EmptyState
            title={
              isRw
                ? 'Nta Muyoboro Uhuye'
                : isFr
                ? 'Aucune Organisation trouvée'
                : 'No Organizations Matched'
            }
            message={
              isRw
                ? 'Gerageza guhindura amagambo ushakisha cyangwa uhitemo ibindi bice.'
                : isFr
                ? 'Essayez de modifier vos mots-clés ou sélectionnez d\'autres catégories.'
                : 'Try customizing your keywords or select another categories.'
            }
            action={
              <a href={PORTAL_LINKS.SIGN_UP}>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  Register New Organization
                </Button>
              </a>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOrgs.map((org) => (
              <Card
                key={org.id}
                padding={false}
                className="flex flex-col h-full group hover:border-[var(--org-primary)] transition cursor-pointer"
                onClick={() => navigate(`/@${org.slug}`)}
              >
                <div className="relative h-32 w-full bg-slate-100 overflow-hidden">
                  {org.cover_url &&
                  !(org.cover_url.startsWith('from-') || !org.cover_url.includes('/')) ? (
                    <ResolvedImage
                      src={org.cover_url}
                      alt={org.name}
                      className="h-full w-full object-cover group-hover:scale-105 transition duration-200"
                      bucketName="covers"
                    />
                  ) : org.cover_url ? (
                    <div
                      className={`h-full w-full bg-gradient-to-tr ${org.cover_url} group-hover:scale-105 transition duration-200`}
                    />
                  ) : (
                    <div
                      className={`h-full w-full bg-gradient-to-tr ${
                        org.org_category?.toLowerCase() === 'environment'
                          ? 'from-emerald-500 to-green-600'
                          : org.org_category?.toLowerCase() === 'education'
                          ? 'from-indigo-500 to-purple-600'
                          : org.org_category?.toLowerCase() === 'health'
                          ? 'from-cyan-500 to-sky-600'
                          : org.org_category?.toLowerCase() === 'social action' ||
                            org.org_category?.toLowerCase() === 'social_action'
                          ? 'from-rose-500 to-pink-600'
                          : org.org_category?.toLowerCase() === 'enterprise'
                          ? 'from-amber-500 to-orange-600'
                          : 'from-slate-500 to-zinc-600'
                      } opacity-80`}
                    />
                  )}
                  <Badge color="green" className="absolute top-3 left-3 shadow-xs">
                    {getCategoryLabel(org.org_category)}
                  </Badge>

                  {/* Org Logo Avatar floating over cover */}
                  {(org.logo_url || org.dashboard_logo) && (
                    <div className="absolute bottom-2 right-3 h-9 w-9 rounded-xl bg-white p-0.5 shadow-md overflow-hidden border border-white/80">
                      <ResolvedImage
                        src={org.logo_url || org.dashboard_logo}
                        alt={org.name}
                        className="h-full w-full object-contain rounded-lg"
                        bucketName="avatars"
                      />
                    </div>
                  )}
                </div>
                <div className="p-5 flex flex-col flex-grow justify-between gap-4">
                  <div className="flex flex-col">
                    <span className="font-display font-bold text-base text-gray-900 dark:text-white group-hover:text-[var(--org-primary)] truncate">
                      {org.name}
                    </span>
                    <span className="text-xs text-gray-500 mt-1 line-clamp-2 h-8.5">
                      {org.tagline}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-gray-100 dark:border-slate-700 pt-4 mt-auto">
                    <div className="flex flex-col gap-0.5 font-sans leading-none border-0 select-none">
                      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                        {isRw ? 'Ihuriro' : isFr ? 'Espace' : 'Workspace'}
                      </span>
                      <span className="font-mono text-[11px] font-bold text-[var(--org-primary,#15803D)]">
                        @{org.slug}
                      </span>
                    </div>
                    <Link to={`/@${org.slug}`} onClick={(e) => e.stopPropagation()}>
                      <Button size="sm" icon={<Eye className="h-3.5 w-3.5" />}>
                        {isRw ? 'Sura Umuryango' : isFr ? 'Voir l\'Organisation' : 'View Organization'}
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
