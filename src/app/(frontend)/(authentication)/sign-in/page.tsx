import { notFound, redirect } from 'next/navigation'
import SignInForm from './SignInForm'
import { getCachedGlobalFromCollection } from '@/utilities/getGlobals'
import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import type { Media, Header, Tenant } from '@/payload-types'

export default async function SignInPage({ tenantSlug }: { tenantSlug: string }) {
  const payload = await getPayload({ config: configPromise })

  // 🔍 Look up the tenant by slug
  const tenantQuery = await payload.find({
    collection: 'tenants',
    limit: 1,
    where: {
      slug: {
        equals: tenantSlug,
      },
    },
  })

  const tenant: Tenant | undefined = tenantQuery.docs?.[0]

  if (!tenant) {
    notFound()
  }

  const tenantID = tenant.id

  const response = await auth.api.getSession({
    headers: await headers(),
  })

  const user = response?.user ?? null
  const session = response?.session ?? null

  if (session || user) {
    redirect('/dashboard')
  }

  const getHeaderData = await payload.find({
    collection: 'header',
    limit: 1,
    where: {
      tenant: {
        equals: tenantID,
      },
    },
  })

  const headerData= getHeaderData?.docs?.[0]
  const media = headerData?.Styles.media as Media
  const enabledProviders = ['credentials', 'magicLink', 'google', 'facebook']

  return <SignInForm authMethods={enabledProviders} media={media} />
}
