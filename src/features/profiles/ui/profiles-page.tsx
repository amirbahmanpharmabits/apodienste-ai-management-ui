import { useMemo, useState } from 'react'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dropdown } from 'primereact/dropdown'
import { Button } from 'primereact/button'
import { Tag } from 'primereact/tag'
import { useQuery } from '@tanstack/react-query'
import { getProfiles } from '../api/get-profiles'
import type { Profile, ProfileStatus } from '../../../shared/types/profile'

type FilterTab = 'All' | ProfileStatus
const tabs: FilterTab[] = ['All', 'Preparation', 'In progress', 'Ready to invoice', 'Completed']

export function ProfilesPage() {
  const [activeTab, setActiveTab] = useState<FilterTab>('All')
  const { data = [], isLoading } = useQuery({ queryKey: ['profiles'], queryFn: getProfiles })

  const counts = useMemo(() => ({
    All: data.length,
    Preparation: data.filter((x) => x.status === 'Preparation').length,
    'In progress': data.filter((x) => x.status === 'In progress').length,
    'Ready to invoice': data.filter((x) => x.status === 'Ready to invoice').length,
    Completed: data.filter((x) => x.status === 'Completed').length
  }), [data])

  const filtered = useMemo(() => (activeTab === 'All' ? data : data.filter((x) => x.status === activeTab)), [data, activeTab])

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3">
        {tabs.map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? 'rounded-full bg-[#2a5bff] px-3 py-1 text-xs font-semibold text-white' : 'rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700'}
          >
            {tab} <span className="ml-1">{counts[tab]}</span>
          </button>
        ))}
      </div>

      <div className="my-3 flex flex-wrap items-center gap-2">
        <Dropdown className="w-56" options={[{ label: 'Muster Cluster', value: 'muster' }]} value="muster" />
        <Dropdown className="w-48" options={[{ label: 'All', value: 'all' }]} value="all" />
        <Dropdown className="w-48" options={[{ label: 'Divisions', value: 'divisions' }]} value="divisions" />
      </div>

      <DataTable value={filtered} loading={isLoading} size="small" scrollable scrollHeight="calc(100vh - 260px)">
        <Column field="name" header="Name" />
        <Column
          header="Availability"
          body={() => <Tag value="Available" severity="info" className="bg-blue-100 text-blue-700" />}
        />
        <Column
          field="status"
          header="Status"
          body={(row: Profile) => <Tag value={row.status} className="bg-slate-200 text-slate-700" />}
        />
        <Column
          header="pDL"
          body={(row: Profile) => (
            <div className="flex gap-1">
              {row.pdlIcons.map((_, index) => (
                <span key={`${row.id}-${index}`} className="inline-block h-5 w-5 rounded-full border border-slate-300 bg-slate-100" />
              ))}
            </div>
          )}
        />
        <Column field="medicationSource" header="Medications source" body={(row: Profile) => row.medicationSource ?? '-'} />
        <Column
          header="Action"
          body={() => (
            <Button
              icon="pi pi-th-large"
              rounded
              size="small"
              className="h-8 w-8 bg-[#2a5bff] border-[#2a5bff]"
            />
          )}
        />
      </DataTable>
    </section>
  )
}
