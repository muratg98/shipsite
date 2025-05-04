import type { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { HeadingFeature, InlineToolbarFeature, FixedToolbarFeature } from '@payloadcms/richtext-lexical';
import { linkGroup } from '@/fields/linkGroup';

export const Zigzag: Block = {
  slug: 'zigzag',
  interfaceName: 'ZigzagBlock',
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
      name: 'content',
      type: 'array',
      required: true,
      label: 'Zigzag Content Items',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'header',
          type: 'text',
          required: true,
        },
        {
          name: 'richText',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: false,
        },
        linkGroup({
              overrides: {
                maxRows: 2,
            },
        }),
      ],
    },
  ],
};
