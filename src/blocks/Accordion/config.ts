import { Block, Field } from 'payload';
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const accordionItemFields: Field[] = [
  {
    name: 'trigger',
    type: 'text',
    label: 'Trigger Text',
    required: true,
  },
  {
    name: 'content',
    type: 'richText',
    label: 'Content',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => {
        return [
          ...rootFeatures,
          HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
          FixedToolbarFeature(),
          InlineToolbarFeature(),
        ]
      },
    }),
    required: true,
  },
];

export const Accordion: Block = {
  slug: 'accordion',
  interfaceName: 'AccordionBlock',
  fields: [
    {
      name: 'header',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Optional small section header (e.g., “What we offer”)',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
    },
    {
      name: 'size',
      type: 'select',
      label: 'Size',
      defaultValue: 'full',
      options: [
        {
          label: 'Full Width',
          value: 'full',
        },
        {
          label: 'Half Width',
          value: 'half',
        },
        {
          label: 'One Third Width',
          value: 'oneThird',
        },
      ],
    },
    {
      name: 'items',
      type: 'array',
      label: 'Accordion Items',
      minRows: 1,
      required: true,
      fields: accordionItemFields,
    },
  ],
};
