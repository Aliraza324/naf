import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const orders = [
  { id: '#NAF-88291-TX', timestamp: 'OCT 24, 2023 | 14:22', status: 'IN TRANSIT', statusColor: 'border border-red-500 text-red-500', value: '$12,450.00' },
  { id: '#NAF-88254-PL', timestamp: 'OCT 22, 2023 | 09:15', status: 'DELIVERED', statusColor: 'border border-green-500 text-green-500', value: '$3,200.50' },
  { id: '#NAF-87912-OP', timestamp: 'OCT 19, 2023 | 18:44', status: 'ARCHIVED', statusColor: 'border border-gray-400 text-gray-400', value: '$8,900.00' },
]

const products = [
  {
    id: 'vortex-nv-400',
    badge: 'ELITE-GRADE',
    badgeColor: 'bg-red-600',
    category: 'OPTICS / GEN-3',
    categoryColor: 'text-red-500',
    name: 'Vortex NV-400 Tactical Night Vision',
    price: '$12,499.00',
    img: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&q=80',
  },
  {
    id: 'kevlar-x-pro',
    badge: 'NEW OPS',
    badgeColor: 'bg-green-600',
    category: 'BALLISTICS / ARMOR',
    categoryColor: 'text-red-500',
    name: 'Kevlar-X Pro Plate Carrier - MC Black',
    price: '$1,250.00',
    img: 'https://images.unsplash.com/photo-1609220136736-443140cffec6?w=400&q=80',
  },
  {
    id: 'trijicon-rmr',
    badge: null,
    category: 'OPTICS / SIGHTING',
    categoryColor: 'text-red-500',
    name: 'Trijicon RMR Type 2 Red Dot Sight',
    price: '$545.00',
    img: 'https://images.unsplash.com/photo-1595590424283-b8f17842773f?w=400&q=80',
  },
]

export default function RecentOrder() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const handleOrderClick = () => {
    navigate('/product-details')
  }

  return (
    <div className="max-w-6xl mx-auto text-white font-sans">
      {/* Recent Order Records */}
      <div className="bg-neutral-900 rounded-xl p-6 mb-8 border border-neutral-800">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-5 bg-red-600 rounded-full" />
          <h2 className="text-sm font-bold tracking-widest text-white uppercase">Recent Order Records</h2>
        </div>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-neutral-500 text-xs tracking-widest uppercase border-b border-neutral-800">
              <th className="text-left pb-3 font-medium">Serial / ID</th>
              <th className="text-left pb-3 font-medium">Timestamp</th>
              <th className="text-left pb-3 font-medium">Clearance Status</th>
              <th className="text-left pb-3 font-medium">Total Value</th>
              <th className="text-left pb-3 font-medium">Uplink</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, i) => (
              <tr key={i} className="border-b border-neutral-800 last:border-0 hover:bg-neutral-800/40 transition-colors">
                <td className="py-4 text-red-500 font-mono font-semibold tracking-wide">{order.id}</td>
                <td className="py-4 text-neutral-300 font-mono text-xs">{order.timestamp}</td>
                <td className="py-4">
                  <span className={`px-3 py-1 rounded text-xs font-bold tracking-widest uppercase ${order.statusColor}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-4 text-white font-semibold">{order.value}</td>
                <td className="py-4">
                  <button className="text-neutral-400 hover:text-white transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* New Products Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-1 h-5 bg-red-600 rounded-full" />
            <h2 className="text-sm font-bold tracking-widest text-white uppercase">New Products Recommendations</h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentSlide(Math.max(0, currentSlide - 1))}
              className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentSlide(Math.min(products.length - 1, currentSlide + 1))}
              className="w-8 h-8 rounded bg-neutral-800 border border-neutral-700 flex items-center justify-center hover:bg-neutral-700 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          {products.map((product, i) => (
            <div key={i} className="bg-neutral-900 rounded-xl overflow-hidden border border-neutral-800 hover:border-neutral-600 transition-colors group">
              <div className="relative overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute top-3 right-3 ${product.badgeColor} text-white text-[10px] font-bold tracking-widest px-2 py-1 rounded uppercase`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className={`text-[10px] font-bold tracking-widest uppercase mb-1 ${product.categoryColor}`}>{product.category}</p>
                <h3 className="text-white font-semibold text-sm mb-3 leading-snug">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-white font-bold">{product.price}</span>
                  <button
                    type="button"
                    onClick={handleOrderClick}
                    className="bg-red-600 hover:bg-red-700 text-white text-xs font-bold tracking-widest uppercase px-4 py-2 rounded transition-colors"
                  >
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}