import { SiteHeader } from "@/components/site-header"
import "../styles/globals.css"

import { Web3Provider } from "providers/Web3"
import Footer from "@/components/footer/Footer"

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <div className="container">
        <SiteHeader />
        <Component {...pageProps} />
        <Footer />
      </div>
    </Web3Provider>
  )
}

export default MyApp
