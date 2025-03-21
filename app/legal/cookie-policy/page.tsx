import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Cookie Policy | OrbitYield",
  description: "Cookie policy for OrbitYield's cross-chain yield aggregator platform.",
}

export default function CookiePolicy() {
  return (
    <div className="bg-white px-6 py-32 lg:px-8">
      <div className="mx-auto max-w-3xl text-base leading-7 text-gray-700">
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Cookie Policy</h1>
        <p className="mt-6 text-xl leading-8">
          This Cookie Policy explains how OrbitYield uses cookies and similar technologies to recognize you when you
          visit our website.
        </p>
        <div className="mt-10 max-w-2xl">
          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">What are cookies?</h2>
          <p className="mt-6">
            Cookies are small data files that are placed on your computer or mobile device when you visit a website.
            Cookies are widely used by website owners to make their websites work, or to work more efficiently, as well
            as to provide reporting information.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">How we use cookies</h2>
          <p className="mt-6">We use cookies for the following purposes:</p>
          <ul className="mt-4 list-disc pl-8">
            <li>Essential cookies: These cookies are necessary for the website to function properly.</li>
            <li>
              Functionality cookies: These cookies allow us to remember choices you make and provide enhanced features.
            </li>
            <li>Analytics cookies: These cookies help us understand how visitors interact with our website.</li>
            <li>
              Marketing cookies: These cookies are used to track visitors across websites to display relevant
              advertisements.
            </li>
          </ul>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Types of cookies we use</h2>
          <p className="mt-6">
            Session Cookies: These cookies are temporary and are erased when you close your browser.
          </p>
          <p className="mt-6">
            Persistent Cookies: These cookies remain on your device for a defined period or until you delete them.
          </p>
          <p className="mt-6">First-Party Cookies: These cookies are set by our website.</p>
          <p className="mt-6">
            Third-Party Cookies: These cookies are set by third parties, such as analytics providers.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">How to manage cookies</h2>
          <p className="mt-6">
            Most web browsers allow you to control cookies through their settings. You can usually find these settings
            in the "Options" or "Preferences" menu of your browser. You can also use the "Help" feature in your browser
            for more information.
          </p>
          <p className="mt-6">
            Please note that if you choose to reject cookies, you may not be able to use all the features of our
            website.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Changes to this Cookie Policy</h2>
          <p className="mt-6">
            We may update this Cookie Policy from time to time. We will notify you of any changes by posting the new
            Cookie Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="mt-16 text-2xl font-bold tracking-tight text-gray-900">Contact Us</h2>
          <p className="mt-6">
            If you have any questions about our Cookie Policy, please contact us at privacy@orbityield.cc.
          </p>
          <p className="mt-6">Last Updated: March 20, 2025</p>
        </div>
      </div>
    </div>
  )
}

