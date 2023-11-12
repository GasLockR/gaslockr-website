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

const contractAddress = process.env.SEPOLIA_CONTRACT_ADDRESS;

export default async function handler() {
    try {
        const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${process.env.INFURA_API_KEY}`);

        const signer = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        const gasPrice = "33124180375";

        const estimatedGasLimit = await contract.estimateGas.addGasPrice(gasPrice);

        const txResponse = await contract.addGasPrice(gasPrice, {
            gasLimit: estimatedGasLimit,
        });
        const txReceipt = await txResponse.wait();

        console.log("Transaction receipt", txReceipt);
    } catch (error) {
        console.log(error);
    }
};