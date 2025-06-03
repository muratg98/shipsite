'use client'
import React from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import RichText from '@/components/RichText';
import { AccordionBlock as AccordionBlockProp } from '@/payload-types';
import { motion } from 'framer-motion';

const colsSpanClasses = {
  full: 'col-span-4 lg:col-span-12',
  half: 'col-span-4 lg:col-span-6',
  oneThird: 'col-span-4 lg:col-span-4',
  twoThirds: 'col-span-4 lg:col-span-8',
};

export const AccordionBlock: React.FC<AccordionBlockProp> = ({ size = 'full', items, header, title, description, blockName }) => {
  if (!items || items.length === 0) return null;

  return (
    <div className="container my-16" id={blockName || undefined}>
      <motion.div
          className="mx-auto max-w-2xl lg:text-center pb-16"
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
      <div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
        {items.map((item, index) => (
          <div key={index} className={colsSpanClasses[size ?? 'full']}>
            <Accordion.Root type="single" collapsible className="max-w-5xl mx-auto rounded-lg border divide-y overflow-hidden">
              <Accordion.Item value={`item-${index}`} className="focus:outline-none">
                <Accordion.Header className="w-full">
                  <Accordion.Trigger className="w-full flex items-center justify-between px-6 py-4 text-left font-medium text-slate-900 text-base hover:bg-gray-100 transition-all group">
                    <span>{item.trigger}</span>
                    <ChevronDown className="ml-2 h-4 w-4 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-180" />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden transition-all data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                  <div className="px-6 py-4 text-sm text-slate-600 leading-relaxed">
                    <RichText data={item.content} />
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            </Accordion.Root>
          </div>
        ))}
      </div>
    </div>
  );
};