import React from "react"
import TimelineItem from "./TimelineItem"
import { Container } from "../Container"
import Image from "next/image"

const timelineData = [
  {
    id: 1,
    title: "/ethbeijing_hackathon.png",
    description: "ETH Beijing 2023 Hackathon",
    achivements: "Champion",
    content: "Layer2 Championship🥇 \nScroll Bounty track Second place🥈",
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
    content: "Total of $200k in AWS credits🏅",
    url: "https://devpost.com/software/gaslockr"
  },
  {
    id: 3,
    title: "/ethshanghai_hackathon.png",
    description: "ETH Shanghai 2023 Hackathon",
    achivements: "Second place",
    content: "Layer2 Second place🥈 \n Chainlink Third place🥉",
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
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="text-center text-4xl font-semibold leading-8 text-gray-900">
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
      {/* <div className="p-14 mx-auto w-full h-full">
        <p className="p-4 font-bold text-4xl">Our Achivements</p>
        <div className="p-4 text-lg">
          Dive into our track record of innovation and excellence, as recognized
          on the global stage of hackathons.
        </div>
        <div className="relative wrap overflow-hidden p-10 h-full">
          <div className="border-2-2 absolute border-opacity-20 border-black h-full border left-1/2"></div>
          <div>
            {timelineData.map((item, index) => (
              <TimelineItem key={index} {...item} isRight={index % 2 === 0} />
            ))}
          </div>
        </div>
      </div> */}
    </Container>
  )
}

export default TimeLine
