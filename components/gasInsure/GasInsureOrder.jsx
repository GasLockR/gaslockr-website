import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const GasInsureOrder = () => {
  return (
    <Card className="w-full h-full flex border-2 border-[#159895] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold">Purchase</div>
          <Button
            disabled
            variant="ghost"
            className="bg-[#57C5B6] text-white w-1/3 sm:w-auto transform hover:scale-105 hover:bg-[#159895] mt-2 sm:mt-0"
          >
            Switch Cycle
          </Button>
        </div>
        <div className="flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#159895]">
          300
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>锁定gwei</div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>60</div>
            <div>gwei</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>投保份数</div>
          <div className="w-1/3 text-[#159895]">
            <Input value={100} type="number" />
          </div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>0.005</div>
            <div>ETH</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>总支付</div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>0.5</div>
            <div>ETH</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>预计赔付金额</div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>1</div>
            <div>ETH</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-4">
          <Button className="bg-[#57C5B6] text-white w-full transform hover:scale-105 hover:bg-[#159895]">
            Pay Now
          </Button>
        </div>
      </div>
    </Card>
  )
}

export default GasInsureOrder
