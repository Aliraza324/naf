import {
  BarChart3,
  Check,
  CreditCard,
  Database,
  EyeOff,
  Headphones,
  KeyRound,
  Lock,
  Mail,
  Shield,
  ShieldCheck,
  ShoppingCart,
  UserCheck,
  Zap,
} from 'lucide-react'

const collectedInfo = [
  'Dealer Profile Details',
  'Business Information',
  'Payment Information',
  'Order History',
  'Device & Usage Data',
  'Communication Logs',
]

const usageCards = [
  {
    title: 'Order Processing',
    description:
      'Facilitating transactions, logistics tracking, and providing accurate billing statements for your dealer account.',
    icon: ShoppingCart,
  },
  {
    title: 'Account Security',
    description:
      'Protecting your identity through multi-factor authentication and monitoring for suspicious login patterns.',
    icon: UserCheck,
  },
  {
    title: 'Customer Support',
    description:
      'Responding to inquiries and technical support tickets with context from your previous platform interactions.',
    icon: Headphones,
  },
  {
    title: 'Platform Improvements',
    description:
      'Analyzing aggregated usage data to optimize interface performance and develop new dealer features.',
    icon: BarChart3,
  },
]

const securityItems = [
  {
    title: 'SSL Encryption',
    description: 'AES-256 grade encryption for all data in transit.',
    icon: KeyRound,
  },
  {
    title: 'Secure Payments',
    description: 'PCI-DSS compliant transaction processing.',
    icon: CreditCard,
  },
  {
    title: 'Account Protection',
    description: 'Biometric and MFA security protocols.',
    icon: Shield,
  },
  {
    title: 'Fraud Monitoring',
    description: 'Real-time threat detection algorithms.',
    icon: EyeOff,
  },
]

const rights = [
  {
    title: 'Right to Access',
    description: 'Request a full copy of all data associated with your business account.',
  },
  {
    title: 'Right to Update',
    description: 'Modify and correct your business profile information at any time.',
  },
  {
    title: 'Right to Deletion',
    description: 'Request permanent removal of your account and related data.',
  },
  {
    title: 'Privacy Preferences',
    description: 'Control communication frequency and data sharing settings.',
  },
]

const Privacy = () => {
  return (
    <main className="min-h-screen bg-[#070707] text-white">
      <section className="border-b border-white/[0.04] bg-[radial-gradient(circle_at_20%_0%,rgba(232,12,12,0.1),transparent_30rem)] px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto max-w-6xl">
          <span className="inline-flex items-center rounded-full border border-red-700/50 bg-red-900/30 px-3 py-1 text-[10px] font-black uppercase tracking-wide text-red-400">
            Data Protection & Security
          </span>
          <h1 className="mt-7 font-display text-4xl font-black uppercase tracking-normal text-white sm:text-5xl lg:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/45">
            Learn how we collect, store, protect, and use your information across our dealer platform.
          </p>
        </div>
      </section>

      <section className="px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[220px_1fr] lg:items-start">
          <aside className="space-y-6 lg:sticky lg:top-36">
            <div className="rounded-lg border border-white/[0.06] bg-[#121212] p-5 shadow-[0_18px_50px_rgba(232,12,12,0.05)]">
              <div className="flex items-center gap-2">
                <Lock size={14} className="text-red-500" />
                <p className="text-[11px] font-black uppercase tracking-wide text-white/80">
                  Last Updated
                </p>
              </div>
              <p className="mt-2 text-xs text-white/55">May 2026</p>
              <p className="mt-5 text-xs leading-relaxed text-white/35">
                Comprehensive overview of our privacy protocols and your data rights.
              </p>
            </div>

            <nav className="rounded-lg border border-white/[0.06] bg-[#121212] p-5">
              <p className="mb-4 text-[11px] font-black uppercase tracking-wide text-white/70">
                Sections
              </p>
              <ol className="space-y-3 text-xs font-semibold text-white/40">
                <li className="border-l border-red-600 pl-3 text-red-500">
                  1. Information We Collect
                </li>
                <li>2. How We Use Data</li>
                <li>3. Data Security</li>
                <li>4. Your Rights</li>
              </ol>
            </nav>
          </aside>

          <div className="space-y-10">
            <section>
              <div className="mb-6 flex items-center gap-4">
                <span className="grid size-9 place-items-center rounded-lg border border-red-700/35 bg-red-900/25 text-red-500">
                  <Database size={17} />
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  01. Information We Collect
                </h2>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-[#151515] p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-white/45">
                  To provide our advanced dealer services, we collect various types of information that allow us to verify business identity, process secure transactions, and maintain the integrity of our network.
                </p>

                <div className="mt-7 grid gap-3 sm:grid-cols-2">
                  {collectedInfo.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-lg bg-white/[0.06] px-4 py-3 text-xs font-bold text-white/75"
                    >
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-red-600 text-white">
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-4">
                <span className="grid size-9 place-items-center rounded-lg border border-red-700/35 bg-red-900/25 text-red-500">
                  <Zap size={17} />
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  02. How We Use Your Data
                </h2>
              </div>

              <div className="grid gap-5 md:grid-cols-2">
                {usageCards.map(({ title, description, icon: Icon }) => (
                  <article
                    key={title}
                    className="rounded-lg border border-white/[0.06] bg-[#151515] p-6"
                  >
                    <span className="grid size-10 place-items-center rounded-full bg-white/[0.05] text-red-500">
                      <Icon size={20} />
                    </span>
                    <h3 className="mt-6 text-sm font-black text-white/85">{title}</h3>
                    <p className="mt-4 text-xs leading-relaxed text-white/40">{description}</p>
                  </article>
                ))}
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-4">
                <span className="grid size-9 place-items-center rounded-lg border border-red-700/35 bg-red-900/25 text-red-500">
                  <Lock size={17} />
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  03. Data Security
                </h2>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-[#151515] p-6 sm:p-8">
                <p className="max-w-3xl text-sm leading-relaxed text-white/45">
                  We implement industry-leading technical and organizational measures to safeguard your sensitive information against unauthorized access, disclosure, or destruction. Our infrastructure is hardened and monitored 24/7 by our security operations team.
                </p>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {securityItems.map(({ title, description, icon: Icon }) => (
                    <div key={title} className="text-center">
                      <span className="mx-auto grid size-14 place-items-center rounded-xl bg-red-900/25 text-red-500">
                        <Icon size={24} />
                      </span>
                      <h3 className="mt-4 text-xs font-black text-white/85">{title}</h3>
                      <p className="mx-auto mt-2 max-w-[150px] text-[11px] leading-relaxed text-white/35">
                        {description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section>
              <div className="mb-6 flex items-center gap-4">
                <span className="grid size-9 place-items-center rounded-lg border border-red-700/35 bg-red-900/25 text-red-500">
                  <UserCheck size={17} />
                </span>
                <h2 className="text-2xl font-black tracking-tight text-white">
                  04. Your Rights
                </h2>
              </div>

              <div className="rounded-lg border border-white/[0.06] bg-[#151515] p-6 sm:p-8">
                <p className="text-sm leading-relaxed text-white/45">
                  As a member of the SecureOps platform, you maintain control over your personal data. You may exercise any of the following rights through your account settings or by contacting our privacy team directly.
                </p>

                <div className="mt-7 space-y-3">
                  {rights.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 rounded-lg border border-white/[0.06] bg-white/[0.05] px-4 py-4"
                    >
                      <span className="grid size-8 shrink-0 place-items-center rounded-full bg-red-900/60 text-red-400">
                        <Check size={15} strokeWidth={3} />
                      </span>
                      <div>
                        <h3 className="text-xs font-black text-white/85">{item.title}</h3>
                        <p className="mt-1 text-[11px] leading-relaxed text-white/35">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="relative overflow-hidden rounded-lg border border-white/[0.06] bg-[#151515] p-6 sm:p-8">
              <div className="pointer-events-none absolute inset-3 border border-white/[0.04]" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-xl font-black uppercase text-white">Privacy Questions?</h2>
                  <p className="mt-4 max-w-lg text-xs leading-relaxed text-white/45">
                    Our dedicated privacy team is available to answer complex questions regarding data protection, regulatory compliance, and account security.
                  </p>
                </div>

                <a
                  href="mailto:privacy@nafcompany.com"
                  className="inline-flex items-center justify-center gap-3 rounded bg-red-600 px-6 py-4 text-xs font-black uppercase text-white shadow-[0_0_28px_rgba(232,12,12,0.35)] transition hover:bg-red-700"
                >
                  <Mail size={16} />
                  Contact Privacy Team
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
