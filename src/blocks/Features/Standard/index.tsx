'use client';

import { ReactElement } from 'react';
import { motion } from 'framer-motion';

export interface Feature {
  id: number;
  name: string;
  description: string;
  icon: ReactElement;
}

interface StandardProps {
  header: string;
  title: string;
  description: string;
  features: Feature[];
  blockName: string;
}

export default function Standard({
  header,
  title,
  description,
  features,
  blockName,
}: StandardProps) {
  return (
    <div className="bg-white pb-12" id={blockName || undefined}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">

        {/* Animated Heading */}
        <motion.div
          className="mx-auto max-w-2xl lg:text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="text-base/7 font-semibold text-indigo-600">{header}</h2>
          <p className="mt-2 text-4xl font-semibold tracking-tight text-pretty text-gray-900 sm:text-5xl lg:text-balance">
            {title}
          </p>
          <p className="mt-6 text-lg/8 text-gray-600">{description}</p>
        </motion.div>

        {/* Feature Grid with hover effect */}
        <motion.div
          className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-4xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative pl-16 transform transition-transform duration-300 hover:scale-105">
                  <dt className="text-base/7 font-semibold text-gray-900">
                    <div className="absolute top-0 left-0 flex size-10 items-center justify-center rounded-lg bg-indigo-600 text-white">
                      {feature.icon}
                    </div>
                    {feature.name}
                  </dt>
                  <dd className="mt-2 text-base/7 text-gray-600">{feature.description}</dd>
                </div>
              </motion.div>
            ))}
          </dl>
        </motion.div>
      </div>
    </div>
  );
}