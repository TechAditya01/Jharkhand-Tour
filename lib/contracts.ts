import { ethers } from "ethers";

// Contract deployment utilities
export interface ContractDeployment {
  address: string;
  abi: any[];
  bytecode?: string;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  blockExplorer: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}

// Network configurations
export const NETWORKS: Record<string, NetworkConfig> = {
  ethereum: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 }
  },
  polygon: {
    chainId: 137,
    name: "Polygon Mainnet",
    rpcUrl: "https://polygon-rpc.com",
    blockExplorer: "https://polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 }
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 }
  },
  mumbai: {
    chainId: 80001,
    name: "Mumbai Testnet",
    rpcUrl: "https://rpc-mumbai.maticvigil.com",
    blockExplorer: "https://mumbai.polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 }
  }
};

// Contract addresses by network
export const CONTRACT_ADDRESSES: Record<string, Record<string, string>> = {
  sepolia: {
    marketplace: "0x0000000000000000000000000000000000000000", // Update after deployment
    tourismNFT: "0x0000000000000000000000000000000000000000",
    tourismStaking: "0x0000000000000000000000000000000000000000"
  },
  mumbai: {
    marketplace: "0x0000000000000000000000000000000000000000",
    tourismNFT: "0x0000000000000000000000000000000000000000",
    tourismStaking: "0x0000000000000000000000000000000000000000"
  }
};

// Get contract address for current network
export function getContractAddress(contractName: string, networkName?: string): string {
  const network = networkName || getCurrentNetwork();
  return CONTRACT_ADDRESSES[network]?.[contractName] || "0x0000000000000000000000000000000000000000";
}

// Get current network name
export function getCurrentNetwork(): string {
  if (typeof window !== 'undefined' && window.ethereum) {
    const chainId = window.ethereum.chainId;
    switch (chainId) {
      case '0x1': return 'ethereum';
      case '0x89': return 'polygon';
      case '0xaa36a7': return 'sepolia';
      case '0x13881': return 'mumbai';
      default: return 'sepolia'; // default to testnet
    }
  }
  return 'sepolia';
}

// Contract verification utilities
export async function verifyContract(
  contractAddress: string,
  contractName: string,
  constructorArgs: any[] = []
): Promise<boolean> {
  // This would integrate with block explorer APIs for contract verification
  // For now, return true as placeholder
  console.log(`Verifying contract ${contractName} at ${contractAddress}`);
  return true;
}

// Gas estimation utilities
export async function estimateDeploymentGas(
  bytecode: string,
  abi: any[],
  constructorArgs: any[] = []
): Promise<bigint> {
  if (!window.ethereum) throw new Error("MetaMask not available");

  const provider = new ethers.BrowserProvider(window.ethereum);
  const factory = new ethers.ContractFactory(abi, bytecode, provider);

  const deployTx = await factory.getDeployTransaction(...constructorArgs);
  const gasEstimate = await provider.estimateGas(deployTx);

  return gasEstimate;
}

// Contract interaction helpers
export function createContractInstance(
  address: string,
  abi: any[],
  signerOrProvider?: ethers.Signer | ethers.Provider
): ethers.Contract {
  if (signerOrProvider) {
    return new ethers.Contract(address, abi, signerOrProvider);
  }

  if (typeof window !== 'undefined' && window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    return new ethers.Contract(address, abi, provider);
  }

  throw new Error("No provider available");
}

// Multi-network deployment helper
export async function deployToMultipleNetworks(
  contractName: string,
  bytecode: string,
  abi: any[],
  constructorArgs: any[] = [],
  networks: string[] = ['sepolia', 'mumbai']
): Promise<Record<string, string>> {
  const deployments: Record<string, string> = {};

  for (const network of networks) {
    try {
      console.log(`Deploying ${contractName} to ${network}...`);
      // This would require network switching and deployment logic
      // For now, return placeholder addresses
      deployments[network] = "0x0000000000000000000000000000000000000000";
    } catch (error) {
      console.error(`Failed to deploy to ${network}:`, error);
    }
  }

  return deployments;
}

// Event listening utilities
export function listenToContractEvents(
  contract: ethers.Contract,
  eventName: string,
  callback: (...args: any[]) => void
): () => void {
  const listener = (...args: any[]) => {
    const event = args[args.length - 1];
    callback(...args.slice(0, -1), event);
  };

  contract.on(eventName, listener);

  // Return cleanup function
  return () => {
    contract.off(eventName, listener);
  };
}

// Contract upgrade utilities (for upgradeable contracts)
export async function prepareUpgrade(
  proxyAddress: string,
  newImplementationAddress: string
): Promise<any> {
  // This would handle contract upgrades using proxy patterns
  console.log(`Preparing upgrade for proxy ${proxyAddress} to ${newImplementationAddress}`);
  return {};
}
