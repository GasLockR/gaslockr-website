import { Container } from "@/components/Container"
import GasChart from "@/components/gasInsure/GasChart"
import GasInsureList from "@/components/gasInsure/GasInsureList"
import GasInsureOrder from "@/components/gasInsure/GasInsureOrder"
import React from "react"

const GasInsure = () => {
  return (
    <Container className="h-screen flex flex-col">
      <div className="flex flex-col md:flex-row h-3/5 md:h-3/5 gap-4 py-10">
        <div className="w-full md:w-2/3 border-2 border-custom-green rounded-md flex justify-center items-center">
          <GasChart />
        </div>
        <div className="w-full md:w-1/3 border-2 border-custom-green rounded-md">
          <GasInsureOrder />
        </div>
      </div>
      <div className="h-2/5 pb-10 border-2 border-custom-green rounded-md">
        <GasInsureList />
      </div>
    </Container>
  )
}

export default GasInsure
