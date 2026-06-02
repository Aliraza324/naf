import React from 'react'

const ProductBar = () => {
  return (
    <div className="bg-[#111111] p-6 min-h-fit font-sans">
      {/* Header Row */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <h1 className="text-white text-lg font-semibold leading-tight">
            Products list
          </h1>
          <p className="text-gray-500 text-xs mt-1">All NAF products here</p>
        </div>
        <button className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap">
          <span className="text-lg font-light">+</span> Add Products
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-[#1a1a1a] border border-[#2a2a2a] rounded-xl p-3.5 flex flex-wrap items-center gap-3">
        {/* Search by Name */}
        <div className="flex items-center gap-2 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 flex-1 min-w-[140px]">
          <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by Name"
            className="bg-transparent border-none outline-none text-gray-400 placeholder-gray-600 text-sm w-full"
          />
        </div>

        {/* Search by Categories */}
        <div className="flex items-center gap-2 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 flex-1 min-w-[140px]">
          <svg className="w-4 h-4 text-gray-600 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="text"
            placeholder="Search by Categories"
            className="bg-transparent border-none outline-none text-gray-400 placeholder-gray-600 text-sm w-full"
          />
        </div>

        {/* Stock Dropdown */}
        <div className="flex items-center gap-2 bg-[#111111] border border-[#2a2a2a] rounded-lg px-3.5 py-2.5 flex-1 min-w-[130px] cursor-pointer">
          <span className="text-gray-400 text-sm flex-1">Stock</span>
          <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path d="m6 9 6 6 6-6" />
          </svg>
        </div>

        {/* Search Button */}
        <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-7 py-2.5 rounded-lg transition-colors whitespace-nowrap sm:w-auto w-full">
          Search
        </button>
      </div>
    </div>
  )
}

export default ProductBar