'use client';

import React from 'react';
import type { CloudLogosBlock as CloudLogoBlockType } from '@/payload-types';
import { Media } from '@/components/Media';

export const CloudLogosBlock: React.FC<CloudLogoBlockType> = ({ companyLogos, grayscale }) => {
  if (!companyLogos || companyLogos.length === 0) return null;

  // use -mt-16 to remove or adjust any top padding
  return (
    <div className="w-full mx-auto -mt-4">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <div
          className="group relative mt-6 flex gap-6 overflow-hidden p-2"
          style={{
            maskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
            WebkitMaskImage:
              'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
          }}
        >
          {Array.from({ length: 5 }).map((_, rowIndex) => (
            <div
              key={`row-${rowIndex}`}
              className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
            >
              {companyLogos.map((logoItem, logoIndex) => (
                <div
                  key={`logo-${rowIndex}-${logoIndex}`}
                  className="flex h-12 w-28 items-center justify-center px-2"
                >
                  {typeof logoItem.image === 'object' && logoItem.image && (
                    <Media
                      resource={logoItem.image}
                      className={`max-h-10 w-full object-contain ${grayscale ? 'filter grayscale' : ''}`}
                      alt={`Company logo ${logoIndex + 1}`}
                    />
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
