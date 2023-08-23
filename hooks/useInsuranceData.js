import { useContractRead } from "wagmi"
import contractAbi from "@/config/contract.json"
import { CONTRACT_ADDRESS } from "@/config/address"

const useInsuranceData = (policytype, policyterm) => {
  const {
    data: policyPrice,
    isError: isPolicyPriceError,
    isLoading: isPolicyPriceLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "premium",
    args: [policytype, policyterm],
    watch: true
  })

  const {
    data: benefit,
    isError: isBenefitError,
    isLoading: isBenefitLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "benefit",
    args: [policytype, policyterm],
    watch: true
  })

  const {
    data: volatility,
    isError: isVolatilityError,
    isLoading: isVolatilityLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "volatility",
    args: [policytype, policyterm],
    watch: true
  })

  const {
    data: targetGasPrice,
    isError: isTargetGasPriceError,
    isLoading: isTargetGasPriceLoading
  } = useContractRead({
    address: CONTRACT_ADDRESS,
    abi: contractAbi,
    functionName: "targetGasPrice",
    args: [policytype, policyterm],
    watch: true
  })

  return {
    policyPrice: policyPrice ? policyPrice.toString() : null,
    isPolicyPriceError,
    isPolicyPriceLoading,
    benefit: benefit ? benefit.toString() : null,
    isBenefitError,
    isBenefitLoading,
    volatility: volatility ? volatility.toString() : null,
    isVolatilityError,
    isVolatilityLoading,
    targetGasPrice: targetGasPrice ? targetGasPrice.toString() : null,
    isTargetGasPriceError,
    isTargetGasPriceLoading
  }
}

export default useInsuranceData
