import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  contactForm: Form
  heroImageID: string
}

export const contact: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
  heroImageID,
}) => {
  return {
    slug: 'contact',
    slugLock: true,
    _status: 'published',
    title: 'Contact',
    hero: {
      type: 'simpleWithImage',
      heroImage: heroImageID,
      sliderImages: [],
      richText: {
        root: {
          type: 'root',
          version: 1,
          direction: 'ltr',
          format: '',
          indent: 0,
          children: [
            {
              type: 'heading',
              tag: 'h1',
              textFormat: 1,
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
              children: [
                {
                  type: 'text',
                  version: 1,
                  text: 'Get in Touch!',
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                },
              ],
            },
            {
              type: 'paragraph',
              textFormat: 0,
              version: 1,
              direction: 'ltr',
              format: '',
              indent: 0,
              textStyle: '',
              children: [
                {
                  type: 'text',
                  version: 1,
                  text:
                    'We’d love to hear from you. Whether you have a question, need support, or just want to say hi — our team is here to help.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                },
              ],
            },
          ],
        },
      },
      links: [],
    },
    layout: [
      {
        blockType: 'formBlock',
        form: contactForm.id,
        enableIntro: true,
        introContent: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'heading',
                tag: 'h2',
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: 'Contact Us',
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                  },
                ],
              },
              {
                type: 'paragraph',
                textFormat: 0,
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text:
                      "Have questions or need assistance? We're here to help! Reach out to our team for support, inquiries, or collaboration opportunities.",
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                  },
                ],
              },
            ],
          },
        },
        secondaryContent: true,
        secondaryContentText: {
          root: {
            type: 'root',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            children: [
              {
                type: 'heading',
                tag: 'h2',
                version: 1,
                direction: 'ltr',
                format: 'start',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text: "Let's Talk",
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                  },
                ],
              },
              {
                type: 'paragraph',
                textFormat: 0,
                version: 1,
                direction: 'ltr',
                format: '',
                indent: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    text:
                      'Below are the best ways to reach us — we’ll make sure to get back to you as soon as possible.',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
    meta: {},
    Access: {},
  }
}
