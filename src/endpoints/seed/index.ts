import type { CollectionSlug, GlobalSlug, Payload, PayloadRequest, File } from 'payload'

import { home } from './home'
import { shipshiplogo1 } from './shipshiplogo-1'
import { image2 } from './image-2'
import { imageHero1 } from './image-hero-1'
import { userplaceholderimage } from './userplaceholderimage'
import { aboutusimage } from './aboutusimage'
import { contactusimage } from './contactusimage'
import { aboutus } from './aboutus'
import { contactus } from './contactus'
import { termsofservice } from './termsofservice'
import { privacypolicy } from './privacypolicy'

const collections: CollectionSlug[] = ['media', 'pages']
const globals: GlobalSlug[] = ['header', 'footer']

export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database...')

  payload.logger.info(`— Clearing collections and globals...`)

  await Promise.all(
    collections.map((collection) => payload.db.deleteMany({ collection, where: {} })),
  )

  await Promise.all(
    globals.map((global) => payload.db.globals.deleteMany({ global, where: {} })),
  )

  await Promise.all(
    collections
      .filter((collection) => Boolean(payload.collections[collection].config.versions))
      .map((collection) => payload.db.deleteVersions({ collection, where: {} })),
  )

  payload.logger.info(`— Seeding media...`)

  const [shipshiplogo1Buffer, image2Buffer, hero1Buffer, personplaceholderBuffer, aboutUsBuffer, contactUsBuffer] = await Promise.all([
    fetchFileByURL(
      'https://github.com/muratg98/shipsite/blob/master/public/shipshiplogo-1.png?raw=true',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-post2.webp',
    ),
    fetchFileByURL(
      'https://raw.githubusercontent.com/payloadcms/payload/refs/heads/main/templates/website/src/endpoints/seed/image-hero1.webp',
    ),
    fetchFileByURL(
      'https://github.com/muratg98/shipsite/blob/master/public/personplaceholder.jpg?raw=true',
    ),
    fetchFileByURL(
      'https://github.com/muratg98/shipsite/blob/master/public/about-us-img.png?raw=true',
    ),
    fetchFileByURL(
      'https://github.com/muratg98/shipsite/blob/master/public/contactusimage.png?raw=true',
    ),
  ])

  const [image1Doc, image2Doc, imageHeroDoc, userplaceholderDoc, aboutusDoc, contactusDoc] = await Promise.all([
    payload.create({
      collection: 'media',
      data: shipshiplogo1,
      file: shipshiplogo1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: image2,
      file: image2Buffer,
    }),
    payload.create({
      collection: 'media',
      data: imageHero1,
      file: hero1Buffer,
    }),
    payload.create({
      collection: 'media',
      data: userplaceholderimage,
      file: personplaceholderBuffer,
    }),
    payload.create({
      collection: 'media',
      data: aboutusimage,
      file: aboutUsBuffer,
    }),
    payload.create({
      collection: 'media',
      data: contactusimage,
      file: contactUsBuffer,
    }),
  ])

  let image1ID: number | string = image1Doc.id
  let image2ID: number | string = image2Doc.id
  let imageHeroID: number | string = imageHeroDoc.id
  let userplaceholderimgID: number | string = userplaceholderDoc.id
  let aboutusimgID: number | string = aboutusDoc.id
  let contactusimgID: number | string = contactusDoc.id

  if (payload.db.defaultIDType === 'text') {
    image1ID = `"${image1ID}"`
    image2ID = `"${image2ID}"`
    imageHeroID = `"${imageHeroID}"`
    userplaceholderimgID = `"${userplaceholderimgID}"`
    aboutusimgID  = `"${aboutusimgID}"`
    contactusimgID  = `"${contactusimgID}"`
  }
  
  payload.logger.info(`— Seeding newsletter form...`)

  const newsletterForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Newsletter',
      fields: [
        {
          blockType: 'email',
          name: 'email',
          label: 'Email',
        },
      ],
      confirmationType: 'message',
      confirmationMessage: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Thank you for subscribing to our newsletter.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'paragraph',
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      formStyle: 'newsletter',
    },
  })

  payload.logger.info(`— Seeding contact us form...`)
  
  const contactForm = await payload.create({
    collection: 'forms',
    data: {
      title: 'Contact Us',
      fields: [
        {
          blockType: 'text',
          name: 'name',
          label: 'Name',
        },
        {
          blockType: 'email',
          name: 'email',
          label: 'Email',
        },
        {
          blockType: 'text',
          name: 'subject',
          label: 'Subject',
        },
        {
          blockType: 'textarea',
          name: 'content',
          label: 'Content',
        },
      ],
      confirmationType: 'message',
      confirmationMessage: {
        root: {
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Your email has been submitted, we will get back to you as soon as possible.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
              textFormat: 0,
              textStyle: '',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      formStyle: 'contact',
      emails: [],
    },
  });
  
  payload.logger.info(`— Seeding home page...`)
  
  const homePage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: JSON.parse(
      JSON.stringify(home)
      .replace(/"\{\{FORM_ID\}\}"/g, `"${newsletterForm.id}"`)
      .replace(/"\{\{IMAGE_1\}\}"/g, imageHeroID)
      .replace(/"\{\{IMAGE_2\}\}"/g, image2ID)
      .replace(/"\{\{IMAGE_LOGO\}\}"/g, image1ID)
      .replace(/"\{\{ZIGZAG_IMAGE\}\}"/g, image2ID)
      .replace(/"\{\{REVIEW_IMG_PLACEHOLDER\}\}"/g, userplaceholderimgID)
    ),
  })

  payload.logger.info(`— Seeding About Us page...`)

  const aboutusPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: JSON.parse(
      JSON.stringify(aboutus)
      .replace(/"\{\{ABOUTUS_IMAGE\}\}"/g, aboutusimgID)
      .replace(/"\{\{PLACEHOLDER_IMAGE\}\}"/g, userplaceholderimgID)
      .replace(/"\{\{CONTACTUS_FORMID\}\}"/g, `"${contactForm.id}"`)
    ),
  })

  payload.logger.info(`— Seeding Contact Us page...`)

  const contactusPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: JSON.parse(
      JSON.stringify(contactus)
      .replace(/"\{\{CONTACTUS_HERO_IMAGE\}\}"/g, contactusimgID)
      .replace(/"\{\{CONTACTUS_FORM\}\}"/g, `"${contactForm.id}"`)
    ),
  })

  payload.logger.info(`— Seeding Privacy Policy page...`)

  const privacypolicyPage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: privacypolicy,
  })

  payload.logger.info(`— Seeding Terms of Service page...`)

  const termsofservicePage = await payload.create({
    collection: 'pages',
    depth: 0,
    data: termsofservice,
  })

  payload.logger.info(`— Seeding globals...`)

  await Promise.all([
    payload.updateGlobal({
      slug: 'header',
      data: {
        navItems: [
          {
            link: {
              type: 'reference',
              reference: {
                relationTo: 'pages',
                value: aboutusPage.id,
              },
              label: 'About Us',
            },
          },
          {
            link: {
              type: 'reference',
              reference: {
                relationTo: 'pages',
                value: contactusPage.id,
              },
              label: 'Contact Us',
            },
          },
          {
            link: {
              type: 'custom',
              url: '#Features',
              label: 'Features',
            },
          },
          {
            link: {
              type: 'custom',
              url: '#FAQ',
              label: 'FAQ',
            },
          },
        ],
        Styles: {
          media: sanitizeID(image1ID),
        },
        CallToAction: {
          link: {
            type: 'custom',
            url: 'dashboard',
            label: 'Get Started',
          },
        },
        showCTA: true,
      },
    }),
  ])

  await payload.updateGlobal({
    slug: 'footer',
    data: {
      navSections: [
        {
          name: 'Useful links',
          navItems: [
            {
              link: {
                type: 'custom',
                reference: {
                  relationTo: 'pages',
                  value: homePage.id,
                },
                url: '#FAQ',
                label: 'Frequently Asked Questions',
              },
            },
            {
              link: {
                type: 'custom',
                reference: {
                  relationTo: 'pages',
                  value: homePage.id,
                },
                url: '#Features',
                label: 'Features',
              },
            },
            {
              link: {
                type: 'custom',
                reference: {
                  relationTo: 'pages',
                  value: homePage.id,
                },
                url: '#Testimonials',
                label: 'Testimonials',
              },
            },
          ],
        },
        {
          name: 'Get to know',
          navItems: [
            {
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: homePage.id,
                },
                label: 'Home',
              },
            },
            {
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: aboutusPage.id,
                },
                label: 'About Us',
              },
            },
          ],
        },
        {
          name: 'Help',
          navItems: [
            {
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: privacypolicyPage.id,
                },
                label: 'Privacy Page',
              },
            },
            {
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: termsofservicePage.id,
                },
                label: 'Terms of Service',
              },
            },
            {
              link: {
                type: 'reference',
                reference: {
                  relationTo: 'pages',
                  value: contactusPage.id,
                },
                label: 'Contact Us',
              },
            },
          ],
        },
      ],
      useBottomText: true,
      bottomText: 'Made fast and with love by ShipShip',
      logo: sanitizeID(image1ID),
    },
  });
  

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

function sanitizeID(id: any): string {
  if (typeof id === 'string') {
    return id.replace(/^"|"$/g, '');
  }
  return id;
}
