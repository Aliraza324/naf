import React, { useState, useRef } from 'react'
import { Info, Image, Eye, DollarSign, Package, Plus, Trash2, Send, CheckCircle2, X } from 'lucide-react'

const AddProducts = () => {
  // Image upload state
  const [uploadedImages, setUploadedImages] = useState([])
  const fileInputRef = useRef(null)

  // Volume pricing tiers state
  const [tiers, setTiers] = useState([
    { minQty: '1', maxQty: '10', price: '189.99' },
    { minQty: '11', maxQty: '50', price: '165.00' },
    { minQty: '51', maxQty: 'Unlimited', price: '145.00' },
  ])

  // Form inputs state
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    subCategory: '',
    shortDescription: '',
    fullDescription: '',
    visibility: 'Active',
    price: '',
    dealerPrice: '',
    discountPrice: '',
    initialStock: '',
  })

  // Add a new tier row
  const handleAddTier = () => {
    setTiers([...tiers, { minQty: '', maxQty: '', price: '' }])
  }

  // Delete a tier row
  const handleDeleteTier = (indexToDelete) => {
    setTiers(tiers.filter((_, idx) => idx !== indexToDelete))
  }

  // Handle image upload event
  const handleImageUpload = (files) => {
    if (!files) return
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 4)) // Max 4 images
  }

  // Remove uploaded image
  const handleRemoveImage = (indexToRemove) => {
    setUploadedImages(uploadedImages.filter((_, idx) => idx !== indexToRemove))
  }

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify({ ...formData, tiers, images: uploadedImages }, null, 2))
  }

  // Handle tier value updates
  const handleTierChange = (index, field, value) => {
    const updatedTiers = tiers.map((tier, idx) => {
      if (idx === index) {
        return { ...tier, [field]: value }
      }
      return tier
    })
    setTiers(updatedTiers)
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 text-white space-y-8">
      {/* Title Header with red accent line */}
      <div className="border-l-[3px] border-red-600 pl-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Add New Product
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Create and publish new tactical equipment, accessories, and paintball inventory.
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Side Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Card 1: Basic Information */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Info className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Basic Information
              </span>
            </div>

            <div className="space-y-4">
              {/* Product Name */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Product Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Tactical Combat Vest Gen-IV"
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                  value={formData.productName}
                  onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
                />
              </div>

              {/* Category & Sub Category Row */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Category
                  </label>
                  <select
                    className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-neutral-400 focus:border-red-600 focus:outline-none transition appearance-none cursor-pointer"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="">Select Category</option>
                    <option value="paintballs">Paintballs</option>
                    <option value="markers">Markers</option>
                    <option value="apparel">Tactical Apparel</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                    Sub Category
                  </label>
                  <select
                    className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-neutral-400 focus:border-red-600 focus:outline-none transition appearance-none cursor-pointer"
                    value={formData.subCategory}
                    onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
                  >
                    <option value="">Select sub Category</option>
                    <option value="eco">Eco Grade</option>
                    <option value="pro">Pro Grade</option>
                    <option value="vests">Vests & Harnesses</option>
                  </select>
                </div>
              </div>

              {/* Short Description */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Short Description
                </label>
                <input
                  type="text"
                  placeholder="A brief summary for listing pages..."
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                />
              </div>

              {/* Full Description */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Full Description
                </label>
                <textarea
                  rows={5}
                  placeholder="Detailed product specifications, materials, and usage instructions..."
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition resize-none"
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Card 2: Media Assets */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Image className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Media Assets
              </span>
            </div>

            <div className="space-y-4">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              {/* Drag and Drop / Main Preview Zone */}
              {/* Drag and Drop Zone */}
              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleImageUpload(e.dataTransfer.files)
                }}
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a] py-10 px-4 cursor-pointer hover:border-red-600/50 transition"
              >
                <div className="h-10 w-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 mb-3">
                  <Image className="h-5 w-5" />
                </div>
                <p className="text-xs text-neutral-400 font-medium">
                  Drag & drop product images here or <span className="text-red-500 font-semibold">browse files</span>
                </p>
                <p className="text-[10px] text-neutral-600 mt-1 uppercase tracking-wider">
                  High-res PNG, JPG or WEBP (Max 10MB)
                </p>
              </div>

              {/* Upload Previews Row (Slots for image 1, 2, 3) */}
              <div className="grid grid-cols-3 gap-4">
                {[0, 1, 2].map((idx) => {
                  const img = uploadedImages[idx]
                  return (
                    <div
                      key={idx}
                      onClick={() => !img && fileInputRef.current?.click()}
                      className="relative aspect-square rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center justify-center text-neutral-600 hover:text-neutral-400 hover:border-white/10 cursor-pointer transition overflow-hidden group"
                    >
                      {img ? (
                        <>
                          <img src={img} alt={`Preview ${idx + 1}`} className="h-full w-full object-cover" />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveImage(idx)
                            }}
                            className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/60 hover:bg-red-600 text-white transition opacity-0 group-hover:opacity-100"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </>
                      ) : (
                        <span className="text-xl font-light">+</span>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Card 3: Publishing Status */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Eye className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Publishing Status
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Visibility
                </label>
                <select
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-neutral-300 focus:border-red-600 focus:outline-none transition appearance-none cursor-pointer"
                  value={formData.visibility}
                  onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                  <option value="Scheduled">Scheduled</option>
                </select>
              </div>

              {/* Status Note Box */}
              <div className="flex items-start gap-3 rounded-xl border border-emerald-500/10 bg-emerald-500/5 p-4">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <p className="text-[10px] text-neutral-400 leading-normal">
                  Product will be indexed by inventory scanners immediately upon publishing.
                </p>
              </div>
            </div>
          </div>

          {/* Card 4: Financial Setup */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <DollarSign className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Financial Setup
              </span>
            </div>

            <div className="space-y-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Price ($)
                </label>
                <input
                  type="text"
                  placeholder="$ 0.00"
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Dealer Wholesale Price ($)
                </label>
                <input
                  type="text"
                  placeholder="$ 0.00"
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                  value={formData.dealerPrice}
                  onChange={(e) => setFormData({ ...formData, dealerPrice: e.target.value })}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                  Discount Price (Optional)
                </label>
                <input
                  type="text"
                  placeholder="$ 0.00"
                  className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Card 5: Stock Control */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Package className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Stock Control
              </span>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                Initial Stock Quantity
              </label>
              <input
                type="text"
                placeholder="0"
                className="w-full rounded-xl border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                value={formData.initialStock}
                onChange={(e) => setFormData({ ...formData, initialStock: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex w-full h-11 items-center justify-center gap-2 rounded-xl bg-red-600 text-xs font-bold uppercase tracking-widest text-white shadow-[0_0_24px_rgba(239,68,68,0.25)] hover:bg-red-700 transition"
            >
              <Send className="h-3.5 w-3.5" />
              Publish Product
            </button>
            <button
              type="button"
              className="w-full h-11 rounded-xl border border-white/5 bg-transparent text-xs font-bold uppercase tracking-widest text-neutral-400 hover:text-white hover:bg-white/[0.02] transition"
            >
              Preview Listing
            </button>
          </div>
        </div>
      </div>

      {/* Card 6: Volume Pricing */}
      <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6 w-[50vw]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-red-500">
            <DollarSign className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">
              Volume Pricing
            </span>
          </div>
          <button
            type="button"
            onClick={handleAddTier}
            className="text-[11px] font-bold tracking-wider text-red-500 hover:text-red-400 transition"
          >
            + Add Tier
          </button>
        </div>

        {/* Volume Pricing Form Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                <th className="pb-3 pr-4 font-semibold w-[30%]">Min Qty</th>
                <th className="pb-3 px-4 font-semibold w-[30%]">Max Qty</th>
                <th className="pb-3 px-4 font-semibold w-[30%]">Price (USD)</th>
                <th className="pb-3 pl-4 font-semibold w-[10%] text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {tiers.map((tier, idx) => (
                <tr key={idx} className="group">
                  {/* Min Qty */}
                  <td className="py-4 pr-4">
                    <input
                      type="text"
                      value={tier.minQty}
                      onChange={(e) => handleTierChange(idx, 'minQty', e.target.value)}
                      placeholder="e.g. 1"
                      className="w-full bg-transparent border-b border-neutral-800 py-1 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                    />
                  </td>
                  {/* Max Qty */}
                  <td className="py-4 px-4">
                    <input
                      type="text"
                      value={tier.maxQty}
                      onChange={(e) => handleTierChange(idx, 'maxQty', e.target.value)}
                      placeholder="e.g. 10"
                      className="w-full bg-transparent border-b border-neutral-800 py-1 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                    />
                  </td>
                  {/* Price */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1 border-b border-neutral-800 py-1 focus-within:border-red-600 transition">
                      <span className="text-sm text-neutral-500">$</span>
                      <input
                        type="text"
                        value={tier.price}
                        onChange={(e) => handleTierChange(idx, 'price', e.target.value)}
                        placeholder="0.00"
                        className="w-full bg-transparent text-sm text-white placeholder-neutral-600 focus:outline-none"
                      />
                    </div>
                  </td>
                  {/* Trash/Delete Action */}
                  <td className="py-4 pl-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDeleteTier(idx)}
                      className="text-neutral-600 hover:text-red-500 transition p-1"
                      aria-label="Delete tier"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default AddProducts