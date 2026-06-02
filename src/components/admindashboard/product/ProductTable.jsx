import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Eye, Edit2, Trash2, AlertTriangle, User } from 'lucide-react'
import Pagination from '../Pagination'

const initialProducts = [
    {
        id: '#ORD-0921',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: true,
        stock: 'In stock',
        category: 'BBS',
    },
    {
        id: '#ORD-0922',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: false,
        stock: 'In stock',
        category: 'BBS',
    },
    {
        id: '#ORD-0923',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: true,
        stock: 'In stock',
        category: 'BBS',
    },
    {
        id: '#ORD-0924',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: true,
        stock: 'In stock',
        category: 'BBS',
    },
    {
        id: '#ORD-0925',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: true,
        stock: 'In stock',
        category: 'BBS',
    },
    {
        id: '#ORD-0926',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: true,
        stock: 'In stock',
        category: 'BBS',
    },
    {
        id: '#ORD-0927',
        name: 'Alpha Tech Supply',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=100&h=100&q=80',
        amount: '$4,250.00',
        enabled: true,
        stock: 'In stock',
        category: 'BBS',
    },
]

const ProductTable = () => {
    const navigate = useNavigate()
    const [products, setProducts] = useState(initialProducts)
    const [deleteIndex, setDeleteIndex] = useState(null)

    const toggleStatus = (indexToToggle) => {
        setProducts((prev) =>
            prev.map((product, index) =>
                index === indexToToggle ? { ...product, enabled: !product.enabled } : product,
            ),
        )
    }

    const handleDelete = (indexToDelete) => {
        setProducts((prev) => prev.filter((_, index) => index !== indexToDelete))
        setDeleteIndex(null)
    }

    return (
        <>
            <div className="overflow-hidden rounded-2xl border border-white/5 bg-[#111111]">
                {/* Header section */}
                <div className="flex items-center justify-between border-b border-white/5 px-5 py-4">
                    <div>
                        <h2 className="text-base font-bold text-white">All Products</h2>
                        <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-neutral-500">
                            LOG_FEED: LIVE
                        </p>
                    </div>
                    <button type="button" className="text-xs text-neutral-500 transition hover:text-white">
                        View All Logs
                    </button>
                </div>

                {/* Table section */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-left text-xs">
                        <thead>
                            <tr className="border-b border-white/5 bg-[#121212]/50 text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
                                <th className="px-5 py-3">PRODUCT ID</th>
                                <th className="px-5 py-3">PRODUCTS</th>
                                <th className="px-5 py-3">AMOUNT</th>
                                <th className="px-5 py-3">ENABLE / DISABLE</th>
                                <th className="px-5 py-3">STOCK</th>
                                <th className="px-5 py-3">CATEGORIES</th>
                                <th className="px-5 py-3 text-right">ACTION</th>
                            </tr>
                        </thead>
                        <tbody className="text-neutral-300">
                            {products.map((product, index) => (
                                <tr
                                    key={index}
                                    className="border-b border-white/5 last:border-0 transition hover:bg-white/[0.02]"
                                >
                                    {/* Product ID */}
                                    <td className="px-5 py-3 font-medium text-neutral-400">{product.id}</td>

                                    {/* Product name & image */}
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={product.image}
                                                alt={product.name}
                                                className="h-8 w-8 rounded-full object-cover"
                                            />
                                            <span className="font-medium text-white">{product.name}</span>
                                        </div>
                                    </td>

                                    {/* Amount */}
                                    <td className="px-5 py-3 font-medium text-white">{product.amount}</td>

                                    {/* Enable / Disable Toggle */}
                                    <td className="px-5 py-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-xs font-semibold text-white min-w-[48px]">
                                                {product.enabled ? 'Enable' : 'Disable'}
                                            </span>
                                            <button
                                                type="button"
                                                onClick={() => toggleStatus(index)}
                                                className={`relative h-5 w-9 rounded-full transition ${product.enabled ? 'bg-[#73d84a]' : 'bg-red-600'
                                                    }`}
                                            >
                                                <span
                                                    className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition ${product.enabled ? 'left-[18px]' : 'left-0.5'
                                                        }`}
                                                />
                                            </button>
                                        </div>
                                    </td>

                                    {/* Stock status */}
                                    <td className="px-5 py-3">
                                        <span className="inline-flex items-center gap-1.5 rounded border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                            {product.stock}
                                        </span>
                                    </td>

                                    {/* Categories */}
                                    <td className="px-5 py-3 font-medium text-neutral-400">{product.category}</td>

                                    {/* Action buttons */}
                                    <td className="px-5 py-3">
                                        <div className="flex items-center justify-end gap-3 text-neutral-400">
                                            <button
                                                type="button"
                                                onClick={() => navigate(`/admin/products/${product.id.replace('#', '')}`)}
                                                className="rounded p-1 hover:bg-white/5 hover:text-white transition"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                className="rounded p-1 hover:bg-white/5 hover:text-white transition"
                                            >
                                                <Edit2 className="h-3.5 w-3.5" />
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => setDeleteIndex(index)}
                                                className="rounded p-1 hover:bg-white/5 hover:text-red-500 transition"
                                            >
                                                <Trash2 className="h-3.5 w-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <Pagination />

            {deleteIndex !== null && (
                <div className="fixed inset-0 bg-black/70 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
                    <div className="bg-[#141414] border border-white/10 rounded-2xl w-full max-w-[350px] p-4 flex flex-col items-center text-center space-y-3 shadow-[0_0_40px_rgba(239,68,68,0.12)]">
                        {/* Alert Circle Header Icon */}
                        <div className="bg-red-500/10 text-red-500 rounded-full p-3 h-12 w-12 flex items-center justify-center border border-red-500/25">
                            <AlertTriangle className="h-6 w-6" />
                        </div>

                        {/* Title & Description */}
                        <div className="space-y-1">
                            <h3 className="text-base font-extrabold tracking-wider text-white uppercase">
                                DELETE PRODUCT?
                            </h3>
                            <p className="text-[11px] text-neutral-400 leading-relaxed max-w-[300px] mx-auto">
                                This action will <span className="text-red-500 font-medium">permanently remove</span> this product from the inventory system and may affect active dealer orders.
                            </p>
                        </div>

                        {/* Product Summary Mini Card */}
                        <div className="bg-[#0d0d0d] border border-white/5 rounded-xl p-2.5 w-full flex items-center gap-2.5 text-left">
                            <img
                                src={products[deleteIndex].image}
                                alt={products[deleteIndex].name}
                                className="h-10 w-10 rounded-lg object-cover bg-neutral-900 border border-white/5 shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-white uppercase truncate">
                                    {products[deleteIndex].name}
                                </h4>
                                <p className="text-[10px] text-neutral-500 mt-0.5">
                                    SKU: PB-{products[deleteIndex].id.replace('#', '')}
                                </p>
                                <div className="flex items-center gap-1.5 mt-0.5">
                                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                                    <span className="text-[9px] font-semibold text-emerald-400">
                                        245 Units Remaining
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Warning Box */}
                        <div className="border-l-2 border-red-500 bg-red-500/5 px-3 py-2 rounded-r-xl w-full text-left">
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500">
                                <AlertTriangle className="h-3 w-3" />
                                WARNING
                            </div>
                            <p className="text-[10px] text-neutral-400 leading-relaxed mt-1">
                                Deleted products cannot be restored unless a manual database backup exists.
                            </p>
                        </div>

                        {/* Buttons Block */}
                        <div className="w-full space-y-2">
                            <button
                                type="button"
                                onClick={() => handleDelete(deleteIndex)}
                                className="flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white h-9 w-full rounded-xl text-xs font-bold uppercase tracking-widest transition shadow-[0_0_20px_rgba(239,68,68,0.25)]"
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                                DELETE PRODUCT
                            </button>
                            <button
                                type="button"
                                onClick={() => setDeleteIndex(null)}
                                className="w-full h-9 rounded-xl border border-white/5 bg-transparent text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/[0.02] transition"
                            >
                                CANCEL
                            </button>
                        </div>

                        {/* Authorization Footer */}
                        <div className="w-full border-t border-white/5 pt-2.5 flex items-center justify-between text-left">
                            <div className="flex items-center gap-2">
                                <img
                                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=50&h=50&q=80"
                                    alt="Commander Reed"
                                    className="h-6 w-6 rounded-full object-cover border border-white/10"
                                />
                                <div>
                                    <div className="text-[10px] font-bold text-white">Commander Reed</div>
                                    <div className="text-[8px] font-semibold tracking-widest text-neutral-500 uppercase">
                                        AUTHORIZATION REQ.
                                    </div>
                                </div>
                            </div>
                            <div className="text-[9px] font-mono text-neutral-400 bg-neutral-900 border border-white/5 px-2 py-0.5 rounded">
                                ID: 568:1850
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default ProductTable