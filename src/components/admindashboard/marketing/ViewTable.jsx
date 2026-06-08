import React from 'react'
import { FileText, Search } from 'lucide-react'

const recipients = [
  {
    initials: 'TA',
    dealer: 'Tactical Arms Corp',
    region: 'North America (Sector 4)',
    status: 'Clicked',
    time: 'Today, 14:22',
  },
  {
    initials: 'SG',
    dealer: 'Sentinel Gear Supplies',
    region: 'Europe (Sector 1)',
    status: 'Opened',
    time: 'Today, 12:05',
  },
  {
    initials: 'BS',
    dealer: 'Black Site Outfitters',
    region: 'Oceania (Sector 9)',
    status: 'Clicked',
    time: 'Yesterday, 18:45',
  },
  {
    initials: 'NM',
    dealer: 'Nomad Mercantiles',
    region: 'Asia (Sector 3)',
    status: 'Not Opened',
    time: 'Sent Oct 12',
  },
]

const statusClasses = {
  Clicked: 'border-red-500/30 bg-red-500/10 text-red-500',
  Opened: 'border-white/10 bg-white/8 text-neutral-400',
  'Not Opened': 'border-slate-600/20 bg-slate-600/10 text-slate-500',
}

const ViewTable = () => {
  return (
    <section className="overflow-hidden rounded-[12px] border border-white/7 bg-[#141414]">
      <div className="flex flex-col gap-4 border-b border-white/7 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 fill-red-500 text-red-500" />
          <h2 className="text-base font-black uppercase tracking-[0.12em] text-white">
            Recipient Activity
          </h2>
        </div>

        <label className="flex h-10 w-full items-center gap-3 rounded-[7px] border border-white/8 bg-[#070707] px-4 sm:w-[280px]">
          <Search className="h-4 w-4 text-neutral-400" />
          <input
            type="text"
            placeholder="Filter dealers..."
            className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-neutral-500"
          />
        </label>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[850px] border-collapse text-left">
          <thead>
            <tr className="border-b border-white/5 bg-[#101010] text-[11px] font-black uppercase tracking-[0.16em] text-slate-500">
              <th className="px-8 py-5 font-black">Dealer Name</th>
              <th className="px-8 py-5 font-black">Region</th>
              <th className="px-8 py-5 font-black">Status</th>
              <th className="px-8 py-5 font-black">Last Activity</th>
            </tr>
          </thead>
          <tbody>
            {recipients.map((recipient) => (
              <tr
                key={recipient.dealer}
                className="border-b border-white/6 text-sm last:border-b-0"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <span className="grid h-10 w-10 place-items-center rounded-[5px] bg-[#222222] text-xs font-black text-white">
                      {recipient.initials}
                    </span>
                    <span className="font-semibold text-white">{recipient.dealer}</span>
                  </div>
                </td>
                <td className="px-8 py-6 text-neutral-400">{recipient.region}</td>
                <td className="px-8 py-6">
                  <span
                    className={`inline-flex rounded-[5px] border px-3 py-1 text-[10px] font-black uppercase tracking-[0.1em] ${statusClasses[recipient.status]}`}
                  >
                    {recipient.status}
                  </span>
                </td>
                <td className="px-8 py-6 text-neutral-400">{recipient.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default ViewTable
