import { NavLink } from 'react-router-dom'
import { cn } from '../../../shared/lib/utils'

const items = [
  { label: 'Profiles', to: '/profiles', icon: 'pi pi-users' },
  { label: 'Prompts', to: '/prompts', icon: 'pi pi-comment' }
]

export function Sidebar() {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-4">
        <div className="inline-flex items-center gap-2 rounded-lg border border-blue-200 px-3 py-2">
          <span className="text-xl font-bold text-[#2a5bff]">⌁</span>
          <span className="text-2xl font-semibold tracking-tight text-[#2a5bff]">apodienste</span>
        </div>
      </div>

      <div className="px-3 py-4">
        <ul className="m-0 list-none space-y-1 p-0">
          {items.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    'flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium no-underline transition',
                    isActive ? 'bg-blue-50 text-[#2a5bff]' : 'text-slate-700 hover:bg-slate-100'
                  )
                }
              >
                <i className={`${item.icon} text-sm`} />
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}
