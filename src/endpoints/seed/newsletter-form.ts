import { RequiredDataFromCollectionSlug } from 'payload';

export const newsletterForm: RequiredDataFromCollectionSlug<'forms'> = {
  title: 'NewsLetter',
  fields: [
    {
      blockType: 'email',
      name: 'email',
      label: 'Email',
      width: 100,
    },
  ],
  confirmationType: 'message',
  confirmationMessage: {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children: [
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
              version: 1,
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Thank you for subscribing to our newsletter!',
            },
          ],
        },
      ],
    },
  },
  formStyle: 'newsletter',
  submitButtonLabel: 'Submit',
};
