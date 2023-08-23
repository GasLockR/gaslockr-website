import React, { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from "@/components/ui/sheet"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"

import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover"
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons"
import { useAccount, useContractWrite } from "wagmi"
import useInsuranceData from "@/hooks/useInsuranceData"
import contractAbi from "@/config/contract.json"
import { CONTRACT_ADDRESS } from "@/config/address"
import { utils, ethers } from "ethers"

const InsuranceSheet = () => {
  const { address } = useAccount()
  const handlePolicyAmountChange = (event) => {
    if (event.target.value < 1) {
      event.target.value = 1
    }
  }

  const { toast } = useToast()

  const [policytype, setPolicytype] = useState(0)
  const [policyterm, setPolicyterm] = useState(0)
  const [insuredAddress, setInsuredAddress] = useState("")
  const [addressError, setAddressError] = useState(null)

  const {
    policyPrice,
    isPolicyPriceError,
    isPolicyPriceLoading,
    benefit,
    isBenefitError,
    isBenefitLoading,
    volatility,
    isVolatilityError,
    isVolatilityLoading,
    targetGasPrice,
    isTargetGasPriceError,
    isTargetGasPriceLoading
  } = useInsuranceData(policytype, policyterm)

  const isLoading =
    isPolicyPriceLoading ||
    isBenefitLoading ||
    isVolatilityLoading ||
    isTargetGasPriceLoading

  const {
    data,
    isLoading: isDepositLoading,
    isSuccess,
    write
  } = useContractWrite({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "deposit"
  })

  const clickBuy = (
    payerAddress,
    insuredAddress,
    policytype,
    policyterm,
    policyPrice
  ) => {
    if (!utils.isAddress(insuredAddress)) {
      setAddressError("Please Enter Ethereum address")
      return
    }

    setAddressError(null)
    write({
      args: [payerAddress, insuredAddress, policytype, policyterm],
      value: policyPrice
    })
  }

  const policyTermMap = {
    7: 0,
    15: 1,
    30: 2
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Insured Success",
        description: "You got one policy"
      })
    }
  }, [isSuccess])

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="w-3/4 bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            "Get Started"
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[450px] sm:max-w-none overflow-y-auto">
        <SheetHeader>
          <SheetTitle>GasInsure (Beta)</SheetTitle>
          <SheetDescription>
            Configure your insurance here. Click buy when you've done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-10 my-12">
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="activeDays">Policy Type</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The specific type of insurance policy you're purchasing.
                  Different types may offer varying coverages.
                </PopoverContent>
              </Popover>
            </div>
            <Select
              onValueChange={(e) => {
                setPolicytype(e)
              }}
              defaultValue="0"
            >
              <SelectTrigger className="w-[180px] text-[#57C5B6]">
                <SelectValue placeholder="Select Policy Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="text-[#57C5B6]">
                  <SelectItem value="0">Normal</SelectItem>
                  <SelectItem value="1" disabled>
                    Advance
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="activeDays">Policy Period</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The number of days for which the policy will be active and
                  provide coverage.
                </PopoverContent>
              </Popover>
            </div>
            <Select
              onValueChange={(e) => {
                const enumValue = policyTermMap[e]
                if (enumValue !== undefined) {
                  setPolicyterm(enumValue)
                } else {
                  console.error("Unknown policy term:", e)
                }
              }}
              defaultValue="7"
            >
              <SelectTrigger className="w-[180px] text-[#57C5B6]">
                <SelectValue placeholder="Select Policy Term" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="text-[#57C5B6]">
                  <SelectItem value="7">7 Days</SelectItem>
                  <SelectItem disabled value="15">
                    15 Days
                  </SelectItem>
                  <SelectItem disabled value="30">
                    30 Days
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="policyPrice">Premium</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The total cost of purchasing this insurance policy.
                </PopoverContent>
              </Popover>
            </div>

            <p className="text-[#57C5B6]">
              {policyPrice ? ethers.utils.formatEther(policyPrice) : 0} ETH
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="fluctuation">Minimum Fluctuation</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The minimum price volatility for insurance policy to make
                  claim during the policy period.
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-[#57C5B6]">{volatility} %</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="fluctuation">Locked Price</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The price for reference per policy. Compensation occurs if the
                  market gas price reaches or exceeds the product of the locked
                  gas price and the lock fluctuation rate.
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-[#57C5B6]">
              {targetGasPrice
                ? parseFloat(
                    ethers.utils.formatUnits(targetGasPrice, 9)
                  ).toFixed(2)
                : 0}
              Gwei
            </p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="compensationAmount">Minimum Benefit</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The minimum payout that the insured should receive in the
                  event of a valid claim. The actual payout depends on the price
                  volatility.
                </PopoverContent>
              </Popover>
            </div>
            <p className="text-[#57C5B6]">
              {benefit ? ethers.utils.formatEther(benefit) : 0} ETH
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Label htmlFor="payerAddress">Payer Address</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The blockchain address from which the policy payment is made.
                </PopoverContent>
              </Popover>
            </div>
            <p>{address}</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Label htmlFor="insuredAddress">Insured Address</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The blockchain address of the insured.
                </PopoverContent>
              </Popover>
            </div>
            <Input
              className="text-[#57C5B6]"
              placeholder="Insured Address"
              value={insuredAddress}
              onChange={(e) => setInsuredAddress(e.target.value)}
            />
            {addressError && (
              <span className="text-red-500">{addressError}</span>
            )}
          </div>
          {/* <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="policyAmount">Policy Amount</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent>
                  The quantity of this specific policy you're purchasing.
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Input
                disabled
                type="number"
                defaultValue={1}
                min={1}
                onChange={handlePolicyAmountChange}
              />
            </div>
          </div> */}
        </div>
        <SheetFooter>
          <Button
            disabled={isDepositLoading}
            className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
            onClick={() => {
              clickBuy(
                address,
                insuredAddress,
                policytype,
                policyterm,
                policyPrice
              )
            }}
          >
            {isDepositLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Buy"
            )}
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default InsuranceSheet
