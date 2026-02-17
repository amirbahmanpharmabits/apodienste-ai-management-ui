import { useState } from 'react'
import { CircleUserRound, LogOut, RotateCcw } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type HeaderProps = {
  onLogout: () => Promise<void>
}

export function Header({ onLogout }: HeaderProps) {
  const { t } = useTranslation()
  const [open, setOpen] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  return (
    <header className="relative flex h-16 items-center justify-end border-b border-slate-200 bg-white px-6">
      <div className="flex items-center gap-3 text-slate-600">
        <button
          className="rounded-full p-2 transition hover:bg-slate-100"
          onClick={() => setOpen((v) => !v)}
          type="button"
        >
          <CircleUserRound className="h-6 w-6" />
        </button>

        <button className="rounded-full p-2 transition hover:bg-slate-100" onClick={onLogout} type="button">
          <LogOut className="h-5 w-5" />
        </button>

        <button className="rounded-full p-2 transition hover:bg-slate-100" type="button">
          <RotateCcw className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="absolute right-14 top-14 z-20 w-56 rounded-lg border border-slate-200 bg-white p-4 shadow-xl">
          <p className="text-[28px] font-semibold text-slate-800">Kroos</p>
          <p className="text-[22px] text-slate-700">Administrator</p>
          <p className="text-[22px] text-slate-700">BackOffice Admin</p>
          <button
            className="mt-3 text-[24px] font-semibold text-[#2a5bff]"
            onClick={() => {
              setShowProfile(true)
              setOpen(false)
            }}
            type="button"
          >
            {t('header.openProfile')}
          </button>
        </div>
      )}

      {showProfile && (
        <div className="fixed inset-0 z-30 grid place-items-center bg-black/25 p-4">
          <div className="w-full max-w-[900px] rounded-xl border border-slate-300 bg-white shadow-2xl">
            <div className="border-b border-slate-200 px-5 py-4 text-[32px] font-semibold text-slate-800">Kroos</div>
            <div className="space-y-4 px-5 py-6 text-[26px] text-slate-700">
              <div className="grid grid-cols-[200px_1fr]">
                <span>{t('header.profileFields.name')}</span>
                <strong>Toni, Kroos</strong>
              </div>
              <div className="grid grid-cols-[200px_1fr]">
                <span>{t('header.profileFields.landline')}</span>
                <a className="text-[#2a5bff] underline" href="#">Enter Landline</a>
              </div>
              <div className="grid grid-cols-[200px_1fr]">
                <span>{t('header.profileFields.email')}</span>
                <strong>h@amirbahmanmail.com</strong>
              </div>
            </div>
            <div className="flex justify-end px-5 pb-5">
              <button
                className="rounded-lg bg-[#2a5bff] px-4 py-2 text-[22px] font-semibold text-white"
                onClick={() => setShowProfile(false)}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
