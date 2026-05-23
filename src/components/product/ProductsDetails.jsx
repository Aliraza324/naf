import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { ShieldCheck, Star } from 'lucide-react'
import smokeImage from '../../assets/images/smoke.png'
import toast from '../../utils/toast'
import { addItemsToCart } from '../../features/cart/cartSlice'

const thumbnails = [
    { id: 'front', image: smokeImage, label: 'Front view' },
    { id: 'side', image: smokeImage, label: 'Side view' },
    { id: 'pack', image: smokeImage, label: 'Pack view' },
]

const volumeTiers = [
    { range: '1 - 10 pic', price: '$32.50', maxQuantity: 10 },
    { range: '11 - 50 pic', price: '$29.00', maxQuantity: 50 },
    { range: '51+ pic', price: '$26.50', maxQuantity: null },
]

const packMatrix = [
    {
        color: 'Stealth Black',
        swatch: 'border border-white/40 bg-transparent',
        packs: ['4', '5', '10', '1'],
    },
    {
        color: 'Desert Tan',
        swatch: 'bg-[#d9b982]',
        packs: ['0', '0', '5', '0'],
    },
    {
        color: 'Olive Drab',
        swatch: 'bg-[#718436]',
        packs: ['2', '4', '6', '8'],
    },
]

const productDetails = {
    id: 'enola-gaye-wp40-grenades-100-pack',
    name: 'Enola Gaye WP40 Grenades 100 Pack',
    image: smokeImage,
}

const packOptions = [
    { label: 'Pack ( 10 pic )', size: '10 pic' },
    { label: 'Pack ( 20 pic )', size: '20 pic' },
    { label: 'Pack ( 40 pic )', size: '40 pic' },
    { label: 'Pack ( 80 pic )', size: '80 pic' },
]

const createInitialPackQuantities = () =>
    packMatrix.reduce((quantities, row) => {
        quantities[row.color] = row.packs.map(() => '0')
        return quantities
    }, {})

const ProductsDetails = () => {
    const dispatch = useDispatch()
    const { slug } = useParams()
    const [packQuantities, setPackQuantities] = useState(createInitialPackQuantities)
    const [selectedTier, setSelectedTier] = useState(null)
    const [quantityError, setQuantityError] = useState('')

    const selectedTierDetails = volumeTiers.find((tier) => tier.range === selectedTier)
    const maxQuantity = selectedTierDetails?.maxQuantity ?? null

    const showQuantityError = (limit) => {
        const message = `Selected tier allows a maximum quantity of ${limit} pieces.`
        setQuantityError(message)
        toast.error(message)
    }

    const handleTierSelect = (tier) => {
        setSelectedTier(tier.range)

        if (!tier.maxQuantity) {
            setQuantityError('')
            return
        }

        let hadOverLimitQuantity = false
        const nextQuantities = Object.fromEntries(
            Object.entries(packQuantities).map(([color, quantities]) => [
                color,
                quantities.map((quantity) => {
                    if (Number(quantity) > tier.maxQuantity) {
                        hadOverLimitQuantity = true
                        return String(tier.maxQuantity)
                    }

                    return quantity
                }),
            ]),
        )

        if (hadOverLimitQuantity) {
            setPackQuantities(nextQuantities)
            showQuantityError(tier.maxQuantity)
            return
        }

        setQuantityError('')
    }

    const handlePackQuantityChange = (color, packIndex, value) => {
        const numericValue = value.replace(/\D/g, '')
        const nextValue = numericValue ? String(Number(numericValue)) : '0'

        if (maxQuantity && Number(nextValue) > maxQuantity) {
            showQuantityError(maxQuantity)
            return
        }

        setPackQuantities((currentQuantities) => ({
            ...currentQuantities,
            [color]: currentQuantities[color].map((quantity, index) =>
                index === packIndex ? nextValue : quantity,
            ),
        }))
        setQuantityError('')
    }

    const handleAddToCart = (event) => {
        event.preventDefault()

        if (!selectedTier) {
            toast.warning('Please select the Volume Tier first')
            return
        }

        const cartItems = packMatrix.flatMap((row) =>
            packQuantities[row.color].flatMap((quantity, index) => {
                const numericQuantity = Number(quantity)

                if (numericQuantity <= 0 || row.packs[index] === '0') {
                    return []
                }

                return {
                    productId: slug || productDetails.id,
                    productName: productDetails.name,
                    productImage: productDetails.image,
                    color: row.color,
                    size: packOptions[index].size,
                    quantity: numericQuantity,
                    unitPrice: Number(selectedTierDetails.price.replace(/[^0-9.]/g, '')),
                    price: selectedTierDetails.price,
                    volumeTier: selectedTierDetails.range,
                    variants: {
                        pack: packOptions[index].label,
                        packQuantity: row.packs[index],
                    },
                }
            }),
        )

        if (cartItems.length === 0) {
            toast.warning('Please enter a quantity before adding to cart')
            return
        }

        dispatch(addItemsToCart(cartItems))
        toast.success('Product added to cart')
    }

    return (
        <section className='bg-page px-4 py-10 text-white sm:py-14 lg:px-6'>
            <div className='mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[minmax(0,0.98fr)_minmax(0,1.02fr)] lg:gap-16'>
                <div className='min-w-0'>
                    <div className='relative grid min-h-[420px] place-items-center overflow-hidden rounded-[18px] bg-black px-8 py-8 sm:min-h-[540px]'>
                        <img
                            src={smokeImage}
                            alt='Enola Gaye WP40 Grenades 100 Pack'
                            className='h-full max-h-[500px] w-full object-contain'
                            loading='eager'
                            decoding='async'
                        />

                        <div className='absolute bottom-5 left-1/2 flex w-[min(78%,278px)] -translate-x-1/2 items-center gap-3 rounded-[14px] bg-[#282936]/95 px-4 py-3 shadow-2xl ring-1 ring-white/10 backdrop-blur'>
                            <img
                                src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=80&q=80'
                                alt=''
                                className='size-9 rounded-full object-cover'
                            />
                            <div className='min-w-0 flex-1'>
                                <p className='truncate text-xs font-bold text-white'>Sarah Jenkins</p>
                                <p className='mt-1 truncate text-[10px] text-white/50'>Purchased 2 hours ago</p>
                            </div>
                            <div className='flex shrink-0 items-center gap-1 rounded-md bg-white/10 px-2 py-1 text-[10px] font-black text-white'>
                                <Star size={11} className='fill-primary text-primary' />
                                5.0
                            </div>
                        </div>
                    </div>

                    <div className='mt-5 grid grid-cols-3 gap-4 sm:gap-5'>
                        {thumbnails.map((item) => (
                            <button
                                key={item.id}
                                type='button'
                                aria-label={item.label}
                                className='grid aspect-square place-items-center rounded-[12px] border border-white/20 bg-black p-3 transition hover:border-primary'
                            >
                                <img src={item.image} alt='' className='h-full w-full object-contain' />
                            </button>
                        ))}
                    </div>
                </div>

                <div className='min-w-0 pt-0 lg:pt-1'>
                    <p className='flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.24em] text-[#26df73]'>
                        <span className='size-2 rounded-full bg-[#26df73] shadow-[0_0_12px_rgba(38,223,115,0.9)]' />
                        In Stock - Ready For Deployment
                    </p>

                    <h1 className='mt-4 max-w-[640px] text-[clamp(1rem,5vw,3rem)] font-black leading-[0.98] tracking-[-0.02em] text-white'>
                        {productDetails.name}
                    </h1>

                    <p className='mt-6 max-w-[520px] text-sm leading-6 text-white/45 sm:text-base'>
                        Standard recreational paint. Biodegradable, bright yellow...
                    </p>

                    <div className='mt-8 max-w-[500px]'>
                        <div className='mb-3 flex items-center justify-between gap-4 text-xs font-semibold'>
                            <span className='text-white/90'>Volume Tier</span>
                            <span className='text-primary underline decoration-primary/50 underline-offset-4'>
                                Price/Case
                            </span>
                        </div>

                        <div className='grid gap-4'>
                            {volumeTiers.map((tier) => {
                                const isSelected = selectedTier === tier.range

                                return (
                                    <div key={tier.range} className='grid grid-cols-2 gap-3'>
                                        <button
                                            type='button'
                                            onClick={() => handleTierSelect(tier)}
                                            className={`rounded-[9px] border bg-[#151515] px-4 py-4 text-center text-sm font-semibold transition hover:border-primary/70 hover:text-white ${isSelected
                                                    ? 'border-primary text-primary'
                                                    : 'border-white/10 text-white/85'
                                                }`}
                                        >
                                            {tier.range}
                                        </button>
                                        <button
                                            type='button'
                                            onClick={() => handleTierSelect(tier)}
                                            className={`rounded-[9px] border bg-[#151515] px-4 py-4 text-center text-sm font-semibold transition hover:border-primary/70 hover:text-white ${isSelected
                                                    ? 'border-primary text-primary'
                                                    : 'border-white/10 text-white/85'
                                                }`}
                                        >
                                            {tier.price}
                                        </button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                    <div className='mt-8 w-full max-w-[560px] overflow-x-auto rounded-[10px] border border-white/10 bg-[#070707]'>
                        <div className='min-w-[520px]'>
                            <div className='grid grid-cols-[1.2fr_repeat(4,0.9fr)] bg-[#1c1c1f] px-4 py-4 text-[8px] font-black uppercase tracking-[0.08em] text-white/50 sm:text-[9px]'>
                                <span>Color / Packs</span>
                                {packOptions.map((option) => (
                                    <span key={option.label} className='text-center'>{option.label}</span>
                                ))}
                            </div>

                            {packMatrix.map((row) => (
                                <div
                                    key={row.color}
                                    className='grid grid-cols-[1.2fr_repeat(4,0.9fr)] items-center gap-2 border-t border-white/6 px-4 py-3 text-[10px] sm:text-xs'
                                >
                                    <div className='flex min-w-0 items-center gap-3'>
                                        <span className={`size-3 shrink-0 rounded-full ${row.swatch}`} />
                                        <span className='truncate font-semibold text-white/75'>{row.color}</span>
                                    </div>

                                    {row.packs.map((pack, index) => {
                                        const inputId = `${row.color}-${index}`
                                        const isAvailable = pack !== '0'

                                        return (
                                            <input
                                                key={inputId}
                                                aria-label={`${row.color} pack ${index + 1} quantity`}
                                                type='number'
                                                inputMode='numeric'
                                                min='0'
                                                max={maxQuantity ?? undefined}
                                                disabled={!isAvailable}
                                                value={packQuantities[row.color][index]}
                                                onChange={(event) =>
                                                    handlePackQuantityChange(row.color, index, event.target.value)
                                                }
                                                className={`h-[34px] w-full rounded-[3px] border border-transparent bg-white/8 px-2 text-center font-semibold text-white/45 outline-none transition [appearance:textfield] focus:border-primary focus:text-white [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${isAvailable
                                                        ? 'hover:border-primary/70 hover:text-white'
                                                        : 'cursor-not-allowed opacity-60'
                                                    }`}
                                            />
                                        )
                                    })}
                                </div>
                            ))}
                        </div>
                    </div>

                    {quantityError && (
                        <p className='mt-3 max-w-[560px] text-xs font-semibold text-primary'>
                            {quantityError}
                        </p>
                    )}

                    <div className='mt-8 flex flex-col gap-4 sm:flex-row'>
                        <button
                            type='button'
                            onClick={handleAddToCart}
                            className='flex h-12 items-center justify-center rounded-[6px] border border-primary px-10 text-center text-xs font-black uppercase tracking-[0.12em] text-primary transition hover:bg-primary hover:text-white sm:h-14 sm:min-w-[190px]'
                        >
                            Add To Cart
                        </button>
                        <Link
                            to='/checkout'
                            className='brand-red-gradient flex h-12 items-center justify-center rounded-[6px] px-10 text-xs font-black uppercase tracking-[0.12em] text-white shadow-[0_10px_26px_rgba(230,1,3,0.25)] transition active:translate-y-0.5 sm:h-14 sm:min-w-[190px]'
                        >
                            Buy Now
                        </Link>
                    </div>

                    <p className='mt-8 flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.18em] text-white/40'>
                        <ShieldCheck size={16} className='shrink-0 text-primary' />
                        Encrypted Transaction & Tactical Security Guarantee
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ProductsDetails
