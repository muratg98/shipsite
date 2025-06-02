import type { RequiredDataFromCollectionSlug } from 'payload'

export const home: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'simpleImpact',
    sliderImages: [],
    showTopText: true,
    topText: 'Lorem ipsum dolor sit amet.',
    media: '{{IMAGE_1}}',
    links: [
      {
        link: {
          type: 'custom',
          appearance: 'default',
          label: 'Get Started',
          url: '/dashboard',
        },
      },
      {
        link: {
          type: 'custom',
          appearance: 'outline',
          label: 'Contact',
          url: '/contact',
        },
      },
    ],
    richText: {
      root: {
        type: 'root',
        version: 1,
        indent: 0,
        direction: 'ltr',
        format: '',
        children: [
          {
            type: 'heading',
            version: 1,
            tag: 'h1',
            textFormat: 1,
            indent: 0,
            direction: 'ltr',
            format: 'center',
            children: [
              {
                type: 'text',
                version: 1,
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: 'Ship Fast. Launch Smarter.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            indent: 0,
            direction: 'ltr',
            format: 'center',
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
                text: 'A fully loaded Next.js template with Payload CMS, Tailwind CSS, and TypeScript — built to help you ship products and websites at lightning speed.',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            indent: 0,
            direction: 'ltr',
            format: 'center',
            textFormat: 0,
            textStyle: '',
            children: [],
          },
        ],
      },
    },
  },
  layout: [
    {
      blockType: 'cloudLogos',
      grayscale: true,
      companyLogos: [
        {
          image: "{{IMAGE_LOGO}}"
        },
        {
          image: "{{IMAGE_LOGO}}"
        },
        {
          image: "{{IMAGE_LOGO}}"
        },
      ],
    },
    {
      blockType: "features",
      layout: "standard",
      blockName: "Features",
      header: "Features",
      title: "Add your features title here!",
      description: "Add your features here and let everyone know about what you have to offer!",
      features: [
        {
          name: "Feature 1",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a vehicula diam.",
        },
        {
          name: "Feature 2",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a vehicula diam.",
        },
        {
          name: "Feature 3",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a vehicula diam.",
        },
        {
          name: "Feature 4",
          description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a vehicula diam.",
        }
      ],
    },
    {
      blockType: 'cta',
      blockName: "CTA",
      richText: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 1,
                  mode: "normal",
                  style: "",
                  text: "A quick call to action to make sure that the layout is eye catching.",
                  type: "text",
                  version: 1
                }
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "heading",
              version: 1,
              tag: "h2"
            }
          ],
          direction: "ltr",
          format: "",
          indent: 0,
          type: "root",
          version: 1,
        },
      useBackgroundImage: false,
      bgImage: null,
      }
    },
    {
      blockType: 'zigzag',
      blockName: "zigzag",
      header: 'ZigZag Info',
      title: 'Add some extra information here',
      description: 'provide more information and details...',
      content: [
        {
          image: '{{ZIGZAG_IMAGE}}',
          header: 'First zigzag content item',
          richText: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 1,
                      mode: "normal",
                      style: "",
                      text: "Random Item One",
                      type: "text",
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "heading",
                  version: 1,
                  tag: "h2"
                },
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a vehicula diam. Sed ultrices turpis interdum dui iaculis mattis. Ut at sapien consectetur, sagittis lacus a, volutpat mi.",
                      type: "text",
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "paragraph",
                  version: 1,
                  textFormat: 0,
                  textStyle: ""
                }
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1
            }
          },
        },
        {
          image: '{{ZIGZAG_IMAGE}}',
          header: 'Second zigzag content',
          richText: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 1,
                      mode: "normal",
                      style: "",
                      text: "Random Item Two",
                      type: "text",
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  format: "",
                  indent: 0,
                  type: "heading",
                  version: 1,
                  textFormat: 1,
                  tag: "h2"
                },
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: "normal",
                      style: "",
                      text: "Fusce quis dolor varius justo egestas sollicitudin ac quis velit. Quisque vel magna condimentum, fermentum purus et, efficitur tellus. Maecenas odio nisl.",
                      type: "text",
                      version: 1
                    }
                  ],
                  direction: "ltr",
                  format: "justify",
                  indent: 0,
                  type: "paragraph",
                  version: 1,
                  textFormat: 0,
                  textStyle: ""
                }
              ],
              direction: "ltr",
              format: "",
              indent: 0,
              type: "root",
              version: 1,
            }
          },
        },
      ],
    },
    {
      blockType: 'formBlock',
      blockName: "newsletterForm",
      form: '{{FORM_ID}}',
      enableIntro: true,
      introContent: {
        root: {
          children: [
            {
              children: [
                {
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                  text: 'Build Fast and Stay Updated.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              textFormat: 1,
              tag: 'h1',
            },
            {
              children: [
                {
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                  text: 'Subscribe to our newsletter to keep up to date with the most recent updates.',
                  type: 'text',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              type: 'heading',
              version: 1,
              textFormat: 1,
              tag: 'h4',
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          type: 'root',
          version: 1,
        },
      },
      secondaryContent: false,
    },
    {
      blockType: 'testimonial',
      header: 'Testimonials',
      blockName: 'Testimonials',
      title: 'Add some testimonials here.',
      description: 'Testimonials are a form of validation...',
      reviews: [
        {
          firstName: 'Carlos',
          lastName: 'Mendes',
          image: '{{REVIEW_IMG_PLACEHOLDER}}',
          company: 'VantaCore',
          jobRole: 'CTO',
          review: 'Shipship is one of the best products out there, it helps largely cut down the time to production.',
        },
        {
          firstName: 'Sophie',
          lastName: 'Tran',
          image: '{{REVIEW_IMG_PLACEHOLDER}}',
          company: 'VantaCore',
          jobRole: 'CTO',
          review: 'Shipship helped our team launch a full microsite in just three days. The setup was seamless, and the design system saved us hours.',
        },
        {
          firstName: 'Liam ',
          lastName: 'Patel',
          image: '{{REVIEW_IMG_PLACEHOLDER}}',
          company: 'VantaCore',
          jobRole: 'CTO',
          review: 'We needed to move fast, and Shipship delivered. The integration with Payload CMS was a dream.',
        },
        {
          firstName: 'Jessica',
          lastName: 'Liu',
          image: '{{REVIEW_IMG_PLACEHOLDER}}',
          company: 'VantaCore',
          jobRole: 'CTO',
          review: 'Finally a template that doesn’t fight back. It’s flexible, clean, and made our product launch stress-free.',
        },
        {
          firstName: 'Amira',
          lastName: 'Johnson',
          image: '{{REVIEW_IMG_PLACEHOLDER}}',
          company: 'VantaCore',
          jobRole: 'CTO',
          review: 'I don’t write code, but with Shipship my dev spun up our landing page and CMS in an afternoon. Huge win.',
        },
      ],
    },
    {
      blockType: 'accordion',
      header: 'FAQ',
      blockName: 'FAQ',
      title: 'Check out the FAQs',
      description: 'These our most frequently asked questions.',
      size: 'half',
      items: [
        {
          trigger: 'What is Shipship and how does it work?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel urna nec leo porta tincidunt.',
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
        },
        {
          trigger: 'Do I need to know how to code to use Shipship?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque vel ex nec magna iaculis feugiat.',
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
        },
        {
          trigger: 'Can I integrate Shipship with my existing CMS?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
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
        },
        {
          trigger: 'How customizable is the Shipship template?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Curabitur sit amet ligula ac lorem laoreet sollicitudin. Integer feugiat velit id nisi vestibulum finibus.',
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
        },
        {
          trigger: 'Is there a free trial available?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Suspendisse potenti. Nam in turpis tincidunt, pharetra erat nec, faucibus ligula.',
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
        },
        {
          trigger: 'What tech stack does Shipship use?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Maecenas tincidunt felis ut nulla gravida, vitae viverra massa feugiat. Aliquam erat volutpat.',
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
        },
        {
          trigger: 'Can I deploy my site with one click?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Donec eget felis eget justo gravida tincidunt. Aenean euismod justo sed sapien volutpat, vel bibendum risus sagittis.',
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
        },
        {
          trigger: 'Does Shipship offer customer support?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.',
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
        },
        {
          trigger: 'How secure is my data with Shipship?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Vivamus eget urna ac nulla fermentum facilisis. Sed posuere turpis non leo aliquam, ut hendrerit massa iaculis.',
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
        },
        {
          trigger: 'Can I use my own domain name?',
          content: {
            root: {
              children: [
                {
                  children: [
                    {
                      detail: 0,
                      format: 0,
                      mode: 'normal',
                      style: '',
                      text: 'Quisque ac leo quis nisi facilisis laoreet. Nulla facilisi. Curabitur non convallis elit.',
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
        },
      ],
    }    
  ],
  meta: {
    description: 'An open-source website built with Payload and Next.js Via Shipship.',
    image: '{{IMAGE_1}}',
    title: 'Payload CMS x NextJS x ShipShip',
  },
  title: 'Home',
}
