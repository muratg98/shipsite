import type { RequiredDataFromCollectionSlug } from 'payload'

export const aboutus: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'about-us',
  _status: 'published',
  title: 'About Us',
  hero: {
    type: 'simpleWithImage',
    heroImage: "{{ABOUTUS_IMAGE}}",
    sliderImages: [],
    links: [],
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
            format: 'left',
            children: [
              {
                type: 'text',
                version: 1,
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: 'About Us',
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            indent: 0,
            direction: 'ltr',
            format: 'left',
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
                  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a vehicula diam. Sed ultrices turpis interdum dui iaculis mattis. Ut at sapien consectetur, sagittis lacus a, volutpat mi.',
              },
            ],
          },
        ],
      },
    },
  },
  layout: [
    {
      blockType: 'features',
      layout: 'standard',
      header: 'Our Mission',
      title: 'Maecenas odio nisl.',
      description:
        'Duis a vehicula diam. Sed ultrices turpis interdum dui iaculis mattis. Ut at sapien consectetur, sagittis lacus a, volutpat mi.',
      features: [
        {
          name: 'Ship Fast',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. ',
        },
        {
          name: 'Build Quick',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Test Ideas',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
        {
          name: 'Update simply with CMS',
          description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        },
      ],
    },
    {
      blockType: 'team',
      header: 'Our Team',
      title: 'Meet our Team',
      description: 'Meet our team of professionals to serve you.',
      teamMembers: [
        {
          name: 'John Doe',
          role: 'Software Engineer',
          image: '{{PLACEHOLDER_IMAGE}}',
          socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
          },
          description: {
            root: {
              type: 'root',
              version: 1,
              indent: 0,
              direction: 'ltr',
              format: '',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  indent: 0,
                  direction: 'ltr',
                  format: '',
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
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas ultricies posuere.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          name: 'Amira Smith',
          role: 'CEO',
          image: '{{PLACEHOLDER_IMAGE}}',
          socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
          },
          description: {
            root: {
              type: 'root',
              version: 1,
              indent: 0,
              direction: 'ltr',
              format: '',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  indent: 0,
                  direction: 'ltr',
                  format: '',
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
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas ultricies posuere.',
                    },
                  ],
                },
              ],
            },
          },
        },
        {
          name: 'Ben Ahola',
          role: 'Junior Dev',
          image: '{{PLACEHOLDER_IMAGE}}',
          socials: {
            facebook: '#',
            twitter: '#',
            linkedin: '#',
          },
          description: {
            root: {
              type: 'root',
              version: 1,
              indent: 0,
              direction: 'ltr',
              format: '',
              children: [
                {
                  type: 'paragraph',
                  version: 1,
                  indent: 0,
                  direction: 'ltr',
                  format: '',
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
                      text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas ultricies posuere.',
                    },
                  ],
                },
              ],
            },
          },
        },
      ],
    },
    {
      blockType: 'formBlock',
      form: '{{CONTACTUS_FORMID}}',
      enableIntro: true,
      introContent: {
        root: {
          type: 'root',
          version: 1,
          indent: 0,
          direction: null,
          format: '',
          children: [
            {
              type: 'paragraph',
              version: 1,
              indent: 0,
              direction: null,
              format: '',
              textFormat: 0,
              textStyle: '',
              children: [],
            },
          ],
        },
      },
      secondaryContent: true,
      secondaryContentText: {
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
              tag: 'h2',
              textFormat: 1,
              indent: 0,
              direction: 'ltr',
              format: '',
              children: [
                {
                  type: 'text',
                  version: 1,
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                  text: 'Contact Us',
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              indent: 0,
              direction: 'ltr',
              format: '',
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
                  text: 'If you have any questions, do not hesitate to reach out. We will get back to you as soon as possible!',
                },
              ],
            },
          ],
        },
      },
    },
  ],
  meta: {},
}