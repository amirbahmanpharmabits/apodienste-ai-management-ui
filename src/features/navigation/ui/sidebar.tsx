import { ClipboardList, MessageSquareText } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { cn } from '../../../shared/lib/utils'

const items = [
  { key: 'nav.profiles', to: '/profiles', icon: ClipboardList },
  { key: 'nav.prompts', to: '/prompts', icon: MessageSquareText }
]

export function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="flex h-screen w-[250px] flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-4 py-5">
        <div className="inline-flex items-center rounded-xl border border-[#d8e5ff] bg-[#f4f8ff] px-3 py-2">
          <span className="text-[30px] font-extrabold leading-none text-[#2a5bff]">⌁</span>
          <span className="ml-2 text-[30px] font-semibold tracking-tight text-[#2a5bff]">apodienste</span>
        </div>
      </div>

      <nav className="space-y-2 px-3 py-4">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              'group flex items-center rounded-xl px-3 py-2.5 text-[18px] font-medium transition',
              isActive
                ? 'bg-[#2a5bff] text-white shadow-sm'
                : 'text-slate-700 hover:bg-[#edf3ff] hover:text-[#2a5bff]'
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {t(item.key)}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
