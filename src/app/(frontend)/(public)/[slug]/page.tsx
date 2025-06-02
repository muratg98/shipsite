import type { Metadata } from 'next'

import { PayloadRedirects } from '@/components/PayloadRedirects'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { draftMode } from 'next/headers'
import React, { cache } from 'react'
import { homeStatic } from '@/endpoints/seed/home-static'

import type { Page as PageType } from '@/payload-types'

import { RenderBlocks } from '@/blocks/RenderBlocks'
import { RenderHero } from '@/heros/RenderHero'
import { generateMeta } from '@/utilities/generateMeta'
import PageClient from './page.client'
import { LivePreviewListener } from '@/components/LivePreviewListener'
import { Product } from '@/payload-types'

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
    ?.filter((doc) => {
      return doc.slug !== 'home'
    })
    .map(({ slug }) => {
      return { slug }
    })

  return params
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = 'home' } = await paramsPromise
  const url = '/' + slug

  let page: PageType | null

  page = await queryPageBySlug({
    slug,
  })

  // Remove this code once your website is seeded
  if (!page && slug === 'home') {
    page = homeStatic
  }

  if (!page) {
    return <PayloadRedirects url={url} />
  }

  const { hero, layout } = page
  const payload = await getPayload({ config: configPromise })
  const updatedLayout = await Promise.all(
    layout.map(async (block) => {
      if (block.blockType === 'pricing' && block.plans) {
        const fullPlans = await Promise.all(
          block.plans.map(async (plan) => {
            const productId = typeof plan.product === 'string' ? plan.product : plan.product.id;

            const product = await payload.findByID({
              collection: 'products',
              id: productId,
            });

            return {
              ...plan,
              product: product as Product, 
            };
          })
        );

        return {
          ...block,
          plans: fullPlans, 
        };
      }
      return block;
    })
  );

  return (
    <>
      <article className="pb-24">
        <PageClient />
        <PayloadRedirects disableNotFound url={url} />
  
        {draft && <LivePreviewListener />}
  
        <RenderHero {...hero} />
        <RenderBlocks blocks={updatedLayout} />
      </article>
    </>
  )
  
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = 'home' } = await paramsPromise
  const page = await queryPageBySlug({
    slug,
  })

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

  console.log("check result of page query: ", result);

  return result.docs?.[0] || null
})
