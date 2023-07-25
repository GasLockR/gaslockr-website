import { buffer } from "micro"
import Stripe from "stripe"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET

export const config = {
  api: {
    bodyParser: false
  }
}

export default async function handler(req, res) {
  if (req.method === "POST") {
    const buf = await buffer(req)
    const sig = req.headers["stripe-signature"]

    let event

    try {
      event = stripe.webhooks.constructEvent(
        buf.toString(),
        sig,
        endpointSecret
      )
    } catch (err) {
      res.status(400).send(`Webhook Error: ${err.message}`)
      return
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed":
        const session = event.data.object
        const ethAddress = session.metadata.ethAddress

        console.log("ID:", session.id)
        console.log("ETH Address:", ethAddress)

        // Retrieve the line items associated with the session
        try {
          const lineItems = await stripe.checkout.sessions.listLineItems(
            session.id
          )
          if (lineItems.data.length > 0) {
            const productData = lineItems.data[0]
            const productId = productData.price.product
            console.log("Product ID:", productId)
            console.log("Purchase Count:", productData.quantity)

            // Retrieve the detailed product information
            const product = await stripe.products.retrieve(productId)
            console.log("Product Name:", product.name)
            console.log("Product Description:", product.description)

            // call chainlinkAdapter
            // https://gaslockr-website.vercel.app/api/chainlinkAdapter
            const chainlinkResponse = await fetch(
              `http://${req.headers.host}/api/chainlinkAdapter`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json"
                },
                body: JSON.stringify({
                  productId: productId,
                  quantity: productData.quantity,
                  productName: product.name,
                  productDescription: product.description
                })
              }
            )

            const chainlinkData = await chainlinkResponse.json()
            console.log("Chainlink Adapter Response:", chainlinkData)
          } else {
            console.log("No products found for this session.")
          }
        } catch (error) {
          console.error(
            "Error retrieving line items or product details:",
            error.message
          )
        }

        break

      default:
        console.log(`Unhandled event type ${event.type}`)
    }

    // Return a 200 response to acknowledge receipt of the event
    res.status(200).json({ received: true })
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
