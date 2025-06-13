// header.ts (GlobalConfig)
import type { GlobalConfig } from 'payload';
import { link } from '@/fields/link';
import { revalidateHeader } from './hooks/revalidateHeader';

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      fields: [
        link({
          appearances: false,
        }),
      ],
      maxRows: 6,
      admin: {
        initCollapsed: true,
        components: {
          RowLabel: '@/globals/Header/RowLabel#RowLabel',
        },
      },
    },
    {
      name: 'showCTA',
      type: 'checkbox',
      label: 'Show CTA Button',
    },
    {
      name: 'CallToAction',
      type: 'group',
      fields: [
        link({ appearances: false }),
      ],
      admin: {
        condition: (data) => data?.showCTA === true,
      },
    },
    {
      name: 'Styles',
      type: 'group',
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
        }
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
