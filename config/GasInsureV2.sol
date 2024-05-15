// SPDX-License-Identifier: MIT
pragma solidity ^0.8.6;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract GasInsureV2 is AccessControl, ReentrancyGuard {
    struct Policy {
        uint256 id;
        uint256 cycleId;
        uint256 units;
        address holder;
        uint256 startBlock;
        bool isClaimed;
    }

    struct Cycle {
        uint256 id;
        uint256 startBlock;
        uint256 endBlock;
        uint256 coverBlock;
        uint256 premiumPerUnit;
        uint256 benefitPerUnit;
        uint256[] policyIds;
        uint256 units;
        bool isActive;
        bool isClaimable;
        bool boost;
    }

    uint256 public manageRatio;
    uint256 public claimPoolRatio;
    uint256 public coverBlock;
    uint256 public premiumPerUnit;
    uint256 public startBlockBuffer;

    uint256 public totalInsurancePool;
    uint256 public totalManagementFees;

    mapping(address => uint256[]) public holderPolicies;
    mapping(uint256 => Policy) public policies;
    mapping(uint256 => Cycle) public cycles;

    uint256 public currentCycleId;
    uint256[] public claimableCycleId;

    bytes32 public constant OPERATOR_ROLE = keccak256("OPERATOR_ROLE");
    bytes32 public constant ADMIN_ROLE = keccak256("ADMIN_ROLE");
    
    event PolicyPurchased(uint256 indexed policyId, address indexed holder, uint256 units);
    event PolicyClaimed(uint256 indexed policyId, uint256 payout);
    event NewCycleStarted(uint256 indexed cycleId);
    event CycleEnded(uint256 indexed cycleId, bool isClaimable);
    event RatiosUpdated(uint256 manageRatio, uint256 claimPoolRatio);
    event ParametersUpdated(uint256 coverBlock, uint256 premiumPerUnit, uint256 startBlockBuffer);
    event InsurancePoolFunded(uint256 amount, address from);


    constructor(uint256 _initialManageRatio, uint256 _initialClaimPoolRatio) {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(ADMIN_ROLE, msg.sender);
        _grantRole(OPERATOR_ROLE, msg.sender);
        manageRatio = _initialManageRatio;
        claimPoolRatio = _initialClaimPoolRatio;
    }

    function purchase(uint256 units, address holder) external payable {
        require(cycles[currentCycleId].isActive, "Current cycle is not active");
        // // Mainnet open below requirements
        // require(block.number >= cycles[currentCycleId].startBlock, "Current cycle not start");
        // require(block.number <= cycles[currentCycleId].startBlock + cycles[currentCycleId].coverBlock, "Cycle cover period has ended");
        uint256 totalCost = cycles[currentCycleId].premiumPerUnit * units;
        require(msg.value == totalCost, "Incorrect amount transferred");
        //TODO: require some blocks before the end

        uint256 policyId = cycles[currentCycleId].policyIds.length;
        Policy memory newPolicy = Policy({
            id: policyId,
            cycleId: currentCycleId,
            units: units,
            holder: holder,
            startBlock: cycles[currentCycleId].startBlock,
            // // Mainnet use below startBlock
            // startBlock: block.number,
            isClaimed: false
        });
        policies[policyId] = newPolicy;
        cycles[currentCycleId].policyIds.push(policyId);
        cycles[currentCycleId].units += units;
        holderPolicies[holder].push(policyId);

        emit PolicyPurchased(policyId, holder, units);
    }

    // TODO: need purchase 5 blocks before the end
    function claim(uint256 policyId) external nonReentrant {
        Policy storage policy = policies[policyId];
        require(msg.sender == policy.holder, "Caller is not the policy holder");
        require(!policy.isClaimed, "Policy already claimed");
        require(cycles[policy.cycleId].isClaimable, "Cycle is not claimable");
        // require(cycles[policy.cycleId].endBlock >= policy.startBlock + 5, "Invalid purchased policy");

        uint256 payout = policy.units * cycles[policy.cycleId].benefitPerUnit;
        policy.isClaimed = true;
        payable(policy.holder).transfer(payout);

        emit PolicyClaimed(policyId, payout);
    }

    function calculateBenefitPerUnit(uint256 cycleId, uint256 managementFee) private view returns (uint256) {
        uint256 cyclePremiumTotal = cycles[cycleId].premiumPerUnit * cycles[cycleId].units;
        uint256 claimableAmount = cyclePremiumTotal - managementFee + (totalInsurancePool * claimPoolRatio / 100);
        return claimableAmount / cycles[cycleId].units; // TODO safe math
    }

    function endCurrentCycle(uint256 _endBlock, bool isClaimable, bool _boost) public onlyRole(OPERATOR_ROLE) {
        require(cycles[currentCycleId].isActive, "No active cycle to end");
        // // Mainnet open below requirements
        // require(block.number >= _endBlock, "Endblock not pass");
        cycles[currentCycleId].endBlock = _endBlock;
        cycles[currentCycleId].isActive = false;
        cycles[currentCycleId].boost = _boost;

        uint256 cyclePremiumTotal = cycles[currentCycleId].units * cycles[currentCycleId].premiumPerUnit;
        uint256 managementFee = cyclePremiumTotal * manageRatio / 100;
        totalManagementFees += managementFee;

        if (!isClaimable){
            totalInsurancePool += (cyclePremiumTotal - managementFee);
        }

        if (isClaimable) {
            claimableCycleId.push(currentCycleId);
            cycles[currentCycleId].isClaimable = true;
            cycles[currentCycleId].benefitPerUnit = calculateBenefitPerUnit(currentCycleId, managementFee);
        }

        emit CycleEnded(currentCycleId, isClaimable);
    }

    // startblock >= endblock + 6
    function startNewCycle(uint256 _startBlock) public onlyRole(OPERATOR_ROLE) {
        require(!cycles[currentCycleId].isActive, "Current cycle still active");
        require(cycles[currentCycleId].endBlock <= (_startBlock - startBlockBuffer), "Startblock not correct");
        currentCycleId++;
        cycles[currentCycleId] = Cycle({
            id: currentCycleId,
            startBlock: _startBlock,
            endBlock: 0,
            coverBlock: coverBlock,
            premiumPerUnit: premiumPerUnit,
            benefitPerUnit: 0,
            policyIds: new uint256[](0),
            units: 0,
            isActive: true,
            isClaimable: false,
            boost: false
        });
        emit NewCycleStarted(currentCycleId);
    }

    function updateRatios(uint256 _manageRatio, uint256 _claimPoolRatio) external onlyRole(OPERATOR_ROLE) {
        manageRatio = _manageRatio;
        claimPoolRatio = _claimPoolRatio;
        emit RatiosUpdated(manageRatio, claimPoolRatio);
    }

    //300, 5000000000000000, 6
    function updateParameters(uint256 _coverBlock, uint256 _premiumPerUnit, uint256 _startBlockBuffer) external onlyRole(OPERATOR_ROLE) {
        coverBlock = _coverBlock;
        premiumPerUnit = _premiumPerUnit;
        startBlockBuffer = _startBlockBuffer;
        emit ParametersUpdated(coverBlock, premiumPerUnit, startBlockBuffer);
    }

    function fundInsurancePool() public payable onlyRole(ADMIN_ROLE) {
        totalInsurancePool += msg.value;
        emit InsurancePoolFunded(msg.value, msg.sender);
    }

    function withdrawManagementFees(uint256 amount) public onlyRole(ADMIN_ROLE) {
        require(amount <= totalManagementFees, "Amount exceeds available management fees");
        payable(msg.sender).transfer(amount);
        totalManagementFees -= amount;
    }

    function transferInsurancePool(uint256 amount, address to) public onlyRole(ADMIN_ROLE) {
        require(amount <= totalInsurancePool, "Amount exceeds insurance pool");
        payable(to).transfer(amount);
        totalInsurancePool -= amount;
    }

    function withdrawContractBalance(uint256 amount) public onlyRole(ADMIN_ROLE) {
        require(amount <= address(this).balance, "Insufficient funds");
        payable(msg.sender).transfer(amount);
    }

    function addOperator(address operator) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(OPERATOR_ROLE, operator);
    }

    function removeOperator(address operator) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(OPERATOR_ROLE, operator);
    }

    function addAdmin(address admin) public onlyRole(DEFAULT_ADMIN_ROLE) {
        grantRole(ADMIN_ROLE, admin);
    }

    function removeAdmin(address admin) public onlyRole(DEFAULT_ADMIN_ROLE) {
        revokeRole(ADMIN_ROLE, admin);
    }


}


// require 区块高度的比较
// 外部区块和合约区块的比较
// 每一轮结束前5个区块的policy有效