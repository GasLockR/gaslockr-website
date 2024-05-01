import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  DiscordLogoIcon
} from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useNetwork } from "wagmi"
import { Container } from "./Container"
import { useRouter } from "next/router"
import { ModeToggle } from "./ModeToggle"

export function SiteHeader() {
  const { address } = useAccount()
  const router = useRouter()

  const { chain } = useNetwork()

  return (
    <Container className="top-0 z-40 w-full">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex flex-row justify-between gap-8 items-center text-base font-medium text-muted-foreground">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <Image src="/logo.png" alt="Logo" width={48} height={48} />
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#159895] to-[#1A5F7A]">
              GasLockR
            </div>
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4 text-muted-foreground">
          {router.pathname === "/GasInsure" && (
            <>
              <Button
                className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                onClick={() =>
                  window.open(
                    `${
                      chain?.id === 534351
                        ? "https://docs.scroll.io/en/user-guide/faucet"
                        : "https://sepoliafaucet.com"
                    }`,
                    "_blank"
                  )
                }
              >
                Faucet
              </Button>
            </>
          )}
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

          <ModeToggle />
        </div>
      </div>
    </Container>
  )
}
