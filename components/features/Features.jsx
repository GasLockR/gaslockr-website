import React from "react"
import { Button } from "@/components/ui/button"

const Features = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-4 m-14">
      <h1 className="font-bold text-4xl">Welcome to GasLockR</h1>
      <h1>The first trustless GasFi protocol for EVM-based chains</h1>
      <div className="flex flex-row gap-2">
        <Button className="bg-black">Try it Now</Button>
        <Button className="bg-gray-200 hover:bg-gray-300 text-black">
          Learn More
        </Button>
      </div>
    </div>
  )
}

export default Features
