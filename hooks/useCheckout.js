import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51NSatYBaaASCsucrtgKGlsAJ3tsoiCFnwQRncCTSyVM2jPALyslfyQxpKgddeDfriESIgadFafAaOBVOsy0kMI2q00L2jQg87R"
)

export const usePersonalCheckout = () => {
  const handleCheckout = async (ethereumAddress) => {
    try {
      const response = await fetch(
        "http://localhost:5252/create-personal-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ethAddress: ethereumAddress })
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const session = await response.json()
      const stripe = await stripePromise
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      console.error("There was an error creating the checkout session:", error)
    }
  }

  return handleCheckout
}

export const useProfessionalCheckout = () => {
  const handleCheckout = async (ethereumAddress) => {
    try {
      const response = await fetch(
        "http://localhost:5252/create-professional-checkout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ethAddress: ethereumAddress })
        }
      )
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const session = await response.json()
      const stripe = await stripePromise
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      console.error("There was an error creating the checkout session:", error)
    }
  }

  return handleCheckout
}
