import React, { useState } from 'react'
import { Share2, Star, Edit2, Warehouse, Bell, Maximize2 } from 'lucide-react'
import Box from '../../../assets/images/box.png';
import GunBox from '../../../assets/images/gunbox.png';
import One from '../../../assets/images/blogtwo.png';
import Two from '../../../assets/images/blogone.png';


const images = [
    GunBox,
    Box,
    One,
    Two,
]

const MoreDetails = () => {
    const [activeImageIndex, setActiveImageIndex] = useState(0)
    const [isFavorited, setIsFavorited] = useState(false)

    return (
        <div className="mx-auto w-full max-w-7xl px-4 py-8 text-white">
            <div className="grid gap-8 lg:grid-cols-12">
                {/* Left Side: Product Images */}
                <div className="lg:col-span-6 space-y-4">
                    {/* Main Large Image Box */}
                    <div className="relative aspect-square overflow-hidden rounded-2xl border border-white/5 bg-[#141414] p-4 flex items-center justify-center group">
                        <img
                            src={images[activeImageIndex]}
                            alt="Main Product"
                            className="h-full w-full object-cover rounded-xl transition duration-300 group-hover:scale-[1.02]"
                        />
                        {/* Fullscreen Icon */}
                        <button
                            type="button"
                            className="absolute right-6 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm transition hover:bg-black/80"
                            aria-label="Expand image"
                        >
                            <Maximize2 className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Thumbnail Gallery Row */}
                    <div className="grid grid-cols-4 gap-4">
                        {images.map((img, index) => (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setActiveImageIndex(index)}
                                className={`relative aspect-square overflow-hidden rounded-xl border bg-[#141414] p-1 transition ${activeImageIndex === index
                                    ? 'border-red-600 ring-1 ring-red-600'
                                    : 'border-white/5 hover:border-white/20'
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt={`Thumbnail ${index + 1}`}
                                    className="h-full w-full object-cover rounded-lg"
                                />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side: Product Information */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                    {/* Top Badge & Action Icons Row */}
                    <div className="flex items-center justify-between">
                        {/* Active status badge */}
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                            Active Status
                        </span>

                        {/* Share & Favorite Buttons */}
                        <div className="flex gap-2">
                            <button
                                type="button"
                                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-[#141414] text-neutral-400 transition hover:bg-[#1f1f1f] hover:text-white"
                                aria-label="Share product"
                            >
                                <Share2 className="h-4 w-4" />
                            </button>
                            <button
                                type="button"
                                onClick={() => setIsFavorited(!isFavorited)}
                                className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/5 bg-[#141414] transition hover:bg-[#1f1f1f] ${isFavorited ? 'text-yellow-500' : 'text-neutral-400'
                                    }`}
                                aria-label="Add to favorites"
                            >
                                <Star className={`h-4 w-4 ${isFavorited ? 'fill-yellow-500' : ''}`} />
                            </button>
                        </div>
                    </div>

                    {/* Product Title */}
                    <h1 className="text-3xl font-extrabold tracking-tight text-white lg:text-4xl">
                        ECO .50 CAL PAINTBALLS
                    </h1>

                    {/* SKU and Category Row */}
                    <div className="flex flex-wrap items-center gap-3">
                        <span className="rounded-lg bg-neutral-900 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-neutral-400">
                            SKU: PB-58421
                        </span>
                        <span className="text-[11px] font-extrabold uppercase tracking-widest text-red-600">
                            CATEGORY: PAINTBALLS
                        </span>
                    </div>

                    {/* Pricing Section */}
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-semibold text-white">$89.00</span>
                        <span className="text-xs text-neutral-500">/ unit</span>
                    </div>

                    {/* Description Paragraph */}
                    <p className="text-sm leading-relaxed text-neutral-400">
                        Premium professional grade paintball rounds for high-performance markers.
                        Environmentally friendly gelatin shell with high-visibility fill.
                    </p>

                    {/* Edit Button + Cards — no gap between them */}
                    <div className="flex flex-col gap-4">
                        {/* Edit Product Action Button */}
                        <button
                            type="button"
                            className="inline-flex h-10 w-36 items-center justify-center gap-2 rounded-xl bg-red-600 text-xs font-semibold text-white shadow-[0_0_24px_rgba(239,68,68,0.38)] transition hover:bg-red-700"
                        >
                            <Edit2 className="h-4 w-4" />
                            EDIT PRODUCT
                        </button>

                        {/* Cards section (Total Stock & Low Stock Alert) */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Total Stock Card */}
                            <div className="rounded-2xl border border-white/5 bg-[#141414] p-5 flex flex-col justify-between min-h-[120px]">
                                <div className="flex items-start justify-between">
                                    <div className="rounded-lg bg-neutral-900 p-2 text-neutral-400">
                                        <Warehouse className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-bold tracking-widest text-emerald-400 uppercase">
                                        HEALTHY
                                    </span>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold text-white">245</div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                                        TOTAL STOCK
                                    </div>
                                </div>
                            </div>

                            {/* Low Stock Alert Card */}
                            <div className="rounded-2xl border border-white/5 bg-[#141414] p-5 flex flex-col justify-between min-h-[120px]">
                                <div className="flex items-start justify-between">
                                    <div className="rounded-lg bg-neutral-900 p-2 text-red-500/80">
                                        <Bell className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-bold tracking-widest text-red-500 uppercase">
                                        ENABLED
                                    </span>
                                </div>
                                <div>
                                    <div className="text-2xl font-semibold text-white">50</div>
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 mt-1">
                                        LOW STOCK ALERT
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MoreDetails