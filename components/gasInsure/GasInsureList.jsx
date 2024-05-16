import React, { useState, useEffect } from "react"
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
import { ethers } from "ethers"
import { useAccount } from "wagmi"
import { Loader2 } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
const contractABI = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_holder",
        type: "address"
      }
    ],
    name: "getPoliciesDetailsOfHolder",
    outputs: [
      {
        components: [
          {
            internalType: "uint256",
            name: "id",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "cycleId",
            type: "uint256"
          },
          {
            internalType: "uint256",
            name: "units",
            type: "uint256"
          },
          {
            internalType: "address",
            name: "holder",
            type: "address"
          },
          {
            internalType: "uint256",
            name: "startBlock",
            type: "uint256"
          },
          {
            internalType: "bool",
            name: "isClaimed",
            type: "bool"
          }
        ],
        internalType: "struct GasInsureV2.Policy[]",
        name: "",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    name: "cycles",
    outputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "startBlock",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "endBlock",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "coverBlock",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "premiumPerUnit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "benefitPerUnit",
        type: "uint256"
      },
      {
        internalType: "uint256",
        name: "units",
        type: "uint256"
      },
      {
        internalType: "bool",
        name: "isActive",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "isClaimable",
        type: "bool"
      },
      {
        internalType: "bool",
        name: "boost",
        type: "bool"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "policyId",
        type: "uint256"
      }
    ],
    name: "claim",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  }
]

const GasInsureList = () => {
  const { address, isConnected } = useAccount()
  const [policies, setPolicies] = useState([])
  const [loading, setLoading] = useState(true)
  const [currentPageCurrent, setCurrentPageCurrent] = useState(1)
  const [currentPageFinished, setCurrentPageFinished] = useState(1)
  const itemsPerPage = 3
  const { toast } = useToast()

  useEffect(() => {
    if (isConnected && address) {
      fetchPolicies(address)
    }

    const interval = setInterval(() => {
      if (isConnected && address) {
        fetchPolicies(address)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [isConnected, address])

  const fetchPolicies = async (address) => {
    if (!window.ethereum) {
      console.error("MetaMask is not installed")
      return
    }

    try {
      setLoading(true)
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      console.log(`Fetching policies for address: ${address}`)
      const policiesDetails = await contract.getPoliciesDetailsOfHolder(address)
      console.log(policiesDetails)

      const detailedPolicies = await Promise.all(
        policiesDetails.map(async (policy) => {
          console.log(policy.cycleId.toString(), "policy.cycleId")
          const cycle = await contract.cycles(policy.cycleId)
          return {
            id: policy.id.toString(),
            cycleId: policy.cycleId.toString(),
            units: policy.units.toString(),
            holder: policy.holder,
            startBlock: policy.startBlock.toString(),
            isClaimed: policy.isClaimed,
            endBlock: cycle.endBlock.toString(),
            amount: ethers.utils.formatEther(
              ethers.BigNumber.from(policy.units).mul(cycle.premiumPerUnit)
            ),
            isActive: cycle.isActive,
            isClaimable: cycle.isClaimable,
            highRisk: cycle.boost
          }
        })
      )

      console.log(detailedPolicies, "detailedPolicies")

      setPolicies(detailedPolicies)
    } catch (error) {
      console.error(`Error fetching policies: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const handleClaim = async (policyId) => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        setLoading(true)
        const tx = await contract.claim(policyId)
        await tx.wait()
        setLoading(false)
        const txHashShort = `${tx.hash.substring(
          0,
          8
        )}......${tx.hash.substring(tx.hash.length - 8)}`
        toast({
          title: "Claim successful",
          description: (
            <div className="flex flex-row gap-2">
              <div>Transaction Hash:</div>
              <div>
                <a
                  href={`https://sepolia.etherscan.io/tx/${tx.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#159895] underline"
                >
                  {txHashShort}
                </a>
              </div>
            </div>
          ),
          status: "success"
        })
        fetchPolicies(address)
      } catch (error) {
        setLoading(false)
        toast({
          title: "Claim failed",
          description: error.message,
          status: "error"
        })
        console.error(error)
      }
    }
  }

  const currentPolicies = policies.filter((policy) => policy.isActive)
  const finishedPolicies = policies.filter((policy) => !policy.isActive)

  const offsetCurrent = (currentPageCurrent - 1) * itemsPerPage
  const currentPageDataCurrent = currentPolicies.slice(
    offsetCurrent,
    offsetCurrent + itemsPerPage
  )
  const pageCountCurrent = Math.ceil(currentPolicies.length / itemsPerPage)

  const offsetFinished = (currentPageFinished - 1) * itemsPerPage
  const currentPageDataFinished = finishedPolicies.slice(
    offsetFinished,
    offsetFinished + itemsPerPage
  )
  const pageCountFinished = Math.ceil(finishedPolicies.length / itemsPerPage)

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

  // 计算积分
  const calculatePoints = (policies) => {
    return policies.reduce((acc, policy) => {
      return acc + (policy.isClaimable ? 100 : -100) * policy.units
    }, 0)
  }

  const totalPoints = calculatePoints(finishedPolicies)

  return (
    <>
      <Card className="w-full h-full flex items-center justify-center border-2 border-[#159895] relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
            <Loader2 className="animate-spin h-10 w-10 text-[#159895]" />
          </div>
        )}
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
                          <div className="text-[#57C5B6] text-2xl">
                            {totalPoints}
                          </div>
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
                    <TableHead className="w-[120px]">Start Block</TableHead>
                    <TableHead className="w-[120px]">End Block</TableHead>
                    <TableHead className="w-[120px]">Amount</TableHead>
                    <TableHead className="w-[120px]">Claim status</TableHead>
                    <TableHead className="w-[120px]">Points</TableHead>
                    <TableHead className="w-[120px]">High Risk</TableHead>
                    <TableHead className="w-[120px] text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageDataCurrent.map((policy, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[120px]">
                        {policy.startBlock}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.endBlock === "0" ? "pending" : policy.endBlock}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.amount} ETH
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.isClaimed ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.isClaimable
                          ? `${policy.units * 100}`
                          : `${policy.units * -100}`}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.highRisk ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="w-[120px] text-right">
                        <Button
                          className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                          disabled={!policy.isClaimable}
                          onClick={() => handleClaim(policy.id)}
                        >
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
                    <TableHead className="w-[120px]">Start Block</TableHead>
                    <TableHead className="w-[120px]">End Block</TableHead>
                    <TableHead className="w-[120px]">Amount</TableHead>
                    <TableHead className="w-[120px]">Claim status</TableHead>
                    <TableHead className="w-[120px]">Points</TableHead>
                    <TableHead className="w-[120px]">High Risk</TableHead>
                    <TableHead className="w-[120px] text-right"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentPageDataFinished.map((policy, index) => (
                    <TableRow key={index}>
                      <TableCell className="w-[120px]">
                        {policy.startBlock}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.endBlock === "0" ? "pending" : policy.endBlock}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.amount} ETH
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.isClaimed ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.isClaimable
                          ? `${policy.units * 100}`
                          : `${policy.units * -100}`}
                      </TableCell>
                      <TableCell className="w-[120px]">
                        {policy.highRisk ? "Yes" : "No"}
                      </TableCell>
                      <TableCell className="w-[120px] text-right">
                        <Button
                          className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                          disabled={!policy.isClaimable}
                          onClick={() => handleClaim(policy.id)}
                        >
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
