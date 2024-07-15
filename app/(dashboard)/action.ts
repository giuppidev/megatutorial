"use server";
import { getURL } from "@/utils/helpers";
import { stripe } from "@/utils/stripe/stripe";
import { redirect } from "next/navigation";

export async function handleSubscribe(formData: FormData) {
  const priceId = formData.get("price") as string;

  const session = await stripe.checkout.sessions.create({
    billing_address_collection: "required",
    locale: "it",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    allow_promotion_codes: true,
    mode: "subscription",
    success_url: `${getURL()}/confirm?success=true&session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${getURL()}/confirm?success=false`,
  });

  if (!session || !session.url) {
    return;
  }

  redirect(session.url);
}
