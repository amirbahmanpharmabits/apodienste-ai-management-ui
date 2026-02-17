import { Outlet } from 'react-router-dom'
import { useMsal } from '@azure/msal-react'
import { Header } from '../../features/navigation/ui/header'
import { Sidebar } from '../../features/navigation/ui/sidebar'

export function AppShell() {
  const { instance } = useMsal()

  const onLogout = async () => {
    await instance.logoutRedirect()
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onLogout={onLogout} />
        <main className="flex-1 overflow-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
