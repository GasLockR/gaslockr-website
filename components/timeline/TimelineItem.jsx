import React from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import Image from "next/image"
import { Button } from "../ui/button"

const TimelineItem = ({
  id,
  title,
  description,
  achivements,
  content,
  url,
  isRight
}) => {
  return (
    <div
      className={`mb-8 flex justify-between ${
        isRight ? "flex-row-reverse" : ""
      } items-center w-full`}
    >
      <div className="order-1 w-5/12"></div>
      <div className="z-20 flex items-center order-1 bg-black shadow-xl w-8 h-8 rounded-full">
        <h1 className="mx-auto font-semibold text-lg text-white">{id}</h1>
      </div>

      <div className="order-1 w-5/12 h-60">
        <Card className="w-[370px]">
          <CardHeader>
            <CardTitle>
              <Image src={title} alt="Logo" width={128} height={128} />
            </CardTitle>
            <CardDescription>{description}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-row items-center gap-2">
            <div className="text-black bg-[#F3BF1E] rounded-sm p-1 whitespace-nowrap">
              {achivements}
            </div>
            <div>{content}</div>
          </CardContent>
          <CardFooter className="flex flex-row-reverse">
            <Button
              className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
              onClick={() => {
                window.open(url, "_blank")
              }}
            >
              Read More
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  )
}

export default TimelineItem
