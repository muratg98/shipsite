import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { noone } from '@/access/noone'

export const User: CollectionConfig = {
  slug: 'user',
  access: {
    admin: authenticated,
    create: noone,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    disableLocalStrategy: true
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      name: 'email',
      type: 'text',
      required: true
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      required: true
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'subscription',
      type: 'checkbox',
      required: false,
    },
    {
      name: 'customerId',
      type: 'text',
      required: true
    }
  ],
  timestamps: true,
}
