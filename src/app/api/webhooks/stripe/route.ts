// import { NextRequest, NextResponse } from "next/server";
// import Stripe from "stripe";
// import { stripe } from "../../../../../lib/stripi";
// import prisma from "../../../../../lib/prisma";

// export async function POST(req: NextRequest) {
//   const sig = req.headers.get("stripe-signature")!;
//   const body = await req.text();

//   let event: Stripe.Event;

//   try {
//     event = stripe.webhooks.constructEvent(
//       body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     );
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err);
//     return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session;
//     const orderId = session.metadata?.orderId;

//     if (orderId) {
//       await prisma.order.update({
//         where: { id: Number(orderId) },
//         data: { status: "PAYED" },
//       });
//       console.log(`Order ${orderId} marked as PAYED`);
//     }
//   }

//   return NextResponse.json({ received: true });
// }
