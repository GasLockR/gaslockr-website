import { useEffect, useState } from "react"
import "@rainbow-me/rainbowkit/styles.css"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
  getDefaultWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme
} from "@rainbow-me/rainbowkit"
import { useTheme } from "next-themes"
import { sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"

export const ScrollSepoliaTestnet = {
  id: 534351,
  name: "Scroll Sepolia",
  network: "Scroll Sepolia",
  nativeCurrency: {
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH"
  },
  rpcUrls: {
    public: { http: ["https://sepolia-rpc.scroll.io"] },
    default: { http: ["https://sepolia-rpc.scroll.io"] }
  },
  blockExplorers: {
    default: { name: "scrollscan", url: "https://sepolia.scrollscan.dev" }
  }
}

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [sepolia, ScrollSepoliaTestnet],
  [publicProvider()]
)

const { connectors } = getDefaultWallets({
  appName: "Dapp Forge",
  projectId: "928c0944dc8279fb073a7405ecd6b657",
  chains
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export function Web3Provider(props) {
  const [ready, setReady] = useState(false)

  const { theme } = useTheme()

  useEffect(() => {
    setReady(true)
  }, [])

  const rainbowTheme =
    theme === "dark"
      ? darkTheme({
          accentColor: "#57C5B6",
          accentColorForeground: "white",
          borderRadius: "medium"
        })
      : lightTheme({
          accentColor: "#57C5B6",
          accentColorForeground: "white",
          borderRadius: "medium"
        })

  return (
    <>
      {ready && (
        <WagmiConfig config={wagmiConfig}>
          <RainbowKitProvider chains={chains} theme={rainbowTheme}>
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  )
}
