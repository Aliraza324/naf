import React, { useState } from 'react'

const categories = ['BBS', 'Guns', 'Goggles & masks', 'Tactical Gear', 'Optics', 'Gas', 'Batteries', 'Apparel']

const products = [
  {
    id: 'vortex-nv-400',
    badge: 'ELITE-GRADE', badgeColor: 'bg-red-600',
    category: 'OPTICS / GEN-3', categoryColor: 'text-red-500',
    name: 'Vortex NV-400 Tactical Night Vision',
    price: '$12,499.00',
    stock: 'IN STOCK', stockColor: 'text-green-500',
    stockIcon: '●',
    orderBg: 'bg-red-600 hover:bg-red-700',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  },
  {
    id: 'kevlar-x-pro',
    badge: 'NEW OPS', badgeColor: 'bg-green-600',
    category: 'BALLISTICS / ARMOR', categoryColor: 'text-red-500',
    name: 'Kevlar-X Pro Plate Carrier - MC Black',
    price: '$1,250.00',
    stock: 'IN STOCK', stockColor: 'text-green-500',
    stockIcon: '●',
    orderBg: 'bg-red-600 hover:bg-red-700',
    img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80',
  },
  {
    id: 'trijicon-rmr',
    badge: null,
    category: 'OPTICS / SIGHTING', categoryColor: 'text-red-500',
    name: 'Trijicon RMR Type 2 Red Dot Sight',
    price: '$545.00',
    stock: 'LOW STOCK', stockColor: 'text-yellow-500',
    stockIcon: '●',
    orderBg: 'bg-red-600 hover:bg-red-700',
    img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&q=80',
  },
  {
    id: 'comtac-vi',
    badge: null,
    category: 'COMMS / AUDIO', categoryColor: 'text-red-500',
    name: 'COMTAC VI Tactical Headset Dual-Lead',
    price: '$980.00',
    stock: 'IN STOCK', stockColor: 'text-green-500',
    stockIcon: '●',
    orderBg: 'bg-red-600 hover:bg-red-700',
    img: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&q=80',
  },
  {
    id: 'ops-core-fast',
    badge: 'ELITE-GRADE', badgeColor: 'bg-red-600',
    category: 'BALLISTICS / HELMETS', categoryColor: 'text-red-500',
    name: 'Ops-Core FAST SF Ballistic Helmet',
    price: '$1,890.00',
    stock: 'OUT OF STOCK', stockColor: 'text-orange-500',
    stockIcon: '⊘',
    orderBg: 'bg-neutral-700 hover:bg-neutral-600 cursor-not-allowed',
    img: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&q=80',
  },
  {
    id: 'surefire-m600df',
    badge: null,
    category: 'ILLUMINATION', categoryColor: 'text-red-500',
    name: 'SureFire M600DF Scout Light Weapon Light',
    price: '$299.00',
    stock: 'IN STOCK', stockColor: 'text-green-500',
    stockIcon: '●',
    orderBg: 'bg-red-600 hover:bg-red-700',
    img: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=400&q=80',
  },
]

export default function MainShop({ selectedProductId = null }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState(75)
  const [availability, setAvailability] = useState('inStock')
  const [sortBy, setSortBy] = useState('Highest Value')
  const [currentPage, setCurrentPage] = useState(1)

  const toggleCategory = (cat) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    )
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans lg:flex py-6 px-4 rounded-lg">
      {/* Sidebar */}
      <aside className="w-full border-b border-neutral-800 bg-neutral-900 p-4 sm:p-5 lg:w-56 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-5">
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
          {/* Categories */}
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">Categories</p>
            <div className="flex flex-col gap-2">
              {categories.map(cat => (
                <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => toggleCategory(cat)}
                  className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                    selectedCategories.includes(cat)
                      ? 'bg-red-600 border-red-600'
                      : 'border-neutral-600 bg-transparent group-hover:border-neutral-400'
                  }`}
                >
                  {selectedCategories.includes(cat) && (
                    <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">Price Range</p>
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            className="h-1 w-full accent-red-600"
          />
          <div className="mt-1 flex justify-between text-xs text-neutral-400">
            <span>$0</span>
            <span>$15,000+</span>
          </div>
        </div>

        {/* Availability */}
        <div>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">Availability</p>
          <div className="flex flex-col gap-2">
            {[['inStock', 'In Stock Only'], ['backordered', 'Show Backordered']].map(([val, label]) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setAvailability(val)}
                  className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                    availability === val ? 'border-red-500' : 'border-neutral-600'
                  }`}
                >
                  {availability === val && <div className="h-2 w-2 rounded-full bg-red-500" />}
                </div>
                <span className="text-sm text-neutral-300 transition-colors group-hover:text-white">{label}</span>
              </label>
            ))}
          </div>
        </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-red-600" />
              <h1 className="text-xl font-bold text-white sm:text-2xl">All products</h1>
            </div>
            <p className="ml-4 text-sm text-neutral-400">Displaying 42 tactical assets ready for enlistment</p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="cursor-pointer rounded border border-neutral-700 bg-neutral-800 px-3 py-2 pr-8 text-sm text-white focus:border-red-500 focus:outline-none"
            >
              <option>Highest Value</option>
              <option>Lowest Value</option>
              <option>Newest</option>
              <option>In Stock First</option>
            </select>
          </div>
        </div>

        {selectedProductId && (
          <div className="mb-4 rounded-lg border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-100">
            Selected product: <span className="font-semibold">{selectedProductId}</span>
          </div>
        )}

        {/* Product Grid */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {products.map((product, i) => {
            const isHighlighted = product.id === selectedProductId

            return (
              <div
                key={i}
                className={`overflow-hidden rounded-xl border bg-neutral-900 transition-all duration-300 group ${
                  isHighlighted
                    ? 'border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]'
                    : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-neutral-800">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span className={`absolute right-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${product.badgeColor}`}>
                      {product.badge}
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <p className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${product.categoryColor}`}>{product.category}</p>
                  <h3 className="mb-3 min-h-10 text-sm font-semibold leading-snug text-white">{product.name}</h3>
                  <p className="mb-2 text-base font-bold text-white">{product.price}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex items-center gap-1 text-xs font-semibold ${product.stockColor}`}>
                      <span className="text-[10px]">{product.stockIcon}</span>
                      {product.stock}
                    </span>
                    <button className={`${product.orderBg} rounded px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors`}>
                      ORDER
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {[1, 2, 3].map(p => (
            <button
              key={p}
              onClick={() => setCurrentPage(p)}
              className={`w-8 h-8 rounded text-sm font-bold transition-colors ${
                currentPage === p
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {p}
            </button>
          ))}
          <span className="text-neutral-500 text-sm px-1">...</span>
          <button
            onClick={() => setCurrentPage(12)}
            className={`w-8 h-8 rounded text-sm font-bold transition-colors ${
              currentPage === 12
                ? 'bg-red-600 text-white border border-red-600'
                : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700'
            }`}
          >
            12
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(12, currentPage + 1))}
            className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}