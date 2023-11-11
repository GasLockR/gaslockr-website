import { useEffect, useState } from "react";
import { SEPOLIA_TESTNET_CONTRSCT_ADDRESS, SCROLL_CONTRSCT_ADDRESS } from "@/config/address"
import { useNetwork } from "wagmi";

export const useDynamicContractAddress = () => {

    const { chain } = useNetwork();
    const [contractAddress, setContractAddress] = useState(SEPOLIA_TESTNET_CONTRSCT_ADDRESS);

    useEffect(() => {
        if (chain?.id === 534351) {
            setContractAddress(SCROLL_CONTRSCT_ADDRESS);
        } else {
            setContractAddress(SEPOLIA_TESTNET_CONTRSCT_ADDRESS);
        }
    }, [chain?.id]);

    return contractAddress;
}