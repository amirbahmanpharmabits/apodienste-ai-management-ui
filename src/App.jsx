import { useEffect, useMemo, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { ALLOWED_EMAIL, loginRequest } from './authConfig'
import './App.css'

function getEmail(account) {
  const claims = account?.idTokenClaims || {}
  return (claims.preferred_username || claims.email || account?.username || '').toLowerCase()
}

function App() {
  const { instance, accounts } = useMsal()
  const [error, setError] = useState('')

  const account = accounts[0]
  const email = useMemo(() => getEmail(account), [account])
  const isAllowed = email === ALLOWED_EMAIL

  useEffect(() => {
    let active = true

    async function boot() {
      try {
        await instance.initialize()
        await instance.handleRedirectPromise()
        const current = instance.getAllAccounts()[0]

        if (!current) {
          await instance.loginRedirect(loginRequest)
          return
        }

        if (active) {
          instance.setActiveAccount(current)
        }
      } catch (e) {
        if (active) setError(e?.message || 'Microsoft login failed.')
      }
    }

    boot()
    return () => {
      active = false
    }
  }, [instance])

  const logout = async () => {
    await instance.logoutRedirect()
  }

  if (!account) {
    return (
      <main className="container">
        <section className="card">
          <h1>Apodienste AI Management</h1>
          <p className="subtitle">Redirecting to Microsoft login...</p>
          {error && <div className="error">{error}</div>}
        </section>
      </main>
    )
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Apodienste AI Management</h1>
        <p className="subtitle">Microsoft Entra ID login</p>

        {isAllowed ? (
          <div className="ok">Signed in as <strong>{email}</strong></div>
        ) : (
          <div className="error">
            This account is not allowed: <strong>{email}</strong><br />
            Required account: <strong>{ALLOWED_EMAIL}</strong>
          </div>
        )}

        <div className="actions">
          <button className="btn secondary" onClick={logout}>Logout</button>
        </div>
      </section>
    </main>
  )
}

export default App
