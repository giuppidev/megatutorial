import WelcomeEmail from "@/email/welcome";
import { kannonClient } from "@/utils/kannon";
import { stripe } from "@/utils/stripe/stripe";
import { supabaseAdmin } from "@/utils/supabase/admin";
import { render } from "@react-email/render";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  let event;

  const body = await req.text(); // Otherwise use the basic event deserialized with JSON.parse
  const requestHeaders = new Headers(req.headers);

  // Get the signature sent by Stripe
  const sig = requestHeaders.get("stripe-signature") as string | string[];
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_KEY ?? ""
    );
  } catch (err: any) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  try {
    // Handle the event
    switch (event.type) {
      case "invoice.payment_succeeded":
        const paymentInvoiceSucceeded = event.data.object as any;

        const customerEmail: string =
          paymentInvoiceSucceeded.customer_email || "g.funicello@gmail.com";

        const { error } = await supabaseAdmin.from("subscriptions").upsert(
          {
            email: customerEmail,
            stripeid: paymentInvoiceSucceeded.customer || "id",
          },
          { onConflict: "email" }
        );

        if (error) {
          console.log(error.message);
          return NextResponse.json({ ok: false }, { status: 500 });
        }

        const customerName: string =
          paymentInvoiceSucceeded.customer_name || "giuppi";

        const mailHtml = render(<WelcomeEmail name={customerName} />);

        try {
          await kannonClient.sendHtml(
            [{ email: customerEmail }],
            "Benvenuto!",
            mailHtml
          );
        } catch (e) {}

        break;
      case "customer.subscription.deleted":
        const customerSub = event.data.object as any;

        const customerSubEmail: string =
          customerSub.customer_email || "g.funicello@gmail.com";

        const { error: errorSub } = await supabaseAdmin
          .from("subscriptions")
          .upsert(
            {
              email: customerSubEmail,
              active: false,
              stripeid: customerSub.customer || "id",
            },
            { onConflict: "email" }
          );

        if (errorSub) {
          console.log(errorSub.message);
          return NextResponse.json({ ok: false }, { status: 500 });
        }

        break;

      default:
        // Unexpected event type
        console.log(`Unhandled event type ${event.type}.`);
    }

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (err: any) {
    console.log(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
