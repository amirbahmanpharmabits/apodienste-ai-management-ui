import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { promptService } from '../api/prompt.service'
import type { CreatePromptRequest, UpdatePromptRequest } from '../model/prompt.types'

const queryKey = ['prompts']

export function usePromptsQuery() {
  return useQuery({
    queryKey,
    queryFn: promptService.getAll
  })
}

export function useCreatePromptMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: CreatePromptRequest) => promptService.create(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })
}

export function useUpdatePromptMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (request: UpdatePromptRequest) => promptService.update(request),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })
}

export function useDeletePromptMutation() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => promptService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey })
    }
  })
}
