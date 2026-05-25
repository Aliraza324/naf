import { Plus } from 'lucide-react'
import React, { useState } from 'react'

const transactions = [
  { id: '#DL-90234', date: '1/24 /2023', product: 'Gloves', last4: '4242', status: 'DELIVERED' },
  { id: '#DL-90234', date: '1/24 /2023', product: 'Gloves', last4: '4242', status: 'PENDING' },
  { id: '#DL-90234', date: '1/24 /2023', product: 'Gloves', last4: '4242', status: 'DELIVERED' },
  { id: '#DL-90234', date: '1/24 /2023', product: 'Gloves', last4: '4242', status: 'PENDING' },
  { id: '#DL-90234', date: '1/24 /2023', product: 'Gloves', last4: '4242', status: 'DELIVERED' },
]

const statusStyle = {
  DELIVERED: { dot: 'bg-neutral-400', text: 'text-neutral-300', border: 'border-neutral-600' },
  PENDING: { dot: 'bg-blue-400', text: 'text-blue-300', border: 'border-blue-700' },
}

function VisaIcon() {
  return (
    <div className="w-8 h-5 bg-white rounded flex items-center justify-center shrink-0">
      <span className="text-blue-800 text-[9px] font-black tracking-tighter">VISA</span>
    </div>
  )
}

export default function RecentTransactions() {
  const [showAdd, setShowAdd] = useState(false)

  return (
    <div className="bg-neutral-950 p-4 text-white sm:p-6 lg:p-8 font-sans max-w-full mx-auto">
      <h1 className="mb-6 text-xl font-bold text-white sm:text-2xl">Recent Transactions</h1>

      <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-stretch">

        {/* Transactions Table */}
        <div className="overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-900">
          {/* Header */}
          <div className="hidden grid-cols-[1.2fr_1.2fr_1fr_1.4fr_1.4fr_1fr] px-6 py-4 border-b border-neutral-800 lg:grid">
            {['ID', 'DATE', 'PRODUCT', 'METHOD', 'STATUS', 'AMOUNT'].map(h => (
              <p key={h} className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{h}</p>
            ))}
          </div>

          {/* Rows */}
          {transactions.map((tx, i) => {
            const s = statusStyle[tx.status]
            return (
              <div
                key={i}
                className="border-b border-neutral-800 px-4 py-4 last:border-0 hover:bg-neutral-800/40 transition-colors sm:px-6"
              >
                <div className="grid gap-3 sm:grid-cols-[1.2fr_1.2fr] lg:grid-cols-[1.2fr_1.2fr_1fr_1.4fr_1.4fr_1fr] lg:items-center">
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:hidden">ID</p>
                    <p className="font-mono text-sm font-semibold text-white">{tx.id}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:hidden">DATE</p>
                    <p className="text-sm text-neutral-400">{tx.date}</p>
                  </div>

                  <div className="sm:col-span-2 lg:col-span-1">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:hidden">PRODUCT</p>
                    <p className="text-sm text-neutral-300">{tx.product}</p>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:hidden">METHOD</p>
                    <div className="flex items-center gap-2">
                      <VisaIcon />
                      <div>
                        <p className="text-[10px] tracking-widest text-neutral-400">**** {tx.last4}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:hidden">STATUS</p>
                    <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold ${s.text} ${s.border}`}>
                      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
                      {tx.status}
                    </span>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-neutral-500 lg:hidden">AMOUNT</p>
                    <p className="text-sm font-bold text-white">$128.00</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Payment Methods Panel */}
        <div className="flex h-full flex-col gap-4 rounded-2xl border border-neutral-800 bg-neutral-900 p-4 sm:p-5">
          {/* Panel Header */}
          <div className="flex items-center justify-between">
            <p className="text-[11px] font-bold tracking-widest text-white uppercase">Payment Methods</p>
            <button className="w-7 h-7 bg-red-600 hover:bg-red-700 rounded-lg flex items-center justify-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </button>
          </div>

          {/* Visa Card — Default */}
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-7 bg-white rounded flex items-center justify-center">
                <span className="text-blue-800 text-[10px] font-black tracking-tighter">VISA</span>
              </div>
              <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase border border-neutral-600 rounded-full px-2 py-0.5">Default</span>
            </div>
            <p className="text-white font-mono text-sm tracking-widest mb-2">**** **** **** 4242</p>
            <div className="flex items-center justify-between">
              <p className="text-neutral-500 text-xs">Expires 12/25</p>
              <p className="text-neutral-400 text-xs">J. Doe</p>
            </div>
          </div>

          {/* PayPal */}
          <div className="bg-neutral-800 border border-neutral-700 rounded-xl px-4 py-3 flex items-center justify-between hover:border-neutral-600 transition-colors cursor-pointer">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-900 rounded-lg flex items-center justify-center shrink-0">
                <span className="text-blue-300 text-xs font-black">P</span>
              </div>
              <div>
                <p className="text-white text-sm font-semibold">PayPal Account</p>
                <p className="text-neutral-500 text-xs">dealer@tactical.com</p>
              </div>
            </div>
            <button className="text-neutral-500 hover:text-white transition-colors p-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
              </svg>
            </button>
          </div>

          {/* Avatars + Add New */}
          <div className="mt-auto w-full border border-neutral-700 p-3 rounded-lg">
            <button
              onClick={() => setShowAdd(!showAdd)}
              className="w-full text-center text-neutral-400 hover:text-white text-xs font-medium flex items-center justify-center gap-1 transition-colors"
            >
              <Plus size={20} />
              Add New Method
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}