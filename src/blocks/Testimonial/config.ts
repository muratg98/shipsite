import { Block } from 'payload';

export const TestimonialBlock: Block = {
  slug: 'testimonial',
  interfaceName: 'testimonialBlock',
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
      name: 'reviews',
      type: 'array',
      label: 'Reviews',
      minRows: 1,
      required: true,
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: false,
        },
        {
          name: 'company',
          type: 'text',
          required: false,
        },
        {
          name: 'jobRole',
          type: 'text',
          label: 'Job Role',
          required: false,
        },
        {
          name: 'review',
          type: 'textarea',
          required: true,
        },
      ],
    },
  ],
};
