const { ethers } = require("ethers");

const contractABI = [
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_gasPrice",
                "type": "uint256"
            }
        ],
        "name": "addGasPrice",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]

const contractAddress = "0xC19E354e8C005e6cF8F73C5d35Fe33d67Ae52F59";

export default async function handler() {
    try {
        const provider = new ethers.providers.JsonRpcProvider("https://sepolia-rpc.scroll.io/");

        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const gasPrice = "57102480375";

        const gasLimit = "100000000000000000";
        const txResponse = await contract.addGasPrice(gasPrice, {
            gasLimit: gasLimit
        });
        const txReceipt = await txResponse.wait();

        console.log("Transaction receipt", txReceipt);
    } catch (error) {
        console.log(error);
    }
};