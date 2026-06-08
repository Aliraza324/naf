import { CalendarClock, Download, Mail, ShieldAlert } from 'lucide-react'

const sections = [
  'Information We Collect',
  'How We Use Data',
  'Data Security',
  'Your Rights',
]

const TermsCondition = () => {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <section className="border-b border-white/[0.04] bg-[radial-gradient(circle_at_8%_0%,rgba(239,68,68,0.1),transparent_24rem)] px-5 py-10 sm:px-8 lg:px-14 lg:py-14">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/10 px-3 py-1 text-[9px] font-black uppercase tracking-[0.12em] text-red-500">
            <ShieldAlert className="h-3 w-3" />
            Data Protection & Security
          </span>
          <h1 className="mt-5 text-4xl font-black uppercase tracking-tight text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-lg text-xs leading-6 text-white/45 sm:text-sm">
            Learn how we collect, store, protect, and use your information across our dealer
            platform.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-14">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[210px_minmax(0,1fr)]">
          <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
            <div className="rounded-[8px] border border-white/[0.06] bg-[#141414] p-5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.1em] text-white/70">
                <CalendarClock className="h-3.5 w-3.5 text-red-500" />
                Last Updated
              </div>
              <p className="mt-2 text-[11px] text-white/45">May 2026</p>
              <p className="mt-5 text-[11px] leading-6 text-white/35">
                Comprehensive overview of our privacy protocols and your data rights.
              </p>
            </div>

            <nav className="rounded-[8px] border border-white/[0.06] bg-[#141414] p-5">
              <p className="mb-5 text-[11px] font-black uppercase tracking-[0.08em] text-white/80">
                Sections
              </p>
              <ol className="space-y-3 text-[11px] leading-5 text-white/40">
                {sections.map((item, index) => (
                  <li
                    key={item}
                    className={index === 0 ? 'border-l border-red-500 pl-2 text-red-500' : ''}
                  >
                    {index + 1}. {item}
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <div className="min-w-0 space-y-8">
            <article className="rounded-[9px] border border-white/[0.06] bg-[#141414] px-5 py-7 sm:px-8 sm:py-9">
              <div className="space-y-9">
                <section className="border-b border-white/25 pb-8">
                  <h2 className="text-base font-black text-red-500">
                    1. Information We Collect
                  </h2>
                  <p className="mt-5 text-[12px] font-semibold leading-7 text-white/65">
                    We may collect information about you in a variety of ways. The information we
                    may collect on the Site includes:
                  </p>
                </section>

                <section className="border-b border-white/25 pb-8">
                  <h2 className="text-base font-black text-red-500">
                    2. How We Use Your Information
                  </h2>
                  <p className="mt-5 text-[12px] leading-7 text-white/55">
                    Having accurate information about you permits us to provide you with a smooth,
                    efficient, and customized experience. Specifically, we may use information
                    collected about you via the Site to:
                  </p>
                  <ul className="mt-4 space-y-2 pl-5 text-[12px] leading-6 text-white/55">
                    <li>Create and manage your account.</li>
                    <li>Process your transactions and send you related information.</li>
                    <li>Email you regarding your account or order.</li>
                    <li>Fulfill and manage purchases, orders, payments, and other transactions.</li>
                    <li>Generate a personal profile about you to make future visits more personalized.</li>
                    <li>Increase the efficiency and operation of the Site.</li>
                    <li>Monitor and analyze usage and trends to improve your experience.</li>
                  </ul>
                </section>

                <section className="border-b border-white/25 pb-8">
                  <h2 className="text-base font-black text-red-500">4. Data Security</h2>
                  <p className="mt-5 text-[12px] leading-7 text-white/55">
                    We use administrative, technical, and physical security measures to help protect
                    your personal information. While we have taken reasonable steps to secure the
                    personal information you provide to us, please be aware that despite our efforts,
                    no security measures are perfect or impenetrable.
                  </p>
                </section>

                <section className="border-b border-white/25 pb-8">
                  <h2 className="text-base font-black text-red-500">5. Your Rights</h2>
                  <p className="mt-5 text-[12px] leading-7 text-white/55">
                    Depending on your location, you may have certain rights regarding your personal
                    information, such as the right to access, correct, or delete your data. If you
                    wish to exercise any of these rights, please contact us.
                  </p>
                  <button
                    type="button"
                    className="mt-5 inline-flex items-center gap-2 rounded-[4px] bg-red-600 px-4 py-2.5 text-[10px] font-black uppercase text-white transition hover:bg-red-700"
                  >
                    <Download className="h-3.5 w-3.5" />
                    Request my data
                  </button>
                </section>

                <section>
                  <h2 className="text-base font-black text-red-500">6. Contact Us</h2>
                  <p className="mt-5 text-[12px] leading-7 text-white/55">
                    If you have questions or comments about this Privacy Policy, please contact us
                    at:
                  </p>
                  <div className="mt-4 rounded-[5px] bg-red-600 px-5 py-4 text-[11px] font-semibold leading-6 text-white">
                    privacy@privacyboard.example.com
                    <br />
                    123 Privacy Street, Suite 100, Tech City, TC 90210
                  </div>
                </section>
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

export default TermsCondition
