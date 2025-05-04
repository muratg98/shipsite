import type { Field } from 'payload';

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  AlignFeature,
  UnorderedListFeature,
  ChecklistFeature,
  StrikethroughFeature,
  ItalicFeature,
  BoldFeature,
} from '@payloadcms/richtext-lexical';

import { linkGroup } from '@/fields/linkGroup';

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'none',
      label: 'Type',
      options: [
        { label: 'None', value: 'none' },
        { label: 'Simple', value: 'simpleImpact' },
        { label: 'Simple With Image', value: 'simpleWithImage' },
        { label: 'Slider Hero', value: 'sliderHero' },
      ],
      required: true,
    },
    {
      name: 'heroImage',
      type: 'upload',
      label: 'Hero Image',
      relationTo: 'media',
      required: true,
      admin: {
        description: 'Upload the main hero image.',
        condition: (_, { type } = {}) => type === 'simpleWithImage',
      },
    },
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => type === 'simpleImpact',
      },
      relationTo: 'media',
      required: false,
    },
    {
      name: 'slider',
      type: 'checkbox',
      label: 'Enable Slider Mode',
      admin: {
        condition: (_, { type } = {}) => type === 'sliderHero',
        description: 'If checked, this section will rotate through multiple images.',
      },
    },
    {
      name: 'sliderImages',
      type: 'array',
      label: 'Slider Images',
      maxRows: 4,
      admin: {
        condition: (_, { slider, type } = {}) => type === 'sliderHero' && slider === true,
        description: 'Upload up to 4 images that will be used in the slider.',
      },
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
    },
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { type } = {}) => type === 'sliderHero',
        description: 'Fallback background image (used if slider is disabled or fails).',
      },
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
          AlignFeature(),
          UnorderedListFeature(),
          ChecklistFeature(),
          StrikethroughFeature(),
          ItalicFeature(),
          BoldFeature(),
        ],
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'showTopText',
      type: 'checkbox',
      label: 'Show Top Text',
      admin: {
        description: 'Check this box to display a top text input field.',
      },
    },
    {
      name: 'topText',
      type: 'text',
      label: 'Top Text',
      maxLength: 50,
      admin: {
        description: 'Enter the top text to display (maximum 50 characters).',
        condition: (_, { showTopText } = {}) => showTopText === true,
      },
    },
  ],
  label: false,
};
