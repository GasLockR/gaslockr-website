import React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const GasInsureOrder = () => {
  return (
    <>
      <Card className="w-full h-full flex border-2 border-[#159895]">
        <div className="px-4 my-10 w-full flex flex-col gap-8">
          <div className="flex flex-row items-center justify-between">
            <div className="text-2xl font-bold">Purchase</div>
            <div>
              <Button
                disabled
                variant="ghost"
                className="bg-[#57C5B6] text-white w-full transform hover:scale-105 hover:bg-[#159895]"
              >
                Switch Cycle
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center text-3xl font-bold text-blue-400 ">
            300
          </div>
          <div className="flex flex-row justify-between">
            <div>锁定gwei</div>
            <div>60</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>投保份数</div>
            <div>100</div>
            <div>0.005E</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>总支付</div>
            <div>0.5ETH</div>
          </div>
          <div className="flex flex-row justify-between">
            <div>预计赔付金额</div>
            <div>1ETH</div>
          </div>
          <div className="flex flex-row items-center justify-center">
            <Button className="bg-[#57C5B6] text-white w-full transform hover:scale-105 hover:bg-[#159895]">
              Pay Now
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

export default GasInsureOrder
