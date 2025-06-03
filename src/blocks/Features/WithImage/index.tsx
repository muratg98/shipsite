'use client';

import { ReactElement } from 'react';
import { Media } from '@/components/Media';
import { motion } from 'framer-motion';

export interface Feature {
  id: number;
  name: string;
  description: string;
  icon: ReactElement;
}

interface WithImageProps {
  header: string;
  title: string;
  description: string;
  features: Feature[];
  image: any;
  blockName: string;
}

export default function WithImage({
  header,
  title,
  description,
  features,
  image,
  blockName
}: WithImageProps) {
  return (
    <div className="overflow-hidden bg-white pt-12 pb-24 sm:pb-32" id={blockName || undefined}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">

          {/* Animated Text Section */}
          <motion.div
            className="lg:pt-4 lg:pr-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="lg:max-w-lg">
              <h2 className="text-base/7 font-semibold text-indigo-600">{header}</h2>
              <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl">
                {title}
              </p>
              <p className="mt-6 text-lg/8 text-gray-600">{description}</p>
              <dl className="mt-10 max-w-xl space-y-8 text-base/7 text-gray-600 lg:max-w-none">
                {features.map((feature) => (
                  <div key={feature.id} className="relative pl-9">
                    <dt className="inline font-semibold text-gray-900">
                      <div className="absolute top-1 left-1 size-5 text-indigo-600">
                        {feature.icon}
                      </div>
                      {feature.name}.
                    </dt>
                    <dd className="inline"> {feature.description}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </motion.div>

          {/* Animated Image Section */}
          <motion.div
            className="flex items-start justify-center self-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <Media
              resource={image}
              alt="Feature image"
              className="w-auto max-w-full h-auto rounded-xl shadow-xl ring-1 ring-gray-400/10"
            />
          </motion.div>

        </div>
      </div>
    </div>
  );
}