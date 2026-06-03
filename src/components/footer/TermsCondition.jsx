import React from 'react'

const TermsCondition = () => {
  return (
    <main className="bg-[#070707] text-white min-h-screen">
      {/* Hero */}
      <section className="px-6 py-12 lg:py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6">
            <span className="inline-block rounded-full border border-red-700 px-3 py-1 text-xs font-black text-red-500">LEGAL INFORMATION</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight">TERMS &amp; CONDITIONS</h1>
          <p className="mt-4 max-w-2xl text-white/60 text-sm md:text-base">Please review these terms carefully before using our platform, purchasing products, or accessing dealer services.</p>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 pb-20">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column: meta + contents */}
          <aside className="lg:col-span-3">
            <div className="space-y-6">
              <div className="rounded-lg border border-white/6 bg-[#0b0b0b] p-4">
                <div className="text-xs text-white/60">LAST UPDATED</div>
                <div className="mt-2 text-sm font-bold">April 2026</div>
                <div className="mt-3 text-sm text-white/50">These terms govern all purchases, dealer accounts, and platform usage.</div>
              </div>

              <nav className="rounded-lg border border-white/6 bg-[#0b0b0b] p-4">
                <div className="text-sm font-black uppercase mb-3">Contents</div>
                <ol className="text-sm text-white/60 list-decimal list-inside space-y-2">
                  <li>Acceptance of Terms</li>
                  <li>Dealer Accounts</li>
                  <li>Product Orders</li>
                </ol>
              </nav>
            </div>
          </aside>

          {/* Right column: main terms */}
          <div className="lg:col-span-9">
            <div className="space-y-6">
              <article className="rounded-lg border border-white/6 bg-[#0b0b0b] p-6">
                <h3 className="text-sm font-black text-red-500">01. Acceptance of Terms</h3>
                <p className="mt-3 text-sm text-white/60">By accessing our platform, registering a dealer account, or placing an order, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.</p>
                <p className="mt-3 text-sm text-white/60">These terms constitute a legally binding agreement between you ("Dealer", "Customer", "User") and SecureOps Inc. ("Company", "we", "us"). We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of those changes.</p>
              </article>

              <article className="rounded-lg border border-white/6 bg-[#0b0b0b] p-6">
                <h3 className="text-sm font-black text-red-500">02. Dealer Accounts</h3>
                <p className="mt-3 text-sm text-white/60">To access wholesale pricing and dealer-specific features, you must apply for and maintain an active Dealer Account. All information provided during registration must be accurate, current, and complete.</p>
                <ul className="mt-3 text-sm text-white/60 list-disc list-inside space-y-2">
                  <li>Dealers are responsible for maintaining the confidentiality of their account credentials.</li>
                  <li>Account access may not be shared with unauthorized third parties.</li>
                  <li>Dealers must notify us immediately of any suspected unauthorized access.</li>
                </ul>
              </article>

              <article className="rounded-lg border border-white/6 bg-[#0b0b0b] p-6">
                <h3 className="text-sm font-black text-red-500">03. Product Orders</h3>
                <p className="mt-3 text-sm text-white/60">All orders are subject to acceptance and availability. We reserve the right to limit quantities, refuse service, or cancel orders at our sole discretion. Product specifications, pricing, and availability are subject to change without notice. Minimum order quantities (MOQs) may apply to specific dealer tiers.</p>
              </article>

              {/* Contact CTA */}
              <div className="rounded-lg border border-white/6 bg-[#0b0b0b] p-6 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="text-lg font-black">HAVE QUESTIONS?</h4>
                  <p className="text-sm text-white/60 mt-2">Need clarification regarding our terms, policies, or dealer agreements?</p>
                </div>

                <div>
                  <a href="mailto:legal@nafcompany.com" className="inline-flex items-center gap-3 bg-red-600 text-white font-medium px-5 py-3 rounded">CONTACT LEGAL TEAM</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default TermsCondition