// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TourismStaking is ReentrancyGuard, Ownable {
    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
        uint256 lastRewardClaim;
    }

    IERC20 public stakingToken;
    uint256 public rewardRate = 10; // 10% APY (simplified)
    uint256 public constant SECONDS_PER_YEAR = 365 * 24 * 60 * 60;

    mapping(address => StakeInfo) public stakes;
    mapping(address => uint256) public pendingRewards;

    event Staked(address indexed user, uint256 amount);
    event Unstaked(address indexed user, uint256 amount);
    event RewardsClaimed(address indexed user, uint256 amount);

    constructor(address _stakingToken) {
        stakingToken = IERC20(_stakingToken);
    }

    function stake(uint256 _amount) external nonReentrant {
        require(_amount > 0, "Amount must be greater than 0");
        require(stakingToken.transferFrom(msg.sender, address(this), _amount), "Transfer failed");

        StakeInfo storage userStake = stakes[msg.sender];

        // Claim any pending rewards before restaking
        if (userStake.amount > 0) {
            _claimRewards(msg.sender);
        }

        userStake.amount += _amount;
        userStake.timestamp = block.timestamp;
        userStake.lastRewardClaim = block.timestamp;

        emit Staked(msg.sender, _amount);
    }

    function unstake(uint256 _amount) external nonReentrant {
        StakeInfo storage userStake = stakes[msg.sender];
        require(userStake.amount >= _amount, "Insufficient staked amount");

        // Claim rewards before unstaking
        _claimRewards(msg.sender);

        userStake.amount -= _amount;
        require(stakingToken.transfer(msg.sender, _amount), "Transfer failed");

        emit Unstaked(msg.sender, _amount);
    }

    function claimRewards() external nonReentrant {
        _claimRewards(msg.sender);
    }

    function _claimRewards(address _user) internal {
        uint256 rewards = calculatePendingRewards(_user);
        if (rewards > 0) {
            require(stakingToken.transfer(_user, rewards), "Reward transfer failed");
            stakes[_user].lastRewardClaim = block.timestamp;
            pendingRewards[_user] = 0;

            emit RewardsClaimed(_user, rewards);
        }
    }

    function calculatePendingRewards(address _user) public view returns (uint256) {
        StakeInfo memory userStake = stakes[_user];
        if (userStake.amount == 0) return 0;

        uint256 timeElapsed = block.timestamp - userStake.lastRewardClaim;
        uint256 rewards = (userStake.amount * rewardRate * timeElapsed) / (SECONDS_PER_YEAR * 100);

        return rewards + pendingRewards[_user];
    }

    function getStakedBalance(address _user) external view returns (uint256) {
        return stakes[_user].amount;
    }

    function getPendingRewards(address _user) external view returns (uint256) {
        return calculatePendingRewards(_user);
    }

    function setRewardRate(uint256 _rate) external onlyOwner {
        rewardRate = _rate;
    }

    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        uint256 balance = stakingToken.balanceOf(address(this));
        require(stakingToken.transfer(owner(), balance), "Emergency withdraw failed");
    }
}
