import React, { useState } from "react"
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
import { useAccount, useContractWrite } from "wagmi"
import useInsuranceData from "@/hooks/useInsuranceData"
import contractAbi from "@/config/contract.json"
import { CONTRACT_ADDRESS } from "@/config/address"
import { utils } from "ethers"

const InsuranceSheet = () => {
  const { address } = useAccount()
  const handlePolicyAmountChange = (event) => {
    if (event.target.value < 1) {
      event.target.value = 1
    }
  }

  const [policytype, setPolicytype] = useState(0)
  const [policyterm, setPolicyterm] = useState(0)
  const [insuredAddress, setInsuredAddress] = useState("")
  const [addressError, setAddressError] = useState(null)

  console.log(policytype, "policytype")
  console.log(policyterm, "policyterm")

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

  const { data, isDepositLoading, isSuccess, write } = useContractWrite({
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
      setAddressError("Invalid Ethereum address")
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
          <SheetTitle>Personal Gas Insurance</SheetTitle>
          <SheetDescription>
            Configure your insurance here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-10 my-12">
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="activeDays">Policy Type</Label>
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
            <Label htmlFor="policyPrice">Policy Price</Label>
            <p className="text-[#57C5B6]">{policyPrice} Wei</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="fluctuation">Lock Fluctuation</Label>
            <p className="text-[#57C5B6]">{volatility} %</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="fluctuation">Lock GasPrice</Label>
            <p className="text-[#57C5B6]">{targetGasPrice} Wei</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="activeDays">Active Days</Label>
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
                  <SelectItem value="15">15 Days</SelectItem>
                  <SelectItem value="30">30 Days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="compensationAmount">Compensation Amount</Label>
            <p className="text-[#57C5B6]">{benefit} Wei</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="payerAddress">Payer Address</Label>
            <p>{address}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="insuredAddress">Insured Address</Label>
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
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="policyAmount">Policy Amount</Label>
            <div>
              <Input
                disabled
                type="number"
                defaultValue={1}
                min={1}
                onChange={handlePolicyAmountChange}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <Button
            disabled={isLoading}
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
            {isLoading ? (
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
