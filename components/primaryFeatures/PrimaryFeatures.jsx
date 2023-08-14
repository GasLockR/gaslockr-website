import React from "react"
import { Container } from "../Container"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/router"
import CheckIcon from "../CheckIcon"
import clsx from "clsx"

const PrimaryFeatures = () => {
  const router = useRouter()
  return (
    <section
      id="features"
      aria-label="Features for investing all your money"
      className="bg-gray-900 py-20 sm:py-32"
    >
      <Container>
        <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-3xl">
          <h2 className="text-3xl font-medium tracking-tight text-white">
            Our New Feature
          </h2>
          <p className="mt-2 text-lg text-gray-400">
            Pocket was built for investors like you who play by their own rules
            and aren’t going to let SEC regulations get in the way of their
            dreams. If other investing tools are afraid to build it, Pocket has
            it.
          </p>
        </div>
        <div className="flex flex-col gap-16 py-20">
          <div className="flex flex-row justify-between">
            <div className="w-2/5">
              <Card className="bg-gray-800 border-0">
                <CardHeader>
                  <CardTitle className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-blue-300">
                    GasInsure
                  </CardTitle>
                  <CardDescription className="text-white">
                    Card DescriptionCard DescriptionCard Description
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button
                    className="bg-[#1A5F7A] text-white transform hover:scale-105 hover:bg-[#002B5B]"
                    onClick={() => {
                      router.push("/GasSubscribe")
                    }}
                    disabled
                  >
                    Try it Now Coming soon...
                  </Button>
                </CardFooter>
              </Card>
            </div>
            <div></div>
          </div>
          <div className="flex flex-row justify-between">
            <div></div>
            <div className="w-2/5">
              <Card className="bg-gray-800 border-0">
                <CardHeader>
                  <CardTitle className="font-bold text-3xl bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-blue-500 to-blue-300">
                    GasSubscribe
                  </CardTitle>
                  <CardDescription className="text-white">
                    Card DescriptionCard DescriptionCard Description
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-white">
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                  <div className="flex flex-row items-center gap-4">
                    <CheckIcon className="h-6 w-6 flex-none text-cyan-500" />
                    <span className="ml-4">features</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-start">
                  <Button
                    className="bg-[#1A5F7A] text-white transform hover:scale-105 hover:bg-[#002B5B]"
                    onClick={() => {
                      router.push("/GasSubscribe")
                    }}
                    disabled
                  >
                    Try it Now Coming soon...
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default PrimaryFeatures
