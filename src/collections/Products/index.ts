import type { CollectionConfig } from 'payload';
import Stripe from 'stripe'
import { isSuperAdminAccess } from '@/access/isSuperAdmin';
import { authenticated } from '@/access/authenticated';

export const Products: CollectionConfig = {
  slug: 'products',
  access: {
    create: isSuperAdminAccess,
    delete: isSuperAdminAccess,
    read: authenticated,
    update: isSuperAdminAccess,
  },
  admin: {
    useAsTitle: 'name',
  },
  fields: [
    {
      name: 'stripeProductID',
      label: 'Stripe Product',
      required: true,
      type: 'text',
      unique: true,
      admin: {
        components: {
          Field: 'src/collections/Products/ui/ProductSelectServer.tsx',
        },
      },
    },
    {
      name: 'name',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'description',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'features',
      type: 'array',
      fields: [
        {
          name: 'name',
          type: 'text',
        },
      ],
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'metadata',
      type: 'json',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'image',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
    {
      name: 'prices',
      type: 'array',
      admin: {
        readOnly: true
      },
      fields: [
        {
          name: 'priceId',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'currency',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'type',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'recurringInterval',
          type: 'text',
          admin: {
            readOnly: true,
          },
        },
        {
          name: 'amount',
          type: 'number',
          admin: {
            readOnly: true,
          },
        },
      ],
    },
  ],
  hooks: {
    beforeChange: [
      async ({ data }) => {
        const stripeProductID = data.stripeProductID;
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
        const stripe = new Stripe(stripeSecretKey);

        try {
          const product = await stripe.products.retrieve(stripeProductID);
          const price = await stripe.prices.list({
            product: stripeProductID,
          });

          const pricesData = price.data.map((priceItem) => {
            const amount = priceItem.unit_amount !== null ? priceItem.unit_amount / 100 : 0;
            return {
              priceId: priceItem.id,
              currency: priceItem.currency,
              type: priceItem.type,
              recurringInterval: priceItem.recurring?.interval || '', 
              amount, 
            };
          });

          return {
            ...data,
            name: product.name,
            description: product.description,
            features: product.marketing_features || [],
            metadata: product.metadata || {},
            image: product.images && product.images.length > 0 ? product.images[0] : '',
            prices: pricesData, 
          };
        } catch (error) {
          console.error('Error retrieving product or price:', error);
          return data; 
        }
      },
    ],
    
  },
  timestamps: true,
};