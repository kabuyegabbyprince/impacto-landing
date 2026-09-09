import React, { useState, useEffect } from 'react';
import { getStoragePublicUrl } from '../lib/storageService';

interface ResolvedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  bucketName?: string;
  fallbackSrc?: string;
}

export const ResolvedImage: React.FC<ResolvedImageProps> = ({
  src,
  bucketName = 'avatars',
  fallbackSrc = '',
  alt = 'Media image',
  className = '',
  ...props
}) => {
  const [hasError, setHasError] = useState<boolean>(false);

  const resolved = src ? getStoragePublicUrl(src, bucketName) : fallbackSrc;

  useEffect(() => {
    setHasError(false);
  }, [src]);

  if (!src && !fallbackSrc) {
    return (
      <div
        className={`bg-slate-100 flex items-center justify-center text-slate-400 text-xs ${className}`}
      >
        <span className="text-[11px] text-slate-400">No media</span>
      </div>
    );
  }

  if (hasError || !resolved) {
    if (fallbackSrc && resolved !== fallbackSrc) {
      return (
        <img
          src={fallbackSrc}
          alt={alt}
          className={className}
          {...props}
        />
      );
    }
    return (
      <div
        className={`bg-slate-100 flex items-center justify-center text-slate-400 text-xs ${className}`}
      >
        <span className="text-[11px] text-slate-400 font-medium">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      src={resolved}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      loading="lazy"
      {...props}
    />
  );
};
