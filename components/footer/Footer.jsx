import React from "react"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <footer className="flex flex-col m-24">
      <div className="flex flex-row justify-between">
        <div>
          <Image src="/logo.png" alt="Logo" width={128} height={128} />
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl">Resource</p>
          <Link href="https://github.com/GasLockR" target="_blank">
            GitHub
          </Link>
          <Link href="/whitePaper" target="_blank">
            WhitePaper
          </Link>
        </div>
        <div className="flex flex-col gap-4">
          <p className="text-2xl">Contact Us</p>
          <Link href="https://twitter.com/gaslockr" target="_blank">
            Twitter
          </Link>
          <Link href="https://discord.gg/sBAaqfxR" target="_blank">
            Discord
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center p-4 mt-10">
        <p className="text-gray-400">
          &copy; {new Date().getFullYear()} GasLockR. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
