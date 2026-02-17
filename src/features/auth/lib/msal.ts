import { PublicClientApplication } from '@azure/msal-browser'

export const allowedEmail = (import.meta.env.VITE_ALLOWED_EMAIL || 'amirbahman.mohammadpanah@pharmabits.eu').toLowerCase()

const clientId = import.meta.env.VITE_ENTRA_CLIENT_ID || '1369de3e-5687-4c5a-b606-78537978bde0'
const tenantId = import.meta.env.VITE_ENTRA_TENANT_ID || '0517a68b-2d9c-40df-9f3b-37561164a416'
const redirectUri = import.meta.env.VITE_ENTRA_REDIRECT_URI || window.location.origin

export const loginRequest = {
  scopes: ['openid', 'profile', 'email', 'User.Read']
}

export const msalInstance = new PublicClientApplication({
  auth: {
    clientId,
    authority: `https://login.microsoftonline.com/${tenantId}`,
    redirectUri,
    postLogoutRedirectUri: redirectUri
  },
  cache: {
    cacheLocation: 'localStorage'
  }
})
