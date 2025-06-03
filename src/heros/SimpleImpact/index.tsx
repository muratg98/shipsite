'use client';

import React from 'react';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import RichText from '@/components/RichText';
import { ContainerScroll } from '@/components/ui/container-scroll-animation';

export const SimpleImpactHero: React.FC<Page['hero']> = ({
  links,
  richText,
  topText,
  showTopText,
  media,
}) => {

  return (
    <div className="relative flex flex-col overflow-hidden bg-gray-100">
      {/* Decorative vertical lines */}
      <div className="absolute inset-y-0 left-0 w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-y-0 right-0 w-px bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute top-0 h-40 w-px bg-gradient-to-b from-transparent via-blue-500 to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 h-px w-full bg-neutral-200/80 dark:bg-neutral-800/80">
        <div className="absolute mx-auto h-px w-40 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
      </div>

      <ContainerScroll
        titleComponent={
          <div className="text-center px-4 pt-10 md:pt-20">
            {showTopText && topText && (
              <div className="mb-4 inline-block rounded-full border border-neutral-300 px-4 py-1 text-sm font-medium text-neutral-600 dark:border-neutral-700 dark:text-neutral-300">
                {topText}
              </div>
            )}

            {richText && (
              <div className="relative z-10 mx-auto max-w-4xl">
                <RichText data={richText} enableGutter={false} />
              </div>
            )}

            {links && links.length > 0 && (
              <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4 mb-12">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                  />
                ))}
              </div>
            )}
          </div>
        }
      >
        {media && (
          <img
          src={
            typeof media === 'object' && media !== null
              ? media?.sizes?.large?.url ?? media.url ?? undefined
              : typeof media === 'string'
                ? media
                : undefined
          }
          alt="hero"
          height={720}
          width={1400}
          className="mx-auto rounded-2xl object-cover h-full object-left-top"
          draggable={false}
        />
        )}
      </ContainerScroll>
    </div>
  );
};