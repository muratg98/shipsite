import { createAuthClient } from "better-auth/react"
import { magicLinkClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";
import { stripeClient } from "@better-auth/stripe/client"

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    plugins: [
        magicLinkClient(),
        inferAdditionalFields<typeof auth>(),
        stripeClient({
            subscription: true 
        })
    ]
})

export const { signIn, signUp, useSession } = createAuthClient()
