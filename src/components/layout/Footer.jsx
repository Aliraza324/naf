import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'
import logo from '../../assets/images/logo.svg'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../../animations/animations'
import Company from '../../assets/images/company.png'
import visa from '../../assets/images/visa.svg'
import master from '../../assets/images/master.svg'
import ex from '../../assets/images/ex.svg'
import paypal from '../../assets/images/paypal.svg'

const Footer = () => {
    return (
        <motion.footer
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, amount: 0.15 }}
            className="bg-[#050505] text-white border-t border-white/5 px-4 pt-12 pb-8 sm:pt-16 lg:px-6 overflow-hidden"
        >
            <div className="mx-auto max-w-full">
                {/* Main Grid */}
                <motion.div
                    variants={staggerContainer(0.1, 0.05)}
                    className="grid grid-cols-1 gap-y-10 md:grid-cols-2 md:gap-x-8 md:gap-y-12 lg:grid-cols-12 lg:gap-x-12"
                >

                    {/* Column 1: Brand & Contact Info */}
                    <motion.div
                        variants={fadeInUp}
                        className="min-w-0 md:col-span-1 lg:col-span-4 flex flex-col justify-between gap-8 sm:gap-10"
                    >
                        <div>
                            {/* Logo */}
                            <div className="flex min-w-0 items-center gap-3.5 mb-6">
                                <img
                                    src={logo}
                                    alt="NAF Supply Logo"
                                    className="h-11 w-auto object-contain"
                                />
                                <span className="min-w-0 font-display text-[19px] font-black uppercase italic tracking-wider leading-none sm:text-[22px]">
                                    NAF Supply
                                </span>
                            </div>

                            {/* Description */}
                            <p className="text-white/40 text-sm leading-relaxed max-w-[340px]">
                                Forging the ultimate tactical experience since 2018. Engineered for the professional, built for the passionate.
                            </p>
                        </div>

                        {/* Support Hub Section */}
                        <div>
                            <h4 className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-white/80 mb-5">
                                Support Hub
                            </h4>
                            <div className="flex flex-col gap-4 text-sm text-white/40">
                                <div className="flex min-w-0 items-center gap-3.5 group">
                                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                        <MapPin size={15} />
                                    </span>
                                    <span className="min-w-0 break-words group-hover:text-white transition-colors duration-200">
                                        Elite Ops HQ, Austin, TX
                                    </span>
                                </div>

                                <a href="tel:800-677-8228" className="flex min-w-0 items-center gap-3.5 group">
                                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                        <Phone size={15} />
                                    </span>
                                    <span className="group-hover:text-white transition-colors duration-200">
                                        (800) OPS-TACTIC
                                    </span>
                                </a>

                                <a href="mailto:ops@tacticalzone.com" className="flex min-w-0 items-center gap-3.5 group">
                                    <span className="grid size-8 place-items-center rounded-lg bg-primary/10 border border-primary/20 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                                        <Mail size={15} />
                                    </span>
                                    <span className="min-w-0 break-all group-hover:text-white transition-colors duration-200">
                                        ops@tacticalzone.com
                                    </span>
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 2: Newsletter & Arsenal/Company Links */}
                    <motion.div
                        variants={fadeInUp}
                        className="min-w-0 md:col-span-1 lg:col-span-5 flex flex-col justify-between gap-8 sm:gap-10"
                    >
                        {/* Newsletter */}
                        <div>
                            <h3 className="font-display text-[clamp(1.35rem,7vw,1.55rem)] font-black uppercase italic tracking-[0.02em] text-white mb-2.5">
                                REINFORCEMENT INCOMING
                            </h3>
                            <p className="text-white/40 text-sm mb-5 leading-relaxed max-w-[420px]">
                                Join the tactical network for early deployment notices and elite pricing.
                            </p>

                            <form
                                onSubmit={(e) => e.preventDefault()}
                                className="flex w-full max-w-[440px] flex-col gap-3 sm:flex-row"
                            >
                                <input
                                    type="email"
                                    placeholder="Your tactical email..."
                                    required
                                    className="min-w-0 flex-1 bg-[#10100d] border border-white/10 rounded-lg px-4 py-3.5 text-sm text-white placeholder-white/35 outline-none focus:border-primary/50 transition-colors shadow-inner"
                                />
                                <button
                                    type="submit"
                                    className="brand-red-gradient active:bg-primary-pressed text-white font-display px-8 py-3.5 rounded-lg text-xs sm:text-sm transition-all shadow-lg shadow-primary/14 active:scale-[0.98] sm:shrink-0"
                                >
                                    ENLIST
                                </button>
                            </form>
                        </div>

                        {/* Links Columns */}
                        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-6">
                            {/* Arsenal Link List */}
                            <div>
                                <h4 className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-white/80 mb-4">
                                    Arsenal
                                </h4>
                                <nav className="flex flex-col gap-3 text-sm text-white/40">
                                    {['Paintballs', 'Goggles & Masks', 'Tactical Gloves', 'Team Jerseys'].map((item) => (
                                        <a
                                            key={item}
                                            href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                                            className="w-fit max-w-full break-words hover:text-primary transition-colors duration-200"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </nav>
                            </div>

                            {/* Company Link List */}
                            <div>
                                <h4 className="font-display text-[11px] font-black uppercase tracking-[0.18em] text-white/80 mb-4">
                                    Company
                                </h4>
                                <nav className="flex flex-col gap-3 text-sm text-white/40">
                                    {['Our Mission', 'Contact Us', 'Privacy Protocol', 'Terms of Engagement'].map((item) => (
                                        <a
                                            key={item}
                                            href={`#${item.toLowerCase().replaceAll(' ', '-')}`}
                                            className="w-fit max-w-full break-words hover:text-primary transition-colors duration-200"
                                        >
                                            {item}
                                        </a>
                                    ))}
                                </nav>
                            </div>
                        </div>
                    </motion.div>

                    {/* Column 3: Social Hub */}
                    <motion.div
                        variants={fadeInUp}
                        className="min-w-0 md:col-span-2 lg:col-span-3 flex flex-col items-start gap-5 lg:items-end"
                    >
                        <h4 className="font-display text-[11px] font-black tracking-[0.18em] text-white/55 w-full lg:text-right">
                            Social Intel
                        </h4>

                        {/* Social Icons row */}
                        <div className="flex w-full flex-wrap items-center gap-2.5 md:justify-start lg:justify-end">
                            {/* Twitter/X Icon */}
                            <a
                                href="#twitter"
                                aria-label="Twitter X"
                                className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-primary hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <svg className="size-4 fill-current" viewBox="0 0 24 24">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                                </svg>
                            </a>

                            {/* Facebook Icon */}
                            <a
                                href="#facebook"
                                aria-label="Facebook"
                                className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-primary hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z" />
                                </svg>
                            </a>

                            {/* Pinterest Icon */}
                            <a
                                href="#pinterest"
                                aria-label="Pinterest"
                                className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-primary hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.27 2.68 7.9 6.47 9.32-.08-.8-.16-2.03.03-2.9l1.7-7.2s-.43-.87-.43-2.15c0-2.02 1.17-3.53 2.63-3.53 1.24 0 1.84.93 1.84 2.04 0 1.25-.8 3.11-1.21 4.84-.34 1.45.73 2.63 2.16 2.63 2.6 0 4.6-2.74 4.6-6.69 0-3.5-2.5-5.94-6.1-5.94-4.15 0-6.6 3.11-6.6 6.34 0 1.25.48 2.6 1.08 3.33.12.14.14.26.1.42l-.41 1.7c-.07.28-.22.38-.5.25-1.89-.88-3.07-3.64-3.07-5.87 0-4.78 3.47-9.17 10.02-9.17 5.26 0 9.35 3.75 9.35 8.76 0 5.23-3.3 9.44-7.88 9.44-1.54 0-2.98-.8-3.48-1.74l-.95 3.63c-.34 1.32-1.28 2.97-1.92 4.02C9.48 21.75 10.7 22 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                                </svg>
                            </a>

                            {/* Instagram Icon */}
                            <a
                                href="#instagram"
                                aria-label="Instagram"
                                className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-primary hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <svg className="size-4.5 stroke-current fill-none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                                </svg>
                            </a>

                            {/* TikTok Icon */}
                            <a
                                href="#tiktok"
                                aria-label="TikTok"
                                className="size-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/80 hover:text-white hover:border-primary hover:bg-white/10 transition-all duration-300 hover:-translate-y-0.5"
                            >
                                <svg className="size-4.5 fill-current" viewBox="0 0 24 24">
                                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.02 1.66 4.14 1.13 1.18 2.69 1.84 4.3 1.94v3.93c-1.68-.07-3.32-.67-4.66-1.72-.44-.35-.84-.75-1.19-1.2v6.52c0 2.2-.7 4.35-2.02 6.02-1.69 2.11-4.32 3.35-7.03 3.34-3.41-.02-6.52-2.19-7.79-5.36-1.42-3.53-.48-7.78 2.34-10.28 1.85-1.64 4.32-2.45 6.78-2.22v3.9c-1.12-.13-2.26.17-3.15.86-.98.77-1.49 2.01-1.39 3.25.1 1.25.86 2.34 1.95 2.87 1.05.51 2.33.4 3.26-.29.5-.38.8-.95.84-1.58.07-2.18.02-6.93.03-9.12.01-1.37.01-2.73.01-4.09z" />
                                </svg>
                            </a>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Divider */}
                <hr className="border-white/10 my-10" />

                {/* Bottom Bar */}
                <motion.div
                    variants={fadeInUp}
                    className="flex flex-col gap-6 text-[11px] font-semibold tracking-widest text-white/40 md:flex-row md:items-center md:justify-between"
                >
                    {/* Copyrights */}
                    <div className="max-w-full break-words uppercase">
                        © 2024 TACTICAL ZONE • ALL RIGHTS RESERVED • SECURE ENCRYPTION ACTIVE
                    </div>

                    {/* Designed and hosted by Codesinc */}
                    <div className="flex max-w-full items-center group cursor-pointer text-white/40">
                        <a href="https://www.codes-inc.com/" target="_blank" rel="noopener noreferrer">
                            <img src={Company} alt="Codesinc" className="max-h-8 w-auto" />
                        </a>
                    </div>

                    {/* Payment Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Visa */}
                        <div className="px-2.5 py-1.5 bg-[#0a0a08] border border-white/8 rounded-md flex items-center justify-center w-11 h-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]">
                            <img src={visa} alt="Visa" className="h-full w-auto object-contain" />
                        </div>
                        {/* Mastercard */}
                        <div className="px-2.5 py-1.5 bg-[#0a0a08] border border-white/8 rounded-md flex items-center justify-center w-11 h-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]">
                            <img src={master} alt="Mastercard" className="h-full w-auto object-contain" />
                        </div>
                        {/* AMEX */}
                        <div className="px-2.5 py-1.5 bg-[#0a0a08] border border-white/8 rounded-md flex items-center justify-center w-11 h-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]">
                            <img src={ex} alt="Amex" className="h-full w-auto object-contain" />
                        </div>
                        {/* PayPal */}
                        <div className="px-2.5 py-1.5 bg-[#0a0a08] border border-white/8 rounded-md flex items-center justify-center w-11 h-7 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.02]">
                            <img src={paypal} alt="PayPal" className="h-full w-auto object-contain" />
                        </div>
                    </div>
                </motion.div>

            </div>
        </motion.footer>
    )
}

export default Footer
