import { SiteHeader } from "@/components/site-header"
import "../styles/globals.css"
import "../styles/layout.css"
import { Analytics } from "@vercel/analytics/react"

import { Web3Provider } from "providers/Web3"
import Footer from "@/components/footer/Footer"

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <div>
        <SiteHeader />
        <Component {...pageProps} />
        <Analytics />
        <Footer />
      </div>
    </Web3Provider>
  )
}

export default MyApp
