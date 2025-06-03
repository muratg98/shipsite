'use client';

import { motion } from 'framer-motion';
import { TestimonialBlock as TestimonialBlockType } from '@/payload-types';
import { Media } from '@/components/Media';

export const TestimonialBlock = ({ reviews, header, description, title, blockName }: TestimonialBlockType) => {
  return (
    <div className="p-4" id={blockName || undefined}>
      <motion.div
        className="mx-auto max-w-4xl lg:text-center pb-4"
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

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16 max-w-6xl max-lg:max-w-3xl max-md:max-w-md mx-auto mt-24">
        {reviews?.map((testimonial, index) => (
          <motion.div
            key={index}
            className="w-full p-4 rounded-md mx-auto shadow-md border bg-white relative"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            {testimonial.image && (
            <div className="relative w-[70px] h-[70px] mx-auto -top-10 border-2 border-indigo-600 rounded-full overflow-hidden">
                <Media
                resource={testimonial.image}
                alt={testimonial.firstName || `testimonial ${index} image`}
                className="w-full h-full object-cover"
                />
            </div>
            )}

            <div className="text-center">
              <p className="text-sm text-slate-900 font-normal leading-relaxed">
                {testimonial.review}
              </p>
            </div>
            <div className="mt-4 text-center">
              <h4 className="text-slate-900 text-sm whitespace-nowrap font-semibold">
                {testimonial.firstName} {testimonial.lastName}
              </h4>
            </div>
            <div className="text-center">
              <h4 className="text-slate-900 text-xs whitespace-nowrap font-semibold">
              {testimonial.jobRole} - {testimonial.company}
              </h4>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};