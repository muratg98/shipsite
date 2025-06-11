import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function TenantPostsPage({ params: paramsPromise }: Args) {
  const { slug } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const tenantResult = await payload.find({
    collection: 'tenants',
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const tenant = tenantResult.docs[0]

  if (!tenant) {
    notFound()
  }

  const tenantPosts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    where: {
      tenant: {
        equals: tenant.id,
      },
    },
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      authors: true,
      createdAt: true,
    },
  })

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Posts</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="posts"
          currentPage={tenantPosts.page}
          limit={12}
          totalDocs={tenantPosts.totalDocs}
        />
      </div>

      <CollectionArchive posts={tenantPosts.docs} tenantSlug={slug}/>

      <div className="container">
        {tenantPosts.totalPages > 1 && tenantPosts.page && (
          <Pagination page={tenantPosts.page} totalPages={tenantPosts.totalPages} />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Payload Website Template Posts`,
  }
}