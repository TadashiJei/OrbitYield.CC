interface Window {
  ethereum?: {
    isMetaMask?: boolean;
    request: (request: { method: string; params?: any[] }) => Promise<any>;
    on: (event: string, callback: (...args: any[]) => void) => void;
    removeListener: (event: string, callback: (...args: any[]) => void) => void;
    selectedAddress: string | null;
  };
}

interface EthereumEvent {
  connect: { chainId: string };
  disconnect: Error;
  accountsChanged: string[];
  chainChanged: string;
  message: { type: string; data: unknown };
}

type EthereumEventKeys = keyof EthereumEvent;
type EthereumEventHandler<K extends EthereumEventKeys> = (event: EthereumEvent[K]) => void;
