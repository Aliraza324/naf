import { Link, useParams } from 'react-router-dom'
import smokeGrenade from '../../assets/images/smoke.png'
import { inventoryCategories } from '../../data/inventoryCategories'

const productGroups = {
    'grenades-smoke': {
        breadcrumb: ['Inventory', 'BBS', 'Grenades & Smoke'],
        title: 'Grenades & Smoke Products',
        products: Array.from({ length: 12 }, (_, index) => ({
            id: `grenade-${index + 1}`,
            category: 'BBS - Grenades',
            title: 'Grenades & Smoke New Products',
            price: '$12,499.00',
            status: 'In Stock',
            badge: index === 0 || index === 2 ? 'Elite-Grade' : '',
            image: smokeGrenade,
        })),
    },
}

const fallbackGroup = productGroups['grenades-smoke']

const findCategoryBySlug = (slug) => {
    for (const category of inventoryCategories) {
        const subCategory = category.subCategories.find((item) => item.slug === slug)

        if (subCategory) {
            return { category, subCategory }
        }
    }

    return null
}

const createDynamicGroup = (slug) => {
    const categoryMatch = findCategoryBySlug(slug)

    if (!categoryMatch) {
        return fallbackGroup
    }

    const { category, subCategory } = categoryMatch

    return {
        breadcrumb: ['Inventory', category.name, subCategory.name],
        title: `${subCategory.name} Products`,
        products: fallbackGroup.products.map((product, index) => ({
            ...product,
            id: `${slug}-${index + 1}`,
            category: `${category.name} - ${subCategory.name}`,
            title: `${subCategory.name} New Products`,
        })),
    }
}

const Products = () => {
    const { slug = 'grenades-smoke' } = useParams()
    const group = productGroups[slug] ?? createDynamicGroup(slug)
    const [firstCrumb, secondCrumb, activeCrumb] = group.breadcrumb

    return (
        <section className='bg-page px-4 py-10 text-white sm:py-12 lg:px-6'>
            <div className='mx-auto max-w-[1180px]'>
                <nav
                    aria-label='Breadcrumb'
                    className='flex flex-wrap items-center gap-x-1 gap-y-2 font-display text-[clamp(1.1rem,7vw,2.35rem)] font-black uppercase italic leading-[1.05] text-white sm:gap-x-2 sm:text-[clamp(1.65rem,3vw,2.35rem)]'
                >
                    <Link to='/' className='shrink-0 transition hover:text-primary'>
                        {firstCrumb}
                    </Link>
                    <span className='shrink-0 px-1 text-white sm:px-2'>&gt;</span>
                    <span className='shrink-0'>{secondCrumb}</span>
                    <span className='shrink-0 px-1 text-primary sm:px-2'>&gt;</span>
                    <span className='min-w-0 flex-1 basis-full break-words text-primary sm:basis-auto'>
                        {activeCrumb}
                    </span>
                </nav>

                <h1 className='mt-8 font-display text-[clamp(1.05rem,2vw,1.35rem)] font-black uppercase italic leading-none text-white'>
                    {group.title}
                </h1>

                <div className='mt-7 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                    {group.products.map((product) => (
                        <article
                            key={product.id}
                            className='group overflow-hidden rounded-[7px] border border-primary/15 bg-[#090908] shadow-[0_0_0_1px_rgba(255,255,255,0.015)] transition duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_0_26px_rgba(232,12,12,0.13)]'
                        >
                            <div className='relative grid aspect-[1.35] place-items-center bg-black px-8 py-5'>
                                {product.badge && (
                                    <span className='absolute right-0 top-0 bg-primary px-2 py-1 text-[7px] font-black uppercase leading-none tracking-[0.06em] text-white'>
                                        {product.badge}
                                    </span>
                                )}
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    loading='lazy'
                                    decoding='async'
                                    className='h-full max-h-[150px] w-auto object-contain transition duration-500 group-hover:scale-105'
                                />
                            </div>

                            <div className='px-4 pb-4 pt-3'>
                                <p className='text-[8px] font-black uppercase leading-none tracking-[0.16em] text-primary'>
                                    {product.category}
                                </p>
                                <h2 className='mt-2 min-h-10 max-w-[170px] text-[13px] font-black uppercase leading-[1.08] text-white'>
                                    {product.title}
                                </h2>

                                <div className='mt-4 flex items-end justify-between gap-3'>
                                    <div>
                                        <p className='text-[12px] font-black leading-none text-white'>{product.price}</p>
                                        <p className='mt-2 flex items-center gap-1.5 text-[8px] font-black uppercase leading-none tracking-[0.08em] text-[#27d86c]'>
                                            <span className='grid size-2.5 place-items-center rounded-full bg-[#27d86c] text-[6px] text-black'>
                                                ✓
                                            </span>
                                            {product.status}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/product-details/${slug}`}
                                        className='brand-red-gradient flex h-8 shrink-0 items-center justify-center rounded-[4px] px-4 text-center text-[8px] font-black uppercase tracking-[0.08em] text-white shadow-[0_6px_16px_rgba(232,12,12,0.26)] transition active:translate-y-0.5'
                                    >
                                        View More
                                    </Link>
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Products
