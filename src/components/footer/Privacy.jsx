import { AlertTriangle, CalendarClock, Mail, ShieldAlert } from 'lucide-react'

const contents = ['Acceptance of Terms', 'Dealer Accounts', 'Product Orders']

const sections = [
  {
    number: '01.',
    title: 'Acceptance of Terms',
    body: [
      'By accessing our platform, registering a dealer account, or placing an order, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you may not use our services.',
      'These terms constitute a legally binding agreement between you ("Dealer", "Customer", "User") and SecureOps Inc. ("Company", "we", "us"). We reserve the right to update these terms at any time, and continued use of the platform constitutes acceptance of those changes.',
    ],
  },
  {
    number: '02.',
    title: 'Dealer Accounts',
    body: [
      'To access wholesale pricing and dealer-specific features, you must apply for and maintain an active Dealer Account. All information provided during registration must be accurate, current, and complete.',
    ],
    list: [
      'Dealers are responsible for maintaining the confidentiality of their account credentials.',
      'Account access may not be shared with unauthorized third parties.',
      'Dealers must notify us immediately of any suspected unauthorized access.',
    ],
  },
  {
    number: '03.',
    title: 'Product Orders',
    body: [
      'All orders are subject to acceptance and availability. We reserve the right to limit quantities, refuse service, or cancel orders at our sole discretion. Product specifications, pricing, and availability are subject to change without notice. Minimum order quantities (MOQs) may apply to specific dealer tiers.',
    ],
  },
]

const Privacy = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/[0.04] bg-[radial-gradient(circle_at_8%_0%,rgba(239,68,68,0.12),transparent_26rem)] px-5 py-12 sm:px-8 lg:px-14 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-red-500">
            <ShieldAlert className="h-3 w-3" />
            Legal Information
          </span>
          <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            Terms & Conditions
          </h1>
          <p className="mt-6 max-w-xl text-sm leading-7 text-white/45">
            Please review these terms carefully before using our platform, purchasing products, or
            accessing dealer services.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="space-y-6 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[8px] border border-white/[0.07] bg-[#141414] p-5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/70">
                <CalendarClock className="h-3.5 w-3.5 text-red-500" />
                Last Updated
              </div>
              <p className="mt-2 text-[11px] text-white/45">April 2026</p>
              <p className="mt-5 text-[11px] leading-6 text-white/35">
                These terms govern all purchases, dealer accounts, and platform usage.
              </p>
            </div>

            <nav className="rounded-[8px] border border-white/[0.07] bg-[#141414] p-5">
              <p className="mb-5 text-[11px] font-black uppercase tracking-[0.08em] text-white/80">
                Contents
              </p>
              <ol className="space-y-3 text-[11px] leading-5 text-white/40">
                {contents.map((item, index) => (
                  <li
                    key={item}
                    className={index === 2 ? 'border-l border-red-500 pl-2 text-red-500' : ''}
                  >
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 space-y-8">
            <div className="rounded-[7px] border border-red-500/35 bg-red-500/10 px-5 py-5 shadow-[inset_3px_0_0_#ef4444] sm:px-6">
              <div className="flex gap-4">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-red-500/15 text-red-500">
                  <AlertTriangle className="h-4 w-4" />
                </span>
                <div>
                  <h2 className="text-xs font-black uppercase tracking-[0.08em] text-white">
                    Important Notice
                  </h2>
                  <p className="mt-2 text-[11px] leading-6 text-white/45">
                    Failure to comply with dealer requirements or payment obligations may result in
                    immediate account restrictions, suspension of services, or termination of dealer
                    agreements without prior notice.
                  </p>
                </div>
              </div>
            </div>

            <article className="rounded-[9px] border border-white/[0.06] bg-[#141414] px-5 py-7 sm:px-8 sm:py-8">
              <div className="space-y-12">
                {sections.map((section) => (
                  <section key={section.title}>
                    <h2 className="text-base font-black text-red-500 sm:text-lg">
                      <span className="mr-2 text-sm">{section.number}</span>
                      {section.title}
                    </h2>
                    <div className="mt-5 space-y-4 text-[12px] leading-7 text-white/45">
                      {section.body.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {section.list && (
                        <ul className="space-y-3 pl-5">
                          {section.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </div>
            </article>

            <section className="relative overflow-hidden rounded-[8px] border border-white/[0.07] bg-[#141414] p-6 sm:p-8">
              <span className="absolute left-3 top-3 h-2 w-2 border-l border-t border-white/20" />
              <span className="absolute right-3 top-3 h-2 w-2 border-r border-t border-white/20" />
              <span className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-white/20" />
              <span className="absolute bottom-3 right-3 h-2 w-2 border-b border-r border-white/20" />
              <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase text-white">Have Questions?</h2>
                  <p className="mt-3 max-w-lg text-xs leading-6 text-white/45">
                    Need clarification regarding our terms, policies, or dealer agreements?
                  </p>
                </div>
                <a
                  href="mailto:legal@nafcompany.com"
                  className="inline-flex items-center justify-center gap-2 rounded-[4px] bg-red-500 px-7 py-3 text-[11px] font-black uppercase tracking-[0.04em] text-white shadow-[0_0_28px_rgba(239,68,68,0.45)] transition hover:bg-red-600"
                >
                  <Mail className="h-4 w-4" />
                  Contact Legal Team
                </a>
              </div>
            </section>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Privacy
