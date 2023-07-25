import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import {
  usePersonalCheckout,
  useProfessionalCheckout
} from "../../hooks/useCheckout"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Loader2 } from "lucide-react"

const Pricing = () => {
  const { personalCheckout, isPersonalCheckoutLoading } = usePersonalCheckout()
  const { professionalCheckout, isProfessionalLoading } =
    useProfessionalCheckout()

  const { address } = useAccount()

  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 p-14">
        <h1 className="font-bold text-4xl">
          We offer a variety of options tailored to our customer base.
        </h1>
        <div className="flex justify-center space-x-8 p-14">
          {/* Regular User Card */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="text-base text-gray-400">
                Personal
              </CardTitle>
              <CardDescription className="text-base text-black flex flex-row items-center gap-2 p-4 h-28">
                <div>
                  <span className="relative -top-6 right-1 text-2xl  font-medium">
                    $
                  </span>
                  <span className="text-5xl  font-medium">10</span>
                  <span className="text-3xl font-medium text-gray-500">
                    /7days
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li className="flex flex-row gap-2">
                  <div>Max Payout:</div>
                  <div className="text-emerald-500">0.2 ETH</div>
                </li>
                <li className="flex flex-row gap-2">
                  <div>Min Claim Fluctuation:</div>
                  <div className="text-emerald-500">5%</div>
                </li>
                <li>Flexible Coverage</li>
                <li>Affordable Rates</li>
                <li>Immediate Protection</li>
                <li>Automated Claims Process</li>
                <li>Speedy Transactions</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              {address ? (
                <Button
                  className="w-3/4 bg-black text-white transform hover:scale-105 hover:bg-black"
                  onClick={() => personalCheckout(address)}
                  disabled={isPersonalCheckoutLoading}
                >
                  {isPersonalCheckoutLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Get Started
                </Button>
              ) : (
                <ConnectButton />
              )}
            </CardFooter>
          </Card>

          {/* Advanced User Card */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="text-base text-gray-400">
                Professional
              </CardTitle>
              <CardDescription className="text-base text-black flex flex-row items-center gap-2 p-4 h-28">
                <div>
                  <span className="relative -top-6 right-1 text-2xl  font-medium">
                    $
                  </span>
                  <span className="text-5xl  font-medium">25</span>
                  <span className="text-3xl font-medium text-gray-500">
                    /15days
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li className="flex flex-row gap-2">
                  <div>Max Payout:</div>
                  <div className="text-emerald-500"> 1 ETH</div>
                </li>
                <li className="flex flex-row gap-2">
                  <div>Min Claim Fluctuation:</div>
                  <div className="text-emerald-500"> 5%</div>
                </li>
                <li>Multiple Purchases Allowed</li>
                <li>Enhanced Payouts</li>
                <li>Elevated Returns</li>
                <li>Automated Claims Process</li>
                <li>Speedy Transactions</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              {address ? (
                <Button
                  className="w-3/4 bg-black text-white transform hover:scale-105 hover:bg-black"
                  onClick={() => professionalCheckout(address)}
                  disabled={isProfessionalLoading}
                >
                  {isProfessionalLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Get Started
                </Button>
              ) : (
                <ConnectButton />
              )}
            </CardFooter>
          </Card>

          {/* Enterprise Card */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="text-base text-gray-400">
                Business
              </CardTitle>
              <CardDescription className="text-base text-black flex flex-row justify-center items-center gap-2 p-4 h-28">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-medium">Custom Pricing</span>
                  <span className="text-gray-500">Tailored to your needs</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li>Customizable Coverage Options</li>
                <li>Dedicated Enterprise Support</li>
                <li>Advanced Analytics Suite</li>
                <li>Streamlined Claims Process</li>
                <li>Integrated Payment Solutions</li>
                <li>Enhanced Security Protocols</li>
                <li>Integrated Payment Solutions</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button className="w-3/4 bg-black text-white transform hover:scale-105 hover:bg-black">
                Contact Us
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Pricing
