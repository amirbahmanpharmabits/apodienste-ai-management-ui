import { useMsal } from '@azure/msal-react'
import { Button } from '../../../shared/ui/button'
import { allowedEmail } from '../lib/msal'
import { useAuthStore } from '../model/auth-store'

export function AuthStatusCard() {
  const { instance } = useMsal()
  const status = useAuthStore((s) => s.status)
  const email = useAuthStore((s) => s.email)
  const error = useAuthStore((s) => s.error)

  const logout = async () => {
    await instance.logoutRedirect()
  }

  return (
    <section className="w-full max-w-xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold text-slate-900">Apodienste AI Management</h1>
      <p className="mt-2 text-sm text-slate-600">Microsoft Entra ID protected application</p>

      {status === 'loading' && <div className="mt-6 rounded-lg bg-slate-50 p-3 text-slate-700">Redirecting to Microsoft login...</div>}

      {status === 'authenticated' && (
        <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-emerald-900">
          Signed in as <strong>{email}</strong>
        </div>
      )}

      {status === 'unauthorized' && (
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900">
          This account is not allowed: <strong>{email}</strong>
          <br />
          Required account: <strong>{allowedEmail}</strong>
        </div>
      )}

      {status === 'error' && (
        <div className="mt-6 rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-900">{error}</div>
      )}

      <div className="mt-6 flex gap-3">
        <Button variant="secondary" onClick={logout}>Logout</Button>
      </div>
    </section>
  )
}
