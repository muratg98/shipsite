import type { Media } from '@/payload-types'

export const userplaceholderimage: Omit<Media, 'createdAt' | 'id' | 'updatedAt'> = {
  alt: 'shipshiplogo1',
  width: 500,
  height: 500,
  caption: {
    root: {
      type: 'root',
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
              text: 'placeholderimage',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
}
