import { Link } from 'react-router-dom'
import { Cpu, Handshake, ShieldCheck, Target, Zap } from 'lucide-react'
import performanceImage from '../../assets/images/mission.png'
import heroImage from '../../assets/images/missionone.png'

const valueCards = [
    {
        title: 'Reliability',
        description:
            "Precision in every shipment and consistency in our inventory. We don't just supply, we deliver certainty.",
        icon: ShieldCheck,
    },
    {
        title: 'Performance',
        description:
            'High-grade tactical equipment tested in the field to ensure zero failure when it matters most.',
        icon: Target,
    },
    {
        title: 'Innovation',
        description:
            'Continuous evolution of our digital platform to provide cutting-edge management tools for our partners.',
        icon: Cpu,
    },
    {
        title: 'Partnership',
        description:
            'We win when our dealers win. Dedicated support and shared growth strategies define our success.',
        icon: Handshake,
    },
]

const stats = [
    { value: '500+', label: 'Active Dealers' },
    { value: '24/7', label: 'Support Ops' },
    { value: '12', label: 'Global Hubs' },
]

const Mission = () => {
    return (
        <main className="overflow-hidden bg-[#080808] text-white p-4">

            {/* ── Hero ── */}
            <section className="relative px-5 pb-16 pt-12 text-center sm:px-8 lg:px-12 lg:pb-24">
                {/* decorative coords — desktop only, safe to hide on small */}
                <div className="pointer-events-none absolute left-10 top-64 hidden text-left text-[9px] font-black uppercase leading-5 tracking-widest text-red-950/80 lg:block">
                    <p>Lat: 34.0522 N</p>
                    <p>Long: 118.2437 W</p>
                    <p>Status: System Ready</p>
                </div>
                <div className="pointer-events-none absolute left-1/2 top-80 hidden h-14 w-px bg-red-700/50 lg:block" />

                <div className="mx-auto max-w-5xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-red-700/40 bg-red-950/25 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-red-500">
                        <span className="size-1.5 rounded-full bg-red-500" />
                        Our Mission
                    </span>

                    {/* FIX: tighter clamp floor so it stays single-line on 320 px */}
                    <h1 className="mx-auto mt-8 max-w-4xl font-display text-[clamp(2rem,6vw,4rem)] font-black uppercase leading-[0.95] tracking-normal">
                        Built for Performance.
                        <br />
                        Driven by <span className="text-red-600">Purpose.</span>
                    </h1>

                    <p className="mx-auto mt-8 max-w-2xl text-sm leading-7 text-white/45 sm:text-base">
                        We empower dealers, field operators, and tactical enthusiasts with reliable equipment, streamlined ordering, and exceptional service.
                    </p>
                </div>
            </section>

            {/* ── Purpose ── */}
            <section className="relative px-5 pb-20 sm:px-8 lg:px-12">
                <div className="pointer-events-none absolute left-14 top-2 hidden h-20 w-20 border-l border-t border-red-700/45 lg:block" />

                {/* FIX: stack on mobile/tablet, side-by-side only on lg */}
                <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr]">
                    <div className="relative">
                        <div className="absolute -inset-8 bg-red-700/10 blur-3xl" />
                        <img
                            src={performanceImage}
                            alt="Paintball tactical mask"
                            className="relative aspect-[1.28/1] w-full rounded-lg border border-white/[0.06] object-cover grayscale"
                        />
                    </div>

                    <div>
                        <div className="mb-8 flex items-center gap-4">
                            <span className="h-px w-12 bg-red-600" />
                            <p className="text-[11px] font-black uppercase tracking-[0.22em] text-red-500">
                                Our Purpose
                            </p>
                        </div>

                        {/* FIX: fluid text so it never overflows on xs */}
                        <h2 className="max-w-xl text-[clamp(1.25rem,3.5vw,1.875rem)] font-black leading-tight tracking-tight text-white">
                            To create a trusted platform where dealers can access premium products, reliable inventory, and efficient business solutions.
                        </h2>

                        <div className="mt-14 grid gap-8 sm:grid-cols-2">
                            <div>
                                <h3 className="text-sm font-black text-white">Dealer First</h3>
                                <p className="mt-3 text-xs leading-relaxed text-white/45">
                                    Every feature we build is designed to minimize friction in the dealer workflow.
                                </p>
                            </div>
                            <div>
                                <h3 className="text-sm font-black text-white">Quality Obsessed</h3>
                                <p className="mt-3 text-xs leading-relaxed text-white/45">
                                    We only partner with brands that meet our rigorous performance standards.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Core Values ── */}
            <section className="border-y border-white/[0.04] px-5 py-10 sm:px-8 lg:px-12">
                <div className="mx-auto max-w-6xl">
                    <div className="text-center">
                        <h2 className="font-display text-3xl font-black uppercase tracking-normal">
                            Core Values
                        </h2>
                        <span className="mx-auto mt-4 block h-1 w-16 bg-red-600" />
                    </div>

                    {/* FIX: 1 col on xs, 2 on sm, 4 on lg — unchanged from original */}
                    <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {valueCards.map(({ title, description, icon: Icon }, index) => (
                            <article
                                key={title}
                                className="rounded-lg border border-white/[0.06] bg-[#151515] p-6"
                            >
                                <span className="grid size-11 place-items-center rounded-lg bg-white/[0.06] text-red-500">
                                    <Icon size={22} />
                                </span>
                                <h3 className="mt-7 text-sm font-black text-white/90">{title}</h3>
                                <p className="mt-4 text-xs leading-relaxed text-white/40">{description}</p>
                                {index === 1 && <span className="mt-7 block size-0" />}
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Stats / Hero Image ── */}
            <section className="relative overflow-hidden border-y border-white/[0.04] bg-[#070707] px-5 py-16 sm:px-8 lg:px-12 lg:py-10">
                {/* right-side image — desktop only */}
                <div className="absolute inset-y-0 right-0 hidden w-[49%] lg:block">
                    <img
                        src={heroImage}
                        alt="Tactical operator silhouette"
                        className="h-full w-full object-cover object-center opacity-80 grayscale"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707]/65 to-[#070707]/15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#070707] via-transparent to-[#070707]/55" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#070707] via-[#070707] to-[#070707]/75 lg:to-transparent" />

                <div className="relative mx-auto grid min-h-[360px] max-w-6xl items-center lg:grid-cols-[0.9fr_1fr]">
                    <div>
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-red-500 sm:text-[11px]">
                            Supporting The Tactical Community
                        </p>

                        {/* FIX: fluid clamp prevents line-break issues on 360–480 px */}
                        <h2 className="mt-5 max-w-[540px] font-display text-[clamp(1.4rem,3.5vw,2.5rem)] font-black uppercase leading-[1.04] tracking-normal text-white">
                            Our mission is to simplify access to premium equipment while helping dealers{' '}
                            <span className="text-red-600">grow with confidence.</span>
                        </h2>

                        {/* FIX: wrap stats in a wrapping flex row; gap keeps them readable on xs */}
                        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
                            {stats.map((stat) => (
                                <div key={stat.label} className="min-w-[64px]">
                                    <p className="font-display text-2xl font-black uppercase leading-none text-white sm:text-[1.5rem]">
                                        {stat.value}
                                    </p>
                                    <p className="mt-2 text-[9px] font-black uppercase tracking-[0.16em] text-white/35">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Vision / CTA ── */}
            <section className="px-5 py-10 sm:px-8 lg:px-12 lg:py-10">
                <div className="mx-auto max-w-6xl">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="mx-auto block h-px w-16 bg-red-600" />
                        <h2 className="mt-10 font-display text-3xl font-black uppercase tracking-normal">
                            Our Vision For The Future
                        </h2>
                        {/* FIX: text-sm on xs prevents long italic line overflow */}
                        <p className="mx-auto mt-8 max-w-3xl text-sm italic leading-8 text-white/45 sm:text-base">
                            "To become the leading dealer-focused platform for tactical paintball products, delivering unmatched service, innovation, and reliability worldwide."
                        </p>
                    </div>

                    <div className="relative mt-20 overflow-hidden rounded-lg bg-gradient-to-r from-[#E80C0C] to-[#8B0505] p-4 sm:p-10 lg:p-12">
                        <div className="pointer-events-none absolute inset-4" />

                        {/* FIX: stack on mobile, side-by-side on lg */}
                        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                {/* FIX: fluid clamp keeps heading from overflowing on xs */}
                                <h2 className="max-w-md font-display text-[clamp(1.6rem,5vw,2.25rem)] font-black uppercase leading-none tracking-normal sm:text-4xl">
                                    Ready To Grow With Us?
                                </h2>
                                <p className="mt-6 max-w-lg text-sm leading-relaxed text-white/85">
                                    Join a growing network of dealers, field operators, and tactical professionals.
                                </p>
                            </div>

                            {/* FIX: full-width buttons on xs, auto-width on sm+ */}
                            <div className="grid w-full gap-4 sm:w-auto sm:min-w-[240px]">
                                <Link
                                    to="/register"
                                    className="inline-flex items-center justify-center rounded-md bg-black px-8 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-[#171717]"
                                >
                                    Become A Dealer
                                </Link>
                                <Link
                                    to="/contact"
                                    className="inline-flex items-center justify-center rounded-md border border-white/25 px-8 py-4 text-xs font-black uppercase tracking-wide text-white transition hover:bg-white/10"
                                >
                                    Contact Us
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </main>
    )
}

export default Mission