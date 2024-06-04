import React, { useState, useRef } from "react"
import {
  GitHubLogoIcon,
  TwitterLogoIcon,
  DiscordLogoIcon,
  HamburgerMenuIcon,
  Cross1Icon
} from "@radix-ui/react-icons"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useAccount, useNetwork } from "wagmi"
import { Container } from "./Container"
import { useRouter } from "next/router"
import { ModeToggle } from "./ModeToggle"
import { motion, AnimatePresence } from "framer-motion"

const navVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.3 },
    display: "flex"
  },
  closed: {
    y: "-100%",
    opacity: 0,
    transition: { duration: 0.3 },
    transitionEnd: { display: "none" }
  }
}

export function SiteHeader() {
  const { address } = useAccount()
  const navIconRef = useRef()
  const navRef = useRef()
  const router = useRouter()
  const { chain } = useNetwork()

  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleMenu = () => {
    if (!isAnimating) {
      setIsMenuOpen(!isMenuOpen)
    }
  }

  const handleAnimationStart = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
  }

  const renderNavContent = () => (
    <>
      <Button
        variant="ghost"
        className="bg-[#57C5B6] transform hover:scale-105 hover:bg-[#159895]"
        onClick={() => {
          router.push("/GasInsure")
        }}
      >
        Launch App
      </Button>
      <Button
        className="w-full bg-[#57C5B6]"
        variant="ghost"
        size="icon"
        onClick={() => window.open("https://twitter.com/gaslockr", "_blank")}
      >
        <TwitterLogoIcon className="h-6 w-6" />
      </Button>
      <Button
        className="w-full bg-[#57C5B6]"
        variant="ghost"
        size="icon"
        onClick={() => window.open("https://discord.gg/DUZMwJzfsP", "_blank")}
      >
        <DiscordLogoIcon className="h-6 w-6" />
      </Button>
      <ModeToggle />
    </>
  )

  const renderConnectButton = () => (
    <ConnectButton showBalance={false} accountStatus="address" />
  )

  const renderFaucetButton = () => (
    <Button
      className="bg-[#57C5B6] transform hover:scale-105 hover:bg-[#159895]"
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
  )

  return (
    <Container>
      <div className="flex h-16 items-center justify-between">
        <Link href="/" className="flex flex-row gap-2 items-center">
          <Image src="/logo.png" alt="Logo" width={48} height={48} />
        </Link>
        <div className="flex flex-row gap-4 items-center text-muted-foreground">
          <div className="lg:hidden md:hidden">
            {router.pathname === "/GasInsure" && renderConnectButton()}
            {router.pathname === "/mint" && renderConnectButton()}
          </div>
          <div className="sm:hidden flex flex-1 items-center justify-end">
            <button ref={navIconRef} onClick={toggleMenu}>
              {isMenuOpen ? (
                <Cross1Icon className="h-8 w-8 text-[#57C5B6]" />
              ) : (
                <HamburgerMenuIcon className="h-8 w-8 text-[#57C5B6]" />
              )}
            </button>
          </div>

          <AnimatePresence
            initial={false}
            onExitComplete={handleAnimationComplete}
          >
            {isMenuOpen && (
              <motion.div
                ref={navRef}
                title="nav"
                initial="closed"
                animate="open"
                exit="closed"
                variants={navVariants}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
                className="z-30 bg-gray-200 dark:bg-[#1b1a33] top-16 fixed flex max-w-full inset-x-0 bottom-0 w-screen flex-col gap-2 overflow-y-auto"
              >
                <div className="flex flex-col gap-2 px-6 mt-10 text-white">
                  {router.pathname === "/" && renderNavContent()}
                  {router.pathname === "/GasInsure" && (
                    <>
                      {renderFaucetButton()}
                      {renderNavContent()}
                    </>
                  )}
                  {router.pathname === "/mint" && renderNavContent()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div title="nav" className="gap-x-4 hidden sm:flex sm:flex-row">
            {router.pathname === "/" && (
              <>
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

                <ModeToggle />

                <Button
                  className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                  onClick={() => {
                    router.push("/GasInsure")
                  }}
                >
                  Launch App
                </Button>
              </>
            )}

            {router.pathname === "/GasInsure" && (
              <>
                {renderFaucetButton()}
                {renderConnectButton()}
                <ModeToggle />
              </>
            )}

            {router.pathname === "/mint" && (
              <>
                {renderConnectButton()}
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

                <ModeToggle />

                <Button
                  className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                  onClick={() => {
                    router.push("/GasInsure")
                  }}
                >
                  Launch App
                </Button>
              </>
            )}

            {router.pathname === "/leaderboard" && (
              <>
                {renderConnectButton()}
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

                <ModeToggle />

                <Button
                  className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                  onClick={() => {
                    router.push("/GasInsure")
                  }}
                >
                  Launch App
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </Container>
  )
}
