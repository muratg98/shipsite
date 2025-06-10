import type { CollectionConfig } from 'payload'
import { authenticated } from '../../access/authenticated'
import { APIError } from 'payload'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { tenantsArrayField } from '@payloadcms/plugin-multi-tenant/fields'
import { isTenantAdminOrSuperAdmin } from '@/access/isTenantAdminorSuperAdmin'

class AdminPasswordError extends APIError {
  constructor(message: string) {
    super(message, 400, undefined, true)
  }
}

const defaultTenantArrayField = tenantsArrayField({
  tenantsArrayFieldName: 'tenants',
  tenantsArrayTenantFieldName: 'tenant',
  tenantsCollectionSlug: 'tenants',
  arrayFieldAccess: {},
  tenantFieldAccess: {},
  rowFields: [
    {
      name: 'roles',
      type: 'select',
      defaultValue: ['tenant-viewer'],
      hasMany: true,
      options: ['tenant-admin', 'tenant-viewer'],
      required: true,
    },
  ],
})

export const Admins: CollectionConfig = {
  slug: 'admins',
  access: {
    admin: authenticated,
    create: isTenantAdminOrSuperAdmin,
    delete: isTenantAdminOrSuperAdmin,
    read: isTenantAdminOrSuperAdmin,
    update: isTenantAdminOrSuperAdmin,
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
      defaultValue: ['user'],
      hasMany: true,
      options: ['super-admin', 'user'],
      access: {
        update: ({ req }) => {
          return isSuperAdmin(req.user)
        },
      },
    },
    {
      ...defaultTenantArrayField,
      admin: {
        ...(defaultTenantArrayField?.admin || {}),
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    beforeOperation: [
      ({ args, operation }) => {
        if ((operation === 'update' || operation === 'create') && args?.data?.password) {
          const { password } = args.data;
          const regex = /^(?:(?=(?:.*[a-z]))(?=(?:.*[A-Z]))(?=(?:.*\d))|(?=(?:.*[a-z]))(?=(?:.*\d))(?=(?:.*[\W_]))|(?=(?:.*[a-z]))(?=(?:.*[A-Z]))(?=(?:.*[\W_]))|(?=(?:.*[A-Z]))(?=(?:.*\d))(?=(?:.*[\W_]))).{7,}$/;
          const isValid = regex.test(password);
          if (!isValid) {
            throw new AdminPasswordError('Password must be at least 18 characters and contain at least 3 of the following: lowercase letter, uppercase letter, number, special character.');
          }
        }
  
        return args;
      },
    ],

  },
  timestamps: true,
}
