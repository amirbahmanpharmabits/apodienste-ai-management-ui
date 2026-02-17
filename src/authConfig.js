import { PublicClientApplication } from '@azure/msal-browser'

const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID || '0517a68b-2d9c-40df-9f3b-37561164a416'
const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID || ''
const redirectUri = import.meta.env.VITE_ENTRA_REDIRECT_URI || window.location.origin

export const msalConfig = {
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage',
    storeAuthStateInCookie: false,
  },
}

export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read'],
}

export const allowedDomains = (import.meta.env.VITE_ALLOWED_EMAIL_DOMAINS || 'pharmabits.eu,pharmabits.de')
  .split(',')
  .map((d) => d.trim().toLowerCase())
  .filter(Boolean)

export const msalInstance = new PublicClientApplication(msalConfig)
