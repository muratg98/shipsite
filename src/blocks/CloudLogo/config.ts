import type { Block } from 'payload';

export const CloudLogos: Block = {
  slug: 'cloudLogos',
  interfaceName: 'CloudLogosBlock',
  fields: [
    {
      name: 'companyLogos',
      type: 'array',
      label: 'Company Logos',
      maxRows: 7,
      admin: {
        description: 'Upload up to 7 logos that will be used in the component.',
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
      name: 'grayscale',
      type: 'checkbox',
      label: 'Apply Grayscale Effect',
      defaultValue: false, 
    },
  ],
};
