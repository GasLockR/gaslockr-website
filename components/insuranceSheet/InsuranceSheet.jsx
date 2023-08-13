import React from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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
import { useAccount } from "wagmi"

const InsuranceSheet = () => {
  const { address } = useAccount()
  const handlePolicyAmountChange = (event) => {
    if (event.target.value < 1) {
      event.target.value = 1
    }
  }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="w-3/4 bg-black text-white transform hover:scale-105 hover:bg-black">
          Get Started
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[450px] sm:max-w-none">
        <SheetHeader>
          <SheetTitle>Personal Gas Insurance</SheetTitle>
          <SheetDescription>
            Configure your insurance here. Click save when you're done.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-10 my-24">
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="policyPrice">Policy Price</Label>
            <p>0.01 ETH</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="fluctuation">Lock Fluctuation</Label>
            <p>15 %</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="activeDays">Active Days</Label>
            <p>7 Days</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="compensationAmount">Compensation Amount</Label>
            <p>0.23 ETH</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="payerAddress">Payer Address</Label>
            <p>{address}</p>
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="insuredAddress">Insured Address</Label>
            <p>0x3F28BECCd4CFf6548600cA62446D7aa6381a37B7</p>
          </div>
          <div className="flex flex-row justify-between items-center">
            <Label htmlFor="policyAmount">Policy Amount</Label>
            <div>
              <Input
                type="number"
                defaultValue={1}
                min={1}
                onChange={handlePolicyAmountChange}
              />
            </div>
          </div>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="submit">Buy</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

export default InsuranceSheet
