import type { CollectionBeforeValidateHook } from 'payload'

export const validateSlugIsNotTenant: CollectionBeforeValidateHook = async ({ data, req }) => {
  const slug = typeof data?.slug === 'string' ? data.slug : null
  const tenant = data?.tenant
  
  if (!slug || tenant) {
    return data
  }

  const tenantSlugs = await req.payload.find({
    collection: 'tenants',
    limit: 1000,
    depth: 0,
    pagination: false,
    select: { slug: true },
  })

  const allTenantSlugs = tenantSlugs.docs.map((tenant) => tenant.slug)

  if (allTenantSlugs.includes(slug)) {
    throw new Error(`The slug "${slug}" conflicts with an existing tenant slug.`)
  }

  return data
}
