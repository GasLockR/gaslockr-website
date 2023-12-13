import React, { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import { useAccount } from "wagmi"
import verifyWhitelistAddress from "@/config/verifyWhitelistAddress"
import { useToast } from "@/components/ui/use-toast"
import { useContractWrite, useNetwork, useSwitchNetwork } from "wagmi"
import { NFT_CONTRACT_ADDRESS } from "@/config/address"
import { Alchemy, Network } from "alchemy-sdk"
import Image from "next/image"

const Mint = () => {
  const { address } = useAccount()
  const { toast } = useToast()
  const [isWL, setIsWL] = useState(false)
  const [Proof, setProof] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUri, setTokenUri] = useState("")
  const [nftName, setNftName] = useState("")
  const { chain } = useNetwork()
  const {
    chains,
    error: switchNetWorkError,
    isLoading: switchNetWorkLoading,
    pendingChainId,
    switchNetwork
  } = useSwitchNetwork()

  useEffect(() => {
    if (chain?.id !== 137 && switchNetwork) {
      switchNetwork(137)
    }
  }, [chain, switchNetwork])

  const getUserNFT = async () => {
    const config = {
      apiKey: "WvvnfE7_s16d21jxwbbC9IRf6jUdB6ii",
      network: Network.MATIC_MAINNET
    }
    const alchemy = new Alchemy(config)
    const options = {
      contractAddresses: [NFT_CONTRACT_ADDRESS]
    }

    const response = await alchemy.nft.getNftsForOwner(address, options)
    return response
  }

  useEffect(() => {
    if (address) {
      getUserNFT().then((response) => {
        if (response && response.ownedNfts.length > 0) {
          setTokenUri(response.ownedNfts[0].raw.metadata.image)
          setNftName(response.ownedNfts[0].raw.metadata.name)
        }
      })
    }
  }, [address])

  const {
    data,
    isLoading: mintLoading,
    isSuccess,
    error,
    write
  } = useContractWrite({
    address: NFT_CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: "bytes32[]",
            name: "merkleProof",
            type: "bytes32[]"
          }
        ],
        name: "mint",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function"
      }
    ],
    functionName: "mint"
  })

  const handleCheck = () => {
    setIsLoading(true)
    const { isInWhitelist, proof } = verifyWhitelistAddress(address)

    if (isInWhitelist) {
      setProof(proof)
      setIsWL(true)
      setIsLoading(false)
      toast({
        title: "Congrats!",
        description: "You are verified to mint the 1st tester NFT."
      })
    } else {
      setIsWL(false)
      setIsLoading(false)
      toast({
        title: "Sorry",
        description: "You are not on the list."
      })
    }
  }

  const handleMint = () => {
    write({
      args: [Proof]
    })
  }

  useEffect(() => {
    if (isSuccess) {
      toast({
        title: "Success",
        description: "Mint Success."
      })

      setTimeout(() => {
        window.location.reload()
      }, 3000)
    }
  }, [isSuccess, toast])

  return (
    <div className="overflow-hidden h-full mb-20 py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="mb-36">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-4xl mb-20">
              Collect GasLockR Testers Series NFTs 💎
            </h1>
          </div>
          <div>
            {isWL ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div>
                  {tokenUri ? (
                    <Button
                      variant="outline"
                      className="bg-[#57C5B6] text-white text-2xl p-8 transform hover:scale-105 hover:bg-[#159895]"
                      onClick={handleMint}
                      disabled
                    >
                      Already Minted in This Phase
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      className="bg-[#57C5B6] text-white text-2xl p-8 transform hover:scale-105 hover:bg-[#159895]"
                      onClick={handleMint}
                      disabled={mintLoading}
                    >
                      {mintLoading ? "Transaction in progress.." : "Mint Now"}
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div>
                  <Button
                    variant="outline"
                    className="bg-[#57C5B6] text-white text-2xl p-8 transform hover:scale-105 hover:bg-[#159895]"
                    onClick={() => handleCheck()}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Check Your Eligibility"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-1/3 border border-[#57C5B6] rounded-lg">
          <div className="flex flex-row justify-between w-full p-4">
            <div></div>
            <div>
              <a
                className="text-[#57C5B6] underline"
                target="_blank"
                rel="noopener noreferrer"
                href="https://polygonscan.com/address/0xeed6b442f9b126982c30437396c035ad1ae20f2d"
              >
                Check on Polygon Scan
              </a>
            </div>
          </div>

          <div className="flex flex-row">
            <div className="flex flex-col gap-4 items-center justify-center w-1/3 p-16">
              <div className="w-2/3">
                {tokenUri ? (
                  <img src={tokenUri} />
                ) : (
                  <Image
                    src="/block03.jpg"
                    alt="Logo"
                    width={524}
                    height={524}
                  />
                )}
              </div>
              {nftName ? (
                <div className="text-center text-[#57C5B6]">{nftName}</div>
              ) : (
                <div className="text-center text-[#57C5B6]">Coming Soon</div>
              )}
            </div>

            <div className="flex flex-col gap-4 items-center justify-center w-1/3 p-16">
              <div className="w-2/3">
                <Image src="/block03.jpg" alt="Logo" width={524} height={524} />
              </div>
              <div className="text-center text-[#57C5B6]">Coming Soon</div>
            </div>

            <div className="flex flex-col gap-4 items-center justify-center w-1/3 p-16">
              <div className="w-2/3">
                <Image src="/block03.jpg" alt="Logo" width={524} height={524} />
              </div>
              <div className="text-center text-[#57C5B6]">Coming Soon</div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Mint
