# Local Development Setup Guide

This guide will help you set up the OrbitYield development environment on your local machine.

## Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js**: v18.x or later
- **npm**: v9.x or later
- **Git**: For version control
- **MetaMask**: Browser extension for wallet interactions
- **Hardhat**: For smart contract development and testing

## Installing Dependencies

### 1. Clone the Repository

```bash
git clone https://github.com/TadashiJei/OrbitYield.CC.git
cd OrbitYield.CC
```

### 2. Install Node.js Dependencies

```bash
npm install
```

If you encounter dependency conflicts, you may need to use:

```bash
npm install --legacy-peer-deps
```

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following content:

```
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Blockchain
NEXT_PUBLIC_ETHEREUM_NETWORK=sepolia
NEXT_PUBLIC_INFURA_ID=your_infura_id_here
NEXT_PUBLIC_ALCHEMY_ID=your_alchemy_id_here

# Database
MONGODB_URI=your_mongodb_connection_string

# Contract Addresses (Development)
NEXT_PUBLIC_YIELD_AGGREGATOR_ADDRESS=0x...
NEXT_PUBLIC_STRATEGY_FACTORY_ADDRESS=0x...
```

## Running the Development Server

### 1. Start the Next.js Application

```bash
npm run dev
```

This will start the development server on [http://localhost:3000](http://localhost:3000).

### 2. Start a Local Blockchain (Optional)

If you want to test with local contracts:

```bash
cd contract-testing
npx hardhat node
```

In a separate terminal, deploy the contracts to the local blockchain:

```bash
cd contract-testing
npx hardhat run scripts/deploy.js --network localhost
```

## Smart Contract Development

### Compiling Contracts

```bash
cd contract-testing
npx hardhat compile
```

### Running Contract Tests

```bash
cd contract-testing
npx hardhat test
```

For test coverage:

```bash
cd contract-testing
npx hardhat coverage
```

## Frontend Development

### Running Frontend Tests

```bash
npm test
```

### Building for Production

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Troubleshooting

### Common Issues

1. **Dependency Conflicts**: If you encounter dependency conflicts, try using `npm install --legacy-peer-deps`.

2. **MetaMask Connection Issues**: Make sure your MetaMask is connected to the correct network (Localhost:8545 for local development).

3. **Contract Size Errors**: If you encounter contract size limit errors, refer to our [Optimization Strategy](../OPTIMIZATION_STRATEGY.md).

4. **CORS Issues**: If you encounter CORS errors with Chrome extensions, ensure the Next.js configuration is updated with the appropriate headers.

## VSCode Extensions

For an optimal development experience, we recommend installing these VSCode extensions:

- Solidity by Juan Blanco
- Tailwind CSS IntelliSense
- ESLint
- Prettier

## Next Steps

After setting up your local environment:

1. Read through the [Contract Interactions](../CONTRACT_INTERACTIONS.md) documentation
2. Explore the [Emergency Features](../EMERGENCY_FEATURES.md)
3. Review the [Frontend Development](./FRONTEND.md) guide

## Getting Help

If you encounter any issues not covered in this guide, please:

1. Check existing [GitHub Issues](https://github.com/TadashiJei/OrbitYield.CC/issues)
2. Join our [Discord](https://discord.gg/orbityield) for developer support
3. Post on our [Forum](https://forum.orbityield.cc) for detailed discussions
