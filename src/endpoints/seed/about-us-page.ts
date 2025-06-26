import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type AboutUsArgs = {
  contactForm: Form
  heroImageID: string
}

export const aboutUs: (args: AboutUsArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  contactForm,
  heroImageID,
}) => {
  return {
    slug: 'about-us',
    _status: 'published',
    title: 'About Us',
    slugLock: true,
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
                  text: 'About Us',
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
                    'Get to know the story behind our team, the values that shape our work, and the passion that drives us to create meaningful experiences for our community every single day.',
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
        blockType: 'features',
        layout: 'standard',
        header: 'Our Mission',
        title: 'What Makes Us Stand Out',
        description:
          'Discover the key strengths and unique qualities that set us apart, driving innovation and delivering exceptional value to our customers and partners.',
        features: [
          {
            name: 'Customer-Centric Approach',
            description:
              'We prioritize our customers’ needs to deliver tailored solutions that truly make a difference.',
          },
          {
            name: 'Innovative Solutions',
            description:
              'Constantly evolving, we leverage the latest technologies to stay ahead and solve complex challenges.',
          },
          {
            name: 'Sustainable Practices',
            description:
              'We’re committed to eco-friendly operations that protect the environment for future generations.',
          },
          {
            name: 'Dedicated Support',
            description:
              'Our team is always ready to assist, ensuring a smooth and satisfying experience every step of the way.',
          },
        ],
        image: heroImageID,
      },
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
                    textFormat: 1,
                    version: 1,
                    direction: 'ltr',
                    format: '',
                    indent: 0,
                    children: [
                    {
                        type: 'text',
                        text: 'Contact Us',
                        detail: 0,
                        format: 1,
                        mode: 'normal',
                        style: '',
                        version: 1,
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
                    children: [
                    {
                        type: 'text',
                        text:
                        "Have questions or need assistance? We're here to help! Reach out to our team for support, inquiries, or collaboration opportunities.",
                        detail: 0,
                        format: 0,
                        mode: 'normal',
                        style: '',
                        version: 1,
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
                textFormat: 0,
                version: 1,
                direction: 'ltr',
                format: 'start',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    text: "Let's Talk",
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    version: 1,
                  },
                ],
              },
              {
                type: 'paragraph',
                version: 1,
                textFormat: 0,
                direction: 'ltr',
                format: '',
                indent: 0,
                children: [
                  {
                    type: 'text',
                    text: 'Below are the best ways to reach us — we’ll make sure to get back to you as soon as possible.',
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    version: 1,
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
