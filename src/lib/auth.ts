import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { getPayload } from "payload";
import configPromise from '@payload-config'
import { magicLink } from "better-auth/plugins";
import { createAuthMiddleware } from "better-auth/api";
import Stripe from "stripe";

const client = new MongoClient(process.env.DATABASE_URI);
const db = client.db()

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
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            const stripeSecretKey = process.env.STRIPE_SECRET_KEY || '';
            const stripe = new Stripe(stripeSecretKey, {
            apiVersion: '2022-08-01',
            });
            if (ctx.body && ctx.body.email) {
                const customer = await stripe.customers.create({
                    email: ctx.body.email,
                });

                return {
                    context: {
                        ...ctx,
                        body: {
                            ...ctx.body,
                            customerId: customer.id,
                        },
                    }
                };
            }
        }),
    }
})

type Session = typeof auth.$Infer.Session