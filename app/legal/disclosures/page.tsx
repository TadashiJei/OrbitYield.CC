import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Legal Disclosures | OrbitYield",
  description: "Legal disclosures and information about OrbitYield's cross-chain yield aggregator platform.",
}

export default function LegalDisclosures() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Legal Disclosures</h1>
        <p className="mt-6 text-xl leading-8">
          This page contains important legal information about OrbitYield, its services, and your rights and
          obligations.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Company Information</h2>
          <p className="mt-6">
            OrbitYield is operated by OrbitYield Labs Ltd., a company registered in [Jurisdiction] with company number
            [Company Number].
          </p>
          <p className="mt-6">
            Registered Address: [Address]
            <br />
            Email: legal@orbityield.cc
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Regulatory Status</h2>
          <p className="mt-6">
            OrbitYield is a decentralized finance platform that provides automated yield optimization services.
            OrbitYield is not a bank, securities firm, or financial institution and does not provide investment advice,
            financial advice, or any other financial services regulated by financial authorities.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Risk Disclosure</h2>
          <p className="mt-6">
            Cryptocurrency and DeFi investments involve significant risk, including the potential loss of principal.
            Past performance is not indicative of future results. Users should carefully consider their financial
            situation and risk tolerance before using OrbitYield's services.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Disclaimers</h2>
          <p className="mt-6">
            OrbitYield's services are provided "as is" and "as available" without warranty of any kind. OrbitYield does
            not guarantee the accuracy, completeness, or timeliness of information available on the platform.
          </p>
          <p className="mt-6">
            OrbitYield is not responsible for any losses, damages, or other liabilities that may arise from the use of
            our services or reliance on information provided through our platform.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Information</h2>
          <p className="mt-6">For legal inquiries, please contact: legal@orbityield.cc</p>
        </div>
      </div>
    </div>
  )
}

