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

export default async function MainPostsPage() {
  const payload = await getPayload({ config: configPromise })
  const mainTenantResult = await payload.find({
    collection: 'tenants',
    limit: 1,
    where: {
      isMainTenant: {
        equals: true,
      },
    },
  })
  const mainTenant = mainTenantResult.docs[0]
    if (!mainTenant) {
        return notFound()
    }
    
  const posts = await payload.find({
    collection: 'posts',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      authors: true,
      createdAt: true,
    },
    where: {
      tenant: {
        equals: mainTenant.id, 
      },
    },
  })

  const postsdoc = posts.docs

  // Get all unique author IDs
  const authorIDs = [
    ...new Set(postsdoc.flatMap((postsdoc) => postsdoc.authors || [])),
  ]

  const authorNames = await payload.find({
    collection: 'admins',
    where: {
      id: {
        in: authorIDs,
      },
    },
    depth: 0,
    select: {
      id: true,
      name: true,
    },
  })
// Create a map of ID -> name
  const authorsMap = new Map(
    authorNames.docs.map((admin) => [admin.id, admin.name])
  )

  // Replace authors with names
  const postsWithAuthorNames = postsdoc.map((post) => ({
    ...post,
    authors: (post.authors || []).map(
      (id) => authorsMap.get(id) || 'Unknown Author'
    ),
  }))

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
          currentPage={posts.page}
          limit={12}
          totalDocs={posts.totalDocs}
        />
      </div>

      <CollectionArchive posts={postsWithAuthorNames}/>

      <div className="container">
        {posts.totalPages > 1 && posts.page && (
          <Pagination page={posts.page} totalPages={posts.totalPages} />
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