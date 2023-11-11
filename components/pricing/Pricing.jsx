import React, { useState } from "react"
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
import InsuranceSheet from "../insuranceSheet/InsuranceSheet"
import { useInsuredPolicies, usePayerPolicies } from "@/hooks/usePolicyList"
import PolicyList from "../policyList/PolicyList"
import { Container } from "../Container"
import InsurancePayoutCalendar from "../insurancePayoutCalendar/InsurancePayoutCalendar"
import IncomeChart from "../incomeChart/IncomeChart"
import { payoutDates } from "@/config/mockData"

const Pricing = () => {
  const { personalCheckout, isPersonalCheckoutLoading } = usePersonalCheckout()
  const { professionalCheckout, isProfessionalLoading } =
    useProfessionalCheckout()

  const { address } = useAccount()

  const { payerPolicyList, isPayerListError, isPayerListLoading } =
    usePayerPolicies(address)
  const { insuredPolicyList, isInsuredListError, isInsuredListLoading } =
    useInsuredPolicies(address)

  const memoizedPayerPolicies = React.useMemo(
    () => payerPolicyList,
    [payerPolicyList]
  )
  const memoizedInsuredPolicies = React.useMemo(
    () => insuredPolicyList,
    [insuredPolicyList]
  )

  return (
    <div className="overflow-hidden h-full mb-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-bold text-4xl mb-20">
            GasInsure - Where peace of mind meets every transaction.
          </h1>

          {/* <div className="w-full">
            <IncomeChart data={data} />
          </div> */}
          <div className="flex justify-center space-x-16">
            {/* Regular User Card */}
            <Card className="w-[360px] h-[490px]">
              <CardHeader>
                <CardTitle className="text-base text-gray-400">
                  Personal
                </CardTitle>
                <CardDescription className="text-base text-black flex flex-row items-center justify-center gap-2 h-28">
                  <div>
                    {/* <span className="relative -top-6 right-1 text-2xl  font-medium">
                      $
                    </span> */}
                    {/* <span className="text-5xl  font-medium">10</span> */}
                    <div className="flex flex-row items-end justify-center gap-4">
                      <span className="text-3xl font-medium">Starting at</span>
                      <div className="flex flex-row ">
                        {/* TODO */}
                        <span className="text-[#57C5B6] relative right-1 text-2xl  font-medium">
                          $
                        </span>
                        <span className="text-[#57C5B6] text-5xl font-medium">
                          10
                        </span>
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row gap-2">
                    {/* <div className="font-bold">🔸 Minimum Input: 0.01 ETH</div> */}
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">🔸 Maximum Benefit: 15X</div>
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">🔸 Verifiable Benefit Boost</div>
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">🔸 Flexible Policy Periods</div>
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">
                      🔸 Protect You or Any ETH Address
                    </div>
                  </li>
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center items-center mt-20">
                {address ? (
                  // <Button
                  //   className="w-3/4 bg-black text-white transform hover:scale-105 hover:bg-black"
                  //   onClick={() => personalCheckout(address)}
                  //   disabled={isPersonalCheckoutLoading}
                  // >
                  //   {isPersonalCheckoutLoading ? (
                  //     <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  //   ) : null}
                  //   Get Started
                  // </Button>
                  <InsuranceSheet />
                ) : (
                  <ConnectButton />
                )}
              </CardFooter>
            </Card>

            {/* Advanced User Card */}
            <Card className="w-[360px] h-[490px] relative">
              <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-10">
                <span className="text-lg font-bold">Coming Soon</span>
              </div>
              <CardHeader>
                <CardTitle className="text-base text-gray-400">
                  Professional
                </CardTitle>
                <CardDescription className="text-base text-black flex flex-row items-center justify-center gap-2 h-28">
                  <div>
                    {/* <span className="relative -top-6 right-1 text-2xl  font-medium">
                      $
                    </span> */}
                    {/* <span className="text-5xl  font-medium">10</span> */}
                    <div className="flex flex-row items-end justify-center gap-4">
                      <span className="text-3xl font-medium">Starting at </span>
                      <div className="flex flex-row ">
                        <span className="text-[#57C5B6] relative right-1 text-2xl  font-medium">
                          $
                        </span>
                        <span className="text-[#57C5B6] text-5xl font-medium">
                          25
                        </span>
                      </div>
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <ul className="flex flex-col gap-2">
                  <li className="flex flex-row gap-2">
                    {/* <div className="font-bold">🔸 Minimum Input: 0.01 ETH</div> */}
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">🔸 Maximum Payout: 20X</div>
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">🔸 Maximum Fluctuation: 50%</div>
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">🔸 Flexible Policy Periods</div>
                  </li>
                  <li className="flex flex-row gap-2">
                    <div className="font-bold">
                      🔸 Protect You or Any ETH Address
                    </div>
                  </li>
                  {/* <li className="flex flex-row gap-2">
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
                  <li>Speedy Transactions</li> */}
                </ul>
              </CardContent>
              <CardFooter className="flex justify-center items-center mt-20">
                {/* {address ? (
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
              )} */}
                <Button className="w-3/4 bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]">
                  Coming Soon
                </Button>
              </CardFooter>
            </Card>

            {/* Enterprise Card */}
            <Card className="w-[360px] h-[490px] relative">
              <div className="absolute inset-0 bg-white bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-10">
                <span className="text-lg font-bold">Coming Soon</span>
              </div>
              <CardHeader>
                <CardTitle className="text-base text-gray-400">
                  Business
                </CardTitle>
                <CardDescription className="text-base text-black flex flex-row justify-center items-center gap-2 p-4 h-28">
                  <div className="flex flex-col items-center">
                    <span className="text-2xl font-medium">Custom Pricing</span>
                    <span className="text-gray-500">
                      Tailored to your needs
                    </span>
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
                <Button className="w-3/4 bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]">
                  Contact Us
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="w-full">
          <InsurancePayoutCalendar payoutDates={payoutDates} />
        </div>
        <div>
          {/* payer policy list */}
          {payerPolicyList ? (
            <>
              <div className="text-2xl mt-40">Insurance Policies as Payer</div>
              <PolicyList policies={memoizedPayerPolicies} />
            </>
          ) : null}
          {/* insured policy list */}
          {insuredPolicyList ? (
            <>
              <div className="text-2xl">Insurance Policies as Insured</div>
              <PolicyList policies={memoizedInsuredPolicies} />
            </>
          ) : null}
        </div>
      </Container>
    </div>
  )
}

export default Pricing
