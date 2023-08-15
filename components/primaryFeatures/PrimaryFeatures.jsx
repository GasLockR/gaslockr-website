import React from "react"
import { Container } from "../Container"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import CheckIcon from "../CheckIcon"
import clsx from "clsx"

const PrimaryFeatures = () => {
  const router = useRouter()
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="flex items-center justify-center mb-12">
          <h2 className="text-5xl font-medium tracking-tight text-white">
            GasFi - A New Epoch in Blockchain Transactions
          </h2>
        </div>
        <div className="flex items-center justify-center">
          <p className="mt-2 text-lg text-gray-400">
            Engineered with GasLockR. Venture into a transformative space where
            unpredictable gas fees become manageable. Change the way you
            transact on the blockchain with financial tools designed to provide
            assurance against price volatility.
          </p>
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl"></div>
        <div className="flex flex-col gap-24 py-20">
          <div className="flex flex-row justify-between">
            <div className="w-1/2">
              <Card className="bg-transparent relative backdrop-blur-md border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#57C5B6] via-blue-500 to-[#8878d5] opacity-10"></div>
                <CardHeader>
                  <CardTitle className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-blue-300">
                    GasInsure
                  </CardTitle>
                  <CardDescription className="text-xl text-white">
                    Where peace of mind meets every transaction.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className=" mb-8">
                    Elevate your decentralized interactions with our
                    cutting-edge insurance offering. Seamlessly shield your
                    transactions across multiple chains from gas price
                    turbulence. Delve into the web3 universe, free from gas fee
                    concerns.
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Tailor-made solutions</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Verifiably accurate pricing</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Harvest exclusive incentives</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Automated claim process</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                    onClick={() => {
                      router.push("/GasSubscribe")
                    }}
                    disabled
                  >
                    Coming soon...
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="w-1/2">
              <Card className="bg-transparent relative backdrop-blur-md border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#57C5B6] via-blue-500 to-[#8878d5] opacity-10"></div>
                <CardHeader>
                  <CardTitle className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-blue-300">
                    GasSubscribe
                  </CardTitle>
                  <CardDescription className="text-xl text-white">
                    Redefining on-chain simplicity.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className=" mb-8">
                    Envision a blockchain world as straightforward as a mobile
                    data subscription. Say goodbye to gas fee stresses;
                    pre-subscribe and immerse in your chosen DApps while we take
                    care of the gas intricacies.
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">
                      Opt for convenient fiat payments
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Gas-oblivious DApp experience</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Attractive subscription plans</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">
                      Wide-ranging DApp compatibility
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-start">
                  <Button
                    className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                    onClick={() => {
                      router.push("/GasSubscribe")
                    }}
                    disabled
                  >
                    Coming soon...
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PrimaryFeatures
