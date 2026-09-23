/**
 * Curated High-Quality Fallback Imagery for Rwandan Cooperatives & Organizations
 * Categorized by civic domain for authentic visual presentation.
 */

export interface CategoryMediaSet {
  cover: string;
  logo: string;
  gallery: string[];
}

export const CATEGORY_MEDIA_SETS: Record<string, CategoryMediaSet> = {
  Environment: {
    cover:
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1200&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1448375240586-882707db888b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&auto=format&fit=crop&q=80',
    ],
  },
  Enterprise: {
    cover:
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1200&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1595974482597-4b8da8879bc5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&auto=format&fit=crop&q=80',
    ],
  },
  Health: {
    cover:
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=800&auto=format&fit=crop&q=80',
    ],
  },
  Education: {
    cover:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    ],
  },
  'Social Action': {
    cover:
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=1200&auto=format&fit=crop&q=80',
    logo: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=200&auto=format&fit=crop&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=800&auto=format&fit=crop&q=80',
    ],
  },
};

export const DEFAULT_MEDIA_SET: CategoryMediaSet = CATEGORY_MEDIA_SETS.Environment;

export function getCategoryMediaSet(category?: string): CategoryMediaSet {
  if (!category) return DEFAULT_MEDIA_SET;
  const match = Object.keys(CATEGORY_MEDIA_SETS).find(
    (k) => k.toLowerCase() === category.toLowerCase()
  );
  return match ? CATEGORY_MEDIA_SETS[match] : DEFAULT_MEDIA_SET;
}

export function getCategoryFallbackCover(category?: string): string {
  return getCategoryMediaSet(category).cover;
}

export function getCategoryFallbackLogo(category?: string): string {
  return getCategoryMediaSet(category).logo;
}

export function getCategoryFallbackGallery(category?: string): string[] {
  return getCategoryMediaSet(category).gallery;
}
