import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { getPayload } from "payload";
import configPromise from '@payload-config'
import { magicLink } from "better-auth/plugins";
import Stripe from "stripe";
import { stripe } from "@better-auth/stripe";

const client = new MongoClient(process.env.DATABASE_URI);
const db = client.db()

const stripeClient = new Stripe(process.env.STRIPE_SECRET_KEY!)

export const auth = betterAuth({
    database: mongodbAdapter(db),
    session: {
        expiresIn: 60 * 60 * 24 * 7, 
        updateAge: 60 * 60 * 24 * 7, 
        cookieCache: {
          enabled: true,
          maxAge: 5 * 60 
        }
    },
    emailAndPassword: {  
        enabled: true,
        requireEmailVerification: true,
        sendResetPassword: async ({ user, url, token }) => {
            const payload = await getPayload({ config: configPromise });
            await payload.sendEmail({
                to: user.email,
                subject: "Reset your password",
                html: `your token: ${token}. -- Click the link to reset your password: <a href="${url}" target="_blank">${url}</a>`
            });
        }
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, token }) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`;
            const payload = await getPayload({ config: configPromise });
            await payload.sendEmail({
                to: user.email,
                subject: "Verify your email address",
                html: `Click the link to verify your email: <a href="${verificationUrl}" target="_blank">${verificationUrl}</a>`
            });
        },
    },
    plugins: [
        magicLink({
            sendMagicLink: async ({ email, token, url }, request) => {
                const payload = await getPayload({ config: configPromise });
                await payload.sendEmail({
                to: email,
                subject: "Verify your email address",
                html: `Click the link to verify your email: <a href="${url}" target="_blank">${url}</a>`
            });
          }
      }),
      // STRIPE PLUGIN START
        stripe({
            stripeClient,
            stripeWebhookSecret: process.env.STRIPE_WEBHOOKS_ENDPOINT_SECRET!,
            createCustomerOnSignUp: true,
            subscription: {
                enabled: true,
                plans: async () => {
                    const payload = await getPayload({ config: configPromise });
                    const { docs: products } = await payload.find({
                      collection: 'products',
                      limit: 100,
                    });

                  
                    return products
                      .filter(product => product.name && Array.isArray(product.prices) && product.prices.length > 0 )
                      .map(product => {

                        const priceInfo: { priceId?: string; annualDiscountPriceId?: string } = {};      
                        for (const price of product.prices!) {
                            const interval = price.recurringInterval?.toLowerCase();
                            const currentPriceId = price.priceId;
                            if (typeof currentPriceId === 'string') {
                              if (interval === 'month') {
                                priceInfo.priceId = currentPriceId;
                              } else if (interval === 'year') {
                                priceInfo.annualDiscountPriceId = currentPriceId;
                              }
                            }
                          }

                  
                        return {
                          name: product.name as string,
                          ...priceInfo,
                          limits: Object.entries(product.metadata || {}).reduce((acc, [key, value]) => {
                            const num = Number(value);
                            if (!isNaN(num)) acc[key] = num;
                            return acc;
                          }, {} as Record<string, number>),
                        };
                      })
                      .filter(plan => !!plan.priceId);
                  }
            }
        }) 
        // STRIPE PLUGIN END
    ],
    socialProviders: {
        github: {
          clientId: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        },
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        },
        facebook: { 
            clientId: process.env.FACEBOOK_CLIENT_ID as string, 
            clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string, 
        },
        microsoft: { 
            clientId: process.env.MICROSOFT_CLIENT_ID as string, 
            clientSecret: process.env.MICROSOFT_CLIENT_SECRET as string, 
            // Optional
            tenantId: 'common', 
            requireSelectAccount: true
        },
        discord: { 
            clientId: process.env.DISCORD_CLIENT_ID as string, 
            clientSecret: process.env.DISCORD_CLIENT_SECRET as string, 
        }, 
        twitter: { 
            clientId: process.env.TWITTER_CLIENT_ID as string, 
            clientSecret: process.env.TWITTER_CLIENT_SECRET as string, 
        },
        linkedin: { 
            clientId: process.env.LINKEDIN_CLIENT_ID as string, 
            clientSecret: process.env.LINKEDIN_CLIENT_SECRET as string, 
        },
        reddit: {
            clientId: process.env.REDDIT_CLIENT_ID as string,
            clientSecret: process.env.REDDIT_CLIENT_SECRET as string,
        },    
    },
})

type Session = typeof auth.$Infer.Session