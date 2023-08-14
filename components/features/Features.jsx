import React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import { Container } from "../Container"
import BackgroundIllustration from "../backgroundIllustration/BackgroundIllustration"

const Features = () => {
  const router = useRouter()
  return (
    <div className="overflow-hidden py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="lg:grid lg:grid-cols-12 lg:gap-x-8 lg:gap-y-20">
          <div className="relative z-10 mx-auto max-w-2xl lg:col-span-7 lg:max-w-none lg:pt-6 xl:col-span-6">
            <h1 className="text-4xl font-medium tracking-tight text-gray-900">
              Welcome to GasLockR
            </h1>
            <p className="mt-6 text-lg text-gray-600">
              The first trustless GasFi protocol for EVM-based chains
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-4">
              <Button
                className="bg-[#1A5F7A] text-white transform hover:scale-105 hover:bg-[#002B5B]"
                onClick={() => {
                  router.push("/GasSubscribe")
                }}
              >
                Try it Now
              </Button>
              <Button
                disabled
                className="bg-gray-200 transform hover:scale-105 hover:bg-gray-200 text-black"
              >
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative mt-10 sm:mt-20 lg:col-span-5 lg:row-span-2 lg:mt-0 xl:col-span-6">
            <BackgroundIllustration className="absolute left-1/2 top-4 h-[1026px] w-[1026px] -translate-x-1/3 stroke-gray-300/70 [mask-image:linear-gradient(to_bottom,white_20%,transparent_75%)] sm:top-16 sm:-translate-x-1/2 lg:-top-16 lg:ml-12 xl:-top-14 xl:ml-0" />
            <div></div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Features
