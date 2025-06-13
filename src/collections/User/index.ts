import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { noone } from '@/access/noone'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'

export const User: CollectionConfig = {
  slug: 'user',
  access: {
    create: noone,
    delete: isSuperAdminAccess,
    read: isSuperAdminAccess,
    update: isSuperAdminAccess,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    disableLocalStrategy: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'text',
      required: true,
    },
    {
      name: 'emailVerified',
      type: 'checkbox',
      required: true,
    },
    {
      name: 'profileImage',
      type: 'upload',
      relationTo: 'media',
      required: false,
    },
    {
      name: 'stripeCustomerId',
      label: 'Customer ID',
      type: 'text',
      required: true,
    },
    {
      name: 'subscriptionId',
      label: 'Subscription ID',
      type: 'text',
    },
    {
      name: 'status',
      label: 'Subscription Status',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'planName',
      label: 'Plan Name',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'currency',
      label: 'Currency',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'startDate',
      label: 'Start Date',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'renewalDate',
      label: 'Renewal Date',
      type: 'date',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'cancelAtPeriodEnd',
      label: 'Will Cancel at Period End?',
      type: 'checkbox',
      admin: {
        readOnly: true,
      },
    },
  ],
  timestamps: true,
}