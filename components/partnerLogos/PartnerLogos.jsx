import React from "react"
import { Container } from "../Container"
import Image from "next/image"

const PartnerLogos = () => {
  return (
    <Container className="bg-white pt-10">
      <h2 className="text-center text-4xl font-semibold leading-8 text-gray-900">
        Major Sponsors
      </h2>
      <div className="flex flex-wrap justify-center gap-12">
        <div className="p-4 flex items-center justify-center w-48 h-48">
          <Image
            src="/partnerLogo/scroll.png"
            alt="Scroll Logo"
            width={192}
            height={192}
          />
        </div>
        <div className="p-4 flex items-center justify-center w-48 h-48">
          <Image
            src="/partnerLogo/gitcoin.png"
            alt="gitcoin Logo"
            width={192}
            height={192}
          />
        </div>
        <div className="p-4 flex items-center justify-center w-48 h-48">
          <Image
            src="/partnerLogo/chainlink.png"
            alt="Chainlink Logo"
            width={192}
            height={192}
          />
        </div>
        <div className="p-4 flex items-center justify-center w-48 h-48">
          <Image
            src="/partnerLogo/aws.png"
            alt="aws Logo"
            width={84}
            height={84}
          />
        </div>
      </div>
    </Container>
  )
}

export default PartnerLogos
