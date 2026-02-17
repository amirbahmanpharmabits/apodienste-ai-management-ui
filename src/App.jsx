import { useEffect, useMemo, useState } from 'react'
import './App.css'

const ALLOWED_EMAIL = 'amirbahman.mohammadpanah@pharmabits.eu'

function getEmailFromClaims(payload) {
  const claims = payload?.[0]?.user_claims || []
  const get = (type) => claims.find((c) => c.typ === type)?.val || ''
  return (
    get('preferred_username') ||
    get('email') ||
    get('upn') ||
    get('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress') ||
    get('http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name') ||
    ''
  ).toLowerCase()
}

function App() {
  const [status, setStatus] = useState('loading')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let mounted = true

    async function loadProfile() {
      try {
        const res = await fetch('/.auth/me', { credentials: 'include' })

        if (res.status === 401) {
          window.location.assign('/.auth/login/aad?post_login_redirect_url=/')
          return
        }

        const payload = await res.json()
        const signedInEmail = getEmailFromClaims(payload)

        if (!mounted) return

        if (!signedInEmail) {
          setStatus('error')
          setError('Could not read signed-in user from Microsoft token.')
          return
        }

        setEmail(signedInEmail)

        if (signedInEmail !== ALLOWED_EMAIL) {
          setStatus('forbidden')
          return
        }

        setStatus('ok')
      } catch (e) {
        if (!mounted) return
        setStatus('error')
        setError(e?.message || 'Failed to load user profile.')
      }
    }

    loadProfile()
    return () => {
      mounted = false
    }
  }, [])

  const content = useMemo(() => {
    if (status === 'loading') return <div className="info">Checking Microsoft login...</div>
    if (status === 'error') return <div className="error">{error}</div>
    if (status === 'forbidden') {
      return (
        <div className="error">
          This account is not allowed: <strong>{email}</strong><br />
          Required account: <strong>{ALLOWED_EMAIL}</strong>
        </div>
      )
    }
    return (
      <div className="ok">
        Signed in successfully as <strong>{email}</strong>
      </div>
    )
  }, [status, error, email])

  return (
    <main className="container">
      <section className="card">
        <h1>Apodienste AI Management</h1>
        <p className="subtitle">Protected by Microsoft Entra ID</p>
        {content}
        <div className="actions">
          <a className="btn secondary" href="/.auth/logout?post_logout_redirect_uri=/">
            Logout
          </a>
        </div>
      </section>
    </main>
  )
}

export default App
