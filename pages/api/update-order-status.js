import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).end()
  }

  const { sessionId, status } = req.body

  if (!sessionId || !status) {
    return res
      .status(400)
      .json({ error: "Session ID and status are required." })
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (!session) {
      return res.status(404).json({ error: "Session not found." })
    }

    // Update the metadata with the new status
    await stripe.checkout.sessions.update(sessionId, {
      metadata: {
        ...session.metadata,
        orderStatus: status
      }
    })

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}
