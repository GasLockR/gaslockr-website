import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01"
})

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { ethAddress } = req.body

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "GasLockR Professional Plan",
              description: "GasLockR Professional Plan",
              images: [
                "https://stripe-camo.global.ssl.fastly.net/ae797d80f64f34c63a86ed5d85ee869bc8f72a9e9bdd684cae40d76e2b3ae374/68747470733a2f2f66696c65732e7374726970652e636f6d2f66696c65732f4d44423859574e6a64463878546c4e6864466c435957464255304e7a64574e7966475a6662476c325a56396165577069655670305a6c64334e457456546c5a3363455a465a6c413353453430304e76667a68593652"
              ]
            },
            unit_amount: 2500
          },
          quantity: 1,
          adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 999
          }
        }
      ],
      mode: "payment",
      success_url: "https://gaslockr-website.vercel.app/ClaimList",
      cancel_url: "https://gaslockr-website.vercel.app/ClaimList",
      metadata: {
        ethAddress
      }
    })
    res.json({ id: session.id })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
