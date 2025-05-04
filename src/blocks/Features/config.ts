import type { Block } from 'payload'

export const Features: Block = {
  slug: 'features',
  interfaceName: 'FeaturesSectionBlock',
  fields: [
    {
      name: 'layout',
      type: 'select',
      required: true,
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'With Image', value: 'withImage' },
      ],
    },
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
      name: 'features',
      type: 'array',
      required: true,
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          type: 'textarea',
          required: true,
        },
      ],
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      admin: {
        condition: (_, siblingData) => siblingData?.layout === 'withImage',
      },
    },
  ],
}
