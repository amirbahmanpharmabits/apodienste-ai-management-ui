import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { getProfiles } from '../api/get-profiles'

export function ProfilesPage() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['profiles'],
    queryFn: getProfiles
  })

  return (
    <section className="space-y-5">
      <header>
        <h2 className="text-2xl font-semibold text-slate-900">{t('profiles.title')}</h2>
        <p className="text-sm text-slate-500">{t('profiles.subtitle')}</p>
      </header>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-slate-600">
            <tr>
              <th className="px-4 py-3 font-medium">{t('profiles.columns.name')}</th>
              <th className="px-4 py-3 font-medium">{t('profiles.columns.status')}</th>
              <th className="px-4 py-3 font-medium">{t('profiles.columns.updatedAt')}</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={3}>{t('profiles.loading')}</td>
              </tr>
            )}

            {!isLoading && data?.length === 0 && (
              <tr>
                <td className="px-4 py-4 text-slate-500" colSpan={3}>{t('profiles.empty')}</td>
              </tr>
            )}

            {!isLoading && data?.map((profile) => (
              <tr key={profile.id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-900">{profile.name}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                    {profile.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-600">{profile.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
