import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media', // assuming you have a media collection
      required: false,
    },
    {
      name: 'navSections',
      type: 'array',
      label: 'Navigation Sections',
      fields: [
        {
          name: 'name',
          type: 'text',
          required: true,
        },
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
              RowLabel: '@/globals/Footer/RowLabel#RowLabel',
            },
          },
        },
      ],
      maxRows: 3,
    },
    {
      name: 'useBottomText',
      type: 'checkbox',
      label: 'Use Bottom Text',
      defaultValue: false,
    },
    {
      name: 'bottomText',
      type: 'textarea',
      admin: {
        condition: (_, siblingData) => Boolean(siblingData?.useBottomText),
      },
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
