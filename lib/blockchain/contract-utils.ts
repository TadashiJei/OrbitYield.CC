import { ethers } from 'ethers';

// Cache for contract instances
const contractCache: Record<string, ethers.Contract> = {};

/**
 * Initialize an Ethereum provider for interacting with PolkaVM
 * @param rpcUrl The RPC URL for the PolkaVM node (default: from environment)
 * @returns An Ethereum provider instance
 */
export function getProvider(rpcUrl?: string): ethers.providers.JsonRpcProvider {
  // Use the provided URL or default to the environment variable
  const url = rpcUrl || process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || 'https://westend-rpc.polkadot.io';
  
  return new ethers.providers.JsonRpcProvider(url);
}

/**
 * Initialize a signer for a specific account
 * @param privateKey The private key for the account
 * @param provider An optional provider instance
 * @returns A wallet signer
 */
export function getSigner(privateKey: string, provider?: ethers.providers.JsonRpcProvider): ethers.Wallet {
  const resolvedProvider = provider || getProvider();
  return new ethers.Wallet(privateKey, resolvedProvider);
}

/**
 * Get a browser provider for MetaMask integration
 * @returns A browser provider if available
 */
export function getBrowserProvider(): ethers.providers.Web3Provider | null {
  if (typeof window !== 'undefined' && window.ethereum) {
    return new ethers.providers.Web3Provider(window.ethereum);
  }
  return null;
}

/**
 * Get a contract instance
 * @param address The contract address
 * @param abi The contract ABI
 * @param signerOrProvider A signer or provider
 * @returns A contract instance
 */
export function getContract(
  address: string,
  abi: ethers.ContractInterface,
  signerOrProvider: ethers.Signer | ethers.providers.Provider
): ethers.Contract {
  const cacheKey = `${address}-${ethers.Signer.isSigner(signerOrProvider) ? 'signer' : 'provider'}`;
  
  if (contractCache[cacheKey]) {
    return contractCache[cacheKey];
  }
  
  const contract = new ethers.Contract(address, abi, signerOrProvider);
  contractCache[cacheKey] = contract;
  
  return contract;
}

/**
 * Deploy a new contract
 * @param abi The contract ABI
 * @param bytecode The contract bytecode
 * @param signer The signer to deploy with
 * @param constructorArgs The constructor arguments
 * @returns The deployed contract
 */
export async function deployContract(
  abi: ethers.ContractInterface,
  bytecode: string,
  signer: ethers.Wallet,
  constructorArgs: any[] = []
): Promise<ethers.Contract> {
  const factory = new ethers.ContractFactory(abi, bytecode, signer);
  const contract = await factory.deploy(...constructorArgs);
  
  // Wait for the contract to be deployed
  await contract.deployed();
  
  return contract;
}

/**
 * Get the transaction receipt and wait for confirmation
 * @param provider The provider to use
 * @param txHash The transaction hash
 * @param confirmations The number of confirmations to wait for
 * @returns The transaction receipt
 */
export async function waitForTransaction(
  provider: ethers.providers.Provider,
  txHash: string,
  confirmations: number = 1
): Promise<ethers.TransactionReceipt> {
  const receipt = await provider.getTransactionReceipt(txHash);
  if (!receipt) {
    throw new Error(`Transaction ${txHash} was not found`);
  }
  if (confirmations > 0) {
    await provider.waitForTransaction(txHash, confirmations);
  }
  return receipt;
}

/**
 * Estimate gas for a contract call
 * @param contract The contract instance
 * @param method The method name
 * @param args Additional arguments for the method
 * @returns The estimated gas
 */
export async function estimateGasForContractCall(
  contract: ethers.Contract,
  method: string,
  args: any[]
): Promise<ethers.BigNumber> {
  try {
    // In Ethers v5, we can call estimateGas as a method on the contract
    return await contract.estimateGas[method](...args);
  } catch (error) {
    console.error(`Error estimating gas for ${method}:`, error);
    throw error;
  }
}

/**
 * Format a numeric amount with the given decimals
 * @param amount The amount to format
 * @param decimals The number of decimals
 * @returns The formatted amount
 */
export function formatAmount(amount: ethers.BigNumber | string | number, decimals: number): string {
  return ethers.utils.formatUnits(amount, decimals);
}

/**
 * Parse a decimal amount to its native representation
 * @param amount The amount to parse
 * @param decimals The number of decimals
 * @returns The parsed amount
 */
export function parseAmount(amount: string, decimals: number): ethers.BigNumber {
  return ethers.utils.parseUnits(amount, decimals);
}
