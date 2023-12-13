import React, { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/Container"
import { useAccount } from "wagmi"
import verifyWhitelistAddress from "@/config/verifyWhitelistAddress"
import { useToast } from "@/components/ui/use-toast"
import { useContractWrite, useContractRead } from "wagmi"
import { NFT_CONTRACT_ADDRESS } from "@/config/address"
import { Alchemy, Network } from "alchemy-sdk"

const Mint = () => {
  const { address } = useAccount()
  const { toast } = useToast()
  const [isWL, setIsWL] = useState(false)
  const [Proof, setProof] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [nftMetadata, setNftMetadata] = useState(null)
  const [tokenUri, setTokenUri] = useState("")
  const [nftName, setNftName] = useState("")

  console.log(tokenUri, "tokenUri")

  const getUserNFT = async () => {
    const config = {
      apiKey: "h8cBT_y-mfPReyt1d2rxpRLo-VF4svTz",
      network: Network.ETH_SEPOLIA
    }
    const alchemy = new Alchemy(config)
    const options = {
      contractAddresses: ["0x7e2aa2a62e7a45033c5a274c7b3db4fab788057d"]
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

  const nftMetadataURI = useContractRead({
    address: NFT_CONTRACT_ADDRESS,
    abi: [
      {
        inputs: [
          {
            internalType: "uint256",
            name: "tokenId",
            type: "uint256"
          }
        ],
        name: "tokenURI",
        outputs: [
          {
            internalType: "string",
            name: "",
            type: "string"
          }
        ],
        stateMutability: "view",
        type: "function"
      }
    ],
    functionName: "tokenURI",
    args: [5]
  })

  useEffect(() => {
    if (nftMetadataURI.data) {
      fetch(nftMetadataURI.data)
        .then((response) => response.json())
        .then((data) => {
          setNftMetadata(data)
        })
    }
  }, [nftMetadataURI.data])

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
      console.log(`Address ${address} is in whitelist. Proof: `, proof)
      setProof(proof)
      setIsWL(true)
      setIsLoading(false)
      toast({
        title: "Wow!",
        description: "You have obtained the whitelist qualification."
      })
    } else {
      setIsWL(false)
      setIsLoading(false)
      console.log(`Address ${address} is not in whitelist.`)
      toast({
        title: "Uh",
        description: "Don't lose heart, keep paying attention."
      })
    }
  }

  const handleMint = () => {
    console.log("Minting NFT for address:", address, "with proof:", Proof)
    write({
      args: [Proof]
    })
    if (isSuccess) {
      toast({
        title: "Success",
        description: (
          <a
            className="text-[#57C5B6]"
            href={`https://sepolia.etherscan.io/tx/${data.transactionHash}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {`https://sepolia.etherscan.io/tx/${data.transactionHash}`}
          </a>
        )
      })
    }
  }

  console.log(error?.message, "error")

  return (
    <div className="overflow-hidden h-full mb-20 py-20 sm:py-32 lg:pb-32 xl:pb-36">
      <Container>
        <div className="mb-20">
          <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="font-bold text-4xl mb-20">
              Mint First Beta Tester NFT 🎁
            </h1>
          </div>
          <div>
            {isWL ? (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div>
                  Congratulations🎉, you have obtained the whitelist
                  qualification.
                </div>
                <div>
                  <Button
                    variant="outline"
                    className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                    onClick={handleMint}
                    disabled={mintLoading}
                  >
                    {mintLoading ? "Transaction in progress.." : "Mint"}
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex flex-row gap-2 items-center justify-center">
                <div>Click here to verify your eligibility 👉</div>
                <div>
                  <Button
                    variant="outline"
                    className="bg-[#57C5B6] text-white transform hover:scale-105 hover:bg-[#159895]"
                    onClick={() => handleCheck()}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Check"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="h-1/3 border border-[#57C5B6] rounded-lg">
          <div className="flex flex-col gap-4 items-center justify-center w-1/3 p-8">
            <img src={tokenUri} />
            <div className="text-center text-[#57C5B6]">{nftName}</div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default Mint
