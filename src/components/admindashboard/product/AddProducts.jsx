import React, { useState, useRef } from 'react'
import { Info, Image, DollarSign, Package, Send, CheckCircle2, X, FileText, ListChecks, Barcode, List, File, UploadCloud, XCircle } from 'lucide-react'

const AddProducts = () => {
  const [uploadedImages, setUploadedImages] = useState([])
  const fileInputRef = useRef(null)

  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    subCategory: '',
    shortDescription: '',
    fullDescription: '',
    
    price: '',
    dealerPrice: '',
    discountPrice: '',
    
    inStock: '1240',
    warehouseBin: 'WH-East / A-14-B',
    leadTime: '14-21',
    minOrderQty: '10',
    casePackQty: '2',
    
    primarySku: 'LMT-PRO-9000',
    upcBarcode: '893450021944',
    vendorSupplier: 'Industrial Lighting Corp (ILC)',
    mfgPartNumber: 'HB-9000-V2-ILC',
    
    wattage: '150W',
    voltage: '120-277V AC',
    lumens: '21,000 lm',
    cct: '5000K',
    cri: '>80',
    beamAngle: '120°',
    dimmable: '0-10V',
    dimensions: '',
    
    lifecycleStatus: 'Active (Live)',
    internalNotes: '',
  })

  const handleImageUpload = (files) => {
    if (!files) return
    const newImages = Array.from(files).map((file) => URL.createObjectURL(file))
    setUploadedImages((prev) => [...prev, ...newImages].slice(0, 4))
  }

  const handleRemoveImage = (indexToRemove) => {
    setUploadedImages(uploadedImages.filter((_, idx) => idx !== indexToRemove))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify({ ...formData, images: uploadedImages }, null, 2))
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 text-white space-y-8">
      {/* Title Header */}
      <div className="border-l-[3px] border-red-600 pl-4">
        <h1 className="text-3xl font-extrabold tracking-tight text-white">
          Add New Product
        </h1>
        <p className="text-sm text-neutral-400 mt-1">
          Create and publish new tactical equipment, accessories, and paintball inventory.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-12">
        {/* Left Column */}
        <div className="lg:col-span-8 space-y-6">
          {/* Basic Information */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Info className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Basic Information
              </span>
            </div>

            <div className="space-y-4">
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

          {/* Media Assets */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Image className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Media Assets
              </span>
            </div>

            <div className="space-y-4">
              <input
                type="file"
                ref={fileInputRef}
                multiple
                accept="image/*"
                className="hidden"
                onChange={(e) => handleImageUpload(e.target.files)}
              />

              <div
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault()
                  handleImageUpload(e.dataTransfer.files)
                }}
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-2xl bg-[#0a0a0a] py-14 px-4 cursor-pointer hover:border-red-600/50 transition"
              >
                <div className="h-12 w-12 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-500 mb-4"></div>
                <p className="text-sm text-neutral-300 font-medium">
                  Drag & drop product images here or <span className="text-red-500 font-semibold">browse files</span>
                </p>
                <p className="text-[10px] text-neutral-600 mt-2 uppercase tracking-wider">
                  High-res PNG, JPG or WEBP (Max 10MB)
                </p>
              </div>

              <div className="flex gap-4">
                {[0, 1, 2].map((idx) => {
                  const img = uploadedImages[idx]
                  return (
                    <div
                      key={idx}
                      onClick={() => !img && fileInputRef.current?.click()}
                      className="relative h-24 w-24 rounded-xl border border-white/5 bg-[#0a0a0a] flex items-center justify-center text-neutral-600 hover:text-neutral-400 hover:border-white/10 cursor-pointer transition overflow-hidden group"
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
                            className="absolute top-1 right-1 p-1 rounded-full bg-black/60 hover:bg-red-600 text-white transition opacity-0 group-hover:opacity-100"
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

          {/* Technical Specifications */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-neutral-300">
                <List className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Technical Specifications
                </span>
              </div>
              <button className="text-[11px] font-bold text-red-500 hover:text-red-400 transition tracking-wider">+ Add Spec</button>
            </div>

            <div className="grid grid-cols-2 gap-x-12 gap-y-6 border-b border-white/5 pb-6">
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">Wattage</span>
                <span className="text-sm font-semibold text-white">150W</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">Voltage</span>
                <span className="text-sm font-semibold text-white">120-277V AC</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">Lumens</span>
                <span className="text-sm font-semibold text-white">21,000 lm</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">CCT (Color Temp)</span>
                <span className="text-sm font-semibold text-white">5000K</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">CRI</span>
                <span className="text-sm font-semibold text-white">80</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">Beam Angle</span>
                <span className="text-sm font-semibold text-white">120°</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm text-neutral-500">Dimmable</span>
                <span className="text-sm font-semibold text-white">0-10V</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-2">
                <span className="text-sm font-semibold text-red-500 flex items-center gap-1.5">
                  <XCircle className="h-3.5 w-3.5" /> Dimensions
                </span>
                <span className="text-sm italic text-neutral-500">Required</span>
              </div>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-neutral-400">Certifications</span>
              <div className="flex gap-2">
                <div className="rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-1.5 text-xs text-neutral-300">UL Listed</div>
                <div className="rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-1.5 text-xs text-neutral-300">DLC Premium</div>
                <div className="rounded-lg border border-white/10 bg-[#0a0a0a] px-3 py-1.5 text-xs text-neutral-300">RoHS</div>
                <div className="rounded-lg border border-white/10 border-dashed bg-transparent px-3 py-1.5 text-xs text-neutral-500 hover:text-white cursor-pointer">+</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Documents & Files */}
            <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-neutral-300">
                  <File className="h-4 w-4" />
                  <span className="text-xs font-bold uppercase tracking-wider text-white">
                    Documents & Files
                  </span>
                </div>
                <div className="p-1.5 rounded-lg bg-[#0a0a0a] border border-white/10 text-neutral-400 cursor-pointer hover:text-white">
                  <UploadCloud className="h-3.5 w-3.5" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a0a0a] p-3">
                  <div className="rounded bg-red-500/10 p-2 text-red-500 shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-semibold text-white">Spec_Sheet_v2.pdf</p>
                    <p className="text-[10px] text-neutral-500">2.4 MB • Uploaded Oct 10</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a0a0a] p-3">
                  <div className="rounded bg-blue-500/10 p-2 text-blue-500 shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-semibold text-white">Photometric_Data.ies</p>
                    <p className="text-[10px] text-neutral-500">64 KB • Uploaded Oct 10</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-[#0a0a0a] p-3">
                  <div className="rounded bg-red-500/10 p-2 text-red-500 shrink-0">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="truncate text-xs font-semibold text-white">Warranty_5Yr.pdf</p>
                    <p className="text-[10px] text-neutral-500">1.1 MB • Uploaded Sep 05</p>
                  </div>
                </div>
                <div className="flex items-center justify-center rounded-xl border border-white/10 border-dashed bg-transparent p-3 cursor-pointer hover:border-red-500/50">
                  <span className="text-[11px] font-semibold tracking-wider text-red-500">+ Add Install Guide</span>
                </div>
              </div>
            </div>

            {/* Internal Team Notes */}
            <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-4 flex flex-col h-full">
              <div className="flex items-center gap-2 text-neutral-300">
                <FileText className="h-4 w-4" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Internal Team Notes
                </span>
              </div>
              <textarea
                className="flex-1 w-full rounded-xl border border-white/5 bg-[#0a0a0a] p-4 text-sm text-neutral-400 placeholder-neutral-600 focus:border-red-600 focus:outline-none resize-none"
                placeholder="Add notes for the catalog team... (Not visible to customers)"
              />
              <div className="flex items-center justify-between pt-1">
                <span className="text-[10px] text-neutral-600 italic">Last edited by E. Rodriguez</span>
                <button className="text-[11px] font-bold tracking-wider text-red-500 hover:text-red-400">Save Note</button>
              </div>
            </div>
          </div>

          {/* Workflow Control */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-neutral-300">
              <ListChecks className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider text-white">
                Workflow Control
              </span>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Product Lifecycle Status
                </label>
                <div className="space-y-2">
                  <div 
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${formData.lifecycleStatus === 'Draft' ? 'border-red-600 bg-red-600/5' : 'border-white/5 bg-[#0a0a0a]'}`} 
                    onClick={() => setFormData({...formData, lifecycleStatus: 'Draft'})}
                  >
                    <div className="size-3.5 rounded-full border border-neutral-600 bg-white/10"></div>
                    <span className="text-sm font-medium text-white">Draft</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${formData.lifecycleStatus === 'Active (Live)' ? 'border-red-600 bg-red-600/5' : 'border-white/5 bg-[#0a0a0a]'}`} 
                    onClick={() => setFormData({...formData, lifecycleStatus: 'Active (Live)'})}
                  >
                    <div className="size-3.5 rounded-full border-[3px] border-red-600 bg-[#141414] flex items-center justify-center"></div>
                    <span className="text-sm font-medium text-red-500">Active (Live)</span>
                  </div>
                  <div 
                    className={`flex items-center gap-3 rounded-lg border p-3 cursor-pointer transition ${formData.lifecycleStatus === 'Discontinued' ? 'border-red-600 bg-red-600/5' : 'border-white/5 bg-[#0a0a0a]'}`} 
                    onClick={() => setFormData({...formData, lifecycleStatus: 'Discontinued'})}
                  >
                    <div className="size-3.5 rounded-full border border-neutral-600 bg-white/10"></div>
                    <span className="text-sm font-medium text-white">Discontinued</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">
                  Readiness Checklist
                </label>
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Basic Info
                    </div>
                    <span className="text-sm text-neutral-500">100%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Images (Min 3)
                    </div>
                    <span className="text-sm text-neutral-500">4/3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-red-500 font-medium">
                      <XCircle className="h-4 w-4" /> Specifications
                    </div>
                    <span className="text-sm text-red-500 italic">Missing Material</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm text-neutral-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-500" /> Inventory
                    </div>
                    <span className="text-sm text-neutral-500">Assigned</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-4 space-y-6">
          {/* Financial Setup */}
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
                  className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
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
                  className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
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
                  className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-4 py-3 text-sm text-white placeholder-neutral-600 focus:border-red-600 focus:outline-none transition"
                  value={formData.discountPrice}
                  onChange={(e) => setFormData({ ...formData, discountPrice: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Inventory & Ops */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Package className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Inventory & Ops
              </span>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-white/5 bg-[#0a0a0a] p-4">
              <div className="flex items-center gap-2 text-sm text-neutral-300">
                <div className="size-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div> In Stock
              </div>
              <div className="text-right">
                <span className="text-lg font-bold text-white">1,240</span>
                <span className="text-[11px] text-neutral-500 ml-1">units</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-neutral-500">Warehouse / Bin</span>
                <span className="text-xs font-medium text-white">WH-East / A-14-B</span>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-neutral-500">Lead Time (Out of Stock)</span>
                <div className="flex items-center gap-2">
                  <div className="rounded border border-white/5 bg-[#0a0a0a] px-2 py-1 text-xs text-white">14-21</div>
                  <span className="text-xs text-neutral-500">days</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b border-white/5 pb-3">
                <span className="text-xs text-neutral-500">Min Order Qty (MOQ)</span>
                <div className="flex items-center gap-2">
                  <div className="rounded border border-white/5 bg-[#0a0a0a] px-2 py-1 text-xs text-white">10</div>
                  <span className="text-xs text-neutral-500">units</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-neutral-500">Case Pack Qty</span>
                <span className="text-xs font-medium text-white">2 units / case</span>
              </div>
            </div>
          </div>

          {/* Identifiers */}
          <div className="rounded-2xl border border-white/5 bg-[#141414] p-6 space-y-6">
            <div className="flex items-center gap-2 text-red-500">
              <Barcode className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Identifiers
              </span>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Primary SKU</label>
                <div className="relative">
                  <input
                    type="text"
                    className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-3 py-2.5 text-xs text-red-500 focus:border-red-600 focus:outline-none transition pr-8"
                    value={formData.primarySku}
                    onChange={(e) => setFormData({...formData, primarySku: e.target.value})}
                  />
                  <File className="absolute right-3 top-1/2 -translate-y-1/2 h-3 w-3 text-neutral-500 cursor-pointer hover:text-white" />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">UPC / Barcode</label>
                <input
                  type="text"
                  className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-3 py-2.5 text-xs text-white focus:border-red-600 focus:outline-none transition"
                  value={formData.upcBarcode}
                  onChange={(e) => setFormData({...formData, upcBarcode: e.target.value})}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Vendor / Supplier</label>
              <select className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-3 py-2.5 text-xs text-white focus:border-red-600 focus:outline-none transition appearance-none cursor-pointer">
                <option>Industrial Lighting Corp (ILC)</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-bold uppercase tracking-wider text-neutral-500">Manufacturer Part Number (MPN)</label>
              <input
                type="text"
                className="w-full rounded-lg border border-white/5 bg-[#0a0a0a] px-3 py-2.5 text-xs text-neutral-300 focus:border-red-600 focus:outline-none transition"
                value={formData.mfgPartNumber}
                onChange={(e) => setFormData({...formData, mfgPartNumber: e.target.value})}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-2">
            <button
              type="button"
              onClick={handleSubmit}
              className="flex w-full h-12 items-center justify-center gap-2 rounded-xl bg-red-600 text-[11px] font-bold uppercase tracking-widest text-white shadow-[0_0_24px_rgba(239,68,68,0.25)] hover:bg-red-700 transition"
            >
              <Send className="h-3.5 w-3.5" />
              Publish Product
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddProducts