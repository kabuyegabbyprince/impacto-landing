import { supabase } from './supabase';

const SUPABASE_URL =
  (import.meta as any).env?.VITE_SUPABASE_URL || 'https://wwhjtdndcbmzcwkocjph.supabase.co';

/**
 * Normalizes and synchronously resolves a storage path, relative URL, or full URL to an accessible image URL.
 */
export function getStoragePublicUrl(
  pathOrUrl: string | undefined | null,
  defaultBucket = 'avatars'
): string {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') return '';
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return '';

  // Already a full or relative URL / data / blob
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:')
  ) {
    return trimmed;
  }

  // Root-relative asset path (e.g. /logo.png or /images/...)
  if (trimmed.startsWith('/')) {
    return trimmed;
  }

  // Check if it's icon reference
  if (trimmed.startsWith('icon:')) {
    return '';
  }

  // Detect bucket prefix from path:
  // e.g. "avatars/org-1.png", "covers/banner.jpg", "gallery/event-1.jpg", "organizations/...", "documents/..."
  const knownBuckets = [
    'avatars',
    'covers',
    'gallery',
    'organizations',
    'documents',
    'logos',
    'news',
    'receipts',
    'marketplace',
    'products',
    'uploads',
    'media',
  ];

  let bucket = defaultBucket;
  let objectPath = trimmed;

  for (const b of knownBuckets) {
    if (trimmed.startsWith(`${b}/`)) {
      bucket = b;
      objectPath = trimmed.slice(b.length + 1);
      break;
    }
  }

  try {
    const { data } = supabase.storage.from(bucket).getPublicUrl(objectPath);
    if (data?.publicUrl) {
      return data.publicUrl;
    }
  } catch (err) {
    console.warn('Error resolving public URL for storage:', err);
  }

  // Fallback direct URL construction
  return `${SUPABASE_URL}/storage/v1/object/public/${bucket}/${objectPath}`;
}

export async function resolveFileUrl(pathOrUrl: string, bucket = 'avatars'): Promise<string> {
  return getStoragePublicUrl(pathOrUrl, bucket);
}
