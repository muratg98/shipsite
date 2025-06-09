import type { CollectionBeforeValidateHook } from 'payload'
import type { Page } from '@/payload-types'

export const addTenantSlug: CollectionBeforeValidateHook = async ({ data, req }) => {
  if (!data?.tenant) return data

  const payload = req.payload
  const tenantId = typeof data.tenant === 'string' ? data.tenant : data.tenant?.id

  if (!tenantId) return data

  // Look up the tenant by ID
  const tenant = await payload.findByID({
    collection: 'tenants',
    id: tenantId,
  })

  if (tenant?.isMainTenant) {
    return data
  }

  const tenantSlug = tenant.slug
  const pageSlug = typeof data.slug === 'string' ? data.slug.split('/').pop() : ''

  if (tenantSlug && pageSlug) {
    data.slug = `${tenantSlug}/${pageSlug}`
  }

  return data
}
