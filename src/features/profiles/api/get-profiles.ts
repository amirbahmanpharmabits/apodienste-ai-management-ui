import { apiGet } from '../../../shared/api/client'
import type { Profile } from '../../../shared/types/profile'

const DEMO_DATA: Profile[] = [
  { id: 'p1', name: 'Elderly House West', status: 'active', updatedAt: '2026-02-17' },
  { id: 'p2', name: 'Pharmacy Core Team', status: 'active', updatedAt: '2026-02-16' },
  { id: 'p3', name: 'Prompt Editors', status: 'draft', updatedAt: '2026-02-15' }
]

export async function getProfiles(): Promise<Profile[]> {
  try {
    return await apiGet<Profile[]>('/api/profiles')
  } catch {
    return DEMO_DATA
  }
}
