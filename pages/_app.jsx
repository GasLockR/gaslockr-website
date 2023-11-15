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
    <Web3Provider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <div>
          <SiteHeader />
          <Component {...pageProps} />
          <Toaster />
          <Analytics />
          <Footer />
        </div>
      </ThemeProvider>
    </Web3Provider>
  )
}

export default MyApp
