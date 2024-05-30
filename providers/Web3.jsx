import { useEffect, useState } from "react"
import "@rainbow-me/rainbowkit/styles.css"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import {
  connectorsForWallets,
  RainbowKitProvider,
  lightTheme,
  darkTheme
} from "@rainbow-me/rainbowkit"
import { useTheme } from "next-themes"
import { sepolia, polygon } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import {
  metaMaskWallet,
  okxWallet,
  rainbowWallet,
  coinbaseWallet,
  walletConnectWallet
} from "@rainbow-me/rainbowkit/wallets"

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
  [sepolia, polygon],
  [publicProvider()]
)

const projectId = "928c0944dc8279fb073a7405ecd6b657"
const connectors = connectorsForWallets([
  {
    groupName: "Popular",
    wallets: [
      metaMaskWallet({ projectId, chains }),
      okxWallet({ projectId, chains }),
      rainbowWallet({ projectId, chains }),
      coinbaseWallet({ chains, appName: "GasLockR" }),
      walletConnectWallet({ projectId, chains })
    ]
  }
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient
})

export function Web3Provider(props) {
  const [ready, setReady] = useState(false)

  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    setReady(true)
  }, [])

  const rainbowTheme =
    resolvedTheme === "dark"
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
          <RainbowKitProvider
            chains={chains}
            theme={rainbowTheme}
            coolMode={true}
          >
            {props.children}
          </RainbowKitProvider>
        </WagmiConfig>
      )}
    </>
  )
}
