import { stripeProxy } from '@payloadcms/plugin-stripe'

export async function CreateCheckout(priceId: string, paymentType: string, userId: string, email: string) {
  try {
    // Determine the payment mode: either 'payment' or 'subscription'
    const mode: 'payment' | 'subscription' = paymentType === 'subscription' ? 'subscription' : 'payment';

    // Create the checkout session using stripeProxy
    const checkoutSession = await stripeProxy({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY || "",
      stripeMethod: 'checkout.sessions.create',
      stripeArgs: [
        {
          line_items: [
            {
              price: priceId,
              quantity: 1,
            },
          ],
          mode, 
          success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,
          cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/dashboard`,  
          customer_email: email, 
          metadata: {
            userId, 
          },
        },
      ],
    });

    if (checkoutSession.status === 200) {
      return checkoutSession.data.url;
    } else {
      throw new Error(`Failed to create checkout session: ${checkoutSession.message}`);
    }
  } catch (error) {
    // Log any errors that occur during the process
    console.error('Error creating checkout session:', error);
    return null;
  }
}
