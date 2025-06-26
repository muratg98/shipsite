import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { contactForm as contactFormData } from './contact-form'
import { newsletterForm as newsletterFormData } from './newsletter-form'
import { contact } from './contact-page'
import { home } from './home-page'
import { shipshipPlaceholderImage } from './shipshipPlaceholderImage'
import { logoImage } from './shipshipLogoImage'
import { personPlaceholderImage } from './personPlaceholderImage'
import { post1 } from './post-1'
import { aboutUs } from './about-us-page'

const collections: CollectionSlug[] = [
  'categories',
  'media',
  'pages',
  'posts',
  'forms',
  'form-submissions',
  'search',
]
const globals: GlobalSlug[] = ['header', 'footer']

const PLACEHOLDER_IMAGE_URL = 'https://github.com/muratg98/shipsite/blob/master/public/shipshipplaceholderimage.png?raw=true'
const LOGO_IMAGE_URL = 'https://github.com/muratg98/shipsite/blob/master/public/shipshiplogoorange.png?raw=true'
const PERSON_PLACEHOLDER_IMAGE_URL = 'https://github.com/muratg98/shipsite/blob/master/public/personplaceholder.jpg?raw=true'

export const seed = async ({
  payload,
}: {
  payload: Payload
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Seeding media...`)

  const [placeholderImageBuffer, logoImageBuffer, personPlaceholderImageBuffer] = await Promise.all([
    fetchFileByURL(PLACEHOLDER_IMAGE_URL),
    fetchFileByURL(LOGO_IMAGE_URL),
    fetchFileByURL(PERSON_PLACEHOLDER_IMAGE_URL)
  ])

  const [
    placeholderImageDoc,
    logoImageDoc,
    personPlaceholderImageDoc,
    technologyCategory,
  ] = await Promise.all([
    payload.create({
      collection: 'media',
      data: shipshipPlaceholderImage,
      file: placeholderImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: logoImage,
      file: logoImageBuffer,
    }),
    payload.create({
      collection: 'media',
      data: personPlaceholderImage,
      file: personPlaceholderImageBuffer,
    }),

    payload.create({
      collection: 'categories',
      data: {
        title: 'Technology',
        breadcrumbs: [
          {
            label: 'Technology',
            url: '/technology',
          },
        ],
      },
    }),
  ])

  payload.logger.info(`— Seeding posts...`)

  await payload.create({
  collection: 'posts',
  data: {
    ...post1({
      heroImage: placeholderImageDoc,
      blockImage: placeholderImageDoc,
    }),
    categories: [technologyCategory.id],
  },
  context: {
    disableRevalidate: true
  }
  })

  payload.logger.info(`— Seeding contact form and newsletter form...`)

  const contactForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: JSON.parse(JSON.stringify(contactFormData)),
  })

  const newsletterForm = await payload.create({
    collection: 'forms',
    depth: 0,
    data: JSON.parse(JSON.stringify(newsletterFormData)),
  })

  payload.logger.info(`— Seeding pages...`)

  const contactPageData = contact({ contactForm: contactForm, heroImageID: placeholderImageDoc.id })
  const homePageData = home({newsletterForm: newsletterForm, logoID: logoImageDoc.id, personPlaceholderImageID: personPlaceholderImageDoc.id, image1ID: placeholderImageDoc.id})
  const aboutUsPageData = aboutUs({ contactForm: contactForm, heroImageID: placeholderImageDoc.id })

  const [_, contactPage, aboutUsPage] = await Promise.all([
    payload.create({
      collection: 'pages',
      depth: 0,
      data: homePageData,
      context: {
        disableRevalidate: true
      }
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: contactPageData,
      context: {
        disableRevalidate: true
      }
    }),
    payload.create({
      collection: 'pages',
      depth: 0,
      data: aboutUsPageData,
      context: {
        disableRevalidate: true
      }
    })
  ])

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
    slug: 'header',
    context: {
        disableRevalidate: true
      },
    data: {
      navItems: [
        {
          link: {
            type: 'custom',
            url: '/posts',
            label: 'Posts',
          },
        },
        {
          link: {
            type: 'custom',
            url: '/about-us',
            label: 'About Us',
          },
        },
        {
          link: {
            type: 'reference',
            label: 'Contact',
            reference: {
              relationTo: 'pages',
              value: contactPage.id,
            },
          },
        },
        {
          link: {
            type: 'custom',
            url: '#FAQs',
            label: 'FAQ',
          },
        },
        {
          link: {
            type: 'custom',
            url: '#Features',
            label: 'Features',
          },
        },
      ],
      CallToAction: {
        link: {
          type: 'custom',
          url: 'dashboard',
          label: 'Get Started',
        },
      },
      showCTA: true,
      Styles: {
        media: logoImageDoc.id,
      },
    },
  }),
    payload.updateGlobal({
    slug: 'footer',
    context: {
        disableRevalidate: true
      },
    data: {
      navSections: [
        {
          name: 'Navigation',
          navItems: [
            {
              link: {
                type: 'custom',
                newTab: true,
                url: '/',
                label: 'Home',
              },
            },
            {
              link: {
                type: 'custom',
                url: '/admin',
                label: 'Admin',
              },
            },
            {
              link: {
                type: 'custom',
                newTab: true,
                url: 'https://github.com/payloadcms/payload/tree/main/templates/website',
                label: 'Source Code',
              },
            },
          ],
        },
        {
          name: 'Help',
          navItems: [
            {
              link: {
                type: 'custom',
                url: '/privacy-policy',
                label: 'Privacy Policy',
              },
            },
            {
              link: {
                type: 'custom',
                url: '/terms-of-service',
                label: 'Terms of Service',
              },
            },
            {
              link: {
                type: 'reference',
                label: 'Contact Us',
                reference: {
                  relationTo: 'pages',
                  value: contactPage.id,
                },
              },
            },
          ],
        },
        {
          name: 'Our Socials',
          navItems: [
            {
              link: {
                type: 'custom',
                url: '/',
                label: 'Instagram',
              },
            },
            {
              link: {
                type: 'custom',
                url: '/',
                label: 'X',
              },
            },
            {
              link: {
                type: 'custom',
                url: '/',
                label: 'Facebook',
              },
            },
          ],
        },
      ],
      useBottomText: true,
      bottomText: 'Made fast and with love by ShipShip',
      logo: logoImageDoc.id,
    },
  })
  ])

  payload.logger.info('Seeded database successfully!')
}

async function fetchFileByURL(url: string): Promise<File> {
  const res = await fetch(url, {
    credentials: 'include',
    method: 'GET',
  })

  if (!res.ok) {
    throw new Error(`Failed to fetch file from ${url}, status: ${res.status}`)
  }

  const data = await res.arrayBuffer()

  return {
    name: url.split('/').pop() || `file-${Date.now()}`,
    data: Buffer.from(data),
    mimetype: `image/${url.split('.').pop()}`,
    size: data.byteLength,
  }
}
