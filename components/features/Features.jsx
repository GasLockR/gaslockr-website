import React from "react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"

const Features = () => {
  const router = useRouter()
  return (
    <div className="flex flex-col justify-center items-center gap-4 p-14">
      <h1 className="font-bold text-4xl">Welcome to GasLockR</h1>
      <h1>The first trustless GasFi protocol for EVM-based chains</h1>
      <div className="flex flex-row gap-4">
        <Button
          className="bg-black text-white transform hover:scale-105 hover:bg-black"
          onClick={() => {
            router.push("/GasSubscribe")
          }}
        >
          Try it Now
        </Button>
        <Button className="bg-gray-200 transform hover:scale-105 hover:bg-gray-200 text-black">
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default Features
