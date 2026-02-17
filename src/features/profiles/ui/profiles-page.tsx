import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Funnel, Grid2x2, SlidersHorizontal } from 'lucide-react'
import { getProfiles } from '../api/get-profiles'
import type { Profile, ProfileStatus } from '../../../shared/types/profile'

type FilterTab = 'All' | ProfileStatus

const tabOrder: FilterTab[] = ['All', 'Preparation', 'In progress', 'Ready to invoice', 'Completed']

function statusClassName(status: ProfileStatus) {
  switch (status) {
    case 'Preparation':
      return 'bg-slate-200 text-slate-700'
    case 'In progress':
      return 'bg-slate-200 text-slate-700'
    case 'Ready to invoice':
      return 'bg-slate-200 text-slate-700'
    case 'Completed':
      return 'bg-slate-300 text-slate-700'
    default:
      return 'bg-slate-200 text-slate-700'
  }
}

function pdlColorClass(color: Profile['pdlIcons'][number]) {
  if (color === 'green') return 'bg-emerald-100 text-emerald-600 border-emerald-300'
  if (color === 'red') return 'bg-rose-100 text-rose-600 border-rose-300'
  if (color === 'gray') return 'bg-slate-100 text-slate-600 border-slate-300'
  return 'bg-blue-100 text-blue-600 border-blue-300'
}

export function ProfilesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All')
  const { data = [], isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles
  })

  const counts = useMemo(() => ({
    All: data.length,
    Preparation: data.filter((row) => row.status === 'Preparation').length,
    'In progress': data.filter((row) => row.status === 'In progress').length,
    'Ready to invoice': data.filter((row) => row.status === 'Ready to invoice').length,
    Completed: data.filter((row) => row.status === 'Completed').length
  }), [data])

  const rows = useMemo(() => {
    if (activeTab === 'All') return data
    return data.filter((row) => row.status === activeTab)
  }, [activeTab, data])

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabOrder.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={`rounded-full px-3 py-1.5 text-[18px] font-semibold transition ${
              activeTab === tab
                ? 'bg-[#2a5bff] text-white'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            {tab} <span className="ml-1 rounded-full bg-black/10 px-2 py-0.5 text-[16px]">{counts[tab]}</span>
          </button>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <Funnel className="h-5 w-5 text-slate-500" />
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4 text-slate-500" />
          <select className="rounded-lg border border-slate-300 px-3 py-2 text-[18px] text-slate-700 outline-none">
            <option>Muster Cluster</option>
            <option>Cluster A</option>
            <option>Cluster B</option>
          </select>
        </div>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-[18px] text-slate-700 outline-none">
          <option>All</option>
          <option>Active</option>
        </select>
        <select className="rounded-lg border border-slate-300 px-3 py-2 text-[18px] text-slate-700 outline-none">
          <option>Divisions</option>
          <option>North</option>
        </select>
      </div>

      <div className="mt-3 overflow-hidden rounded-xl border border-slate-200">
        <table className="min-w-full text-left text-[24px]">
          <thead className="bg-slate-50 text-slate-700">
            <tr>
              <th className="px-3 py-3 font-semibold">Name</th>
              <th className="px-3 py-3 font-semibold">Availability</th>
              <th className="px-3 py-3 font-semibold">Status</th>
              <th className="px-3 py-3 font-semibold">pDL</th>
              <th className="px-3 py-3 font-semibold">Medications source</th>
              <th className="px-3 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="px-3 py-4 text-slate-500" colSpan={6}>Loading...</td>
              </tr>
            )}

            {!isLoading && rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-100">
                <td className="px-3 py-3 text-slate-800">{row.name}</td>
                <td className="px-3 py-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 font-medium text-blue-700">{row.availability}</span>
                </td>
                <td className="px-3 py-3">
                  <span className={`rounded-full px-3 py-1 font-medium ${statusClassName(row.status)}`}>{row.status}</span>
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    {row.pdlIcons.map((icon, idx) => (
                      <span
                        key={`${row.id}-${idx}`}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm ${pdlColorClass(icon)}`}
                      >
                        ◔
                      </span>
                    ))}
                  </div>
                </td>
                <td className="px-3 py-3 text-slate-700">{row.medicationSource ?? '-'}</td>
                <td className="px-3 py-3">
                  <button type="button" className="rounded-lg bg-[#2a5bff] p-2 text-white">
                    <Grid2x2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
