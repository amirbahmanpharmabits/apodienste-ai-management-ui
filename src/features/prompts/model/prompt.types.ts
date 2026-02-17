export type Prompt = {
  id: string
  name: string
  content: string
  createdAt: string
  updatedAt?: string
}

export type CreatePromptRequest = {
  name: string
  content: string
}

export type UpdatePromptRequest = {
  id: string
  content: string
}

export type PromptSummary = {
  name: string
}
