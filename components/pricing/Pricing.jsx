import React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"

const Pricing = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-4 p-14">
        <h1 className="font-bold text-4xl">
          We offer a variety of options tailored to our customer base.
        </h1>
        <div className="flex justify-center space-x-8 p-14">
          {/* Regular User Card */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="text-base text-gray-400">
                Personal
              </CardTitle>
              <CardDescription className="text-base text-black flex flex-row items-center gap-2 p-4 h-28">
                <div>
                  <span className="relative -top-6 right-1 text-2xl  font-medium">
                    $
                  </span>
                  <span className="text-5xl  font-medium">10</span>
                  <span className="text-3xl font-medium text-gray-500">
                    /7days
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li>Max Coverage:1 ETH</li>
                <li>Min Fluctuation:5%</li>
                <li>Flexible coverage</li>
                <li>Affordable rate</li>
                <li>Instant protection</li>
                <li>Easy claims process</li>
                <li>Fast transaction</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button className="w-3/4 bg-black">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Advanced User Card */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="text-base text-gray-400">
                Professional
              </CardTitle>
              <CardDescription className="text-base text-black flex flex-row items-center gap-2 p-4 h-28">
                <div>
                  <span className="relative -top-6 right-1 text-2xl  font-medium">
                    $
                  </span>
                  <span className="text-5xl  font-medium">25</span>
                  <span className="text-3xl font-medium text-gray-500">
                    /15days
                  </span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li>Max Coverage:1 ETH</li>
                <li>Min Fluctuation:5%</li>
                <li>Flexible coverage</li>
                <li>Affordable rate</li>
                <li>Instant protection</li>
                <li>Easy claims process</li>
                <li>Fast transaction</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button className="w-3/4 bg-black">Get Started</Button>
            </CardFooter>
          </Card>

          {/* Enterprise Card */}
          <Card className="w-[300px]">
            <CardHeader>
              <CardTitle className="text-base text-gray-400">
                Business
              </CardTitle>
              <CardDescription className="text-base text-black flex flex-row justify-center items-center gap-2 p-4 h-28">
                <div className="flex flex-col items-center">
                  <span className="text-2xl font-medium">Custom Pricing</span>
                  <span className="text-gray-500">Tailored to your needs</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center items-center">
              <ul className="flex flex-col gap-2">
                <li>Max Coverage:1 ETH</li>
                <li>Min Fluctuation:5%</li>
                <li>Flexible coverage</li>
                <li>Affordable rate</li>
                <li>Instant protection</li>
                <li>Easy claims process</li>
                <li>Fast transaction</li>
              </ul>
            </CardContent>
            <CardFooter className="flex justify-center items-center">
              <Button className="w-3/4 bg-black">Contact Us</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Pricing
