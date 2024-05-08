import React, { useState, useRef, useEffect } from "react"
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
    x: 0,
    opacity: 1,
    transition: { duration: 0.3 },
    display: "flex"
  },
  closed: {
    x: "-100%",
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

  return (
    <Container className="top-0 z-40 w-full">
      <div className="container flex h-16 items-center sm:px-8 px-2 justify-between sm:space-x-0 overflow-hidden">
        <div className="flex flex-row justify-between gap-8 items-center text-base font-medium text-muted-foreground">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <Image src="/logo.png" alt="Logo" width={48} height={48} />
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#159895] to-[#1A5F7A]">
              GasLockR
            </div>
          </Link>
        </div>
        <div className="flex flex-row items-center space-x-4 text-muted-foreground">
          <div className="sm:hidden flex flex-1 items-center justify-end ">
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
                className="flex-col gap-x-20 absolute sm:relative top-16 left-0 right-0 z-50 rounded-lg mx-2"
              >
                <div className="flex flex-col gap-2 bg-slate-500 h-full">
                  <ConnectButton />
                  <ModeToggle />
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
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div title="nav" className="gap-x-10 hidden sm:flex sm:flex-row">
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
              </>
            )}

            <div className=" flex-row justify-end items-center space-x-4 text-muted-foreground hidden sm:flex">
              <div className="hidden sm:flex">
                {/* <ConnectButton /> */}
                <Button
                  className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                  onClick={() => {
                    router.push("/GasInsure")
                  }}
                >
                  Launch App
                </Button>
                <ModeToggle />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}
