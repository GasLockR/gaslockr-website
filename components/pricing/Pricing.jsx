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

const data = [
  ["2000-06-05", 116],
  ["2000-06-06", 129],
  ["2000-06-07", 135],
  ["2000-06-08", 86],
  ["2000-06-09", 73],
  ["2000-06-10", 85],
  ["2000-06-11", 73],
  ["2000-06-12", 68],
  ["2000-06-13", 92],
  ["2000-06-14", 130],
  ["2000-06-15", 245],
  ["2000-06-16", 139],
  ["2000-06-17", 115],
  ["2000-06-18", 111],
  ["2000-06-19", 309],
  ["2000-06-20", 206],
  ["2000-06-21", 137],
  ["2000-06-22", 128],
  ["2000-06-23", 85],
  ["2000-06-24", 94],
  ["2000-06-25", 71],
  ["2000-06-26", 106],
  ["2000-06-27", 84],
  ["2000-06-28", 93],
  ["2000-06-29", 85],
  ["2000-06-30", 73],
  ["2000-07-01", 83],
  ["2000-07-02", 125],
  ["2000-07-03", 107],
  ["2000-07-04", 82],
  ["2000-07-05", 44],
  ["2000-07-06", 72],
  ["2000-07-07", 106],
  ["2000-07-08", 107],
  ["2000-07-09", 66],
  ["2000-07-10", 91],
  ["2000-07-11", 92],
  ["2000-07-12", 113],
  ["2000-07-13", 107],
  ["2000-07-14", 131],
  ["2000-07-15", 111],
  ["2000-07-16", 64],
  ["2000-07-17", 69],
  ["2000-07-18", 88],
  ["2000-07-19", 77],
  ["2000-07-20", 83],
  ["2000-07-21", 111],
  ["2000-07-22", 57],
  ["2000-07-23", 55],
  ["2000-07-24", 60]
]

const Pricing = () => {
  const { personalCheckout, isPersonalCheckoutLoading } = usePersonalCheckout()
  const { professionalCheckout, isProfessionalLoading } =
    useProfessionalCheckout()

  const { address } = useAccount()

  const { payerPolicyList, isPayerListError, isPayerListLoading } =
    usePayerPolicies(address)
  const { insuredPolicyList, isInsuredListError, isInsuredListLoading } =
    useInsuredPolicies(address)

  // const processPolicyData = (payerPolicyList) => {
  //   const termMapping = {
  //     0: "7 days",
  //     1: "15 days",
  //     2: "30 days"
  //   }

  //   const typeMapping = {
  //     0: "normal",
  //     1: "advance"
  //   }

  //   return payerPolicyList.map((policy) => {
  //     const endTime = new Date(Number(policy.endTime) * 1000)
  //     const startTime = new Date(Number(policy.startTime) * 1000)

  //     return {
  //       ...policy,
  //       policyTerm: termMapping[policy.Term],
  //       policyType: typeMapping[policy.Type],
  //       endTime: endTime.toLocaleDateString(),
  //       startTime: startTime.toLocaleDateString(),
  //       targetGasPrice: Number(policy.targetGasPrice),
  //       volatility: Number(policy.volatility),
  //       isExpired: Date.now() > endTime
  //     }
  //   })
  // }

  // const processedPayerPolicyList = processPolicyData(payerPolicyList || [])

  // const processedInsuredPolicyList = processPolicyData(insuredPolicyList || [])

  const payoutDates = [
    "2023-01-15",
    "2023-03-20",
    "2023-05-10"
    // ...其他赔付日期
  ]

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
              <PolicyList policies={payerPolicyList} />
            </>
          ) : null}
          {/* insured policy list */}
          {insuredPolicyList ? (
            <>
              <div className="text-2xl">Insurance Policies as Insured</div>
              <PolicyList policies={insuredPolicyList} />
            </>
          ) : null}
        </div>
      </Container>
    </div>
  )
}

export default Pricing
