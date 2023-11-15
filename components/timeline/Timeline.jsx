import React from "react"
import { Container } from "../Container"
import Image from "next/image"

const TimeLine = () => {
  return (
    <Container>
      <div className="bg-white dark:bg-[#040711] py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl font-semibold leading-8 text-gray-900 dark:text-gray-200">
            🏆 Web3 Hackathon Hall of Fame 🏆
          </h2>
          <div className="flex flex-row justify-between mt-10">
            <div className="p-8 flex items-center justify-center">
              <Image
                src="/chainlink_hackathon.svg"
                alt="Logo"
                width={258}
                height={188}
              />
            </div>
            <div className="p-8 flex items-center justify-center">
              <Image
                src="/ethglobal_hackathon.svg"
                alt="Logo"
                width={258}
                height={188}
              />
            </div>
            <div className="p-8 flex items-center justify-center">
              <Image
                src="/ethbeijing_hackathon.png"
                alt="Logo"
                width={258}
                height={188}
              />
            </div>
            <div className="p-8 flex items-center justify-center">
              <Image
                src="/ethshanghai_hackathon.png"
                alt="Logo"
                width={258}
                height={188}
              />
            </div>
            <div className="p-8 flex items-center justify-center">
              <Image
                src="/ethhangzhou_hackathon.svg"
                alt="Logo"
                width={258}
                height={188}
              />
            </div>
            <div className="p-8 flex items-center justify-center">
              <div className="flex flex-row items-center gap-1">
                <Image
                  src="/ethhongkong_hackathon.png"
                  alt="Logo"
                  width={48}
                  height={48}
                />
                <div className="flex flex-row">
                  <div>ETH</div>
                  <div className="text-[#e63e8f]">Hong</div>
                  <div className="text-[#76f4fd]">Kong</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TimeLine
