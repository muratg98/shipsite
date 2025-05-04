import type { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { HeadingFeature, InlineToolbarFeature, FixedToolbarFeature } from '@payloadcms/richtext-lexical';

export const Team: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: [
    {
      name: 'header',
      type: 'text',
      required: false,
      admin: {
        placeholder: 'Optional section header (e.g., "Meet Our Team")',
      },
    },
    {
      name: 'title',
      type: 'text',
      required: true,
      admin: {
        placeholder: 'Main title (e.g., "Our Experts")',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: false,
      admin: {
        placeholder: 'Short description about your team',
      },
    },
    {
      name: 'teamMembers',
      type: 'array',
      label: 'Team Members',
      required: true,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'role',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'richText',
          required: false,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
            ],
          }),
          label: 'Short Bio',
        },
        {
          name: 'socials',
          type: 'group',
          label: 'Social Links',
          fields: [
            {
              name: 'facebook',
              type: 'text',
              required: false,
              admin: {
                placeholder: 'Facebook profile URL',
              },
            },
            {
              name: 'twitter',
              type: 'text',
              required: false,
              admin: {
                placeholder: 'Twitter profile URL',
              },
            },
            {
              name: 'linkedin',
              type: 'text',
              required: false,
              admin: {
                placeholder: 'LinkedIn profile URL',
              },
            },
          ],
        },
      ],
    },
  ],
};
