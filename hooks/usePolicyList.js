import { useContractRead } from "wagmi"
import contractAbi from "@/config/contract.json"
import { CONTRACT_ADDRESS } from "@/config/address"
import { SCROLL_CONTRSCT_ADDRESS } from "@/config/address"

export function usePayerPolicies(address) {
  const {
    data: payerPolicyList,
    isError: isPayerListError,
    isLoading: isPayerListLoading
  } = useContractRead({
    address: SCROLL_CONTRSCT_ADDRESS,
    abi: contractAbi,
    functionName: "getPoliciesAsPayer",
    enabled:false,
    args: [address],
  })

  return { payerPolicyList, isPayerListError, isPayerListLoading }
}

export function useInsuredPolicies(address) {
  const {
    data: insuredPolicyList,
    isError: isInsuredListError,
    isLoading: isInsuredListLoading
  } = useContractRead({
    address: SCROLL_CONTRSCT_ADDRESS,
    abi: contractAbi,
    functionName: "getPoliciesAsInsured",
    enabled:false,
    args: [address],
  })

  return { insuredPolicyList, isInsuredListError, isInsuredListLoading }
}
