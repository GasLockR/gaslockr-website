import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { ethAddress } = req.query

    // Fetch checkout.sessions based on the ethAddress metadata
    const sessions = await stripe.checkout.sessions.list({
      limit: 100, // This retrieves the latest 100, adjust if necessary
      expand: ["data.line_items"]
    })

    // Filter sessions based on the provided ethAddress
    const filteredSessions = sessions.data.filter(
      (session) => session.metadata.ethAddress === ethAddress
    )

    const results = []

    for (let session of filteredSessions) {
      const lineItems = session.line_items.data

      if (lineItems.length > 0) {
        const productData = lineItems[0]
        const productId = productData.price.product

        // Retrieve the detailed product information
        const product = await stripe.products.retrieve(productId)

        results.push({
          ethAddress: session.metadata.ethAddress,
          productId: productId,
          productName: product.name,
          purchaseCount: productData.quantity,
          status: session.metadata.status || "active"
        })
      }
    }

    res.json(results)
  } else {
    res.status(405).end("Method Not Allowed")
  }
}
