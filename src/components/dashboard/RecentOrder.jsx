import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import one from '../../assets/images/scopes.png'
import two from '../../assets/images/jacket.png'
import three from '../../assets/images/gun.png'

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
    img: one,
  },
  {
    id: 'kevlar-x-pro',
    badge: 'NEW OPS',
    badgeColor: 'bg-green-600',
    category: 'BALLISTICS / ARMOR',
    categoryColor: 'text-red-500',
    name: 'Kevlar-X Pro Plate Carrier - MC Black',
    price: '$1,250.00',
    img: two,
  },
  {
    id: 'trijicon-rmr',
    badge: null,
    category: 'OPTICS / SIGHTING',
    categoryColor: 'text-red-500',
    name: 'Trijicon RMR Type 2 Red Dot Sight',
    price: '$545.00',
    img: three,
  },
]

export default function RecentOrder() {
  const navigate = useNavigate()
  const productsTrackRef = useRef(null)

  const handleOrderClick = () => {
    navigate('/product-details')
  }

  const scrollRecommendations = direction => {
    const container = productsTrackRef.current

    if (!container) return

    const firstCard = container.querySelector('[data-recommendation-card]')
    const cardWidth = firstCard ? firstCard.getBoundingClientRect().width : container.clientWidth
    const gap = 16

    container.scrollBy({
      left: direction === 'next' ? cardWidth + gap : -(cardWidth + gap),
      behavior: 'smooth',
    })
  }

  return (
    <div className="mx-auto max-w-6xl text-white py-6 px-4">
      <div className="mb-8 rounded-xl border border-neutral-800 bg-neutral-900 p-4 sm:p-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-5 w-1 rounded-full bg-red-600" />
          <h2 className="text-sm font-bold uppercase tracking-widest text-white">Recent Order Records</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-180 w-full text-sm">
            <thead>
              <tr className="border-b border-neutral-800 text-xs uppercase tracking-widest text-[#6B7280]">
                <th className="pb-3 text-left font-medium">Serial / ID</th>
                <th className="pb-3 text-left font-medium">Timestamp</th>
                <th className="pb-3 text-left font-medium">Clearance Status</th>
                <th className="pb-3 text-left font-medium">Total Value</th>
                <th className="pb-3 text-left font-medium">Uplink</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i} className="border-b border-neutral-800 transition-colors last:border-0 hover:bg-neutral-800/40">
                  <td className="py-4 font-mono font-semibold tracking-wide text-[#E60103]">{order.id}</td>
                  <td className="py-4 font-mono text-xs text-neutral-300">{order.timestamp}</td>
                  <td className="py-4">
                    <span className={`rounded px-3 py-1 text-xs font-bold uppercase tracking-widest ${order.statusColor}`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-4 font-semibold text-white">{order.value}</td>
                  <td className="py-4">
                    <button className="text-neutral-400 transition-colors hover:text-white" aria-label="Open order details">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="h-5 w-1 rounded-full bg-red-600" />
            <h2 className="text-sm font-bold uppercase tracking-widest text-white">New Products Recommendations</h2>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => scrollRecommendations('prev')}
              aria-label="Previous recommendations"
              className="flex h-9 w-9 items-center justify-center rounded border border-neutral-700 bg-neutral-800 transition-colors hover:bg-neutral-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => scrollRecommendations('next')}
              aria-label="Next recommendations"
              className="flex h-9 w-9 items-center justify-center rounded border border-neutral-700 bg-neutral-800 transition-colors hover:bg-neutral-700"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          ref={productsTrackRef}
          className="flex flex-nowrap gap-4 overflow-x-auto pb-2"
          style={{ scrollSnapType: 'x mandatory', scrollBehavior: 'smooth' }}
        >
          {products.map((product, i) => (
            <div
              key={i}
              data-recommendation-card
              className="flex-none snap-start overflow-hidden rounded-xl border border-neutral-800 bg-neutral-900 transition-colors hover:border-neutral-600 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.875rem)]"
            >
              <div className="relative overflow-hidden">
                <img
                  src={product.img}
                  alt={product.name}
                  className="h-48 w-full object-cover transition-transform duration-500"
                />
                {product.badge && (
                  <span className={`absolute right-3 top-3 rounded px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-white ${product.badgeColor}`}>
                    {product.badge}
                  </span>
                )}
              </div>
              <div className="p-4">
                <p className={`mb-1 text-[10px] font-bold uppercase tracking-widest ${product.categoryColor}`}>{product.category}</p>
                <h3 className="mb-3 text-sm font-semibold leading-snug text-white">{product.name}</h3>
                <div className="flex items-center justify-between gap-3">
                  <span className="font-bold text-white">{product.price}</span>
                  <button
                    type="button"
                    onClick={handleOrderClick}
                    className="rounded bg-red-600 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white transition-colors hover:bg-red-700"
                  >
                    View Details
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