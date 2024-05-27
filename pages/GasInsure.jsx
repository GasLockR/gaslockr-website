import { Container } from "@/components/Container"
import GasChart from "@/components/gasInsure/GasChart"
import GasInsureList from "@/components/gasInsure/GasInsureList"
import GasInsureOrder from "@/components/gasInsure/GasInsureOrder"
import React, { useEffect } from "react"
import { useNetwork, useSwitchNetwork } from "wagmi"

const GasInsure = () => {
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    if (chain?.id !== 11155111 && switchNetwork) {
      switchNetwork(11155111) // Sepolia network ID
    }
  }, [chain, switchNetwork])

  return (
    <Container>
      <div className="flex flex-col gap-4 lg:flex-row mt-8">
        <div className="flex-1 md:w-10/12">
          <GasChart />
        </div>
        <div className="w-full md:w-2/12">
          <GasInsureOrder />
        </div>
      </div>
      <div className="h-2/5 py-4">
        <GasInsureList />
      </div>
    </Container>
  )
}

export default GasInsure
