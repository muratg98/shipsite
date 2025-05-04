"use client"
import React from 'react';
import { motion } from 'framer-motion';
import type { Page } from '@/payload-types';
import { CMSLink } from '@/components/Link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';

export const SimpleWithImage: React.FC<Page['hero']> = ({ links, richText, topText, showTopText, heroImage }) => {
  return (
    <div className="relative isolate bg-gray-100 px-6 pt-16 pb-24 lg:px-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 py-32 sm:py-12 lg:flex-row lg:py-12">
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="z-50 text-center lg:w-1/2 lg:text-left"
        >
          {showTopText && topText && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="mb-8 flex justify-center lg:justify-start"
            >
              <div className="relative rounded-full px-3 py-1 text-sm/6 text-gray-600 ring-1 ring-red-900/10 hover:ring-gray-900/20">
                {topText}
              </div>
            </motion.div>
          )}

          {richText && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <RichText data={richText} enableGutter={false} />
            </motion.div>
          )}

          {links && links.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start"
            >
              <ul className="flex gap-4">
                {links.map(({ link }, i) => (
                  <li key={i}>
                    <CMSLink {...link} className="" />
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </motion.div>

        {heroImage && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex justify-center lg:w-1/2 lg:justify-end"
          >
            <Media
              className="max-w-full h-auto rounded-lg"
              imgClassName="object-cover w-full h-full"
              priority
              resource={heroImage}
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};
