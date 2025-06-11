import type { Metadata } from 'next'

import { RelatedPosts } from '@/blocks/RelatedPosts/Component'
import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import RichText from '@/components/RichText'

import type { Post } from '@/payload-types'

import { PostHero } from '@/heros/PostHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = posts.docs.map(({ slug }) => {
    return { slug }
  })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
    tenantPostSlug?: string
  }>
}

export default async function TenantPost({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = '', tenantPostSlug = '' } = await paramsPromise

  const payload = await getPayload({ config: configPromise })

  // 1. Query tenant by slug
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
    // Tenant not found
    return <PayloadRedirects url="/" />
  }

  // 2. Query post by tenantId and tenantPostSlug
  const post = await queryPostByTenantAndSlug({ tenantId: tenant.id, slug: tenantPostSlug, draft })

  const url = `/${slug}/posts/${tenantPostSlug}`
  if (!post) return <PayloadRedirects url={url} tenantId={tenant?.id}/>

  return (
    <article className="pt-16 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} tenantId={tenant?.id}/>

      {draft && <LivePreviewListener />}

      <PostHero post={post} />

      <div className="flex flex-col items-center gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={post.content} enableGutter={false} />
          {post.relatedPosts && post.relatedPosts.length > 0 && (
            <RelatedPosts
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={post.relatedPosts.filter((post) => typeof post === 'object')}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = '', tenantPostSlug = '' } = await paramsPromise

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
    return {
      title: 'Post Not Found',
    }
  }

  const post = await queryPostByTenantAndSlug({ tenantId: tenant.id, slug: tenantPostSlug, draft: false })

  return generateMeta({ doc: post })
}

const queryPostByTenantAndSlug = cache(
  async ({ tenantId, slug, draft }: { tenantId: string; slug: string; draft: boolean }) => {
    const payload = await getPayload({ config: configPromise })

    const result = await payload.find({
      collection: 'posts',
      draft,
      limit: 1,
      overrideAccess: draft,
      pagination: false,
      where: {
        tenant: {
          equals: tenantId,
        },
        slug: {
          equals: slug,
        },
      },
    })

    return result.docs?.[0] || null
  }
)