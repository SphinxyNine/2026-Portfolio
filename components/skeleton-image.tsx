'use client';

import Image, { type ImageProps } from 'next/image';
import { useState } from 'react';

type SkeletonImageProps = Omit<ImageProps, 'src' | 'fill'> & { src: string };

// The parent reserves the image space. Keep the native image visible so cached
// images and pages without JavaScript never wait for the placeholder to clear.
export function SkeletonImage({ src, onLoad, onError, ...props }: SkeletonImageProps) {
  const [settledSrc, setSettledSrc] = useState<string>();
  return (
    <>
      {settledSrc !== src && <span className="image-skeleton" aria-hidden="true" />}
      <Image
        {...props}
        src={src}
        fill
        onLoad={(event) => { setSettledSrc(src); onLoad?.(event); }}
        onError={(event) => { setSettledSrc(src); onError?.(event); }}
      />
    </>
  );
}
