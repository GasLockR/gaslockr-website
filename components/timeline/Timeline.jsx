import React from "react"
import TimelineItem from "./TimelineItem"
import { Container } from "../Container"

const timelineData = [
  {
    id: 1,
    title: "/ethbeijing_hackathon.png",
    description: "ETH Beijing 2023 Hackathon",
    achivements: "Champion",
    content: "Main Track - Innovative Layer2 Dapp",
    url: "https://www.ethbeijing.xyz/"
  },
  // {
  //   id: 2,
  //   title: "/ethshanghai_hackathon.png",
  //   description: "ETH Shanghai 2023 Hackathon",
  //   achivements: "Sponsor Award",
  //   content: "- Build Web3 with Chainlink",
  //   url: "https://app.buidlbox.io/projects/gassubscribe"
  // },
  {
    id: 2,
    title: "/chainlink_hackathon.svg",
    description: "CHAINLINK HACKATHON SPRING 2023",
    achivements: "Winner",
    content: "- Total of $200k in AWS credits",
    url: "https://devpost.com/software/gaslockr"
  },
  {
    id: 3,
    title: "/ethshanghai_hackathon.png",
    description: "ETH Shanghai 2023 Hackathon",
    achivements: "Second place",
    content: "Main Track - Layer 2 & On-Chain Gaming",
    url: "https://app.buidlbox.io/projects/gassubscribe"
  }

  // {
  //   id: 5,
  //   title: "/ethbeijing_hackathon.png",
  //   description: "ETH Beijing 2023 Hackathon",
  //   achivements: "Sponsor Award",
  //   content: "- Deploy smart contracts on Scroll",
  //   url: "https://www.ethbeijing.xyz/"
  // }
]

const TimeLine = () => {
  return (
    <Container>
      <div className="p-14 mx-auto w-full h-full">
        <p className="p-4 font-bold text-4xl">Our Achivements</p>
        <p className="p-4 text-1xl">
          Dive into our track record of innovation and excellence, as recognized
          on the global stage of hackathons.
        </p>
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-black h-full border left-1/2"></div>
          <div>
            {timelineData.map((item, index) => (
              <TimelineItem key={index} {...item} isRight={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default TimeLine
