import { MerkleTree } from "merkletreejs"
import keccak256 from "keccak256"

const whitelistAddresses = [
  "0x3F28BECCd4CFf6548600cA62446D7aa6381a37B7",
  "0x038a3F2138e43F572D16E521FD1ED38CF466Dd74",
  "0xA953324614ddE24532B1d2179CF2667Fda9AcFdb",
  "0x9830Bbc79D1D594A15C1c6aa652Cad5F6B99f7c9",
  "0xE3437f1fd6172602C79835742F044047EeCe7Ac9",
  "0x781292B32E41A8986324FCC9e45CA656BFD5552B",
  "0x35E8501583C08e24e362cEc22167d14CBdb9c471",
  "0x4df676739f840f635e8276e2d9be9b426258f828"
]

const leaves = whitelistAddresses.map((addr) => keccak256(addr))
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true })

console.log(tree.getHexRoot(), "tree.getHexRoot()")

const verifyWhitelistAddress = (address) => {
  if (!address) {
    return { isInWhitelist: false, proof: [] }
  }

  const hashedAddress = keccak256(address)

  const proof = tree.getHexProof(hashedAddress)
  const isInWhitelist = tree.verify(proof, hashedAddress, tree.getHexRoot())

  return { isInWhitelist, proof }
}

export default verifyWhitelistAddress
