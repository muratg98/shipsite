import type { CollectionConfig, FieldHook } from 'payload'
import { isSuperAdminAccess, isSuperAdmin } from '@/access/isSuperAdmin'
import { updateAndDeleteAccess } from './access/updateAndDelete'
import { APIError } from 'payload'

const enforceSingleMainTenant: FieldHook = async ({ value, req, originalDoc }) => {
  if (!value) return value // only run if isMainTenant is being set to true

  const payload = req.payload

  const existing = await payload.find({
    collection: 'tenants',
    where: {
      isMainTenant: {
        equals: true,
      },
    },
    limit: 1,
  })

  const alreadyMainTenant = existing.docs[0]

  const isSameDoc = alreadyMainTenant?.id === originalDoc?.id

  if (alreadyMainTenant && !isSameDoc) {
    throw new APIError('Only one tenant can be marked as the main tenant.')
  }

  return value
}

export const Tenants: CollectionConfig = {
  slug: 'tenants',
  access: {
    create: isSuperAdminAccess,
    delete: updateAndDeleteAccess,
    read: ({ req }) => Boolean(req.user),
    update: updateAndDeleteAccess,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'domain',
      type: 'text',
      unique: true,
      admin: {
        description: 'Used for domain-based tenant handling',
      },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'Used for URL paths, example: /tenant-slug/page-slug',
      },
    },
    {
      name: 'allowPublicRead',
      type: 'checkbox',
      defaultValue: false,
      index: true,
      admin: {
        description: 'If checked, logging in is not required to read. Useful for public pages.',
        position: 'sidebar',
      },
    },
    {
      name: 'isMainTenant',
      type: 'checkbox',
      defaultValue: false,
      hooks: {
        beforeValidate: [enforceSingleMainTenant],
      },
      access: {
        update: ({ req }) => isSuperAdmin(req.user),
        create: ({ req }) => isSuperAdmin(req.user),
        read: ({ req }) => isSuperAdmin(req.user)
      },
      admin: {
        condition: () => true, // still needed for UI to show/hide
        position: 'sidebar',
      },
    },
  ],
}
