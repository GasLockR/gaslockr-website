import React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import { Container } from "../Container"

const Features = () => {
  const router = useRouter()

  return (
    <div className="overflow-hidden flex justify-center mb-60 sm:py-24 lg:pb-24 xl:pb-24">
      <Container className="flex flex-col items-center text-center max-w-6xl">
        <div className="relative z-10 mx-auto">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-7xl font-bold tracking-tight text-gray-900 dark:text-gray-200">
            On-chain with Peace
          </h1>
          <p className="mt-6 sm:mt-8 lg:mt-10 text-base sm:text-lg lg:text-xl text-gray-600 dark:text-gray-300">
            GasLockR is the first trustless GasFi protocol designed for
            EVM-based chains. Hedge against fluctuating gas prices with our
            AI-driven real-time AFP models, credited by external oracles and ZK
            proofs. Trust in reliable on-chain experiences, empower services
            with solid SLAs, and pave the way for accelerated web3 adoption.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-4">
            <Button
              className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
              onClick={() => {
                router.push("/GasInsure")
              }}
            >
              Try it Now
            </Button>
            <Button
              className="bg-[#1A5F7A] transform hover:scale-105 hover:bg-[#002B5B] text-white"
              onClick={() =>
                window.open("https://gaslockr.gitbook.io/gaslockr", "_blank")
              }
            >
              Learn More
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Features
