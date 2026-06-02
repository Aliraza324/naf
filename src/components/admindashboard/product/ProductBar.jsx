import React, { useState } from 'react'
import { Search, ChevronDown, Plus } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const ProductBar = ({ onSearch }) => {
  const navigate = useNavigate()
  const [filters, setFilters] = useState({
    name: '',
    category: '',
    stock: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: value }))
  }

  const handleSearch = () => {
    if (onSearch) {
      onSearch(filters)
    }
  }

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-5 text-white">
      {/* Header Row */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between mb-7">
        <div>
          <h1 className="text-2xl font-bold leading-tight text-white">Products list</h1>
          <p className="mt-1 text-sm text-neutral-500">All NAF products here</p>
        </div>
        <button
          type="button"
          onClick={() => navigate('/admin/products/add')}
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-red-600 px-5 text-sm font-semibold text-white shadow-[0_0_24px_rgba(239,68,68,0.38)] transition hover:bg-red-700 sm:w-auto"
        >
          <Plus className="h-4 w-4" />
          Add Products
        </button>
      </div>

      {/* Filter / Search Panel */}
      <div className="rounded-lg border border-white/10 bg-[#141414] p-3 sm:p-4">
        <div className="grid gap-3 lg:grid-cols-[1fr_1fr_0.85fr_auto]">
          {/* Search by Name */}
          <label className="flex min-h-12 items-center gap-3 rounded border border-white/10 bg-[#111111] px-4 transition focus-within:border-neutral-600">
            <Search className="h-5 w-5 shrink-0 text-neutral-500" />
            <input
              type="text"
              name="name"
              value={filters.name}
              onChange={handleChange}
              placeholder="Search by Name"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </label>

          {/* Search by Categories */}
          <label className="flex min-h-12 items-center gap-3 rounded border border-white/10 bg-[#111111] px-4 transition focus-within:border-neutral-600">
            <Search className="h-5 w-5 shrink-0 text-neutral-500" />
            <input
              type="text"
              name="category"
              value={filters.category}
              onChange={handleChange}
              placeholder="Search by Categories"
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
            />
          </label>

          {/* Stock Dropdown */}
          <label className="flex min-h-12 items-center gap-3 rounded border border-white/10 bg-[#111111] px-4 transition focus-within:border-neutral-600">
            <select
              name="stock"
              value={filters.stock}
              onChange={handleChange}
              className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none appearance-none cursor-pointer"
            >
              <option value="" className="bg-[#111111] text-neutral-400">Stock</option>
              <option value="In stock" className="bg-[#111111] text-white">In stock</option>
              <option value="Out of stock" className="bg-[#111111] text-white">Out of stock</option>
            </select>
            <ChevronDown className="h-4 w-4 shrink-0 text-neutral-500 pointer-events-none" />
          </label>

          {/* Search Button */}
          <button
            type="button"
            onClick={handleSearch}
            className="min-h-12 rounded bg-red-600 px-9 text-sm font-bold text-white transition hover:bg-red-700"
          >
            Search
          </button>
        </div>
      </div>
    </section>
  )
}

export default ProductBar