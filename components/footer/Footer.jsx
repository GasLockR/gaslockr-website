import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Container } from "../Container"

const Footer = () => {
  return (
    <Container>
      {/* <div data-donate3-cid="bafkreiejul3v6gpknutxz5bmnhj2ftxexrlozcl67jat632chwanq45lz4" ></div> */}
      <div className="border-b mb-10"></div>
      <div className="flex flex-col lg:flex-row h-auto lg:h-16 items-center space-y-4 lg:space-y-0 lg:space-x-4 sm:justify-between">
        <div className="flex justify-start lg:justify-start w-full">
          <Link href="/" className="flex flex-row gap-2 items-center">
            <Image src="/logo.png" alt="Logo" width={48} height={48} />
            <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#159895] to-[#1A5F7A]">
              GasLockR
            </div>
          </Link>
        </div>
        <div className="flex flex-row justify-between lg:flex-row gap-4 lg:gap-16 w-full">
          <div className="flex flex-col gap-2">
            <p className="text-xl">Resource</p>
            <Link
              className="hover:text-[#57C5B6]"
              href="https://gaslockr.gitbook.io/gaslockr"
              target="_blank"
            >
              GitBook
            </Link>
            <Link className="hover:text-[#57C5B6]" href="/mint">
              Badge
            </Link>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-xl">Contact Us</p>
            <Link
              className="hover:text-[#57C5B6]"
              href="https://twitter.com/gaslockr"
              target="_blank"
            >
              Twitter
            </Link>
            <Link
              className="hover:text-[#57C5B6]"
              href="https://discord.gg/DUZMwJzfsP"
              target="_blank"
            >
              Discord
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-2 lg:p-4 mt-5 lg:mt-10">
        <p className="text-gray-400 text-sm lg:text-base">
          &copy; {new Date().getFullYear()} GasLockR. All rights reserved.
        </p>
      </div>
    </Container>
  )
}

export default Footer
