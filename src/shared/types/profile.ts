export type ProfileStatus = 'Preparation' | 'In progress' | 'Ready to invoice' | 'Completed'

export type Profile = {
  id: string
  name: string
  availability: 'Available'
  status: ProfileStatus
  pdlIcons: Array<'blue' | 'green' | 'red' | 'gray'>
  medicationSource?: string
}
