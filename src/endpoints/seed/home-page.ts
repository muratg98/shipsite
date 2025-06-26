import type { Form } from '@/payload-types'
import { RequiredDataFromCollectionSlug } from 'payload'

type ContactArgs = {
  newsletterForm: Form
  image1ID: string
  logoID: string,
  personPlaceholderImageID: string
}

export const home: (args: ContactArgs) => RequiredDataFromCollectionSlug<'pages'> = ({
  newsletterForm,
  image1ID,
  logoID,
  personPlaceholderImageID
}) => {
  return {
    slug: 'home',
  _status: 'published',
  hero: {
    type: 'simpleImpact',
    heroImage: image1ID,
    media: image1ID,
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
                text: 'Launch Your Website Fast with ShipShip',
                detail: 0,
                format: 1,
                mode: 'normal',
                style: ''
              }
            ]
          },
          {
            type: 'paragraph',
            version: 1,
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            textStyle: '',
            children: [
              {
                type: 'text',
                version: 1,
                text: 'Create beautiful, customizable websites in minutes — no coding required. Perfect for startups, agencies, and creators who want to ship fast and look great. ',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: ''
              }
            ]
          }
        ]
      }
    },
    links: [
      {
        link: {
          type: 'custom',
          url: '/posts',
          label: 'All posts',
          appearance: 'default'
        }
      },
      {
        link: {
          type: 'custom',
          url: '/contact',
          label: 'Contact',
          appearance: 'outline'
        }
      }
    ]
  },
  layout: [
    {
      blockType: 'cloudLogos',
      blockName: 'Logos',
      grayscale: false,
      companyLogos: Array(4).fill({
        image: logoID
      })
    },
    {
      blockType: 'features',
      blockName: 'Features',
      layout: 'standard',
      header: 'Features',
      title: 'Powerful Features to Build Your Vision',
      description: 'Add all the features your business has to offer here!',
      features: [
        {
          name: 'Flexible Layouts',
          description: 'Tailor your site with blocks designed for storytelling, portfolios, products, and more.'
        },
        {
          name: 'Form Builder',
          description: 'Add contact, lead capture, or inquiry forms effortlessly — connect with your audience instantly.'
        },
        {
          name: 'Blog & CMS Integration',
          description: 'Easily manage content with a powerful admin panel. Perfect for blogs, news, and updates.'
        },
        {
          name: 'Customizable Design',
          description: 'Change colors, typography, and layout with ease. Make it your own.'
        },
        {
          name: 'SEO-Ready',
          description: 'Optimize your site out of the box to rank well on search engines.'
        },
        {
          name: 'Add Your Own Features',
          description: 'Use this section to highlight your business\'s services or selling points. Replace or expand each feature with what matters most to your users.'
        }
      ]
    },
    // NEWSLETTER FORM BLOCK START
    {
      blockType: 'formBlock',
      enableIntro: true,
      form: newsletterForm.id,
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
                  version: 1,
                  text: 'Stay in the Loop',
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: ''
                }
              ]
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
                  text: 'Subscribe to our newsletter to get updates, resources, and tips for building better websites with ShipShip.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: ''
                }
              ]
            }
          ]
        }
      }
    },
    // NEWSLETTER FORMBLOCK END
    {
    blockType: 'zigzag',
    blockName: 'ZigZag',
    header: 'ZigZag Content',
    title: 'Build Once. Scale Easily.',
    description: 'Easily and cleanly provide more detail about your business here.',
    content: [
      {
        image: image1ID,
        header: 'Add Text Block 1 Header ',
        richText: {
          root: {
            type: 'root',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Text Block 1 Title',
                  },
                ],
              },
              {
                type: 'paragraph',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text:
                      'ShipShip gives you the foundation for growth. Start small with a landing page or blog, then scale to a full site with custom sections as your business grows.',
                  },
                ],
              },
            ],
          },
        },
        links: [
          {
            link: {
              type: 'custom',
              label: 'Learn More',
              appearance: 'default',
              url: '/home'
            },
          },
        ],
      },
      {
        image: image1ID,
        header: 'Add Text Block 2 Header ',
        richText: {
          root: {
            type: 'root',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                textFormat: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Text Block 2 Title',
                  },
                ],
              },
              {
                type: 'paragraph',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text:
                      "Whether you're launching a SaaS, promoting a local service, or showcasing your work — the ShipShip starter makes it easy to get up and running quickly.",
                  },
                ],
              },
            ],
          },
        },
        links: [
          {
            link: {
              type: 'custom',
              label: 'Learn More',
              appearance: 'default',
              url: '/home'
            }
          },
        ],
      },
      {
        image: image1ID,
        header: 'Add Text Block 3 Header ',
        richText: {
          root: {
            type: 'root',
            version: 1,
            format: '',
            indent: 0,
            direction: 'ltr',
            children: [
              {
                type: 'heading',
                tag: 'h2',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                textFormat: 1,
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 1,
                    mode: 'normal',
                    style: '',
                    text: 'Text Block 3 Title',
                  },
                ],
              },
              {
                type: 'paragraph',
                direction: 'ltr',
                format: '',
                indent: 0,
                version: 1,
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text:
                      'Use this section to explain your offering. For example, describe your mission, explain how your product solves a problem, or outline your process.',
                  },
                ],
              },
            ],
          },
        },
        links: [
          {
            link: {
              type: 'custom',
              label: 'Learn More',
              appearance: 'default',
              url: '/home'
            },
          },
        ],
      },
    ],
  },
  {
    blockType: 'testimonial',
    blockName: 'Testimonial',
    header: 'What Others Say',
    title: 'Have a look at what shipship users have to say!',
    description:
      'We always try to ensure the best experience for our customers. Have a look at what they have to say.',
    reviews: [
      {
        firstName: 'John',
        lastName: 'Smith',
        image: personPlaceholderImageID,
        company: 'Example Company',
        jobRole: 'CEO',
        review:
          'ShipShip helped us launch a polished, modern site in less than a day. The built-in blocks made it super easy to create exactly what we needed.',
      },
      {
        firstName: 'Miss',
        lastName: 'Angel',
        image: personPlaceholderImageID,
        company: 'Example Company',
        jobRole: 'CEO',
        review: 'ShipShip helped us launch a so fast! ',
      },
      {
        firstName: 'John',
        lastName: 'Wick',
        image: personPlaceholderImageID,
        company: 'Example Company',
        jobRole: 'CTO',
        review: 'ShipShip is it!',
      },
    ],
  },
  {
    blockType: 'cta',
    blockName: 'CTA',
    richText: {
      root: {
        type: 'root',
        version: 1,
        format: '',
        indent: 0,
        direction: 'ltr',
        children: [
          {
            type: 'heading',
            tag: 'h1',
            direction: 'ltr',
            format: '',
            indent: 0,
            version: 1,
            textFormat: 1,
            children: [
              {
                type: 'text',
                version: 1,
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: 'This is a call to action',
              },
            ],
          },
        ],
      },
    },
    links: [
      {
        link: {
          type: 'custom',
          url: '/posts',
          label: 'All posts',
          appearance: 'default',
        },
      },
    ],
  },
  {
    blockType: 'accordion',
    header: 'FAQs',
    blockName: 'FAQs',
    title: 'Answers to Common Questions',
    description:
      'Have questions? We’ve got answers. Here’s everything you need to know to get started with ShipShip and customize it for your business or project. Feel free to update these with your own questions later.',
    size: 'half',
    items: [
      {
        trigger: 'What is ShipShip?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'ShipShip is a modern website starter built with Payload CMS, designed to help you launch fast and scale easily. It includes ready-made sections like forms, blogs, testimonials, and more.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'Can I customize the design?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Yes! ShipShip is built with flexibility in mind. You can easily change colors, fonts, images, and layouts — no design or code experience required.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'Who is ShipShip for?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'ShipShip is perfect for founders, freelancers, agencies, or anyone who needs a professional site quickly — with full control over content and layout.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'Do I need to know how to code?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Nope! You can launch a fully functional site using the visual CMS. However, developers can dive deeper to fully customize components and extend functionality.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'What kind of projects can I build with ShipShip?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Use ShipShip for portfolios, startup landing pages, small business sites, blogs, and even ecommerce with some customization. It’s a strong foundation for almost any web project.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'How do I update the content?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'ShipShip uses Payload CMS, which provides an intuitive admin dashboard. You can update text, images, and page layouts with just a few clicks.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'Can I add my own FAQ questions here?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Absolutely. This FAQ section is fully editable. Replace these with your own most common questions to better support your users or clients.',
                  },
                ],
              },
            ],
          },
        },
      },
      {
        trigger: 'Is ShipShip open source?',
        content: {
          root: {
            type: 'root',
            version: 1,
            indent: 0,
            format: '',
            direction: 'ltr',
            children: [
              {
                type: 'paragraph',
                version: 1,
                indent: 0,
                format: '',
                direction: 'ltr',
                textFormat: 0,
                textStyle: '',
                children: [
                  {
                    type: 'text',
                    version: 1,
                    detail: 0,
                    format: 0,
                    mode: 'normal',
                    style: '',
                    text: 'Yes — it’s built on open-source technologies and designed to be extended. You can customize and adapt it freely to fit your needs.',
                  },
                ],
              },
            ],
          },
        },
      },
    ],
  }
  ],
  meta: {
    description: 'An open-source website built with Payload and Next.js.',
    image: image1ID,
    title: 'Payload Website Template',
  },
  title: 'Home',
  }
}
