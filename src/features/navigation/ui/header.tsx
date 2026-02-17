import { useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { Button } from 'primereact/button'
import { OverlayPanel } from 'primereact/overlaypanel'

type HeaderProps = {
  onLogout: () => Promise<void>
}

export function Header({ onLogout }: HeaderProps) {
  const location = useLocation()
  const profileOverlayRef = useRef<OverlayPanel>(null)

  const pageTitle = location.pathname.includes('/prompts') ? 'AI Prompts Management' : 'Profiles'

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div>
        <h1 className="m-0 text-xl font-semibold text-slate-800">{pageTitle}</h1>
      </div>

      <div className="flex items-center gap-1">
        <Button
          text
          rounded
          icon="pi pi-user"
          severity="secondary"
          aria-label="Profile"
          onClick={(e) => profileOverlayRef.current?.toggle(e)}
        />
        <Button text rounded icon="pi pi-sign-out" severity="secondary" aria-label="Logout" onClick={onLogout} />
        <Button text rounded icon="pi pi-refresh" severity="secondary" aria-label="Refresh" />

        <OverlayPanel ref={profileOverlayRef}>
          <div className="min-w-48">
            <div className="text-base font-semibold text-slate-900">Kroos</div>
            <div className="mt-1 text-sm text-slate-600">Administrator</div>
            <div className="text-sm text-slate-600">BackOffice Admin</div>
            <button
              className="mt-3 border-0 bg-transparent p-0 text-sm font-semibold text-[#2a5bff]"
              type="button"
            >
              Open profile
            </button>
          </div>
        </OverlayPanel>
      </div>
    </header>
  )
}
