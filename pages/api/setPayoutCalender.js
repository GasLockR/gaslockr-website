const { ethers } = require("ethers");

const contractABI = [
    {
        "inputs": [],
        "name": "shouldPayout",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

export default async function handler(request, response) {

    const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rpc.scroll.io/")

    const contract = new ethers.Contract(
        '0xC19E354e8C005e6cF8F73C5d35Fe33d67Ae52F59',
        contractABI,
        provider
    )
    const result = await contract.shouldPayout()

    console.log(result)

};