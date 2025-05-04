import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { nestedDocsPlugin } from '@payloadcms/plugin-nested-docs'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { searchPlugin } from '@payloadcms/plugin-search'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { searchFields } from '@/search/fieldOverrides'
import { beforeSyncWithSearch } from '@/search/beforeSync'
import { stripePlugin } from '@payloadcms/plugin-stripe'
import { Page, Post } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Post | Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Post | Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages', 'posts'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  nestedDocsPlugin({
    collections: ['categories'],
    generateURL: (docs) => docs.reduce((url, doc) => `${url}/${doc.slug}`, ''),
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => [
        ...defaultFields,
        {
          name: 'formStyle',
          label: 'Form Style',
          type: 'select',
          options: [
            { label: 'Newsletter', value: 'newsletter' },
            { label: 'Contact Us', value: 'contact' },
            { label: 'None', value: 'none' },
          ],
          required: true,
          defaultValue: 'none',
          admin: {
            position: 'sidebar',
            description: 'Select a preset style for this form.',
          },
        },
      ],
    },
  }),
  searchPlugin({
    collections: ['posts'],
    beforeSync: beforeSyncWithSearch,
    searchOverrides: {
      fields: ({ defaultFields }) => {
        return [...defaultFields, ...searchFields]
      },
    },
  }),
  payloadCloudPlugin(),
  stripePlugin({
    stripeSecretKey: process.env.STRIPE_SECRET_KEY || '',
    stripeWebhooksEndpointSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET,
    sync: [
      {
        collection: 'user',
        stripeResourceType: 'customers',
        stripeResourceTypeSingular: 'customer',
        fields: [
          {
            fieldPath: 'customerId',
            stripeProperty: 'id', 
          },
        ],
      },
    ],
    webhooks: {
      'customer.subscription.updated': async ({ event, stripe, config }) => {
        
        const subscription = event.data.object; // The subscription object

        const userId = subscription.customer; // Assuming you stored the Stripe customer ID in your user collection
        const subscriptionStatus = subscription.status; // 'active', 'past_due', 'canceled', etc.
        const planName = subscription.items.data[0].plan.nickname; // The subscription plan's name
        const startDate = new Date(subscription.start_date * 1000); // Convert from Unix timestamp
        const endDate = new Date(subscription.current_period_end * 1000); // Convert from Unix timestamp

      },
      'customer.subscription.deleted': ({ event, stripe, config }) => {
        // do something...
      },
      'invoice.payment_succeeded': ({ event, stripe, config }) => {
        // do something...
      },
      
    },
  }),
]
