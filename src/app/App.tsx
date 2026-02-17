import { RouterProvider } from 'react-router-dom'
import { useAuthBootstrap } from '../features/auth/hooks/use-auth-bootstrap'
import { useAuthStore } from '../features/auth/model/auth-store'
import { allowedEmail } from '../features/auth/lib/msal'
import { router } from './router/routes'

export function App() {
  useAuthBootstrap()

  const status = useAuthStore((s) => s.status)
  const email = useAuthStore((s) => s.email)
  const error = useAuthStore((s) => s.error)

  if (status === 'loading') {
    return <div className="flex min-h-screen items-center justify-center text-sm text-slate-600">Redirecting to Microsoft login...</div>
  }

  if (status === 'error') {
    return <div className="flex min-h-screen items-center justify-center text-sm text-rose-700">{error}</div>
  }

  if (status === 'unauthorized') {
    return (
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700">
          This account is not allowed: <strong>{email}</strong><br />
          Required account: <strong>{allowedEmail}</strong>
        </div>
      </div>
    )
  }

  return <RouterProvider router={router} />
}
