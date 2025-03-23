import React from 'react';

export default function Changelog() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl">
      <h1 className="text-4xl font-bold mb-3">OrbitYield Changelog</h1>
      <p className="text-gray-600 mb-8">
        Track the development progress and updates to the OrbitYield platform.
      </p>

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Version 0.4.0 - March 23, 2025</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Added</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>
            Modular StrategyFactory architecture with specialized factories:
            <ul className="list-disc ml-6 mt-2">
              <li>MasterStrategyFactory for centralized coordination</li>
              <li>LendingStrategyFactory for lending strategies</li>
              <li>FarmingStrategyFactory for farming strategies</li>
              <li>LiquidityStrategyFactory for liquidity strategies</li>
            </ul>
          </li>
          <li>BaseStrategyFactory with common functionality across all factories</li>
          <li>StrategyFactoryLib for shared validation functions</li>
          <li>Comprehensive test suite for the optimized factory implementation</li>
          <li>Detailed documentation in OPTIMIZATION_STRATEGY.md</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Changed</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Optimized contract size through modular architecture</li>
          <li>Updated Hardhat compiler settings with lower "runs" value and Yul optimization</li>
          <li>Enhanced strategy deployment functions with additional parameters for better flexibility</li>
          <li>Updated tests to validate the optimized implementation</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Fixed</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Resolved contract size issues that prevented mainnet deployment</li>
          <li>Fixed docstring parsing errors in factory contracts</li>
        </ul>
      </div>

      <hr className="my-12 border-gray-200" />

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Version 0.3.0 - March 15, 2025</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Added</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Multi-signature wallet functionality for enhanced security governance</li>
          <li>
            Comprehensive emergency features, including:
            <ul className="list-disc ml-6 mt-2">
              <li>Contract pausing mechanism</li>
              <li>User emergency withdrawal function</li>
              <li>Admin emergency strategy withdrawal function</li>
            </ul>
          </li>
          <li>Strategy Factory contract for streamlined deployment of new strategies</li>
          <li>Complete emergency withdrawal documentation</li>
          <li>Tracking of all users who have made deposits</li>
          <li>Additional events for better transparency</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-2">Changed</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Enhanced authorization checks for admin operations</li>
          <li>Improved withdraw function to include `whenNotPaused` modifier</li>
          <li>Updated deployment script to support multi-signature wallet setup</li>
        </ul>
      </div>

      <hr className="my-12 border-gray-200" />

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Version 0.2.0 - March 10, 2025</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Added</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Support for multiple yield strategies</li>
          <li>Asset-to-strategy mapping functionality</li>
          <li>APY calculation and comparison features</li>
          <li>Platform fee collection mechanism</li>
          <li>Integration with major DeFi protocols</li>
        </ul>
      </div>

      <hr className="my-12 border-gray-200" />

      <div className="mt-12">
        <h2 className="text-3xl font-bold mb-4">Version 0.1.0 - March 1, 2025</h2>
        
        <h3 className="text-xl font-semibold mt-6 mb-2">Added</h3>
        <ul className="list-disc ml-6 space-y-2">
          <li>Initial application scaffold</li>
          <li>Basic YieldAggregator contract</li>
          <li>Simple deposit and withdrawal functionality</li>
          <li>User interface foundation</li>
          <li>Core smart contract architecture</li>
        </ul>
      </div>
    </div>
  );
}
