import { zodResolver } from '@hookform/resolvers/zod'
import { Pencil, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Button } from '../../../shared/ui/button'
import {
  useCreatePromptMutation,
  useDeletePromptMutation,
  usePromptsQuery,
  useUpdatePromptMutation
} from '../hooks/use-prompts'
import { createPromptEditSchema, createPromptFormSchema } from '../lib/prompt-form-schema'
import type { Prompt } from '../model/prompt.types'

function PromptModal({
  open,
  title,
  children,
  onClose
}: {
  open: boolean
  title: string
  children: React.ReactNode
  onClose: () => void
}) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-40 grid place-items-center bg-black/40 p-4">
      <div className="w-full max-w-3xl rounded-xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <h3 className="text-2xl font-semibold text-slate-900">{title}</h3>
          <button className="text-slate-500 hover:text-slate-700" onClick={onClose} type="button">✕</button>
        </div>
        <div className="p-5">{children}</div>
      </div>
    </div>
  )
}

export function PromptsPage() {
  const { t } = useTranslation()

  const [showCreateModal, setShowCreateModal] = useState(false)
  const [editingPrompt, setEditingPrompt] = useState<Prompt | null>(null)
  const [deletingPrompt, setDeletingPrompt] = useState<Prompt | null>(null)

  const promptsQuery = usePromptsQuery()
  const createMutation = useCreatePromptMutation()
  const updateMutation = useUpdatePromptMutation()
  const deleteMutation = useDeletePromptMutation()

  const createSchema = useMemo(
    () => createPromptFormSchema({
      nameMin: t('prompts.validation.nameMin'),
      contentMin: t('prompts.validation.contentMin')
    }),
    [t]
  )

  const editSchema = useMemo(
    () => createPromptEditSchema({ contentMin: t('prompts.validation.contentMin') }),
    [t]
  )

  type CreateFormValues = z.infer<typeof createSchema>
  type EditFormValues = z.infer<typeof editSchema>

  const createForm = useForm<CreateFormValues>({
    resolver: zodResolver(createSchema),
    defaultValues: { name: '', content: '' }
  })

  const editForm = useForm<EditFormValues>({
    resolver: zodResolver(editSchema),
    defaultValues: { content: '' }
  })

  const openEditModal = (prompt: Prompt) => {
    setEditingPrompt(prompt)
    editForm.reset({ content: prompt.content })
  }

  const onCreateSubmit = async (values: CreateFormValues) => {
    await createMutation.mutateAsync(values)
    createForm.reset()
    setShowCreateModal(false)
  }

  const onEditSubmit = async (values: EditFormValues) => {
    if (!editingPrompt) return
    await updateMutation.mutateAsync({ id: editingPrompt.id, content: values.content })
    setEditingPrompt(null)
  }

  const confirmDelete = async () => {
    if (!deletingPrompt) return
    await deleteMutation.mutateAsync(deletingPrompt.id)
    setDeletingPrompt(null)
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-[36px] font-semibold text-slate-900">{t('prompts.title')}</h2>
        <Button className="text-[20px]" onClick={() => setShowCreateModal(true)}>
          {t('prompts.actions.create')}
          <Plus className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-[22px]">
          <thead className="bg-slate-50 text-slate-800">
            <tr>
              <th className="w-72 px-3 py-3 font-semibold">{t('prompts.columns.name')}</th>
              <th className="px-3 py-3 font-semibold">{t('prompts.columns.content')}</th>
              <th className="w-44 px-3 py-3 font-semibold">{t('prompts.columns.createdAt')}</th>
              <th className="w-40 px-3 py-3 font-semibold">{t('prompts.columns.actions')}</th>
            </tr>
          </thead>
          <tbody>
            {promptsQuery.isLoading && (
              <tr>
                <td className="px-3 py-4 text-slate-500" colSpan={4}>{t('prompts.loading')}</td>
              </tr>
            )}

            {!promptsQuery.isLoading && promptsQuery.data?.length === 0 && (
              <tr>
                <td className="px-3 py-4 text-slate-500" colSpan={4}>{t('prompts.empty')}</td>
              </tr>
            )}

            {!promptsQuery.isLoading && promptsQuery.data?.map((prompt) => (
              <tr key={prompt.id} className="border-t border-slate-100">
                <td className="px-3 py-3 text-slate-900">{prompt.name}</td>
                <td className="px-3 py-3 text-slate-700">
                  <p className="line-clamp-2">{prompt.content}</p>
                </td>
                <td className="px-3 py-3 text-slate-600">
                  {prompt.createdAt ? new Date(prompt.createdAt).toLocaleString() : '-'}
                </td>
                <td className="px-3 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg border border-[#2a5bff] p-2 text-[#2a5bff]"
                      onClick={() => openEditModal(prompt)}
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-slate-300 p-2 text-slate-700"
                      onClick={() => setDeletingPrompt(prompt)}
                      disabled={prompt.name === 'Send medications' || prompt.name === 'Summarize analysis'}
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PromptModal
        open={showCreateModal}
        title={t('prompts.actions.create')}
        onClose={() => setShowCreateModal(false)}
      >
        <form className="space-y-4" onSubmit={createForm.handleSubmit(onCreateSubmit)}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">{t('prompts.fields.name')}</label>
            <input
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-[#2a5bff] focus:ring-2"
              {...createForm.register('name')}
            />
            {createForm.formState.errors.name && (
              <p className="text-xs text-rose-600">{createForm.formState.errors.name.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">{t('prompts.fields.content')}</label>
            <textarea
              className="min-h-48 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-[#2a5bff] focus:ring-2"
              {...createForm.register('content')}
            />
            {createForm.formState.errors.content && (
              <p className="text-xs text-rose-600">{createForm.formState.errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setShowCreateModal(false)}>
              {t('prompts.actions.cancel')}
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {t('prompts.actions.save')}
            </Button>
          </div>
        </form>
      </PromptModal>

      <PromptModal
        open={Boolean(editingPrompt)}
        title={t('prompts.actions.edit')}
        onClose={() => setEditingPrompt(null)}
      >
        <form className="space-y-4" onSubmit={editForm.handleSubmit(onEditSubmit)}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">{t('prompts.fields.content')}</label>
            <textarea
              className="min-h-48 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-[#2a5bff] focus:ring-2"
              {...editForm.register('content')}
            />
            {editForm.formState.errors.content && (
              <p className="text-xs text-rose-600">{editForm.formState.errors.content.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setEditingPrompt(null)}>
              {t('prompts.actions.cancel')}
            </Button>
            <Button type="submit" disabled={updateMutation.isPending}>
              {t('prompts.actions.save')}
            </Button>
          </div>
        </form>
      </PromptModal>

      <PromptModal
        open={Boolean(deletingPrompt)}
        title={t('prompts.actions.delete')}
        onClose={() => setDeletingPrompt(null)}
      >
        <div className="space-y-4">
          <p className="text-[20px] text-slate-700">{t('prompts.deleteText')}</p>
          <div className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-[20px] font-semibold text-slate-800">
            {deletingPrompt?.name}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="secondary" onClick={() => setDeletingPrompt(null)}>
              {t('prompts.actions.cancel')}
            </Button>
            <Button type="button" onClick={confirmDelete} disabled={deleteMutation.isPending}>
              {t('prompts.actions.confirmDelete')}
            </Button>
          </div>
        </div>
      </PromptModal>
    </section>
  )
}
