import { ethers } from "ethers";

// Contract ABIs (will be generated after deployment)
const MARKETPLACE_ABI = [
  "function createListing(uint256 price, string memory itemId, string memory metadataURI) external returns (uint256)",
  "function purchaseItem(uint256 listingId) external payable",
  "function getListing(uint256 listingId) external view returns (address seller, uint256 price, string memory itemId, string memory metadataURI, bool active)",
  "function getListings() external view returns (uint256[] memory)",
  "function escrowAmount(uint256 listingId, address buyer) external view returns (uint256)",
  "function releaseEscrow(uint256 listingId, address buyer) external",
  "function refundEscrow(uint256 listingId, address buyer) external"
];

const TOURISM_NFT_ABI = [
  "function mintNFT(address to, string memory tokenURI) external returns (uint256)",
  "function tokenURI(uint256 tokenId) external view returns (string memory)",
  "function ownerOf(uint256 tokenId) external view returns (address)",
  "function balanceOf(address owner) external view returns (uint256)",
  "function transferFrom(address from, address to, uint256 tokenId) external"
];

const STAKING_ABI = [
  "function stake(uint256 amount) external",
  "function unstake(uint256 amount) external",
  "function claimRewards() external",
  "function getStakedBalance(address user) external view returns (uint256)",
  "function getPendingRewards(address user) external view returns (uint256)"
];

// Contract addresses (update after deployment)
const CONTRACT_ADDRESSES = {
  marketplace: "0x0000000000000000000000000000000000000000", // Replace with deployed address
  tourismNFT: "0x0000000000000000000000000000000000000000", // Replace with deployed address
  staking: "0x0000000000000000000000000000000000000000"    // Replace with deployed address
};

let provider: ethers.BrowserProvider | null = null;
let signer: ethers.JsonRpcSigner | null = null;
let marketplaceContract: ethers.Contract | null = null;
let nftContract: ethers.Contract | null = null;
let stakingContract: ethers.Contract | null = null;

export async function connectWallet() {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }
  provider = new ethers.BrowserProvider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  signer = await provider.getSigner();

  // Initialize contracts
  initializeContracts();

  return signer;
}

function initializeContracts() {
  if (!provider || !signer) return;

  marketplaceContract = new ethers.Contract(CONTRACT_ADDRESSES.marketplace, MARKETPLACE_ABI, signer);
  nftContract = new ethers.Contract(CONTRACT_ADDRESSES.tourismNFT, TOURISM_NFT_ABI, signer);
  stakingContract = new ethers.Contract(CONTRACT_ADDRESSES.staking, STAKING_ABI, signer);
}

export function getSigner() {
  if (!signer) {
    throw new Error("Wallet not connected");
  }
  return signer;
}

export async function getWalletAddress(): Promise<string> {
  const signer = getSigner();
  return await signer.getAddress();
}

export async function getBalance(): Promise<string> {
  const signer = getSigner();
  const address = await signer.getAddress();
  const balance = await provider!.getBalance(address);
  return ethers.formatEther(balance);
}

export async function estimateGas(tx: any): Promise<bigint> {
  if (!provider) throw new Error("Provider not initialized");
  return await provider.estimateGas(tx);
}

export async function sendTransaction(to: string, valueInEther: string) {
  const signer = getSigner();
  const tx: ethers.TransactionRequest = {
    to,
    value: ethers.parseEther(valueInEther),
  };

  // Estimate gas
  const gasEstimate = await estimateGas(tx);
  tx.gasLimit = gasEstimate;

  const transactionResponse = await signer.sendTransaction(tx);
  await transactionResponse.wait();
  return transactionResponse;
}

// Marketplace Functions
export async function createMarketplaceListing(price: string, itemId: string, metadataURI: string) {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  const priceInWei = ethers.parseEther(price);
  const tx = await marketplaceContract.createListing(priceInWei, itemId, metadataURI);
  await tx.wait();
  return tx;
}

export async function purchaseItem(listingId: number, price: string) {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  const priceInWei = ethers.parseEther(price);
  const tx = await marketplaceContract.purchaseItem(listingId, { value: priceInWei });
  await tx.wait();
  return tx;
}

export async function getMarketplaceListing(listingId: number) {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  return await marketplaceContract.getListing(listingId);
}

export async function getAllListings() {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  return await marketplaceContract.getListings();
}

// NFT Functions
export async function mintTourismNFT(to: string, tokenURI: string) {
  if (!nftContract) throw new Error("NFT contract not initialized");

  const tx = await nftContract.mintNFT(to, tokenURI);
  await tx.wait();
  return tx;
}

export async function getNFTMetadata(tokenId: number) {
  if (!nftContract) throw new Error("NFT contract not initialized");

  return await nftContract.tokenURI(tokenId);
}

export async function transferNFT(from: string, to: string, tokenId: number) {
  if (!nftContract) throw new Error("NFT contract not initialized");

  const tx = await nftContract.transferFrom(from, to, tokenId);
  await tx.wait();
  return tx;
}

export async function getNFTOwner(tokenId: number) {
  if (!nftContract) throw new Error("NFT contract not initialized");

  return await nftContract.ownerOf(tokenId);
}

export async function getNFTBalance(address: string) {
  if (!nftContract) throw new Error("NFT contract not initialized");

  return await nftContract.balanceOf(address);
}

// Staking Functions
export async function stakeTokens(amount: string) {
  if (!stakingContract) throw new Error("Staking contract not initialized");

  const amountInWei = ethers.parseEther(amount);
  const tx = await stakingContract.stake(amountInWei);
  await tx.wait();
  return tx;
}

export async function unstakeTokens(amount: string) {
  if (!stakingContract) throw new Error("Staking contract not initialized");

  const amountInWei = ethers.parseEther(amount);
  const tx = await stakingContract.unstake(amountInWei);
  await tx.wait();
  return tx;
}

export async function claimStakingRewards() {
  if (!stakingContract) throw new Error("Staking contract not initialized");

  const tx = await stakingContract.claimRewards();
  await tx.wait();
  return tx;
}

export async function getStakedBalance(address: string) {
  if (!stakingContract) throw new Error("Staking contract not initialized");

  return await stakingContract.getStakedBalance(address);
}

export async function getPendingRewards(address: string) {
  if (!stakingContract) throw new Error("Staking contract not initialized");

  return await stakingContract.getPendingRewards(address);
}

// Escrow Functions
export async function releaseEscrow(listingId: number, buyer: string) {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  const tx = await marketplaceContract.releaseEscrow(listingId, buyer);
  await tx.wait();
  return tx;
}

export async function refundEscrow(listingId: number, buyer: string) {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  const tx = await marketplaceContract.refundEscrow(listingId, buyer);
  await tx.wait();
  return tx;
}

export async function getEscrowAmount(listingId: number, buyer: string) {
  if (!marketplaceContract) throw new Error("Marketplace contract not initialized");

  return await marketplaceContract.escrowAmount(listingId, buyer);
}

// Network switching
export async function switchToPolygon() {
  if (!window.ethereum) throw new Error("MetaMask not available");

  try {
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x89' }], // Polygon mainnet
    });
  } catch (error: any) {
    if (error.code === 4902) {
      // Chain not added, add it
      await window.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [{
          chainId: '0x89',
          chainName: 'Polygon Mainnet',
          nativeCurrency: { name: 'MATIC', symbol: 'MATIC', decimals: 18 },
          rpcUrls: ['https://polygon-rpc.com/'],
          blockExplorerUrls: ['https://polygonscan.com/']
        }]
      });
    } else {
      throw error;
    }
  }
}

export async function switchToEthereum() {
  if (!window.ethereum) throw new Error("MetaMask not available");

  await window.ethereum.request({
    method: 'wallet_switchEthereumChain',
    params: [{ chainId: '0x1' }], // Ethereum mainnet
  });
}
