import { zodResolver } from '@hookform/resolvers/zod'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Button } from 'primereact/button'
import { DataTable } from 'primereact/datatable'
import { Column } from 'primereact/column'
import { Dialog } from 'primereact/dialog'
import { InputText } from 'primereact/inputtext'
import { InputTextarea } from 'primereact/inputtextarea'
import {
  useCreatePromptMutation,
  useDeletePromptMutation,
  usePromptsQuery,
  useUpdatePromptMutation
} from '../hooks/use-prompts'
import { createPromptEditSchema, createPromptFormSchema } from '../lib/prompt-form-schema'
import type { Prompt } from '../model/prompt.types'

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
    <section className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="m-0 text-2xl font-semibold text-slate-900">{t('prompts.title')}</h2>
        <Button
          label={t('prompts.actions.create')}
          icon="pi pi-plus"
          onClick={() => setShowCreateModal(true)}
          className="bg-[#2a5bff] border-[#2a5bff]"
        />
      </div>

      <DataTable value={promptsQuery.data ?? []} loading={promptsQuery.isLoading} size="small" emptyMessage={t('prompts.empty')}>
        <Column field="name" header={t('prompts.columns.name')} sortable className="w-72" />
        <Column
          field="content"
          header={t('prompts.columns.content')}
          body={(row: Prompt) => <span className="line-clamp-2 text-slate-700">{row.content}</span>}
        />
        <Column
          field="createdAt"
          header={t('prompts.columns.createdAt')}
          sortable
          className="w-48"
          body={(row: Prompt) => (row.createdAt ? new Date(row.createdAt).toLocaleString() : '-')}
        />
        <Column
          header={t('prompts.columns.actions')}
          className="w-36"
          body={(row: Prompt) => (
            <div className="flex items-center gap-2">
              <Button outlined icon="pi pi-pencil" size="small" onClick={() => openEditModal(row)} />
              <Button
                outlined
                severity="secondary"
                icon="pi pi-trash"
                size="small"
                onClick={() => setDeletingPrompt(row)}
                disabled={row.name === 'Send medications' || row.name === 'Summarize analysis'}
              />
            </div>
          )}
        />
      </DataTable>

      <Dialog
        header={t('prompts.actions.create')}
        visible={showCreateModal}
        onHide={() => setShowCreateModal(false)}
        style={{ width: '56rem' }}
      >
        <form className="space-y-4" onSubmit={createForm.handleSubmit(onCreateSubmit)}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">{t('prompts.fields.name')}</label>
            <InputText className="w-full" {...createForm.register('name')} />
            {createForm.formState.errors.name && <small className="text-red-600">{createForm.formState.errors.name.message}</small>}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">{t('prompts.fields.content')}</label>
            <InputTextarea rows={10} autoResize className="w-full" {...createForm.register('content')} />
            {createForm.formState.errors.content && <small className="text-red-600">{createForm.formState.errors.content.message}</small>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" outlined label={t('prompts.actions.cancel')} onClick={() => setShowCreateModal(false)} />
            <Button type="submit" label={t('prompts.actions.save')} loading={createMutation.isPending} className="bg-[#2a5bff] border-[#2a5bff]" />
          </div>
        </form>
      </Dialog>

      <Dialog
        header={t('prompts.actions.edit')}
        visible={Boolean(editingPrompt)}
        onHide={() => setEditingPrompt(null)}
        style={{ width: '56rem' }}
      >
        <form className="space-y-4" onSubmit={editForm.handleSubmit(onEditSubmit)}>
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700">{t('prompts.fields.content')}</label>
            <InputTextarea rows={10} autoResize className="w-full" {...editForm.register('content')} />
            {editForm.formState.errors.content && <small className="text-red-600">{editForm.formState.errors.content.message}</small>}
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" outlined label={t('prompts.actions.cancel')} onClick={() => setEditingPrompt(null)} />
            <Button type="submit" label={t('prompts.actions.save')} loading={updateMutation.isPending} className="bg-[#2a5bff] border-[#2a5bff]" />
          </div>
        </form>
      </Dialog>

      <Dialog
        header={t('prompts.actions.delete')}
        visible={Boolean(deletingPrompt)}
        onHide={() => setDeletingPrompt(null)}
        style={{ width: '34rem' }}
      >
        <div className="space-y-4">
          <p className="m-0 text-slate-700">{t('prompts.deleteText')}</p>
          <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 font-medium text-slate-800">
            {deletingPrompt?.name}
          </div>
          <div className="flex justify-end gap-2">
            <Button outlined label={t('prompts.actions.cancel')} onClick={() => setDeletingPrompt(null)} />
            <Button
              label={t('prompts.actions.confirmDelete')}
              loading={deleteMutation.isPending}
              onClick={confirmDelete}
              className="bg-[#2a5bff] border-[#2a5bff]"
            />
          </div>
        </div>
      </Dialog>
    </section>
  )
}
