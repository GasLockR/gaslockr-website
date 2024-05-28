import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"
import whitelistAddresses from "./whitelistAddress02"

const addresses = whitelistAddresses

const leaves = addresses.map((addr) => keccak256(addr))
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })

const verifyWhitelistAddress02 = (address) => {
  if (!address) {
    return { isInWhitelist: false, proof: [] }
  }

  const hashedAddress = keccak256(address)

  const proof = tree.getHexProof(hashedAddress)
  const isInWhitelist = tree.verify(proof, hashedAddress, tree.getHexRoot())

  return { isInWhitelist, proof }
}

export default verifyWhitelistAddress02
