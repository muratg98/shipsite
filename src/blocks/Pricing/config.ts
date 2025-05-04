import { Block } from 'payload';

export const Pricing: Block = {
  slug: 'pricing',
  interfaceName: 'pricingBlock',
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
      name: 'plans',
      type: 'array',
      label: 'Pricing Plans',
      minRows: 1,
      required: true,
      fields: [
        {
    
          name: 'product',
          type: 'relationship',
          relationTo: 'products', // Make sure this matches your actual collection slug
          required: true,
          label: 'Related Product',
        },
      ],
    },
  ],
};
