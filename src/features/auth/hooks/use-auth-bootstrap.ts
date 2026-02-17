import { useEffect } from 'react'
import { useMsal } from '@azure/msal-react'
import { getAccountEmail } from '../lib/account'
import { allowedEmail, loginRequest } from '../lib/msal'
import { useAuthStore } from '../model/auth-store'

export function useAuthBootstrap() {
  const { instance } = useMsal()
  const setStatus = useAuthStore((s) => s.setStatus)
  const setEmail = useAuthStore((s) => s.setEmail)
  const setError = useAuthStore((s) => s.setError)

  useEffect(() => {
    let mounted = true

    async function run() {
      try {
        setStatus('loading')

        await instance.initialize()
        await instance.handleRedirectPromise()

        const account = instance.getAllAccounts()[0]
        if (!account) {
          await instance.loginRedirect(loginRequest)
          return
        }

        instance.setActiveAccount(account)
        const email = getAccountEmail(account)

        if (!mounted) return

        setEmail(email)
        if (email !== allowedEmail) {
          setStatus('unauthorized')
          return
        }

        setStatus('authenticated')
      } catch (error) {
        if (!mounted) return
        const message = error instanceof Error ? error.message : 'Authentication failed.'
        setError(message)
        setStatus('error')
      }
    }

    run()

    return () => {
      mounted = false
    }
  }, [instance, setEmail, setError, setStatus])
}
