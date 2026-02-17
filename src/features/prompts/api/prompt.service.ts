import { apiDelete, apiGet, apiPost, apiPut } from '../../../shared/api/client'
import { baseChatUrl } from '../../../shared/config/api'
import type { CreatePromptRequest, Prompt, PromptSummary, UpdatePromptRequest } from '../model/prompt.types'

const promptBaseUrl = `${baseChatUrl}/prompt`

export const promptService = {
  getAll: () => apiGet<Prompt[]>(promptBaseUrl),
  getById: (id: string) => apiGet<Prompt>(`${promptBaseUrl}/${id}`),
  getAllSummary: () => apiGet<PromptSummary[]>(`${promptBaseUrl}/summary`),
  create: (request: CreatePromptRequest) => apiPost<CreatePromptRequest, Prompt>(promptBaseUrl, request),
  update: (request: UpdatePromptRequest) => apiPut<{ content: string }, Prompt>(`${promptBaseUrl}/${request.id}`, { content: request.content }),
  delete: (id: string) => apiDelete<void>(`${promptBaseUrl}/${id}`)
}
