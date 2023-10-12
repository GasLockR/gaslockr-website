// Scroll Sepolia(534351): 0x0C338Ea17977908b1b8B2c846e2DDea31798bBa8

// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GasInsure is ReentrancyGuard{

    address private admin;
    bool pause = false;

    struct Policy{
        uint256 id;
        address payer;
        address insured;
        uint256 term;
        uint256 startTime;
        uint256 endTime;
        uint256 benefit;
        bool isClaimed;
    }

    mapping(address => Policy[]) public payerPolicy;
    mapping(address => Policy[]) public insuredPolicy;

    uint256[24] public premiums = [
        6250000000000000,   // 7天
        7130000000000000,   // 8天
        7940000000000000,   // 9天
        8750000000000000,   // 10天
        9500000000000000,   // 11天
        10190000000000000,  // 12天
        10880000000000000,  // 13天
        11560000000000000,  // 14天
        12190000000000000,  // 15天
        12810000000000000,  // 16天
        13380000000000000,  // 17天
        13940000000000000,  // 18天
        14500000000000000,  // 19天
        15000000000000000,  // 20天
        15500000000000000,  // 21天
        15940000000000000,  // 22天
        16380000000000000,  // 23天
        16810000000000000,  // 24天
        17190000000000000,  // 25天
        17560000000000000,  // 26天
        17940000000000000,  // 27天
        18250000000000000,  // 28天
        18560000000000000,  // 29天
        18880000000000000   // 30天
    ];
    
    uint256[] public gasPrices;
    uint256[] public predictedGasPrices;

    uint256[] internal livePolicyNum;
    Policy[] public policyList; 

    mapping(uint256 => uint256) public policyListPayer;
    mapping(uint256 => uint256) public policyListInsured;


    event Deposit(address indexed payer, address indexed insured, uint256 term, uint256 timestamp);
    event Payout(uint256 gasprice, uint256 timestamp);
    event Claim(address indexed insured, uint256 id, uint256 amount, uint256 timestamp);

    modifier onlyAdmin{
        require(msg.sender == admin, "not admin");
        _;
    }

    modifier notPause{
        require(pause == false, "pause!");
        _;
    }

    constructor(uint256[] memory _gasPrice) {
        gasPrices = _gasPrice;
        admin = msg.sender;
        uint256 n = gasPrices.length;
        require(n >= 7, "Not enough history gas price");
        uint256 predictedGasPrice = computeWMA(n-7, n-1);
        predictedGasPrices.push(predictedGasPrice);
    }

    function ePause(bool _pause) external onlyAdmin{
        pause = _pause;
    }

    function resetPolicyList() external onlyAdmin {
        delete policyList;
    }

    function getPoliciesAsPayer(address _address) public view returns (Policy[] memory) {
        return payerPolicy[_address];
    }

    function getPoliciesAsInsured(address _address) public view returns (Policy[] memory) {
        return insuredPolicy[_address];
    }


    function deposit(address payer, address insured, uint256 term) external payable nonReentrant notPause{
        require(term >= 7 && term <= 30, "invalid term");
        require(msg.value >= premiums[term - 7], "not enough money");
        Policy memory tempPolicy = generatePolicy(payer, insured, term);
        policyList.push(tempPolicy);
        livePolicyNum.push(policyList.length - 1);
        payerPolicy[payer].push(tempPolicy);
        policyListPayer[policyList.length - 1] = payerPolicy[payer].length - 1;
        insuredPolicy[insured].push(tempPolicy);
        policyListInsured[policyList.length - 1] = insuredPolicy[insured].length - 1;
        uint256 sendValue = msg.value;
        if(msg.value > premiums[term - 7]) {
            (bool success, ) = payable(msg.sender).call{value: sendValue - premiums[term - 7]}("");
            require(success, "refund failed");
        }
        emit Deposit(payer, insured, term, block.timestamp);
    }

    function generatePolicy(address payer, address insured, uint256 term) internal view returns(Policy memory policyData) {
        policyData.id = policyList.length;
        policyData.payer = payer;
        policyData.insured = insured;
        policyData.term = term;
        policyData.startTime = block.timestamp;
        policyData.endTime = block.timestamp + term * 1 days;
        policyData.isClaimed = false;
        policyData.benefit = 0;
    }

    //triger by admin per day
    function addGasPrice(uint256 _gasPrice) external onlyAdmin notPause {
        require(_gasPrice > 0, "invalid gas price");
        gasPrices.push(_gasPrice);

        uint256 n = gasPrices.length;
        uint256 predictedGasPrice = computeWMA(n-7, n-1);
        predictedGasPrices.push(predictedGasPrice);

        if(shouldPayout()){
            payout();
            emit Payout(_gasPrice, block.timestamp);
        }
    }

    function shouldPayout() public view returns (bool) {
        // Check if the latest gas price exceeds the predicted gas price by more than 20%
        return gasPrices[gasPrices.length - 1] > (predictedGasPrices[predictedGasPrices.length - 2] * 12) / 10;
    }

    function computeWMA(uint startIndex, uint endIndex) internal view returns (uint) {
        uint256 sum = 0;
        uint256 weightSum = 0;
        for (uint256 i = startIndex; i <= endIndex; i++) {
            sum += gasPrices[i] * (i - startIndex + 1);
            weightSum += (i - startIndex + 1);
        }
        return sum / weightSum;
    }

    //add benefit to live policies
    function payout() internal nonReentrant notPause {
        require(policyList.length > 0, "no policy");
        require(livePolicyNum.length > 0, "no live policy");
        uint256 i = 0;
        uint256 p = 0;
        address _payer;
        address _insured;
        while (i < livePolicyNum.length){
            p = livePolicyNum[i];
            if (isPolicyExpired(policyList[p])){
                livePolicyNum[i] = livePolicyNum[livePolicyNum.length - 1];
                livePolicyNum.pop();
            } else {
                policyList[p].benefit += 3000000000000000;
                _payer = policyList[p].payer;
                _insured = policyList[p].insured;
                payerPolicy[_payer][policyListPayer[p]].benefit += 3000000000000000;
                insuredPolicy[_insured][policyListInsured[p]].benefit += 3000000000000000;
                i++;
            }
        }
    }
    
    function isPolicyExpired(Policy memory policy) public view returns (bool) {
        return block.timestamp > policy.endTime;
    }

    //trigger by insured
    function claim(address _insured, uint256 _id) external nonReentrant notPause{
        require(isPolicyExpired(policyList[_id]), "claim pending till expired");
        require(!policyList[_id].isClaimed, "is claimed");
        require(policyList[_id].benefit > 0, "no benefit");
        require(policyList[_id].insured == _insured, "not insured himself");
        uint256 _benefit = policyList[_id].benefit;

        // change isClaimed
        policyList[_id].isClaimed = true;
        address _payer = policyList[_id].payer;
        payerPolicy[_payer][policyListPayer[_id]].isClaimed = true;
        insuredPolicy[_insured][policyListInsured[_id]].isClaimed = true;
               
        // change benefit for policylist & payer
        policyList[_id].benefit = 0;
        payerPolicy[_payer][policyListPayer[_id]].benefit = 0;
        insuredPolicy[_insured][policyListInsured[_id]].benefit = 0; 

        (bool success, ) = _insured.call{value: _benefit}("");
        require(success, "claim failed");
        emit Claim(_insured, _id, _benefit, block.timestamp);
    }

    receive() external payable {}
}