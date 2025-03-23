import { ApiPromise, WsProvider } from '@polkadot/api';
import { Keyring } from '@polkadot/keyring';
import { InjectedAccountWithMeta } from '@polkadot/extension-inject/types';
import { stringToHex } from '@polkadot/util';

// We'll dynamically import these client-side only modules
// They can't be imported at the top level in a Next.js app with SSR
type Web3AccountsType = () => Promise<InjectedAccountWithMeta[]>;
type Web3EnableType = (appName: string) => Promise<any[]>;

let web3Accounts: Web3AccountsType | null = null;
let web3Enable: Web3EnableType | null = null;

// Initialize client-side modules
async function initClientModules() {
  if (typeof window !== 'undefined' && (!web3Accounts || !web3Enable)) {
    try {
      const extensionDapp = await import('@polkadot/extension-dapp');
      web3Accounts = extensionDapp.web3Accounts;
      web3Enable = extensionDapp.web3Enable;
      return true;
    } catch (error) {
      console.error('Failed to import @polkadot/extension-dapp:', error);
      return false;
    }
  }
  return !!web3Accounts && !!web3Enable;
}

// Singleton instance of the API
let api: ApiPromise | null = null;

/**
 * Initialize the Polkadot API connection
 * @param wsEndpoint The WebSocket endpoint to connect to
 * @returns The API instance
 */
export async function initPolkadotApi(wsEndpoint?: string): Promise<ApiPromise> {
  if (api) return api;

  // Use the provided endpoint or default to the environment variable
  const endpoint = wsEndpoint || process.env.NEXT_PUBLIC_POLKADOT_RPC_URL || 'wss://westend-rpc.polkadot.io';
  
  const provider = new WsProvider(endpoint);
  api = await ApiPromise.create({ provider });
  
  return api;
}

/**
 * Get the current Polkadot API instance or initialize it
 * @returns The API instance
 */
export async function getPolkadotApi(): Promise<ApiPromise> {
  if (!api) {
    return initPolkadotApi();
  }
  return api;
}

/**
 * Close the Polkadot API connection
 */
export async function disconnectPolkadotApi(): Promise<void> {
  if (api) {
    await api.disconnect();
    api = null;
  }
}

/**
 * Connect to the Polkadot extension and retrieve accounts
 * @param appName The name of your application
 * @returns Array of injected accounts
 */
export async function connectPolkadotExtension(appName: string = 'OrbitYield'): Promise<InjectedAccountWithMeta[]> {
  if (!(await initClientModules())) {
    throw new Error('Failed to initialize client-side modules');
  }
  try {
    const extensions = await web3Enable!(appName);
    
    if (extensions.length === 0) {
      throw new Error('No extension installed, or the user did not accept the authorization');
    }
    
    // This call retrieves the accounts
    const allAccounts = await web3Accounts!();
    
    return allAccounts;
  } catch (error) {
    console.error('Error connecting to Polkadot extension:', error);
    throw error;
  }
}

/**
 * Sign a message using the Polkadot extension
 * @param message The message to sign
 * @param address The address to sign with
 * @returns The signature
 */
export async function signWithPolkadotExtension(message: string, address: string): Promise<string> {
  if (!(await initClientModules())) {
    throw new Error('Failed to initialize client-side modules');
  }
  try {
    const extensions = await web3Enable!('OrbitYield');
    
    if (extensions.length === 0) {
      throw new Error('No extension installed, or the user did not accept the authorization');
    }
    
    const accounts = await web3Accounts!();
    const account = accounts.find(a => a.address === address);
    
    if (!account) {
      throw new Error('Account not found in the extension');
    }
    
    const signRaw = extensions[0]?.signer?.signRaw;
    
    if (!signRaw) {
      throw new Error('The extension does not support raw signature');
    }
    
    const { signature } = await signRaw({
      address,
      data: stringToHex(message),
      type: 'bytes'
    });
    
    return signature;
  } catch (error) {
    console.error('Error signing with Polkadot extension:', error);
    throw error;
  }
}

/**
 * Create a keyring for offline signing
 * @param type The keyring type (default: 'sr25519')
 * @returns A new keyring instance
 */
export function createKeyring(type: 'ed25519' | 'sr25519' | 'ecdsa' = 'sr25519'): Keyring {
  return new Keyring({ type });
}

/**
 * Get the chain information from the connected API
 * @returns Object with chain information
 */
export async function getChainInfo() {
  const api = await getPolkadotApi();
  
  const [chain, nodeName, nodeVersion, properties] = await Promise.all([
    api.rpc.system.chain(),
    api.rpc.system.name(),
    api.rpc.system.version(),
    api.rpc.system.properties(),
  ]);
  
  const tokenDecimals = properties.tokenDecimals.unwrapOr([10])[0];
  const decimals = typeof tokenDecimals === 'object' && 'toNumber' in tokenDecimals ? 
    tokenDecimals.toNumber() : 
    Number(tokenDecimals);
  
  return {
    chain: chain.toString(),
    nodeName: nodeName.toString(),
    nodeVersion: nodeVersion.toString(),
    tokenSymbol: properties.tokenSymbol.unwrapOr(['DOT'])[0].toString(),
    tokenDecimals: decimals,
  };
}

/**
 * Get the balance of an account
 * @param address The account address
 * @returns The account balance information
 */
export async function getAccountBalance(address: string) {
  const api = await getPolkadotApi();
  
  const accountInfo = await api.query.system.account(address);
  const balance = accountInfo && typeof accountInfo === 'object' && 'data' in accountInfo ? 
    accountInfo.data : 
    accountInfo;
  
  // Handle both object with data property and direct balance access
  if (!balance || typeof balance !== 'object') {
    throw new Error('Invalid account balance data');
  }
  
  // Need to use type assertion to handle the balance properties
  interface BalanceData {
    free: any;
    reserved: any;
    miscFrozen?: any;
    feeFrozen?: any;
  }
  
  const balanceObj = balance as BalanceData;
  
  // Helper function to safely convert to BigInt
  const toBigIntSafe = (value: any): bigint => {
    if (!value) return BigInt(0);
    if (typeof value === 'bigint') return value;
    if (typeof value === 'object' && typeof value.toBigInt === 'function') return value.toBigInt();
    return BigInt(value.toString());
  };
  
  return {
    free: toBigIntSafe(balanceObj.free),
    reserved: toBigIntSafe(balanceObj.reserved),
    miscFrozen: toBigIntSafe(balanceObj.miscFrozen),
    feeFrozen: toBigIntSafe(balanceObj.feeFrozen),
  };
}
