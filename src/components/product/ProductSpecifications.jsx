import { Axe, Layers, Ruler, TreePine } from 'lucide-react'

const specifications = [
    {
        title: 'Material',
        text: "Solid, sustainably sourced European Oak. Hand-finished with natural oils to preserve the wood's grain and character.",
        icon: TreePine,
    },
    {
        title: 'Type',
        text: 'Museum-grade acrylic glazing. Shatter-resistant, anti-reflective, and blocks 99% of harmful UV rays to prevent fading.',
        icon: Layers,
    },
    {
        title: 'Mounting',
        text: 'Includes premium wire hanging kit and D-rings pre-installed. Acid-free backing board and flex-points for easy loading.',
        icon: Axe,
    },
    {
        title: 'Size Dimensions',
        text: 'Face width: 0.75" (1.9 cm). Frame depth: 1.25" (3.1 cm). Rabbet depth: 0.875" (2.2 cm).',
        icon: Ruler,
    },
]

const ProductSpecifications = () => {
    return (
        <section className='border-t border-white/6 bg-[#151517] px-4 py-14 text-white sm:py-20 lg:px-6'>
            <div className='mx-auto grid max-w-[1180px] gap-10 lg:grid-cols-[0.9fr_1.8fr] lg:gap-16'>
                <div className='max-w-[360px]'>
                    <h2 className='text-[clamp(1.35rem,2.4vw,1.65rem)] font-black leading-tight text-white'>
                        Product Specifications
                    </h2>
                    <p className='mt-5 text-sm leading-7 text-white/45'>
                        Every detail is considered. Our frames are built to museum standards, ensuring your artwork is preserved and presented beautifully for generations.
                    </p>
                </div>

                <div className='grid gap-8 md:grid-cols-2'>
                    {specifications.map(({ title, text, icon: Icon }) => (
                        <article
                            key={title}
                            className='min-h-[166px] rounded-[14px] border border-white/7 bg-[#111112] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.02)]'
                        >
                            <div className='grid size-10 place-items-center rounded-[9px] bg-white/6 text-primary'>
                                <Icon size={18} strokeWidth={2.5} />
                            </div>

                            <h3 className='mt-6 text-base font-bold text-white'>{title}</h3>
                            <p className='mt-3 text-sm leading-6 text-white/45'>{text}</p>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ProductSpecifications
