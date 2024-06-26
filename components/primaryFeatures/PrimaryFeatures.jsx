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

const PrimaryFeatures = () => {
  const router = useRouter()
  return (
    <section className="bg-gray-900 py-20 sm:py-32">
      <Container className="max-w-7xl">
        <div className="flex flex-col items-center justify-center mb-12 text-center">
          <h2 className="text-4xl sm:text-5xl font-medium tracking-tight text-white">
            GasFi - A New Epoch in Blockchain Transactions
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-400">
            Engineered with GasLockR. Venture into a transformative space where
            unpredictable gas fees become manageable. Change the way you
            transact on the blockchain with financial tools designed to provide
            assurance against price volatility.
          </p>
        </div>
        <div className="flex flex-col gap-16 lg:gap-24 py-20">
          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:pr-6 mb-12 lg:mb-0 lg:self-start">
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
                  <div className="mb-8">
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
                    disabled
                    className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                    onClick={() => {
                      router.push("/GasInsure")
                    }}
                  >
                    Try it Now
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="hidden lg:block lg:w-1/2"></div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="hidden lg:block lg:w-1/2"></div>
            <div className="w-full lg:w-1/2 lg:pl-6 mb-12 lg:mb-0 lg:self-end">
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
                  <div className="mb-8">
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
                <CardFooter className="flex justify-end lg:justify-start">
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

          <div className="flex flex-col lg:flex-row justify-between">
            <div className="w-full lg:w-1/2 lg:pr-6 mb-12 lg:mb-0 lg:self-start">
              <Card className="bg-transparent relative backdrop-blur-md border-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#57C5B6] via-blue-500 to-[#8878d5] opacity-10"></div>
                <CardHeader>
                  <CardTitle className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-blue-300">
                    GasReimburse
                  </CardTitle>
                  <CardDescription className="text-xl text-white">
                    Gas costs lead to connections.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="mb-8">
                    Pioneers the first ZK trustless Activity Scoring Protocol on
                    the EVM, offering a trustless gas reimbursement solution.
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Dynamic Reimbursement Ratio</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">
                      Trustless Activity Scoring Protocol
                    </span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Real-time Gas Fee Monitoring</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Seamless Integration</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">Cross-platform Compatibility</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">
                      ZK-Proofs for Data Verification
                    </span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                    onClick={() => {
                      router.push("/GRP")
                    }}
                    disabled
                  >
                    Coming soon...
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div className="hidden lg:block lg:w-1/2"></div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PrimaryFeatures
