import React, { useState } from 'react'

const categories = ['BBS', 'Guns', 'Goggles & masks', 'Tactical Gear', 'Optics', 'Gas', 'Batteries', 'Apparel']

const products = [
  {
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

export default function MainShop() {
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
    <div className="min-h-screen bg-neutral-950 text-white flex font-sans">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 bg-neutral-900 border-r border-neutral-800 p-5 flex flex-col gap-6">
        {/* Categories */}
        <div>
          <p className="text-[10px] font-bold tracking-widest text-red-500 uppercase mb-3">Categories</p>
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
          <p className="text-[10px] font-bold tracking-widest text-red-500 uppercase mb-3">Price Range</p>
          <input
            type="range"
            min={0}
            max={100}
            value={priceRange}
            onChange={e => setPriceRange(e.target.value)}
            className="w-full accent-red-600 h-1"
          />
          <div className="flex justify-between text-xs text-neutral-400 mt-1">
            <span>$0</span>
            <span>$15,000+</span>
          </div>
        </div>

        {/* Availability */}
        <div>
          <p className="text-[10px] font-bold tracking-widest text-red-500 uppercase mb-3">Availability</p>
          <div className="flex flex-col gap-2">
            {[['inStock', 'In Stock Only'], ['backordered', 'Show Backordered']].map(([val, label]) => (
              <label key={val} className="flex items-center gap-2 cursor-pointer group">
                <div
                  onClick={() => setAvailability(val)}
                  className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                    availability === val ? 'border-red-500' : 'border-neutral-600'
                  }`}
                >
                  {availability === val && <div className="w-2 h-2 rounded-full bg-red-500" />}
                </div>
                <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">{label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-6 bg-red-600 rounded-full" />
              <h1 className="text-2xl font-bold text-white">All products</h1>
            </div>
            <p className="text-neutral-400 text-sm ml-4">Displaying 42 tactical assets ready for enlistment</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 tracking-widest uppercase">Sort By:</span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white text-sm rounded px-3 py-2 appearance-none pr-8 cursor-pointer focus:outline-none focus:border-red-500"
            >
              <option>Highest Value</option>
              <option>Lowest Value</option>
              <option>Newest</option>
              <option>In Stock First</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {products.map((product, i) => (
            <div key={i} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-all duration-300 group">
              {/* Image */}
              <div className="relative overflow-hidden bg-neutral-800">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-44 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 right-3 ${product.badgeColor} text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded uppercase`}>
                    {product.badge}
                  </span>
                )}
              </div>

              {/* Info */}
              <div className="p-4">
                <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${product.categoryColor}`}>{product.category}</p>
                <h3 className="text-white font-semibold text-sm mb-3 leading-snug min-h-[2.5rem]">{product.name}</h3>
                <p className="text-white font-bold text-base mb-2">{product.price}</p>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold flex items-center gap-1 ${product.stockColor}`}>
                    <span className="text-[10px]">{product.stockIcon}</span>
                    {product.stock}
                  </span>
                  <button className={`${product.orderBg} text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded transition-colors`}>
                    ORDER
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-2">
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