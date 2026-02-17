import { apiGet } from '../../../shared/api/client'
import type { Profile } from '../../../shared/types/profile'

const DEMO_DATA: Profile[] = [
  { id: 'p1', name: 'Ahmadi, Emad', availability: 'Available', status: 'Preparation', pdlIcons: ['green', 'blue', 'gray'] },
  { id: 'p2', name: 'Albrecht, Christian', availability: 'Available', status: 'In progress', pdlIcons: ['blue'] },
  { id: 'p3', name: 'Albrecht, Alihan', availability: 'Available', status: 'Ready to invoice', pdlIcons: ['red', 'gray'] },
  { id: 'p4', name: 'Albrecht, Anni', availability: 'Available', status: 'Ready to invoice', pdlIcons: ['red', 'blue', 'gray'] },
  { id: 'p5', name: 'Albrecht, Chris', availability: 'Available', status: 'Completed', pdlIcons: ['red'] },
  { id: 'p6', name: 'Albrecht, Celine', availability: 'Available', status: 'Preparation', pdlIcons: ['blue', 'blue', 'gray'] },
  { id: 'p7', name: 'Albrecht, Dominik', availability: 'Available', status: 'Completed', pdlIcons: ['red'] },
  { id: 'p8', name: 'Albrechten, Dustin', availability: 'Available', status: 'Ready to invoice', pdlIcons: ['red', 'blue', 'red'], medicationSource: 'WaWi' },
  { id: 'p9', name: 'Albrecht, Fabian', availability: 'Available', status: 'In progress', pdlIcons: ['red'], medicationSource: 'WaWi' }
]

export async function getProfiles(): Promise<Profile[]> {
  try {
    return await apiGet<Profile[]>('/api/profiles')
  } catch {
    return DEMO_DATA
  }
}
