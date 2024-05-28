import React, { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import { useAccount } from "wagmi"
import verifyWhitelistAddress from "@/config/verifyWhitelistAddress"
import verifyWhitelistAddress02 from "@/config/verifyWhitelistAddress02"
import { useToast } from "@/components/ui/use-toast"
import { Alchemy, Network } from "alchemy-sdk"
import { ethers } from "ethers"
import Image from "next/image"
import { Skeleton } from "@/components/ui/skeleton"
import { useNetwork, useSwitchNetwork } from "wagmi"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { Loader2 } from "lucide-react"

const Mint = () => {
  const { address, isConnected } = useAccount()
  const { toast } = useToast()
  const [isWL, setIsWL] = useState(false)
  const [isWL02, setIsWL02] = useState(false)
  const [Proof, setProof] = useState([])
  const [Proof02, setProof02] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [tokenUri, setTokenUri] = useState("")
  const [tokenUri02, setTokenUri02] = useState("")
  const [nftName, setNftName] = useState("")
  const [nftName02, setNftName02] = useState("")
  const [minting, setMinting] = useState(false)

  const contractAddress = process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS
  const { chain } = useNetwork()
  const { switchNetwork } = useSwitchNetwork()

  useEffect(() => {
    if (chain?.id !== 137 && switchNetwork) {
      switchNetwork(137)
    }
  }, [chain, switchNetwork])

  const provider = new ethers.providers.Web3Provider(window.ethereum)
  const signer = provider.getSigner()
  const contract = new ethers.Contract(
    contractAddress,
    [
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
    signer
  )

  const getUserNFT = async () => {
    const alchemy = new Alchemy({
      apiKey: process.env.NEXT_PUBLIC_POLYGON_PROVIDER_URL,
      network: Network.MATIC_MAINNET
    })

    const options = {
      contractAddresses: [contractAddress]
    }

    const response = await alchemy.nft.getNftsForOwner(address, options)
    return response
  }

  useEffect(() => {
    if (address) {
      setIsLoading(true)
      getUserNFT().then((response) => {
        if (response && response.ownedNfts.length > 0) {
          const firstNFT = response.ownedNfts[0]
          setTokenUri(firstNFT.raw.metadata.image)
          setNftName(firstNFT.raw.metadata.name)

          if (response.ownedNfts.length > 1) {
            const secondNFT = response.ownedNfts[1]
            setTokenUri02(secondNFT.raw.metadata.image)
            setNftName02(secondNFT.raw.metadata.name)
          }
        }
        setIsLoading(false)
      })
    }
  }, [address])

  const handleCheck = () => {
    setIsLoading(true)
    const { isInWhitelist, proof } = verifyWhitelistAddress(address)
    const { isInWhitelist: isInWhitelist02, proof: proof02 } =
      verifyWhitelistAddress02(address)

    if (isInWhitelist) {
      setProof(proof)
      setIsWL(true)
    } else {
      setIsWL(false)
    }

    if (isInWhitelist02) {
      setProof02(proof02)
      setIsWL02(true)
    } else {
      setIsWL02(false)
    }

    setIsLoading(false)

    toast({
      title: "Verification Complete",
      description: isInWhitelist
        ? "You are verified to mint the 1st tester NFT."
        : "You are not on the list for the 1st NFT."
    })

    toast({
      title: "Verification Complete",
      description: isInWhitelist02
        ? "You are verified to mint the 2nd tester NFT."
        : "You are not on the list for the 2nd NFT."
    })
  }

  const handleMint = async (proof) => {
    setMinting(true)
    try {
      const tx = await contract.mint(proof)
      await tx.wait()
      const txHashShort = `${tx.hash.substring(0, 8)}......${tx.hash.substring(
        tx.hash.length - 8
      )}`
      toast({
        title: "Mint successful",
        description: (
          <div className="flex flex-row gap-2">
            <div>Transaction Hash:</div>
            <div>
              <a
                href={`https://polygonscan.com/tx/${tx.hash}`}
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
      const response = await getUserNFT()
      if (response && response.ownedNfts.length > 0) {
        const firstNFT = response.ownedNfts[0]
        setTokenUri(firstNFT.raw.metadata.image)
        setNftName(firstNFT.raw.metadata.name)

        if (response.ownedNfts.length > 1) {
          const secondNFT = response.ownedNfts[1]
          setTokenUri02(secondNFT.raw.metadata.image)
          setNftName02(secondNFT.raw.metadata.name)
        }
      }
    } catch (error) {
      toast({
        title: "Mint failed",
        description: error.message,
        status: "error"
      })
    } finally {
      setMinting(false)
    }
  }

  return (
    <div className="overflow-hidden h-full mb-20 py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        {isLoading && (
          <div className="flex justify-center items-center h-screen">
            <Loader2 className="animate-spin h-10 w-10 text-[#57C5B6]" />
          </div>
        )}
        {!isLoading && (
          <>
            <div className="mb-36">
              <div className="flex flex-col justify-center items-center gap-4">
                <h1 className="font-bold text-4xl mb-20 text-center">
                  Collect GasLockR Badges Series 💎
                </h1>
              </div>
              <div>
                {isWL02 ? (
                  <div className="flex flex-row gap-2 items-center justify-center">
                    <div>
                      {tokenUri02 ? (
                        <Button
                          variant="outline"
                          className="bg-[#57C5B6] text-white text-2xl p-8 transform hover:scale-105 hover:bg-[#159895]"
                          onClick={() => handleMint(Proof02)}
                          disabled
                        >
                          Already Minted in This Phase
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          className="bg-[#57C5B6] text-white text-2xl p-8 transform hover:scale-105 hover:bg-[#159895]"
                          onClick={() => handleMint(Proof02)}
                          disabled={minting}
                        >
                          {minting ? (
                            <div className="flex items-center gap-2">
                              <Loader2 className="animate-spin h-6 w-6" />
                              Transaction in progress..
                            </div>
                          ) : (
                            "Mint Now"
                          )}
                        </Button>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-row gap-2 items-center justify-center">
                    {isConnected && (
                      <div>
                        <Button
                          variant="outline"
                          className="bg-[#57C5B6] text-white text-2xl p-8 transform hover:scale-105 hover:bg-[#159895]"
                          onClick={handleCheck}
                          disabled={isLoading}
                        >
                          {isLoading ? "Loading..." : "Check Your Eligibility"}
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="h-1/3 border border-[#57C5B6] rounded-lg relative">
              <div className="flex flex-row justify-between w-full p-4">
                <div></div>
                <div>
                  <a
                    className="text-[#57C5B6] underline"
                    target="_blank"
                    rel="noopener noreferrer"
                    href="https://polygonscan.com/token/0x574d2e6a314a35692dfa839007da761e290417e3"
                  >
                    Check on Polygon Scan
                  </a>
                </div>
              </div>
              {!isConnected && (
                <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center rounded-md z-10">
                  <ConnectButton showBalance={false} accountStatus="address" />
                </div>
              )}
              <div className="flex flex-col sm:flex-row">
                <div className="flex flex-col gap-4 items-center justify-center w-full sm:w-1/3 p-4">
                  <div className="w-2/3">
                    {isLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <Image
                        src={tokenUri ? tokenUri : "/block.jpg"}
                        alt="Logo"
                        width={524}
                        height={524}
                      />
                    )}
                  </div>
                  <div className="text-center text-[#57C5B6]">
                    {nftName ? nftName : "Coming Soon"}
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-full sm:w-1/3 p-4">
                  <div className="w-2/3">
                    {isLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <Image
                        src={tokenUri02 ? tokenUri02 : "/block.jpg"}
                        alt="Logo"
                        width={524}
                        height={524}
                      />
                    )}
                  </div>
                  <div className="text-center text-[#57C5B6]">
                    {nftName02 ? nftName02 : "Coming Soon"}
                  </div>
                </div>
                <div className="flex flex-col gap-4 items-center justify-center w-full sm:w-1/3 p-4">
                  <div className="w-2/3">
                    {isLoading ? (
                      <Skeleton className="w-full h-full" />
                    ) : (
                      <Image
                        src="/block.jpg"
                        alt="Logo"
                        width={524}
                        height={524}
                      />
                    )}
                  </div>
                  <div className="text-center text-[#57C5B6]">Coming Soon</div>
                </div>
              </div>
            </div>
          </>
        )}
      </Container>
    </div>
  )
}

export default Mint
