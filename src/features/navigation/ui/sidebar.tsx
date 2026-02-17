import { BrainCircuit } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { navItems } from '../../../shared/config/nav-items'
import { cn } from '../../../shared/lib/utils'

export function Sidebar() {
  const { t } = useTranslation()

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-200 bg-white">
      <div className="flex items-center gap-2 border-b border-slate-200 px-4 py-4">
        <div className="rounded-lg bg-brand-50 p-2 text-brand-700">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <span className="font-semibold text-brand-700">apodienste</span>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => cn(
              'flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition',
              isActive ? 'bg-brand-50 text-brand-700' : 'text-slate-700 hover:bg-slate-100'
            )}
          >
            <item.icon className="h-4 w-4" />
            {t(item.labelKey)}
          </NavLink>
        ))}
      </nav>
    </aside>
  )
}
