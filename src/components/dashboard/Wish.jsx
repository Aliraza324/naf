import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectWishlistItems, removeFromWishlist } from '../../features/wishlist/wishlistSlice'

function ProductCard({ product, onRemove }) {
  const img = product.img || product.image || ''
  const title = product.name || product.title || ''
  const category = product.category || ''
  const price = product.price || ''
  const badge = product.badge || null
  const stock = product.stock || 'IN STOCK'
  const isLow = stock === 'LOW STOCK'

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col group">
      {badge && (
        <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold tracking-widest px-2 py-0.5 uppercase">
          {badge}
        </span>
      )}
      <button
        onClick={() => onRemove(product.id)}
        className="absolute top-3 right-3 z-10 w-6 h-6 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-red-600 transition-colors text-sm leading-none"
        aria-label="Remove"
      >
        ×
      </button>

      <div className="h-44 overflow-hidden bg-neutral-800">
        <img
          src={img}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-[10px] tracking-widest text-red-500 uppercase font-medium mb-1.5">
            {category}
          </p>
          <h3 className="text-sm font-bold text-white uppercase leading-tight">
            {title}
          </h3>
        </div>

        <p className="text-xl font-black text-white">{price}</p>

        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isLow ? 'bg-yellow-400' : 'bg-green-500'}`} />
          <span className={`text-[10px] tracking-widest font-bold uppercase ${isLow ? 'text-yellow-400' : 'text-green-500'}`}>
            {stock}
          </span>
        </div>

        <button className="mt-auto w-full bg-red-600 hover:bg-red-700 active:scale-[0.98] transition-all text-white text-xs font-bold tracking-widest uppercase py-3 px-4 flex items-center justify-between group/btn">
          <span>Add to Cart</span>
          <span className="group-hover/btn:translate-x-1 transition-transform">›</span>
        </button>
      </div>
    </div>
  )
}

function AddMoreCard() {
  return (
    <div className="bg-neutral-900 border border-neutral-800 border-dashed rounded-xl flex flex-col items-center justify-center gap-3 min-h-[320px] p-6">
      <button className="w-12 h-12 rounded-full border-2 border-neutral-600 flex items-center justify-center text-neutral-400 hover:border-red-500 hover:text-red-500 transition-colors text-2xl font-light">
        +
      </button>
      <div className="text-center">
        <p className="text-xs font-bold tracking-widest text-white uppercase mb-1">Add More Gear</p>
        <p className="text-[10px] text-neutral-500 uppercase tracking-wider">Your loadout is not yet complete</p>
      </div>
      <button className="border border-neutral-600 hover:border-red-600 hover:text-red-500 text-neutral-400 text-[10px] font-bold tracking-widest uppercase py-2 px-5 transition-colors">
        Browse Shop
      </button>
    </div>
  )
}

export default function Wish() {
  const dispatch = useDispatch()
  const items = useSelector(selectWishlistItems)

  const removeItem = (id) => dispatch(removeFromWishlist(id))

  return (
    <div className="bg-black min-h-screen px-4 py-8 sm:px-8 lg:px-12 font-sans">
      <div className="max-w-7xl mx-auto">

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="block w-6 h-0.5 bg-red-600" />
            <span className="text-[10px] tracking-[0.2em] text-neutral-400 uppercase font-medium">Saved Products</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase leading-none mb-3">
            Your <span className="text-red-600">Wishlist</span>
          </h1>
          <p className="text-sm text-neutral-400 max-w-lg leading-relaxed">
            Ready your loadout. Review your saved tactical gear and add them to your deployment kit when you're ready to dominate.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {items.map(product => (
            <ProductCard key={product.id} product={product} onRemove={removeItem} />
          ))}
          <AddMoreCard />
        </div>

        {items.length === 0 && (
          <div className="text-center py-20">
            <p className="text-neutral-500 text-sm uppercase tracking-widest">Your wishlist is empty</p>
          </div>
        )}
      </div>
    </div>
  )
}