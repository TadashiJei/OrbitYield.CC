import type { Metadata } from "next"
import ContactForm from "./contact-form"

export const metadata: Metadata = {
  title: "Contact Us | OrbitYield",
  description: "Get in touch with the OrbitYield team for any questions, partnerships, or support.",
}

export default function ContactPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-white to-purple-50"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              <span className="gradient-text">Contact</span> Us
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Have questions about OrbitYield? Want to partner with us or need support?
              Our team is here to help you. Reach out to us using the form below or through
              our contact information.
            </p>
          </div>
        </div>
      </section>
      
      {/* Contact Section */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">Get in touch</h2>
              <p className="mt-4 text-lg text-gray-600">
                We value your feedback and inquiries. Our team is dedicated to providing
                excellent service and support for all your cross-chain yield needs.
              </p>
              
              <dl className="mt-10 space-y-6">
                <div className="flex gap-x-4">
                  <dt>
                    <span className="sr-only">Email</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </dt>
                  <dd>
                    <a href="mailto:hello@orbityield.cc" className="text-gray-900 hover:text-primary">
                      hello@orbityield.cc
                    </a>
                    <p className="mt-1 text-gray-600">General inquiries</p>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt>
                    <span className="sr-only">Email</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </dt>
                  <dd>
                    <a href="mailto:support@orbityield.cc" className="text-gray-900 hover:text-primary">
                      support@orbityield.cc
                    </a>
                    <p className="mt-1 text-gray-600">Technical support</p>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt>
                    <span className="sr-only">Email</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </dt>
                  <dd>
                    <a href="mailto:partnerships@orbityield.cc" className="text-gray-900 hover:text-primary">
                      partnerships@orbityield.cc
                    </a>
                    <p className="mt-1 text-gray-600">Partnership inquiries</p>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt>
                    <span className="sr-only">Phone</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </dt>
                  <dd>
                    <span className="text-gray-900">+1 (555) 000-0000</span>
                    <p className="mt-1 text-gray-600">Mon-Fri, 9AM to 5PM EST</p>
                  </dd>
                </div>
                <div className="flex gap-x-4">
                  <dt>
                    <span className="sr-only">Office</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </dt>
                  <dd>
                    <address className="not-italic text-gray-900">
                      OrbitYield Headquarters<br />
                      Philippines<br />
                      Metro Manila, NCR
                    </address>
                  </dd>
                </div>
              </dl>
              
              <div className="mt-10">
                <h3 className="text-lg font-semibold text-gray-900">Follow us</h3>
                <div className="mt-4 flex space-x-6">
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <span className="sr-only">Twitter</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <span className="sr-only">GitHub</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <span className="sr-only">Discord</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                    </svg>
                  </a>
                  <a href="#" className="text-gray-500 hover:text-primary">
                    <span className="sr-only">Telegram</span>
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.132c-.175 1.877-.942 6.423-1.33 8.517-.163.879-.325 1.174-.534 1.208-.459.077-.807-.301-1.25-.592-.696-.465-1.102-.754-1.774-1.208-.786-.504-.276-.784.171-1.238.118-.119 2.151-1.968 2.187-2.134.005-.021.009-.103-.039-.146-.048-.044-.117-.03-.168-.018-.071.018-1.198.758-3.382 2.224-.32.221-.61.329-.87.323-.287-.012-.839-.161-1.247-.292-.503-.162-.904-.247-.869-.525.017-.137.173-.276.467-.419.1.7-.47 1.465 2.39-2.984.24-.234.531-.568.87-.568l.26.005c.758.148 1.689.388 1.689.388l.167.025c.285.119.19.678.19.678z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div>
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 sm:py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl lg:text-center">
            <h2 className="text-base font-semibold leading-7 text-primary">Frequently Asked Questions</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Common questions
            </p>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Find quick answers to the most common questions about contacting OrbitYield.
            </p>
          </div>
          
          <div className="mx-auto mt-16 max-w-2xl space-y-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">What is the typical response time?</h3>
              <p className="mt-2 text-gray-600">
                We strive to respond to all inquiries within 24-48 hours during business days.
                Technical support requests are prioritized based on urgency.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">How can I report a bug or security issue?</h3>
              <p className="mt-2 text-gray-600">
                For security issues, please email security@orbityield.cc directly. For bugs,
                you can submit details through our support form or email support@orbityield.cc.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">I'm interested in partnering with OrbitYield. Who should I contact?</h3>
              <p className="mt-2 text-gray-600">
                Please reach out to partnerships@orbityield.cc with details about your project and
                partnership ideas. Our team will review your proposal and get back to you.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Where can I find documentation for developers?</h3>
              <p className="mt-2 text-gray-600">
                All developer documentation is available at docs.orbityield.cc. If you have specific
                technical questions, our developer support team is available at dev@orbityield.cc.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
