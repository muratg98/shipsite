"use client";

import { authClient } from "@/lib/auth-client";
import LoadingButton from "@/components/loading-button";
import { useState } from "react";

export default function SubscriptionButton({ isAnnual=false }: { isAnnual: boolean }) {
    const [pending, setPending] = useState(false);

    const handleSignOut = async () => {
        try {
            setPending(true);
            const { error } = await authClient.subscription.upgrade({
                plan: "standard",
                successUrl: "/dashboard",
                cancelUrl: "/",
                annual: isAnnual
            });
            if(error) {
                alert(error.message);
            }
        } catch (error) {
            console.error("Error signing out:", error);
        } finally {
            setPending(false);
        }
    };

    return (
        <LoadingButton pending={pending} onClick={handleSignOut}>
            Subscribe
        </LoadingButton>
    );
}