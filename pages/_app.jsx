import { SiteHeader } from "@/components/site-header"
import "../styles/globals.css"

import { Web3Provider } from "providers/Web3"

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <div className="container">
        <SiteHeader />
        <Component {...pageProps} />
      </div>
    </Web3Provider>
  )
}

export default MyApp
