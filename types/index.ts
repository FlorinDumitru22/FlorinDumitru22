export interface FundingStage {
  name: string
  budget: number
  spent: number
  progress: number
  status: 'complete' | 'progress' | 'pending'
}

export interface SupportTier {
  name: string
  amount: number
  benefits: string[]
}

export interface BuildDay {
  dateStart: string
  dateEnd: string
  activity: string
  maxVolunteers: number
  currentVolunteers: number
  skillsRequired: string
}

export interface TimelineEvent {
  title: string
  description: string
  date: string
  status: 'completed' | 'active' | 'upcoming'
  photos?: string[]
}

export interface AdminCredentials {
  username: string
  password: string
}
