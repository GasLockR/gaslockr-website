import React, { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ExclamationTriangleIcon } from "@radix-ui/react-icons"
import { Loader2 } from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { ethers, BigNumber } from "ethers"
import { useAccount } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useToast } from "@/components/ui/use-toast"

const contractABI = [
  {
    inputs: [],
    name: "currentCycleId",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [],
    name: "premiumPerUnit",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256"
      }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "units",
        type: "uint256"
      },
      {
        internalType: "address",
        name: "holder",
        type: "address"
      }
    ],
    name: "purchase",
    outputs: [],
    stateMutability: "payable",
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
  }
]

const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS

const GasInsureOrder = () => {
  const [units, setUnits] = useState(1)
  const [premiumPerUnit, setPremiumPerUnit] = useState(BigNumber.from(0))
  const [totalCost, setTotalCost] = useState("0")
  const [isLoading, setIsLoading] = useState(false)
  const [boost, setBoost] = useState(false)
  const [startBlock, setStartBlock] = useState(0)
  const [countdown, setCountdown] = useState(null)
  const [isInitialLoading, setIsInitialLoading] = useState(true)

  const { isConnected } = useAccount()
  const { toast } = useToast()

  useEffect(() => {
    const fetchCycleInfo = async () => {
      if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
          contractAddress,
          contractABI,
          provider
        )
        const currentCycleId = await contract.currentCycleId()
        const cycle = await contract.cycles(currentCycleId)
        setPremiumPerUnit(BigNumber.from(cycle.premiumPerUnit))
        setBoost(cycle.boost)
        setStartBlock(cycle.startBlock.toNumber())
        setIsInitialLoading(false)
      }
    }

    fetchCycleInfo()
  }, [])

  useEffect(() => {
    const fetchBlockNumber = async () => {
      try {
        const response = await fetch(
          "https://api.blocknative.com/gasprices/blockprices",
          {
            method: "GET"
          }
        )
        const data = await response.json()
        const blockNumber = data.blockPrices[0].blockNumber
        const newCountdown = startBlock + 300 - blockNumber
        setCountdown(newCountdown > 0 ? newCountdown : 0)
      } catch (error) {
        console.error("Error fetching block number:", error)
      }
    }

    if (!isInitialLoading) {
      fetchBlockNumber()
      const interval = setInterval(fetchBlockNumber, 3000)
      return () => clearInterval(interval)
    }
  }, [startBlock, isInitialLoading])

  useEffect(() => {
    const totalCostInWei = premiumPerUnit.mul(units)
    setTotalCost(ethers.utils.formatEther(totalCostInWei))
  }, [premiumPerUnit, units])

  const handleUnitsChange = (e) => {
    let value = e.target.value
    if (value === "") {
      setUnits(1)
    } else if (Number(value) >= 0 && /^\d+$/.test(value)) {
      setUnits(Number(value.replace(/^0+/, "")))
    }
  }

  const handlePurchase = async () => {
    if (typeof window.ethereum !== "undefined") {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const contract = new ethers.Contract(contractAddress, contractABI, signer)

      try {
        setIsLoading(true)
        const tx = await contract.purchase(units, await signer.getAddress(), {
          value: ethers.utils.parseEther(totalCost)
        })
        await tx.wait()
        setIsLoading(false)
        const txHashShort = `${tx.hash.substring(
          0,
          8
        )}......${tx.hash.substring(tx.hash.length - 8)}`
        toast({
          title: "Purchase successful",
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
      } catch (error) {
        setIsLoading(false)
        toast({
          title: "Purchase failed",
          description: error.message,
          status: "error"
        })
        console.error(error)
      }
    }
  }

  const isPayNowDisabled =
    isLoading || isInitialLoading || countdown === null || countdown === 0

  return (
    <Card className="w-full h-full flex border-2 border-[#159895] p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col gap-4 sm:gap-6 lg:gap-8 w-full">
        <div className="flex flex-row items-center justify-between">
          <div className="text-xl sm:text-2xl font-bold">Purchase</div>
          <Button
            disabled
            variant="ghost"
            className="bg-[#57C5B6] text-white w-1/3 sm:w-auto transform hover:scale-105 hover:bg-[#159895] mt-2 sm:mt-0"
          >
            Switch Cycle
          </Button>
        </div>
        <div className="flex items-center justify-center text-2xl sm:text-3xl font-bold text-[#159895]">
          <div className="flex flex-row items-center justify-center gap-2 mt-2 sm:mt-0">
            <div>
              {countdown !== null && !isInitialLoading ? (
                countdown
              ) : (
                <Loader2 className="animate-spin" />
              )}
            </div>
            {boost && (
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-transparent"
                        variant="ghost"
                        size="icon"
                      >
                        <ExclamationTriangleIcon className="text-red-500 h-6 w-6" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="text-red-500">High Risk Cycle</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>锁定gwei</div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>60</div>
            <div>gwei</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>投保份数</div>
          <div className="w-1/3 text-[#159895]">
            <Input value={units} onChange={handleUnitsChange} />
          </div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>{ethers.utils.formatEther(premiumPerUnit)}</div>
            <div>ETH</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>总支付</div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>{totalCost}</div>
            <div>ETH</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <div>预计赔付金额</div>
          <div className="text-[#159895] flex flex-row gap-2 mt-2 sm:mt-0">
            <div>1</div>
            <div>ETH</div>
          </div>
        </div>
        <div className="flex flex-row items-center justify-center mt-4">
          {isConnected ? (
            <Button
              className="bg-[#57C5B6] text-white w-full transform hover:scale-105 hover:bg-[#159895]"
              onClick={handlePurchase}
              disabled={isPayNowDisabled}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" />
                  <span>Loading...</span>
                </div>
              ) : (
                "Pay Now"
              )}
            </Button>
          ) : (
            <ConnectButton showBalance={false} accountStatus="address" />
          )}
        </div>
      </div>
    </Card>
  )
}

export default GasInsureOrder
