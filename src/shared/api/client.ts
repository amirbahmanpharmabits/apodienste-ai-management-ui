import i18n from '../i18n'
import { getCookie } from '../lib/cookies'

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'

async function request<T>(method: RequestMethod, url: string, body?: unknown): Promise<T> {
  const token = getCookie('apoToken')
  const acceptedLanguage = i18n.language === 'de' ? 'de-DE' : 'en-US'

  const headers: Record<string, string> = {
    Accept: 'application/json',
    AcceptedLanguage: acceptedLanguage
  }

  if (token) {
    headers.Authorization = `Bearer ${token}`
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json'
  }

  const response = await fetch(url, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  if (response.status === 204) {
    return undefined as T
  }

  return (await response.json()) as T
}

export function apiGet<T>(url: string): Promise<T> {
  return request<T>('GET', url)
}

export function apiPost<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
  return request<TResponse>('POST', url, body)
}

export function apiPut<TRequest, TResponse>(url: string, body: TRequest): Promise<TResponse> {
  return request<TResponse>('PUT', url, body)
}

export function apiDelete<T>(url: string): Promise<T> {
  return request<T>('DELETE', url)
}
