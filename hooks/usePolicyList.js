import { useContractRead } from "wagmi"
import contractAbi from "@/config/contract.json"
import { CONTRACT_ADDRESS } from "@/config/address"

export function usePayerPolicies(address) {
  const {
    data: payerPolicyList,
    isError: isPayerListError,
    isLoading: isPayerListLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "getPoliciesAsPayer",
    args: [address],
    watch: true
  })

  return { payerPolicyList, isPayerListError, isPayerListLoading }
}

export function useInsuredPolicies(address) {
  const {
    data: insuredPolicyList,
    isError: isInsuredListError,
    isLoading: isInsuredListLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "getPoliciesAsInsured",
    args: [address],
    watch: true
  })

  return { insuredPolicyList, isInsuredListError, isInsuredListLoading }
}
