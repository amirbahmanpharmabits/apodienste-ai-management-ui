import type { LucideIcon } from 'lucide-react'
import { MessageSquareText, Users } from 'lucide-react'

export type NavItem = {
  labelKey: string
  to: string
  icon: LucideIcon
}

export const navItems: NavItem[] = [
  { labelKey: 'nav.profiles', to: '/profiles', icon: Users },
  { labelKey: 'nav.prompts', to: '/prompts', icon: MessageSquareText }
]
