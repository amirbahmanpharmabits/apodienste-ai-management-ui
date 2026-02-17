import { Navigate, createBrowserRouter } from 'react-router-dom'
import { AppShell } from '../layout/app-shell'
import { ProfilesPage } from '../../features/profiles/ui/profiles-page'
import { PromptsPage } from '../../features/prompts/ui/prompts-page'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppShell />,
    children: [
      { index: true, element: <Navigate to="/profiles" replace /> },
      { path: 'profiles', element: <ProfilesPage /> },
      { path: 'prompts', element: <PromptsPage /> }
    ]
  }
])
