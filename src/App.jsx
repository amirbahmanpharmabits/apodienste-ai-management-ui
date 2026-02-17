import { useMemo, useState } from 'react'
import { useMsal } from '@azure/msal-react'
import { allowedDomains, loginRequest } from './authConfig'
import './App.css'

function extractEmail(account) {
  const claims = account?.idTokenClaims || {}
  return (
    claims.preferred_username ||
    claims.email ||
    account?.username ||
    ''
  ).toLowerCase()
}

function isPharmabitsAccount(account) {
  const email = extractEmail(account)
  if (!email) return false
  if (email.includes('pharmabits')) return true
  return allowedDomains.some((domain) => email.endsWith(`@${domain}`))
}

function App() {
  const { instance, accounts } = useMsal()
  const [error, setError] = useState('')
  const account = accounts[0]

  const isConfigured = Boolean(import.meta.env.VITE_ENTRA_CLIENT_ID)
  const email = useMemo(() => extractEmail(account), [account])
  const isAllowed = useMemo(() => (account ? isPharmabitsAccount(account) : false), [account])

  const handleLogin = async () => {
    setError('')
    try {
      const result = await instance.loginPopup(loginRequest)
      const signedInAccount = result.account
      if (!isPharmabitsAccount(signedInAccount)) {
        await instance.logoutPopup({ account: signedInAccount })
        setError('This Microsoft account is not allowed. Use your Pharmabits account.')
      }
    } catch (e) {
      setError(e?.message || 'Microsoft login failed.')
    }
  }

  const handleLogout = async () => {
    setError('')
    await instance.logoutPopup({ account })
  }

  return (
    <main className="container">
      <section className="card">
        <h1>Apodienste AI Management</h1>
        <p className="subtitle">Sign in with Microsoft Entra ID (Pharmabits users only)</p>

        {!isConfigured && (
          <div className="warn">
            Missing <code>VITE_ENTRA_CLIENT_ID</code>. Add it in your environment before login can work.
          </div>
        )}

        {!account && (
          <button className="btn" onClick={handleLogin} disabled={!isConfigured}>
            Login with Microsoft
          </button>
        )}

        {account && isAllowed && (
          <>
            <div className="ok">Signed in as: <strong>{email}</strong></div>
            <button className="btn secondary" onClick={handleLogout}>Logout</button>
          </>
        )}

        {account && !isAllowed && (
          <div className="error">This account is not allowed. Please use a Pharmabits account.</div>
        )}

        {error && <div className="error">{error}</div>}
      </section>
    </main>
  )
}

export default App
