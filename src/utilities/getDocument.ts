import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

type Collection = keyof Config['collections']

async function getDocument(
  collection: Collection,
  slug: string,
  tenantId?: string,
  depth = 0
) {
  const payload = await getPayload({ config: configPromise })

  const where: any = {
    slug: {
      equals: slug,
    },
  }

  if (tenantId) {
    where.tenant = {
      equals: tenantId,
    }
  }

  const page = await payload.find({
    collection,
    depth,
    where,
  })

  return page.docs[0]
}


/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedDocument = (
  collection: Collection,
  slug: string,
  tenantId?: string
) =>
  unstable_cache(
    async () => getDocument(collection, slug, tenantId),
    [collection, slug, tenantId || 'default'],
    {
      tags: [`${collection}_${slug}_${tenantId || 'default'}`],
    }
  )