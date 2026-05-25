import React, { useState } from 'react'

const products = [
  {
    id: 1,
    category: 'OPTICS / GEN-3',
    name: 'Vortex NV-400 Tactical Night Vision',
    price: '$12,499.00',
    stock: 'IN STOCK',
    badge: 'ELITE GRADE',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  },
  {
    id: 2,
    category: 'BALLISTICS / ARMOR',
    name: 'Kevlar-X Pro Plate Carrier - MC Black',
    price: '$1,250.00',
    stock: 'IN STOCK',
    badge: null,
    img: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?w=400&q=80',
  },
  {
    id: 3,
    category: 'OPTICS / SIGHTING',
    name: 'Trijicon RMR Type 2 Red Dot Sight',
    price: '$545.00',
    stock: 'LOW STOCK',
    badge: null,
    img: 'https://images.unsplash.com/photo-1504275107627-0c2ba7a43dba?w=400&q=80',
  },
  {
    id: 4,
    category: 'PROTECTION / HANDWEAR',
    name: 'Operator Pro Reinforced Gloves',
    price: '$85.00',
    stock: 'IN STOCK',
    badge: null,
    img: 'https://images.unsplash.com/photo-1609205807107-2b688b9e72c2?w=400&q=80',
  },
  {
    id: 5,
    category: 'PROTECTION / HEADWEAR',
    name: 'Velocity Pro Mask System - Matte Black',
    price: '$220.00',
    stock: 'IN STOCK',
    badge: null,
    img: 'https://images.unsplash.com/photo-1599499462522-8f21aeee738e?w=400&q=80',
  },
  {
    id: 6,
    category: 'GAS / AIR SYSTEMS',
    name: 'Empire Ultra 68/4500 HPA Tank',
    price: '$189.95',
    stock: 'IN STOCK',
    badge: null,
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80',
  },
]

function ProductCard({ product, onRemove }) {
  const isLow = product.stock === 'LOW STOCK'

  return (
    <div className="relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden flex flex-col group">
      {product.badge && (
        <span className="absolute top-3 left-3 z-10 bg-red-600 text-white text-[10px] font-bold tracking-widest px-2 py-0.5 uppercase">
          {product.badge}
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
          src={product.img}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="p-4 flex flex-col flex-1 gap-3">
        <div>
          <p className="text-[10px] tracking-widest text-red-500 uppercase font-medium mb-1.5">
            {product.category}
          </p>
          <h3 className="text-sm font-bold text-white uppercase leading-tight">
            {product.name}
          </h3>
        </div>

        <p className="text-xl font-black text-white">{product.price}</p>

        <div className="flex items-center gap-1.5">
          <span className={`w-1.5 h-1.5 rounded-full ${isLow ? 'bg-yellow-400' : 'bg-green-500'}`} />
          <span className={`text-[10px] tracking-widest font-bold uppercase ${isLow ? 'text-yellow-400' : 'text-green-500'}`}>
            {product.stock}
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
  const [items, setItems] = useState(products)

  const removeItem = (id) => setItems(prev => prev.filter(p => p.id !== id))

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