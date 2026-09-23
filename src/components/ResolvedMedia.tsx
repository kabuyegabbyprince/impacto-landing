import React, { useState, useEffect } from 'react';
import { resolveFileUrl, getStoragePublicUrl } from '../lib/storageService';
import { ImageIcon } from 'lucide-react';

interface ResolvedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  bucketName?: string;
  fallbackSrc?: string;
  showPlaceholderIcon?: boolean;
}

export const ResolvedImage: React.FC<ResolvedImageProps> = ({
  src,
  bucketName = 'avatars',
  fallbackSrc = '',
  alt = 'Media image',
  className = '',
  showPlaceholderIcon = true,
  ...props
}) => {
  const [resolvedPrimary, setResolvedPrimary] = useState<string>(() =>
    src ? getStoragePublicUrl(src, bucketName) : ''
  );
  const [resolvedFallback, setResolvedFallback] = useState<string>(() =>
    fallbackSrc ? getStoragePublicUrl(fallbackSrc, bucketName) : ''
  );
  const [hasPrimaryError, setHasPrimaryError] = useState<boolean>(false);
  const [hasFallbackError, setHasFallbackError] = useState<boolean>(false);

  useEffect(() => {
    let isMounted = true;

    setHasPrimaryError(false);
    setHasFallbackError(false);

    // Synchronous initial assignment
    const syncPrimary = src ? getStoragePublicUrl(src, bucketName) : '';
    const syncFallback = fallbackSrc ? getStoragePublicUrl(fallbackSrc, bucketName) : '';
    setResolvedPrimary(syncPrimary);
    setResolvedFallback(syncFallback);

    // Asynchronous resolution (signed URLs for bucketName::path)
    if (src) {
      resolveFileUrl(src, bucketName).then((url) => {
        if (isMounted && url) setResolvedPrimary(url);
      });
    }

    if (fallbackSrc) {
      resolveFileUrl(fallbackSrc, bucketName).then((url) => {
        if (isMounted && url) setResolvedFallback(url);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [src, fallbackSrc, bucketName]);

  // Determine which source to display
  const activeSrc =
    !hasPrimaryError && resolvedPrimary
      ? resolvedPrimary
      : !hasFallbackError && resolvedFallback
      ? resolvedFallback
      : '';

  if (!activeSrc) {
    return (
      <div
        className={`bg-slate-100 dark:bg-slate-800 flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 text-xs p-2 select-none ${className}`}
      >
        {showPlaceholderIcon && <ImageIcon className="h-5 w-5 mb-1 opacity-50" />}
        <span className="text-[11px] font-medium opacity-75">{alt || 'Photo'}</span>
      </div>
    );
  }

  return (
    <img
      src={activeSrc}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      crossOrigin="anonymous"
      onError={() => {
        if (!hasPrimaryError && resolvedPrimary) {
          setHasPrimaryError(true);
        } else {
          setHasFallbackError(true);
        }
      }}
      loading="lazy"
      {...props}
    />
  );
};


