import React, { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { SketchLogoIcon } from "@radix-ui/react-icons"

// Simulated data for current policies
const currentData = [
  {
    block: "003-004",
    number: 100,
    amount: "$10,000",
    claimStatus: "yes",
    points: "+15",
    highRisk: "yes"
  },
  {
    block: "004-005",
    number: 101,
    amount: "$9,000",
    claimStatus: "no",
    points: "+10",
    highRisk: "no"
  },
  {
    block: "005-006",
    number: 102,
    amount: "$8,000",
    claimStatus: "yes",
    points: "+12",
    highRisk: "yes"
  },
  {
    block: "006-007",
    number: 103,
    amount: "$7,000",
    claimStatus: "no",
    points: "+8",
    highRisk: "no"
  },
  {
    block: "007-008",
    number: 104,
    amount: "$6,000",
    claimStatus: "yes",
    points: "+14",
    highRisk: "yes"
  },
  {
    block: "008-009",
    number: 105,
    amount: "$5,000",
    claimStatus: "no",
    points: "+7",
    highRisk: "no"
  },
  {
    block: "009-010",
    number: 106,
    amount: "$4,000",
    claimStatus: "yes",
    points: "+13",
    highRisk: "yes"
  },
  {
    block: "010-011",
    number: 107,
    amount: "$3,000",
    claimStatus: "no",
    points: "+6",
    highRisk: "no"
  },
  {
    block: "011-012",
    number: 108,
    amount: "$2,000",
    claimStatus: "yes",
    points: "+11",
    highRisk: "yes"
  },
  {
    block: "012-013",
    number: 109,
    amount: "$1,000",
    claimStatus: "no",
    points: "+5",
    highRisk: "no"
  }
]

// Simulated data for finished policies
const finishedData = [
  {
    block: "001-002",
    number: 200,
    amount: "$20,000",
    claimStatus: "no",
    points: "+25",
    highRisk: "no"
  },
  {
    block: "002-003",
    number: 201,
    amount: "$19,000",
    claimStatus: "yes",
    points: "+22",
    highRisk: "yes"
  },
  {
    block: "003-004",
    number: 202,
    amount: "$18,000",
    claimStatus: "no",
    points: "+21",
    highRisk: "no"
  },
  {
    block: "004-005",
    number: 203,
    amount: "$17,000",
    claimStatus: "yes",
    points: "+18",
    highRisk: "yes"
  },
  {
    block: "005-006",
    number: 204,
    amount: "$16,000",
    claimStatus: "no",
    points: "+17",
    highRisk: "no"
  },
  {
    block: "006-007",
    number: 205,
    amount: "$15,000",
    claimStatus: "yes",
    points: "+14",
    highRisk: "yes"
  },
  {
    block: "007-008",
    number: 206,
    amount: "$14,000",
    claimStatus: "no",
    points: "+13",
    highRisk: "no"
  },
  {
    block: "008-009",
    number: 207,
    amount: "$13,000",
    claimStatus: "yes",
    points: "+12",
    highRisk: "yes"
  },
  {
    block: "009-010",
    number: 208,
    amount: "$12,000",
    claimStatus: "no",
    points: "+11",
    highRisk: "no"
  },
  {
    block: "010-011",
    number: 209,
    amount: "$11,000",
    claimStatus: "yes",
    points: "+10",
    highRisk: "yes"
  }
]

const GasInsureList = () => {
  const [currentPageCurrent, setCurrentPageCurrent] = useState(1)
  const [currentPageFinished, setCurrentPageFinished] = useState(1)
  const itemsPerPage = 3

  // Calculate paginated data for current policies
  const offsetCurrent = (currentPageCurrent - 1) * itemsPerPage
  const currentPageDataCurrent = currentData.slice(
    offsetCurrent,
    offsetCurrent + itemsPerPage
  )
  const pageCountCurrent = Math.ceil(currentData.length / itemsPerPage)

  // Calculate paginated data for finished policies
  const offsetFinished = (currentPageFinished - 1) * itemsPerPage
  const currentPageDataFinished = finishedData.slice(
    offsetFinished,
    offsetFinished + itemsPerPage
  )
  const pageCountFinished = Math.ceil(finishedData.length / itemsPerPage)

  const renderPaginationItems = (currentPage, pageCount, handlePageChange) => {
    const items = []
    for (let i = 1; i <= pageCount; i++) {
      items.push(
        <PaginationItem key={i}>
          <PaginationLink
            href="#"
            isActive={i === currentPage}
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(i)
            }}
          >
            {i}
          </PaginationLink>
        </PaginationItem>
      )
    }
    return items
  }

  return (
    <>
      <Card className="w-full h-full flex items-center justify-center border-2 border-[#159895]">
        <div className="h-full w-full">
          <Tabs defaultValue="current" className="w-full p-2">
            <div className="flex flex-row justify-between">
              <TabsList>
                <TabsTrigger value="current">Current</TabsTrigger>
                <TabsTrigger value="finished">Finished</TabsTrigger>
              </TabsList>
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-transparent w-full"
                        variant="ghost"
                        size="icon"
                      >
                        <div className="flex flex-row gap-2 items-center p-2">
                          <div className="text-[#57C5B6] text-2xl">996007</div>
                          <SketchLogoIcon className="text-[#159895] h-8 w-8" />
                        </div>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>total points</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
            <TabsContent value="current">
              <Table>
                <TableCaption>A list of your current policy.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Block</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Claim status</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>High Risk</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageDataCurrent.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[100px]">{item.block}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.claimStatus}</TableCell>

                      <TableCell>{item.points}</TableCell>
                      <TableCell className="">{item.highRisk}</TableCell>
                      <TableCell className="text-right">
                        <Button className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]">
                          claim
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPageCurrent > 1)
                            setCurrentPageCurrent(currentPageCurrent - 1)
                        }}
                      />
                    </PaginationItem>
                    {renderPaginationItems(
                      currentPageCurrent,
                      pageCountCurrent,
                      setCurrentPageCurrent
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPageCurrent < pageCountCurrent)
                            setCurrentPageCurrent(currentPageCurrent + 1)
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
            <TabsContent value="finished">
              <Table>
                <TableCaption>A list of your finished policy.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Block</TableHead>
                    <TableHead>Number</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Claim status</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead>High Risk</TableHead>
                    <TableHead className="text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageDataFinished.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[100px]">{item.block}</TableCell>
                      <TableCell>{item.number}</TableCell>
                      <TableCell>{item.amount}</TableCell>
                      <TableCell>{item.claimStatus}</TableCell>

                      <TableCell>{item.points}</TableCell>
                      <TableCell className="">{item.highRisk}</TableCell>
                      <TableCell className="text-right">
                        <Button className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]">
                          claim
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <PaginationPrevious
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPageFinished > 1)
                            setCurrentPageFinished(currentPageFinished - 1)
                        }}
                      />
                    </PaginationItem>
                    {renderPaginationItems(
                      currentPageFinished,
                      pageCountFinished,
                      setCurrentPageFinished
                    )}
                    <PaginationItem>
                      <PaginationNext
                        href="#"
                        onClick={(e) => {
                          e.preventDefault()
                          if (currentPageFinished < pageCountFinished)
                            setCurrentPageFinished(currentPageFinished + 1)
                        }}
                      />
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </>
  )
}

export default GasInsureList
