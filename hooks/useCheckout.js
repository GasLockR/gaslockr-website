import { useState } from "react"
import { loadStripe } from "@stripe/stripe-js"

const stripePromise = loadStripe(
  "pk_test_51NSatYBaaASCsucrtgKGlsAJ3tsoiCFnwQRncCTSyVM2jPALyslfyQxpKgddeDfriESIgadFafAaOBVOsy0kMI2q00L2jQg87R"
)

export const usePersonalCheckout = () => {
  const [isPersonalCheckoutLoading, setIsPersonalCheckoutLoading] =
    useState(false)
  const handleCheckout = async (ethereumAddress) => {
    setIsPersonalCheckoutLoading(true)
    try {
      const response = await fetch("/api/create-personal-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ethAddress: ethereumAddress })
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const session = await response.json()
      const stripe = await stripePromise
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      console.error("There was an error creating the checkout session:", error)
    } finally {
      setIsPersonalCheckoutLoading(false)
    }
  }
  return {
    personalCheckout: handleCheckout,
    isPersonalCheckoutLoading: isPersonalCheckoutLoading
  }
}

export const useProfessionalCheckout = () => {
  const [isProfessionalLoading, setProfessionalLoading] = useState(false)
  const handleCheckout = async (ethereumAddress) => {
    setProfessionalLoading(true)
    try {
      const response = await fetch("/api/create-professional-checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ ethAddress: ethereumAddress })
      })
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const session = await response.json()
      const stripe = await stripePromise
      await stripe.redirectToCheckout({ sessionId: session.id })
    } catch (error) {
      console.error("There was an error creating the checkout session:", error)
    } finally {
      setProfessionalLoading(false)
    }
  }

  return {
    professionalCheckout: handleCheckout,
    isProfessionalLoading: isProfessionalLoading
  }
}
