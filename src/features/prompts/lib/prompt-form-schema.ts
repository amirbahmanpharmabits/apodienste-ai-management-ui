import { z } from 'zod'

export function createPromptFormSchema(messages: { nameMin: string; contentMin: string }) {
  return z.object({
    name: z.string().min(3, messages.nameMin),
    content: z.string().min(10, messages.contentMin)
  })
}

export function createPromptEditSchema(messages: { contentMin: string }) {
  return z.object({
    content: z.string().min(10, messages.contentMin)
  })
}
