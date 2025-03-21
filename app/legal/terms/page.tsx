import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms & Conditions | OrbitYield",
  description: "Terms and conditions for OrbitYield's cross-chain yield aggregator platform.",
}

export default function TermsAndConditions() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Terms & Conditions</h1>
        <p className="mt-6 text-xl leading-8">
          These Terms & Conditions govern your use of the OrbitYield platform and services.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Acceptance of Terms</h2>
          <p className="mt-6">
            By accessing or using OrbitYield, you agree to be bound by these Terms & Conditions. If you do not agree to
            all the terms and conditions, you may not access or use our services.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Eligibility</h2>
          <p className="mt-6">
            You must be at least 18 years old to use OrbitYield. By using our services, you represent and warrant that
            you meet all eligibility requirements.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Service Description</h2>
          <p className="mt-6">
            OrbitYield is a decentralized finance platform that provides automated yield optimization services across
            multiple blockchains. Our platform allows users to deposit cryptocurrency assets and earn yield through
            various DeFi protocols.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">User Accounts</h2>
          <p className="mt-6">
            To use certain features of our services, you may need to connect your cryptocurrency wallet. You are
            responsible for maintaining the security of your wallet and all activities that occur through your account.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Risks</h2>
          <p className="mt-6">Using OrbitYield involves significant risks, including but not limited to:</p>
          <ul className="mt-4 list-disc pl-8">
            <li>Cryptocurrency price volatility</li>
            <li>Smart contract vulnerabilities</li>
            <li>Regulatory uncertainty</li>
            <li>Protocol risks</li>
            <li>Impermanent loss</li>
          </ul>
          <p className="mt-6">You acknowledge and accept these risks when using our services.</p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Limitation of Liability</h2>
          <p className="mt-6">
            To the maximum extent permitted by law, OrbitYield and its affiliates shall not be liable for any indirect,
            incidental, special, consequential, or punitive damages, including loss of profits, data, or goodwill,
            arising from or in connection with your use of our services.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Modifications</h2>
          <p className="mt-6">
            We reserve the right to modify these Terms & Conditions at any time. We will notify users of any material
            changes by posting the new Terms & Conditions on our website and updating the "Last Updated" date.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Governing Law</h2>
          <p className="mt-6">
            These Terms & Conditions shall be governed by and construed in accordance with the laws of [Jurisdiction],
            without regard to its conflict of law principles.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">
            If you have any questions about these Terms & Conditions, please contact us at legal@orbityield.cc.
          </p>
          <p className="mt-6">Last Updated: March 20, 2025</p>
        </div>
      </div>
    </div>
  )
}

