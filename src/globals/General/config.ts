import type { GlobalConfig } from 'payload';
import { revalidateGeneral } from './hooks/revalidateGeneral';

export const General: GlobalConfig = {
  slug: 'general',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'companyName',
      type: 'text',
      label: 'Company Name',
      required: true,
      admin: {
        description: 'The name of your company.',
      },
    },
    {
      name: 'companyDescription',
      type: 'textarea',
      label: 'Company Description',
      required: true,
      admin: {
        description: 'A brief description of your company.',
      },
    },
    {
      name: 'industry',
      type: 'select',
      label: 'Industry',
      required: true,
      options: [
        { label: 'Technology', value: 'technology' },
        { label: 'Finance', value: 'finance' },
        { label: 'Healthcare', value: 'healthcare' },
        { label: 'Education', value: 'education' },
        { label: 'Retail', value: 'retail' },
        { label: 'Other', value: 'other' },
      ],
      admin: {
        description: 'Select the industry your company operates in.',
      },
    },
    {
      name: 'isTrademarked',
      type: 'checkbox',
      label: 'Trademarked',
      required: true
    },
  ],
  hooks: {
    afterChange: [revalidateGeneral]
  }
};
