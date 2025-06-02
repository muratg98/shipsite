import type { RequiredDataFromCollectionSlug } from 'payload';

export const contactus: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'contact-us',
  _status: 'published',
  title: 'Contact Us',
  hero: {
    type: 'simpleWithImage',
    heroImage: '{{CONTACTUS_HERO_IMAGE}}',
    sliderImages: [],
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
            version: 1,
            format: 'left',
            indent: 0,
            direction: 'ltr',
            textFormat: 1,
            children: [
              {
                type: 'text',
                detail: 0,
                format: 1,
                mode: 'normal',
                style: '',
                text: 'Contact Us',
                version: 1,
              },
            ],
          },
          {
            type: 'paragraph',
            version: 1,
            format: 'left',
            indent: 0,
            direction: 'ltr',
            textFormat: 0,
            textStyle: '',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Sed ac justo sed orci pellentesque fermentum a vitae odio. Duis a egestas ipsum. Sed bibendum elit et facilisis egestas.',
                version: 1,
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
      form: '{{CONTACTUS_FORM}}',
      enableIntro: false,
      secondaryContent: true,
      secondaryContentText: {
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
              version: 1,
              format: 'start',
              indent: 0,
              direction: 'ltr',
              textFormat: 1,
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 1,
                  mode: 'normal',
                  style: '',
                  text: 'Send Us a Message',
                  version: 1,
                },
              ],
            },
            {
              type: 'paragraph',
              version: 1,
              format: '',
              indent: 0,
              direction: 'ltr',
              textFormat: 0,
              textStyle: '',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus egestas ultricies posuere. Sed ac justo sed orci pellentesque fermentum a vitae odio.',
                  version: 1,
                },
              ],
            },
          ],
        },
      },
    },
  ],
  slugLock: true,
  meta: {},
  Access: {},
};
