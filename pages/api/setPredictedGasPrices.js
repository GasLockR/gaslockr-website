const { ethers } = require("ethers");
const fs = require("fs");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;

const contractABI = [
    {
        "inputs": [],
        "name": "getPredictedGasPrices",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

const csvWriter = createCsvWriter({
    path: "./predictedGasPrices.csv",
    header: [
        { id: "date", title: "date" },
        { id: "predictedGasPrices", title: "predictedGasPrices" },
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
        const result = await contract.getPredictedGasPrices()

        console.log(result[result.length - 1], 'result')

        csvWriter.writeRecords([
            // 更新前一天的，数组最后一位-2
            { date: new Date().toISOString().slice(0, 10), result: String(result[result.length - 2]) }
        ]);
    } catch (error) {
        console.log(error)
    }
};