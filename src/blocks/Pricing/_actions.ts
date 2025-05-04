'use server'

import { CreateCheckout } from "@/utilities/createStripeCheckout";

export async function handlePurchaseAction(
  priceId: string,
  paymentType: string,
  userId: string,
  userEmail: string
): Promise<string | null> {
  if (!userId || !userEmail) return null;

  const checkoutUrl = await CreateCheckout(priceId, paymentType, userId, userEmail);
  return checkoutUrl || null;
}