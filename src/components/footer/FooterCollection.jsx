import React from 'react'
import { collections } from '../../data/collections';
import { Link, useParams } from 'react-router-dom';


const FooterCollection = () => {
    const { category } = useParams()
    const items = collections[category] || []
    const title = category ? category.replaceAll('-', ' ').toUpperCase() : 'COLLECTIONS'
    return (
        <div>

            <main className="px-6 py-10">
                <div className="mx-auto max-w-7xl"> 
                    <header className="mb-4">
                        <div className="flex items-end gap-3">
                            <h2 className="text-3xl sm: font-black tracking-wider text-white/80">FOOTER</h2>
                            <span className="text-xl font-black tracking-wider text-red-600">&gt;</span>
                            <h1 className="text-2xl sm:text-3xl font-black tracking-wider text-[#E60103]">{title}</h1>
                        </div>
                       <i> <p className="mt-3 text-lg font-bold uppercase text-white/80">{title} PRODUCTS</p></i>
                    </header>

                    {items.length === 0 ? (
                        <p className="text-white/60">No items found for this category.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {items.map((p) => (
                                <article key={p.id} className="bg-[#0b0b0b] border border-white/5 rounded-md p-4 shadow-lg">
                                    <div className="relative mb-3 overflow-hidden rounded-md bg-black">
                                        <div className="h-44 w-full bg-white/5 flex items-center justify-center text-white/40">{p.image ? <img src={p.image} alt={p.title} className="object-cover h-44 w-full" /> : 'Image'}</div>
                                        <span className="absolute left-3 top-3 inline-block bg-red-700 text-[10px] font-black uppercase tracking-wider text-white px-2 py-1 rounded">{title.split(' ')[0]}</span>
                                    </div>

                                    <div className="flex flex-col gap-2">
                                        <div className="text-[11px] font-bold uppercase text-red-600">BBS • PAINTBALL</div>
                                        <h3 className="text-sm font-black text-white leading-tight">{p.title}</h3>
                                        <div className="flex items-center justify-between mt-2">
                                            <div>
                                                <div className="text-lg font-black text-white">${p.price.toFixed(2)}</div>
                                                <div className="text-[10px] text-green-500 font-semibold mt-1">● IN STOCK</div>
                                            </div>

                                            <Link to={`/product-details/${p.id}`} className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-xs font-black uppercase px-3 py-2 rounded">
                                                View More
                                            </Link>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </main>
        </div>
    )
}

export default FooterCollection