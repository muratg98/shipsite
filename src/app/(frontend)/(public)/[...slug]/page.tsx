import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Product } from '@/payload-types'
import { getValidSubdomain } from '@/utilities/getValidSubdomain'
import SignInPage from '../../(authentication)/sign-in/page'

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })

  const pages = await payload.find({
    collection: 'pages',
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  const params = pages.docs
    .filter((doc) => doc.slug !== 'home')
    .map(({ slug }) => {
      const slugParts = slug?.split('/').filter(Boolean)
      return { slug: slugParts }
    })

  return params
}
export default async function Page({ params }: { params: Promise<{ slug?: string[] }>}) {
  const { slug = [] } = await params

  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  let fullSlug = ''
  let page: PageType | null = null
  
  if (slug.length === 0) {
    fullSlug = 'home'
  }
  else if (slug.length === 1) {
    const possibleTenant = slug[0]
    const tenantQuery = await payload.find({
      collection: 'tenants',
      limit: 1,
      where: {
        slug: {
          equals: possibleTenant,
        },
      },
    })

    if (tenantQuery.docs.length > 0) {
      fullSlug = `${possibleTenant}/home`
    } else {
      fullSlug = slug[0] || "/"
    }
  }
  else {
    fullSlug = slug.join('/')
  }

  page = await queryPageBySlug({ slug: fullSlug })

  if (!page) {
    return <PayloadRedirects url={fullSlug} />
  }

  const { hero, layout } = page

  const updatedLayout = await Promise.all(
    layout.map(async (block) => {
      if (block.blockType === 'pricing' && block.plans) {
        const fullPlans = await Promise.all(
          block.plans.map(async (plan) => {
            const productId = typeof plan.product === 'string' ? plan.product : plan.product.id

            const product = await payload.findByID({
              collection: 'products',
              id: productId,
            })

            return {
              ...plan,
              product: product as Product,
            }
          })
        )

        return {
          ...block,
          plans: fullPlans,
        }
      }
      return block
    })
  )

  return (
    <>
      <article className="pb-24">
        <PageClient />
        <PayloadRedirects disableNotFound url={fullSlug} />
        {draft && <LivePreviewListener />}
        <RenderHero {...hero} />
        <RenderBlocks blocks={updatedLayout} />
      </article>
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug?: string[] }>}): Promise<Metadata> {
  const { slug = [] } = await params
  const payload = await getPayload({ config: configPromise })

  let fullSlug = ''

  if (slug.length === 0) {
    fullSlug = 'home'
  } else if (slug.length === 1) {
    const tenantCheck = await payload.find({
      collection: 'tenants',
      limit: 1,
      where: {
        slug: { equals: slug[0] },
      },
    })
    fullSlug = tenantCheck.docs.length > 0 ? `${slug[0]}/home` : slug[0] || "/"
  } else {
    fullSlug = slug.join('/')
  }

  const page = await queryPageBySlug({ slug: fullSlug })

  return generateMeta({ doc: page })
}

const queryPageBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()
  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: 'pages',
    draft,
    limit: 1,
    pagination: false,
    overrideAccess: draft,
    where: {
      slug: {
        equals: slug,
      },
    },
  })


  return result.docs?.[0] || null
})