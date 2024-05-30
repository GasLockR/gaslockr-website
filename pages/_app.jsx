import { SiteHeader } from "@/components/site-header"
import "../styles/globals.css"
import "../styles/layout.css"
import { Analytics } from "@vercel/analytics/react"

import { Web3Provider } from "providers/Web3"
import Footer from "@/components/footer/Footer"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/providers/theme-provider"

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Web3Provider>
        <div>
          <SiteHeader />
          <div className="my-20">
            <Component {...pageProps} />
          </div>
          <Toaster />
          <Analytics />
          <Footer />
        </div>
      </Web3Provider>
    </ThemeProvider>
  )
}

export default MyApp
