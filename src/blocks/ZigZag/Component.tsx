'use client';

import { motion } from 'framer-motion';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import { CMSLink } from '@/components/Link';
import { ZigzagBlock } from '@/payload-types';

export const ZigZagBlock = ({ content, header, title, description, blockName }: ZigzagBlock) => {
  return (
    <div className="bg-white p-4" id={blockName||undefined}>
        <motion.div
          className="mx-auto max-w-4xl lg:text-center pb-24"
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
      <div className="md:w-full max-w-7xl mx-auto">
        {content.map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div key={index}>
              <div className="grid md:grid-cols-2 gap-12 mb-24">
                <div className={`text-left ${isEven ? '' : 'md:order-1'}`}>
                  <motion.h2
                    className="text-base/7 font-semibold text-indigo-600 pb-4"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    {item.header}
                  </motion.h2>
                  <div className="mb-4 text-black leading-relaxed">
                    <RichText data={item.richText} enableGutter={false} />
                  </div>
                  {item.links && item.links.length > 0 && (
                    <div className="relative z-10 mt-8 flex flex-wrap items-left gap-4 mb-12">
                        {item.links.map(({ link }, i) => (
                        <CMSLink
                            key={i}
                            {...link}
                            className="transform rounded-lg transition-all duration-300 hover:-translate-y-0.5 dark:border-gray-700 dark:bg-black dark:text-white dark:hover:bg-gray-900"
                        />
                        ))}
                    </div>
                    )}
                </div>
                <div className="max-h-30 self-center">
                  <motion.div
                    className="flex items-start justify-center self-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
                    viewport={{ once: true, amount: 0.2 }}
                  >
                    <Media
                      resource={item.image}
                      alt="Zigzag image"
                      className="rounded-lg object-contain w-full h-full"
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};