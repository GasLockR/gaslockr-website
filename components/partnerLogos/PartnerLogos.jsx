import React from "react"
import { Container } from "../Container"
import Image from "next/image"

const PartnerLogos = () => {
  return (
    <Container className="py-24">
      <h2 className="text-center text-4xl font-semibold leading-8 text-gray-900 dark:text-white mb-10">
        Our Partners
      </h2>
      <div className="flex flex-wrap justify-center gap-8 mt-10">
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
            src="/partnerLogo/scroll.png"
            alt="Scroll Logo"
            width={192}
            height={192}
          />
        </div>
        <div className="p-4 flex items-center justify-center w-48 h-48">
          <Image
            src="/partnerLogo/aws.svg"
            alt="aws Logo"
            width={168}
            height={168}
          />
        </div>
        <div className="p-4 flex items-center justify-center w-48 h-48">
          <Image
            src="/partnerLogo/honeypot.svg"
            alt="honeypot Logo"
            width={192}
            height={192}
          />
        </div>
      </div>
    </Container>
  )
}

export default PartnerLogos
