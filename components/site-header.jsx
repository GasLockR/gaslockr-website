import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  DiscordLogoIcon
} from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount } from "wagmi"

export function SiteHeader() {
  const { address } = useAccount()

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-row justify-between gap-8 items-center text-base font-medium text-muted-foreground">
          <Link href="/">
            <Image src="/logo.png" alt="Logo" width={128} height={128} />
          </Link>
          <Link href="/whitePaper" target="_blank">
            WhitePaper
          </Link>
          {address ? <Link href="/ClaimList">Purchase History</Link> : null}
        </div>
        <div className="flex flex-row items-center space-x-4 text-muted-foreground">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => window.open("https://github.com/GasLockR", "_blank")}
          >
            <GitHubLogoIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              window.open("https://twitter.com/gaslockr", "_blank")
            }
          >
            <TwitterLogoIcon className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() =>
              window.open("https://discord.gg/DUZMwJzfsP", "_blank")
            }
          >
            <DiscordLogoIcon className="h-6 w-6" />
          </Button>
          <ConnectButton />
        </div>
      </div>
    </header>
  )
}
