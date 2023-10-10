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
import { ToastAction } from "@/components/ui/toast"
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
import { SCROLL_CONTRSCT_ADDRESS } from "@/config/address"
import { utils, ethers } from "ethers"

const premiums = [
  6250000000000000,   // 7天
  7130000000000000,   // 8天
  7940000000000000,   // 9天
  8750000000000000,   // 10天
  9500000000000000,   // 11天
  10190000000000000,  // 12天
  10880000000000000,  // 13天
  11560000000000000,  // 14天
  12190000000000000,  // 15天
  12810000000000000,  // 16天
  13380000000000000,  // 17天
  13940000000000000,  // 18天
  14500000000000000,  // 19天
  15000000000000000,  // 20天
  15500000000000000,  // 21天
  15940000000000000,  // 22天
  16380000000000000,  // 23天
  16810000000000000,  // 24天
  17190000000000000,  // 25天
  17560000000000000,  // 26天
  17940000000000000,  // 27天
  18250000000000000,  // 28天
  18560000000000000,  // 29天
  18880000000000000   // 30天
]

const daysArray = Array.from({ length: 24 }, (_, i) => i + 7);

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

  const [policyPrice, setPolicyPrice] = useState(premiums[0]);

  const {
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
    functionName: "deposit",
    chainId: 11155111,
    onError(error) {
      if (error.name === "ChainMismatchError") {
        toast({
          variant: "destructive",
          title: "Uh oh! Wrong Network.",
          description: "Please Change to Sepolia Network."
        })
      }
      if (error.name === "ContractFunctionExecutionError") {
        toast({
          variant: "destructive",
          title: "Ops!",
          description: "Not Enough ETH In Your Wallet"
        })
      }
    }
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

  const handlePolicyTermChange = (selectedDay) => {
    if (selectedDay >= 7 && selectedDay <= 30) {
      const index = selectedDay - 7;
      setPolicyPrice(String(premiums[index]));
    } else {
      console.error("Unknown policy term:", selectedDay);
    }
  };

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
              <Label htmlFor="activeDays">Policy Period</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                  The number of days for which the policy will be active and
                  provide coverage.
                </PopoverContent>
              </Popover>
            </div>
            <Select
              onValueChange={(e) => {
                const selectedDay = parseInt(e, 10);
                handlePolicyTermChange(selectedDay);
              }}
              defaultValue="7"
            >
              <SelectTrigger className="w-[180px] text-[#57C5B6]">
                <SelectValue placeholder="Select Policy Term" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                <SelectGroup>
                  {daysArray.map(day => (
                    <SelectItem key={day} value={day.toString()}>{day} Days</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="policyPrice">Premiums</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                  The total cost of purchasing this insurance policy.
                </PopoverContent>
              </Popover>
            </div>

            <p className="text-[#57C5B6]">
              {policyPrice ? ethers.utils.formatEther(policyPrice) : 0} ETH
            </p>
          </div>

          {/* benefit TODO */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2">
              <Label htmlFor="policyPrice">Benefits</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent className="text-sm">
                  ?????????
                </PopoverContent>
              </Popover>
            </div>

            <p className="text-[#57C5B6]">
              ???
            </p>
          </div>


          <div className="flex flex-col gap-2">
            <div className="flex flex-row gap-2">
              <Label htmlFor="payerAddress">Payer Address</Label>
              <Popover>
                <PopoverTrigger>
                  <QuestionMarkCircledIcon />
                </PopoverTrigger>
                <PopoverContent className="text-sm">
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
                <PopoverContent className="text-sm">
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
