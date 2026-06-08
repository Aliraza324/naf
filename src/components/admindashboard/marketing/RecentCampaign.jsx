import React from 'react'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'

const campaigns = [
  {
    id: 'cp-9823-vortex',
    name: 'Vortex Elite V4 Launch',
    type: 'New Product',
    typeBg: 'bg-white/10 text-white',
    status: 'CLOSE',
    statusColor: 'bg-red-500',
    reach: '12,400 dealers',
    engagement: 68.4,
    updated: '2 mins ago',
  },
  {
    id: 'cp-vest-restock',
    name: 'Tactical Vest Restock',
    type: 'Low Stock Alert',
    typeBg: 'bg-white/10 text-white',
    status: 'ACTIVE',
    statusColor: 'bg-emerald-500',
    reach: '12,400 dealers',
    engagement: 68.4,
    updated: '2 mins ago',
  },
  {
    id: 'cp-q4-wholesale-promo',
    name: 'Q4 Wholesale Promo',
    type: 'Promotion',
    typeBg: 'bg-white/10 text-white',
    status: 'CLOSE',
    statusColor: 'bg-red-500',
    reach: '12,400 dealers',
    engagement: 68.4,
    updated: '2 mins ago',
  },
  {
    id: 'cp-policy-update',
    name: 'System Policy Update',
    type: 'New Product',
    typeBg: 'bg-white/10 text-white',
    status: 'CLOSE',
    statusColor: 'bg-red-500',
    reach: '12,400 dealers',
    engagement: 68.4,
    updated: '2 mins ago',
  },
]

const StatusBadge = ({ status, color }) => (
  <span className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1 text-[11px] font-black uppercase tracking-widest ${
    status === 'ACTIVE'
      ? 'bg-emerald-500/15 text-emerald-400'
      : 'bg-red-500/15 text-red-400'
  }`}>
    <span className={`h-1.5 w-1.5 rounded-full ${color}`} />
    {status}
  </span>
)

const EngagementBar = ({ value }) => (
  <div className="flex items-center gap-2">
    <span className="w-10 shrink-0 text-sm text-white">{value}%</span>
    <div className="h-1.5 w-20 overflow-hidden rounded-full bg-white/10 sm:w-28">
      <div
        className="h-full rounded-full bg-red-600"
        style={{ width: `${value}%` }}
      />
    </div>
  </div>
)

const ActionButtons = ({ campaign }) => (
  <div className="flex items-center gap-3 text-neutral-500">
    <Link to={`/admin/marketing/campaigns/${campaign.id}`} className="transition-colors hover:text-white">
      <Eye className="h-4 w-4" />
    </Link>
    <Link className="transition-colors hover:text-white">
      <Pencil className="h-4 w-4" />
    </Link>
    <Link className="transition-colors hover:text-red-400">
      <Trash2 className="h-4 w-4" />
    </Link>
  </div>
)

const RecentCampaign = () => {
  return (
    <section className="w-full bg-black px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1220px]">
        <div className="rounded-2xl border border-white/[0.07] bg-[#111111] shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">

          {/* Header */}
          <div className="px-5 pt-6 pb-5 sm:px-8 sm:pt-8">
            <h2 className="text-lg font-black uppercase tracking-[0.12em] text-white sm:text-xl">
              Recent Campaigns
            </h2>
            <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-600">
              Log_Feed: Live_Sync
            </p>
          </div>

          {/* ── Desktop Table ── */}
          <div className="hidden md:block">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-y border-white/[0.06]">
                  {['Campaign Name', 'Type', 'Status', 'Reach', 'Engagement', 'Last Updated', 'Actions'].map((col) => (
                    <th
                      key={col}
                      className="px-5 py-3 text-left text-[10px] font-black uppercase tracking-[0.14em] text-neutral-600 first:pl-8 last:pr-8"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {campaigns.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/[0.05] transition-colors hover:bg-white/[0.02] last:border-0"
                  >
                    <td className="py-5 pl-8 pr-4 text-sm font-semibold text-white">
                      {c.name}
                    </td>
                    <td className="px-4 py-5">
                      <span className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-300">
                        {c.type}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <StatusBadge status={c.status} color={c.statusColor} />
                    </td>
                    <td className="px-4 py-5 text-sm text-neutral-400">
                      {c.reach}
                    </td>
                    <td className="px-4 py-5">
                      <EngagementBar value={c.engagement} />
                    </td>
                    <td className="px-4 py-5 text-sm text-neutral-500">
                      {c.updated}
                    </td>
                    <td className="py-5 pl-4 pr-8">
                      <ActionButtons campaign={c} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Mobile Cards ── */}
          <div className="flex flex-col divide-y divide-white/[0.05] md:hidden">
            {campaigns.map((c, i) => (
              <div key={i} className="flex flex-col gap-3 px-5 py-5">
                {/* Row 1: name + actions */}
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-semibold leading-snug text-white">{c.name}</p>
                  <ActionButtons campaign={c} />
                </div>

                {/* Row 2: type + status */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-black uppercase tracking-wider text-neutral-300">
                    {c.type}
                  </span>
                  <StatusBadge status={c.status} color={c.statusColor} />
                </div>

                {/* Row 3: reach + engagement + updated */}
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-neutral-400">
                  <span>{c.reach}</span>
                  <EngagementBar value={c.engagement} />
                  <span className="text-neutral-600">{c.updated}</span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  )
}

export default RecentCampaign
