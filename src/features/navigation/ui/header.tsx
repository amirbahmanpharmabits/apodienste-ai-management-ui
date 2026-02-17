import { Languages, LogOut, Search } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Button } from '../../../shared/ui/button'

type HeaderProps = {
  onLogout: () => Promise<void>
}

export function Header({ onLogout }: HeaderProps) {
  const { t, i18n } = useTranslation()

  const switchLanguage = () => {
    const next = i18n.language === 'en' ? 'de' : 'en'
    i18n.changeLanguage(next)
  }

  return (
    <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-6">
      <div className="relative w-full max-w-xl">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <input
          className="w-full rounded-lg border border-slate-300 py-2 pl-9 pr-3 text-sm outline-none ring-brand-500 focus:ring-2"
          placeholder={t('header.searchPlaceholder')}
        />
      </div>

      <div className="ml-4 flex items-center gap-2">
        <Button variant="ghost" size="sm" onClick={switchLanguage}>
          <Languages className="mr-1 h-4 w-4" />
          {t('common.language')}: {i18n.language.toUpperCase()}
        </Button>
        <Button variant="secondary" size="sm" onClick={onLogout}>
          <LogOut className="mr-1 h-4 w-4" />
          {t('common.logout')}
        </Button>
      </div>
    </header>
  )
}
