import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy | OrbitYield",
  description: "Privacy policy for OrbitYield's cross-chain yield aggregator platform.",
}

export default function PrivacyPolicy() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Privacy Policy</h1>
        <p className="mt-6 text-xl leading-8">
          At OrbitYield, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect
          your personal information.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Information We Collect</h2>
          <p className="mt-6">
            We collect information that you provide directly to us, such as when you create an account, subscribe to our
            newsletter, or contact us for support. This may include:
          </p>
          <ul className="mt-4 list-disc pl-8">
            <li>Email address</li>
            <li>Wallet addresses</li>
            <li>Transaction data</li>
            <li>Usage information and preferences</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">How We Use Your Information</h2>
          <p className="mt-6">We use the information we collect to:</p>
          <ul className="mt-4 list-disc pl-8">
            <li>Provide, maintain, and improve our services</li>
            <li>Process transactions and send related information</li>
            <li>Send technical notices, updates, security alerts, and support messages</li>
            <li>Respond to your comments, questions, and requests</li>
            <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Data Security</h2>
          <p className="mt-6">
            We implement appropriate security measures to protect your personal information against unauthorized access,
            alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic
            storage is 100% secure, and we cannot guarantee absolute security.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Data Retention</h2>
          <p className="mt-6">
            We retain your personal information for as long as necessary to fulfill the purposes outlined in this
            Privacy Policy, unless a longer retention period is required or permitted by law.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Your Rights</h2>
          <p className="mt-6">
            Depending on your location, you may have certain rights regarding your personal information, such as the
            right to access, correct, delete, or restrict processing of your data.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Changes to This Policy</h2>
          <p className="mt-6">
            We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
            Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">
            If you have any questions about this Privacy Policy, please contact us at privacy@orbityield.cc.
          </p>
          <p className="mt-6">Last Updated: March 20, 2025</p>
        </div>
      </div>
    </div>
  )
}

