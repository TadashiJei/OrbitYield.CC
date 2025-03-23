import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "API Overview | OrbitYield Documentation",
  description: "Overview of OrbitYield's REST API for integrating with the platform and accessing yield optimization features programmatically.",
};

export default function ApiOverviewPage() {
  return (
    <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
      <div className="mb-16">
        <Link href="/docs" className="text-blue-600 hover:text-blue-800 flex items-center mb-8">
          <span className="mr-2">←</span> Back to Documentation
        </Link>
        <h1 className="text-4xl font-bold mb-6">
          <span className="gradient-text">OrbitYield</span> API Overview
        </h1>
        <p className="text-xl text-gray-600">
          OrbitYield provides a comprehensive REST API that allows developers to integrate with our
          platform and access yield optimization features programmatically.
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Introduction</h2>
          <p className="text-lg mb-6">
            The OrbitYield API enables developers to build applications that interact with our yield
            optimization platform. Whether you're building a portfolio tracker, a DeFi dashboard, or
            integrating yield opportunities into your own application, our API provides the tools you need.
          </p>
          <p className="text-lg mb-6">
            Our API follows RESTful principles and uses standard HTTP response codes, authentication, and
            verbs. All responses are returned in JSON format, making it easy to parse and use in any
            programming language.
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-semibold mb-4">Base URL</h3>
            <code className="block bg-gray-800 text-green-400 p-4 rounded-md">
              https://api.orbityield.cc/v1
            </code>
            <p className="mt-4 text-gray-600">
              All API requests should be made to this base URL plus the endpoint path.
            </p>
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Authentication</h2>
          <p className="text-lg mb-6">
            The OrbitYield API uses API keys to authenticate requests. You can view and manage your API
            keys in the developer section of your OrbitYield dashboard.
          </p>
          <p className="text-lg mb-6">
            Authentication is performed via the <code>X-API-KEY</code> HTTP header:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <code className="block bg-gray-800 text-green-400 p-4 rounded-md">
              X-API-KEY: your_api_key_here
            </code>
          </div>
          <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
            <h3 className="text-xl font-semibold mb-4 text-blue-800">API Key Security</h3>
            <p className="text-gray-700 mb-4">
              Your API key carries many privileges, so be sure to keep it secure! Do not share your API key
              in publicly accessible areas such as GitHub, client-side code, or in your frontend application.
            </p>
            <p className="text-gray-700">
              We recommend creating separate API keys for different applications and setting appropriate
              access permissions for each key.
            </p>
          </div>
        </div>
      </section>

      {/* Rate Limiting */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Rate Limiting</h2>
          <p className="text-lg mb-6">
            To ensure the stability of our API and fair usage across all users, we implement rate limiting.
            The current limits are:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-6 py-3 text-left">Plan</th>
                  <th className="border border-gray-200 px-6 py-3 text-left">Rate Limit</th>
                  <th className="border border-gray-200 px-6 py-3 text-left">Burst Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-6 py-4">Free</td>
                  <td className="border border-gray-200 px-6 py-4">60 requests per minute</td>
                  <td className="border border-gray-200 px-6 py-4">100 requests</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4">Pro</td>
                  <td className="border border-gray-200 px-6 py-4">300 requests per minute</td>
                  <td className="border border-gray-200 px-6 py-4">500 requests</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4">Enterprise</td>
                  <td className="border border-gray-200 px-6 py-4">Custom</td>
                  <td className="border border-gray-200 px-6 py-4">Custom</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-lg">
            When you exceed the rate limit, the API will return a <code>429 Too Many Requests</code> response.
            Each response includes the following headers to help you manage your rate limits:
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li><code>X-RateLimit-Limit</code>: The maximum number of requests you're permitted to make per minute.</li>
            <li><code>X-RateLimit-Remaining</code>: The number of requests remaining in the current rate limit window.</li>
            <li><code>X-RateLimit-Reset</code>: The time at which the current rate limit window resets in UTC epoch seconds.</li>
          </ul>
        </div>
      </section>

      {/* Response Formats */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Response Formats</h2>
          <p className="text-lg mb-6">
            All responses are returned in JSON format. A typical successful response will have the following structure:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-8">
            <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto">
{`{
  "success": true,
  "data": {
    // Response data here
  },
  "meta": {
    "pagination": {
      "total": 100,
      "count": 10,
      "per_page": 10,
      "current_page": 1,
      "total_pages": 10
    }
  }
}`}
            </pre>
          </div>
          <p className="text-lg mb-6">
            Error responses will have the following structure:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <pre className="bg-gray-800 text-red-400 p-4 rounded-md overflow-x-auto">
{`{
  "success": false,
  "error": {
    "code": "error_code",
    "message": "A descriptive error message",
    "details": {
      // Additional error details if available
    }
  }
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* HTTP Status Codes */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">HTTP Status Codes</h2>
          <p className="text-lg mb-6">
            The OrbitYield API uses standard HTTP status codes to indicate the success or failure of
            an API request:
          </p>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-6 py-3 text-left">Status Code</th>
                  <th className="border border-gray-200 px-6 py-3 text-left">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-6 py-4"><code>200 OK</code></td>
                  <td className="border border-gray-200 px-6 py-4">The request was successful.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4"><code>201 Created</code></td>
                  <td className="border border-gray-200 px-6 py-4">The resource was successfully created.</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4"><code>400 Bad Request</code></td>
                  <td className="border border-gray-200 px-6 py-4">The request was invalid or could not be understood.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4"><code>401 Unauthorized</code></td>
                  <td className="border border-gray-200 px-6 py-4">Authentication failed or user doesn't have permissions.</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4"><code>403 Forbidden</code></td>
                  <td className="border border-gray-200 px-6 py-4">The authenticated user doesn't have permission to access the specified resource.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4"><code>404 Not Found</code></td>
                  <td className="border border-gray-200 px-6 py-4">The requested resource does not exist.</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4"><code>422 Unprocessable Entity</code></td>
                  <td className="border border-gray-200 px-6 py-4">The request was well-formed but could not be processed due to semantic errors.</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4"><code>429 Too Many Requests</code></td>
                  <td className="border border-gray-200 px-6 py-4">The rate limit has been exceeded.</td>
                </tr>
                <tr>
                  <td className="border border-gray-200 px-6 py-4"><code>500 Internal Server Error</code></td>
                  <td className="border border-gray-200 px-6 py-4">An error occurred on the server.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pagination */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Pagination</h2>
          <p className="text-lg mb-6">
            For endpoints that return collections of resources, the OrbitYield API supports pagination
            through query parameters:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="min-w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-200 px-6 py-3 text-left">Parameter</th>
                  <th className="border border-gray-200 px-6 py-3 text-left">Description</th>
                  <th className="border border-gray-200 px-6 py-3 text-left">Default</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-200 px-6 py-4"><code>page</code></td>
                  <td className="border border-gray-200 px-6 py-4">The page number to retrieve.</td>
                  <td className="border border-gray-200 px-6 py-4">1</td>
                </tr>
                <tr className="bg-gray-50">
                  <td className="border border-gray-200 px-6 py-4"><code>per_page</code></td>
                  <td className="border border-gray-200 px-6 py-4">The number of items to return per page.</td>
                  <td className="border border-gray-200 px-6 py-4">10</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-lg mb-6">
            Example request with pagination:
          </p>
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <code className="block bg-gray-800 text-green-400 p-4 rounded-md">
              GET /strategies?page=2&per_page=15
            </code>
          </div>
        </div>
      </section>

      {/* Versioning */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">API Versioning</h2>
          <p className="text-lg mb-6">
            The OrbitYield API is versioned to ensure backward compatibility as we develop new features.
            The current version is <code>v1</code>, which is included in the base URL.
          </p>
          <p className="text-lg mb-6">
            We will notify all API users well in advance of any changes that would break compatibility.
            When a new version is released, the previous version will remain available for a deprecation
            period of at least 6 months.
          </p>
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-200">
            <h3 className="text-xl font-semibold mb-4 text-amber-800">Version Lifecycle</h3>
            <p className="text-gray-700 mb-4">
              1. <strong>Active:</strong> The current version that receives all new features and improvements.
            </p>
            <p className="text-gray-700 mb-4">
              2. <strong>Maintenance:</strong> Still supported but only receives critical bug fixes and security updates.
            </p>
            <p className="text-gray-700">
              3. <strong>Deprecated:</strong> No longer receiving updates and scheduled for removal. Users should migrate to a newer version.
            </p>
          </div>
        </div>
      </section>

      {/* SDK Links */}
      <section className="mb-20">
        <div className="bg-white p-10 rounded-xl shadow-md">
          <h2 className="text-3xl font-semibold mb-6">Client Libraries & SDKs</h2>
          <p className="text-lg mb-6">
            To make integration easier, we provide official client libraries for popular programming languages:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">JavaScript/TypeScript</h3>
              <p className="text-gray-600 mb-4">
                Perfect for web applications, Node.js backends, and React Native apps.
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <code className="text-sm">npm install @orbityield/api-client</code>
              </div>
              <a href="https://github.com/orbityield/js-client" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Python</h3>
              <p className="text-gray-600 mb-4">
                Ideal for data analysis, backend services, and scripting.
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <code className="text-sm">pip install orbityield-api</code>
              </div>
              <a href="https://github.com/orbityield/python-client" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Java</h3>
              <p className="text-gray-600 mb-4">
                For enterprise applications and Android development.
              </p>
              <div className="bg-gray-50 p-4 rounded-md mb-4">
                <code className="text-sm">
                  implementation 'cc.orbityield:api-client:1.0.0'
                </code>
              </div>
              <a href="https://github.com/orbityield/java-client" className="text-blue-600 hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps */}
      <section>
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-10 rounded-xl shadow-md text-white">
          <h2 className="text-3xl font-semibold mb-6">Next Steps</h2>
          <p className="text-xl mb-8">
            Now that you understand the basics of the OrbitYield API, explore our detailed documentation
            to learn about specific endpoints and features:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link href="/docs/api/authentication" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Authentication</h3>
              <p className="text-white text-opacity-90">
                Learn more about securing your API requests and managing API keys.
              </p>
            </Link>
            
            <Link href="/docs/api/endpoints" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">API Endpoints</h3>
              <p className="text-white text-opacity-90">
                Detailed documentation for all available API endpoints.
              </p>
            </Link>
            
            <Link href="/docs/api/guides" className="bg-white bg-opacity-20 hover:bg-opacity-30 p-6 rounded-lg transition duration-200">
              <h3 className="text-xl font-semibold mb-3">Integration Guides</h3>
              <p className="text-white text-opacity-90">
                Step-by-step tutorials for common integration scenarios.
              </p>
            </Link>
          </div>
          
          <div className="mt-10 text-center">
            <Link href="/docs/api/playground" className="inline-block bg-white text-purple-700 font-semibold px-8 py-3 rounded-lg text-lg hover:bg-gray-100 transition duration-200">
              Try API Playground
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
