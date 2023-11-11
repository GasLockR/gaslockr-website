import { useContractRead } from "wagmi"
import contractAbi from "@/config/contract.json"
import { useDynamicContractAddress } from "./useDynamicContractAddress";

export function usePayerPolicies(address) {
  const contractAddress = useDynamicContractAddress();

  const {
    data: payerPolicyList,
    isError: isPayerListError,
    isLoading: isPayerListLoading
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getPoliciesAsPayer",
    args: [address],
    watch: true,
  })

  return { payerPolicyList, isPayerListError, isPayerListLoading }
}

export function useInsuredPolicies(address) {
  const contractAddress = useDynamicContractAddress();

  const {
    data: insuredPolicyList,
    isError: isInsuredListError,
    isLoading: isInsuredListLoading
  } = useContractRead({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getPoliciesAsInsured",
    args: [address],
    watch: true,
  })

  return { insuredPolicyList, isInsuredListError, isInsuredListLoading }
}
