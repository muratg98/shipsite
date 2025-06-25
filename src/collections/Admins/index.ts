import type { CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { APIError } from 'payload'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { isSuperAdminAccess } from '@/access/isSuperAdmin'

class AdminPasswordError extends APIError {
  constructor(message: string) {
    super(message, 400, undefined, true)
  }
}

export const Admins: CollectionConfig = {
  slug: 'admins',
  access: {
    admin: authenticated,
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: authenticated,
    update: isSuperAdminAccess,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
  },
  auth: {
    verify: true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true
    },
    {
      admin: {
        position: 'sidebar',
      },
      name: 'roles',
      type: 'select',
      defaultValue: ['super-admin'],
      hasMany: true,
      options: ['super-admin', 'admin'],
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user)
        },
      },
    }
  ],
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if ((operation === 'update' || operation === 'create') && args?.data?.password) {
          const { password } = args.data;
          const regex = /^(?:(?=(?:.*[a-z]))(?=(?:.*[A-Z]))(?=(?:.*\d))|(?=(?:.*[a-z]))(?=(?:.*\d))(?=(?:.*[\W_]))|(?=(?:.*[a-z]))(?=(?:.*[A-Z]))(?=(?:.*[\W_]))|(?=(?:.*[A-Z]))(?=(?:.*\d))(?=(?:.*[\W_]))).{7,}$/;
          const isValid = regex.test(password);
          if (!isValid) {
            throw new AdminPasswordError('Password must be at least 7 characters and contain at least 3 of the following: lowercase letter, uppercase letter, number, special character.');
          }
        }
  
        return args;
      },
    ],
  },
  timestamps: true,
}
