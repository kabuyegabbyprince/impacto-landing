import { supabase, isSupabaseConfigured } from './supabase';
import { APP_CONFIG } from '../config';

const SUPABASE_URL = APP_CONFIG.SUPABASE.URL;

// Memory cache for signed URLs to prevent redundant network calls (TTL: 12 hours)
const signedUrlCache = new Map<string, { url: string; expiresAt: number }>();

export interface ParsedStoragePath {
  bucket: string;
  path: string;
  isExternalUrl: boolean;
}

/**
 * Helper to parse storage reference keys like "avatars::folder/file.jpg",
 * bucket relative paths "avatars/file.jpg", or direct URLs.
 */
export function parseStorageReference(
  pathOrUrl: string | undefined | null,
  defaultBucket = APP_CONFIG.SUPABASE.DEFAULT_BUCKET
): ParsedStoragePath {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') {
    return { bucket: defaultBucket, path: '', isExternalUrl: false };
  }

  const trimmed = pathOrUrl.trim();
  if (!trimmed) {
    return { bucket: defaultBucket, path: '', isExternalUrl: false };
  }

  // Handle direct HTTP, HTTPS, data, or blob URLs or root asset paths
  if (
    trimmed.startsWith('http://') ||
    trimmed.startsWith('https://') ||
    trimmed.startsWith('data:') ||
    trimmed.startsWith('blob:') ||
    trimmed.startsWith('/')
  ) {
    return { bucket: defaultBucket, path: trimmed, isExternalUrl: true };
  }

  // Handle reference key syntax: "bucketName::file/path.jpg"
  if (trimmed.includes('::')) {
    const parts = trimmed.split('::');
    const bucket = parts[0] || defaultBucket;
    const path = parts.slice(1).join('::');
    return { bucket, path, isExternalUrl: false };
  }

  // Handle traditional bucket prefix syntax e.g. "avatars/user123.png"
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
    'impacto-files',
    'uploads',
    'media',
  ];

  for (const b of knownBuckets) {
    if (trimmed.startsWith(`${b}/`)) {
      return { bucket: b, path: trimmed.slice(b.length + 1), isExternalUrl: false };
    }
  }

  return { bucket: defaultBucket, path: trimmed, isExternalUrl: false };
}

/**
 * Asynchronously resolves a storage reference key (or URL) into an authenticated signed URL
 * (valid for 24h) or a public URL.
 */
export async function resolveFileUrl(
  pathOrUrl: string | undefined | null,
  defaultBucket = APP_CONFIG.SUPABASE.DEFAULT_BUCKET
): Promise<string> {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') return '';
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return '';

  const parsed = parseStorageReference(trimmed, defaultBucket);

  if (parsed.isExternalUrl) {
    return parsed.path;
  }

  if (!parsed.path) return '';

  const cacheKey = `${parsed.bucket}::${parsed.path}`;
  const now = Date.now();
  const cached = signedUrlCache.get(cacheKey);

  if (cached && cached.expiresAt > now) {
    return cached.url;
  }

  // If Supabase is configured, generate a 24-hour signed URL (86400 seconds)
  if (isSupabaseConfigured) {
    try {
      const { data, error } = await supabase.storage
        .from(parsed.bucket)
        .createSignedUrl(parsed.path, 86400);

      if (data?.signedUrl && !error) {
        // Cache signed URL for 12 hours
        signedUrlCache.set(cacheKey, {
          url: data.signedUrl,
          expiresAt: now + 12 * 3600 * 1000,
        });
        return data.signedUrl;
      }
    } catch (err) {
      console.warn(`Failed to create signed URL for ${cacheKey}, trying public URL:`, err);
    }
  }

  // Fallback to synchronous public URL lookup
  return getStoragePublicUrl(trimmed, defaultBucket);
}

/**
 * Synchronously generates a public URL for a given storage path or reference key.
 */
export function getStoragePublicUrl(
  pathOrUrl: string | undefined | null,
  defaultBucket = APP_CONFIG.SUPABASE.DEFAULT_BUCKET
): string {
  if (!pathOrUrl || typeof pathOrUrl !== 'string') return '';
  const trimmed = pathOrUrl.trim();
  if (!trimmed) return '';

  const parsed = parseStorageReference(trimmed, defaultBucket);

  if (parsed.isExternalUrl) {
    return parsed.path;
  }

  if (!parsed.path) return '';

  if (isSupabaseConfigured) {
    try {
      const { data } = supabase.storage.from(parsed.bucket).getPublicUrl(parsed.path);
      if (data?.publicUrl) {
        return data.publicUrl;
      }
    } catch (err) {
      console.warn('Error fetching public URL:', err);
    }
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${parsed.bucket}/${parsed.path}`;
}

/**
 * Uploads a file directly to Supabase Storage and returns a lightweight reference key
 * formatted as "bucketName::file/path.jpg"
 */
export async function uploadFileToSupabase(
  file: File | Blob,
  bucketName = 'uploads',
  prefix = ''
): Promise<{ referenceKey: string; publicUrl: string; error?: any }> {
  try {
    const rawFileName = (file as File).name || 'attachment.bin';
    const cleanFileName = rawFileName.replace(/[^a-zA-Z0-9.-]/g, '_');
    const folderPrefix = prefix ? `${prefix.replace(/\/$/, '')}/` : '';
    const filePath = `${folderPrefix}${Date.now()}-${cleanFileName}`;

    if (isSupabaseConfigured) {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(filePath, file, { upsert: true, cacheControl: '3600' });

      if (error) {
        console.error('Supabase upload error:', error);
        return { referenceKey: '', publicUrl: '', error };
      }

      const referenceKey = `${bucketName}::${data?.path || filePath}`;
      const publicUrl = getStoragePublicUrl(referenceKey, bucketName);

      return { referenceKey, publicUrl };
    }

    // Local / offline fallback mock reference key
    const fallbackKey = `${bucketName}::${filePath}`;
    return { referenceKey: fallbackKey, publicUrl: '' };
  } catch (error) {
    console.error('Error in uploadFileToSupabase:', error);
    return { referenceKey: '', publicUrl: '', error };
  }
}

