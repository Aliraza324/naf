import { useMemo, useState } from 'react'
import { dashboardProducts } from '../../data/dashboardProducts'

const maxProductPrice = 15000

export default function MainShop({ selectedProductId = null }) {
  const [selectedCategories, setSelectedCategories] = useState([])
  const [priceRange, setPriceRange] = useState(maxProductPrice)
  const [availability, setAvailability] = useState('inStock')
  const [sortBy, setSortBy] = useState('Highest Value')
  const [currentPage, setCurrentPage] = useState(1)

  const categories = useMemo(
    () => [...new Set(dashboardProducts.map((product) => product.categoryName))],
    [],
  )

  const filteredProducts = useMemo(() => {
    const nextProducts = dashboardProducts.filter((product) => {
      const matchesCategory =
        selectedCategories.length === 0 || selectedCategories.includes(product.categoryName)
      const matchesPrice = product.priceValue <= priceRange
      const matchesAvailability =
        availability === 'backordered' || product.availability === 'inStock'

      return matchesCategory && matchesPrice && matchesAvailability
    })

    return [...nextProducts].sort((a, b) => {
      if (sortBy === 'Lowest Value') return a.priceValue - b.priceValue
      if (sortBy === 'Newest') return b.id.localeCompare(a.id)
      if (sortBy === 'In Stock First') {
        return Number(b.availability === 'inStock') - Number(a.availability === 'inStock')
      }

      return b.priceValue - a.priceValue
    })
  }, [availability, priceRange, selectedCategories, sortBy])

  const toggleCategory = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category],
    )
    setCurrentPage(1)
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white font-sans lg:flex py-6 px-4 rounded-lg">
      <aside className="h-max w-full self-start border-b border-neutral-800 bg-neutral-900 p-4 sm:p-5 lg:sticky lg:top-28 lg:w-56 lg:shrink-0 lg:border-b-0 lg:border-r lg:p-5">
        <div className="grid gap-6 sm:grid-cols-3 lg:grid-cols-1">
          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">
              Categories
            </p>
            <div className="flex flex-col gap-2">
              {categories.map((category) => (
                <label key={category} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    onClick={() => toggleCategory(category)}
                    className={`w-4 h-4 rounded-sm border flex items-center justify-center shrink-0 transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-red-600 border-red-600'
                        : 'border-neutral-600 bg-transparent group-hover:border-neutral-400'
                    }`}
                  >
                    {selectedCategories.includes(category) && (
                      <svg
                        className="w-2.5 h-2.5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-neutral-300 group-hover:text-white transition-colors">
                    {category}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">
              Price Range
            </p>
            <input
              type="range"
              min={0}
              max={maxProductPrice}
              step={100}
              value={priceRange}
              onChange={(event) => {
                setPriceRange(Number(event.target.value))
                setCurrentPage(1)
              }}
              className="h-1 w-full accent-red-600"
            />
            <div className="mt-1 flex justify-between text-xs text-neutral-400">
              <span>$0</span>
              <span>$15,000+</span>
            </div>
          </div>

          <div>
            <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-red-500">
              Availability
            </p>
            <div className="flex flex-col gap-2">
              {[
                ['inStock', 'In Stock Only'],
                ['backordered', 'Show Backordered'],
              ].map(([value, label]) => (
                <label key={value} className="flex items-center gap-2 cursor-pointer group">
                  <div
                    onClick={() => {
                      setAvailability(value)
                      setCurrentPage(1)
                    }}
                    className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                      availability === value ? 'border-red-500' : 'border-neutral-600'
                    }`}
                  >
                    {availability === value && <div className="h-2 w-2 rounded-full bg-red-500" />}
                  </div>
                  <span className="text-sm text-neutral-300 transition-colors group-hover:text-white">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="mb-1 flex items-center gap-3">
              <div className="h-6 w-1 rounded-full bg-red-600" />
              <h1 className="text-xl font-bold text-white sm:text-2xl">All products</h1>
            </div>
            <p className="ml-4 text-sm text-neutral-400">
              Displaying {filteredProducts.length} tactical assets ready for enlistment
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
            <span className="text-xs uppercase tracking-widest text-neutral-400">Sort By:</span>
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
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

        <div className="mb-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product) => {
            const isHighlighted = product.id === selectedProductId

            return (
              <div
                key={product.id}
                className={`overflow-hidden rounded-xl border bg-neutral-900 transition-all duration-300 group ${
                  isHighlighted
                    ? 'border-red-500 shadow-[0_0_0_1px_rgba(239,68,68,0.5)]'
                    : 'border-neutral-800 hover:border-neutral-600'
                }`}
              >
                <div className="relative overflow-hidden bg-neutral-800">
                  <img
                    src={product.img}
                    alt={product.name}
                    className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {product.badge && (
                    <span
                      className={`absolute right-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${product.badgeColor}`}
                    >
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="p-4">
                  <p
                    className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${product.categoryColor}`}
                  >
                    {product.category}
                  </p>
                  <h3 className="mb-3 min-h-10 text-sm font-semibold leading-snug text-white">
                    {product.name}
                  </h3>
                  <p className="mb-2 text-base font-bold text-white">{product.price}</p>
                  <div className="flex items-center justify-between gap-3">
                    <span className={`flex items-center gap-1 text-xs font-semibold ${product.stockColor}`}>
                      <span className="h-2 w-2 rounded-full bg-current" />
                      {product.stock}
                    </span>
                    <button
                      className={`${product.orderBg} rounded px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors`}
                    >
                      ORDER
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 px-5 py-10 text-center text-sm text-neutral-400">
            No products match the selected filters.
          </div>
        )}

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          {[1, 2, 3].map((page) => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`w-8 h-8 rounded text-sm font-bold transition-colors ${
                currentPage === page
                  ? 'bg-red-600 text-white border border-red-600'
                  : 'bg-neutral-800 border border-neutral-700 text-neutral-300 hover:bg-neutral-700'
              }`}
            >
              {page}
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </main>
    </div>
  )
}
