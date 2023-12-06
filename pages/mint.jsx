import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"

const Mint = () => {
  const [addressOrENS, setAddressOrENS] = useState("")

  const handleMint = () => {
    console.log(addressOrENS, "address")
  }

  return (
    <div className="overflow-hidden h-full mb-20 py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="flex flex-col justify-center items-center gap-4">
          <h1 className="font-bold text-4xl mb-20">
            Congratulations 🎉 - Mint First Beta Tester NFT 🎁
          </h1>
        </div>
        <div>
          <div className="flex flex-row gap-2 items-center justify-center">
            <div>
              <Input
                className=" w-[500px] p-4 placeholder:text-[#57C5B6] rounded-md border  focus:border-[#57C5B6] focus:outline-none"
                type="text"
                placeholder="Please Enter Your ENS Name Or Ethereum Address"
                value={addressOrENS}
                onChange={(e) => setAddressOrENS(e.target.value)}
              />
            </div>
            <div>
              <Button
                variant="outline"
                className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                onClick={() => handleMint()}
              >
                MINT
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Mint
