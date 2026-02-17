import type { AccountInfo } from '@azure/msal-browser'

export function getAccountEmail(account?: AccountInfo): string {
  if (!account) return ''
  const claims = (account.idTokenClaims ?? {}) as Record<string, unknown>

  const preferredUsername = claims.preferred_username
  const email = claims.email

  if (typeof preferredUsername === 'string' && preferredUsername.length > 0) {
    return preferredUsername.toLowerCase()
  }
  if (typeof email === 'string' && email.length > 0) {
    return email.toLowerCase()
  }

  return (account.username ?? '').toLowerCase()
}
