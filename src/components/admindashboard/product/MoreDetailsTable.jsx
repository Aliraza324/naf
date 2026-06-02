import React from 'react'
import { Layers, Plus } from 'lucide-react'

const MoreDetailsTable = () => {
  const variants = [
    {
      sku: 'PB-58421-XL-BK',
      size: '.50 Cal (XL)',
      color: 'Black',
      colorCode: '#000000',
      isHollow: true,
      stock: 54,
      price: '$89.00',
      status: 'AVAILABLE',
    },
    {
      sku: 'PB-58421-SM-YW',
      size: '.50 Cal (S)',
      color: 'Yellow High-Vis',
      colorCode: '#EAB308',
      isHollow: false,
      stock: 122,
      price: '$85.00',
      status: 'AVAILABLE',
    },
    {
      sku: 'PB-58421-MD-RD',
      size: '.50 Cal (M)',
      color: 'Red Impact',
      colorCode: '#EF4444',
      isHollow: false,
      stock: 12,
      price: '$89.00',
      status: 'LOW STOCK',
    },
    {
      sku: 'PB-58421-LG-GN',
      size: '.50 Cal (L)',
      color: 'Green Forest',
      colorCode: '#22C55E',
      isHollow: false,
      stock: 57,
      price: '$89.00',
      status: 'AVAILABLE',
    },
  ]

  return (
    <div className="w-full rounded-2xl border border-white/5 bg-[#141414] overflow-hidden">
      {/* Header Row */}
      <div className="flex items-center justify-between border-b border-white/5 px-6 py-5">
        <div className="flex items-center gap-2.5">
          <Layers className="h-5 w-5 text-red-500" />
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">
            PRODUCT VARIANTS
          </h2>
        </div>
        <button
          type="button"
          className="flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-widest text-red-500 hover:text-red-400 transition"
        >
          <Plus className="h-3.5 w-3.5" />
          ADD VARIANT
        </button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 text-[10px] font-bold uppercase tracking-wider text-neutral-500">
              <th className="py-4 px-6 font-semibold">SKU Extension</th>
              <th className="py-4 px-6 font-semibold">Caliber / Size</th>
              <th className="py-4 px-6 font-semibold">Color Fill</th>
              <th className="py-4 px-6 font-semibold">Stock Level</th>
              <th className="py-4 px-6 font-semibold">Price</th>
              <th className="py-4 px-6 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-xs text-neutral-300">
            {variants.map((item, idx) => (
              <tr key={idx} className="hover:bg-white/[0.01] transition-colors">
                {/* SKU */}
                <td className="py-4 px-6 font-medium text-neutral-400 font-mono tracking-tight">
                  {item.sku}
                </td>
                {/* Caliber / Size */}
                <td className="py-4 px-6 text-neutral-300">
                  {item.size}
                </td>
                {/* Color Fill */}
                <td className="py-4 px-6">
                  <div className="flex items-center gap-2">
                    {item.isHollow ? (
                      <span className="h-2.5 w-2.5 rounded-full border border-neutral-500 bg-transparent" />
                    ) : (
                      <span
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: item.colorCode }}
                      />
                    )}
                    <span>{item.color}</span>
                  </div>
                </td>
                {/* Stock Level */}
                <td className="py-4 px-6">
                  <span className={item.stock < 15 ? 'text-red-500 font-bold' : 'text-neutral-300'}>
                    {item.stock}
                  </span>
                </td>
                {/* Price */}
                <td className="py-4 px-6 text-neutral-300 font-medium">
                  {item.price}
                </td>
                {/* Status */}
                <td className="py-4 px-6 text-right">
                  {item.status === 'AVAILABLE' ? (
                    <span className="inline-flex items-center rounded bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-emerald-400 border border-emerald-500/20 uppercase">
                      AVAILABLE
                    </span>
                  ) : (
                    <span className="inline-flex items-center rounded bg-amber-500/10 px-2 py-0.5 text-[9px] font-bold tracking-wider text-amber-500 border border-amber-500/20 uppercase">
                      LOW STOCK
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default MoreDetailsTable