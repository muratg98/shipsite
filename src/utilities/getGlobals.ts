import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'
import type { CollectionSlug } from 'payload'

/**
 * Gets a collection that is labelled as a "global" document from any tenant-aware collection
 */

async function getGlobalFromCollection(
  collection: CollectionSlug,
  tenantID: string,
  depth = 0
) {
  console.log(collection, tenantID, depth)
  const payload = await getPayload({ config: configPromise })
  console.log("chjeck payload: ", payload);
  const result = await payload.find({
    collection,  
  })
  console.log('Query result for getGlobalFromCollection:', result);


  return result?.docs?.[0] || null
}

/**
 * Returns a cached global document from a tenant-aware collection
 */
export const getCachedGlobalFromCollection = (
  collection: CollectionSlug,
  tenantID: string,
  depth = 0
) =>
  unstable_cache(
    async () => getGlobalFromCollection(collection, tenantID, depth),
    [`${collection}_global_tenant_${tenantID}`],
    {
      tags: [`${collection}_global_tenant_${tenantID}`],
    }
  )
