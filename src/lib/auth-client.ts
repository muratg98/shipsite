import { createAuthClient } from "better-auth/react"
import { magicLinkClient, inferAdditionalFields } from "better-auth/client/plugins";
import type { auth } from "./auth";

export const authClient = createAuthClient({
    baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    plugins: [
        magicLinkClient(),
        inferAdditionalFields<typeof auth>()
    ]
})

export const { signIn, signUp, useSession } = createAuthClient()
