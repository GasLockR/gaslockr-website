const { ethers } = require("ethers");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

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

const csvWriter = createCsvWriter({
    path: "./payoutResult.csv",
    header: [
        { id: "date", title: "date" },
        { id: "result", title: "result" },
    ],
});

const contractAddress = process.env.SEPOLIA_CONTRACT_ADDRESS;

export default async function handler() {
    try {
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rpc.scroll.io/")

        const contract = new ethers.Contract(
            contractAddress,
            contractABI,
            provider
        )
        const result = await contract.shouldPayout()

        csvWriter.writeRecords([
            // date改成前一天
            { date: new Date().toISOString().slice(0, 10), result: result ? 1 : 0 }
        ]);
    } catch (error) {
        console.log(error)
    }
};