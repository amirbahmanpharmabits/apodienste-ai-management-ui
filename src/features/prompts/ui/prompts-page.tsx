import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { z } from 'zod'
import { Button } from '../../../shared/ui/button'

export function PromptsPage() {
  const { t } = useTranslation()
  const [saved, setSaved] = useState(false)

  const schema = z.object({
    title: z.string().min(3, t('prompts.validation.titleMin')),
    content: z.string().min(10, t('prompts.validation.contentMin'))
  })

  type FormValues = z.infer<typeof schema>

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: '',
      content: ''
    }
  })

  const onSubmit = (_values: FormValues) => {
    setSaved(true)
  }

  return (
    <section className="space-y-5">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">{t('prompts.title')}</h2>
        <p className="text-sm text-slate-500">{t('prompts.subtitle')}</p>
      </header>

      <form className="space-y-4 rounded-2xl border border-slate-200 bg-white p-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="title">{t('prompts.fields.title')}</label>
          <input
            id="title"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            {...form.register('title')}
          />
          {form.formState.errors.title && <p className="text-xs text-rose-600">{form.formState.errors.title.message}</p>}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700" htmlFor="content">{t('prompts.fields.content')}</label>
          <textarea
            id="content"
            className="min-h-40 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none ring-brand-500 focus:ring-2"
            {...form.register('content')}
          />
          {form.formState.errors.content && <p className="text-xs text-rose-600">{form.formState.errors.content.message}</p>}
        </div>

        <Button type="submit">{t('prompts.actions.save')}</Button>
        {saved && <p className="text-sm text-emerald-700">{t('prompts.success')}</p>}
      </form>
    </section>
  )
}
