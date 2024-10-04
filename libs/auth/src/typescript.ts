export interface User {
  id: string
  email: string
  profilePictureUrl?: string | null
  firstName?: string | null
  lastName?: string | null
  createdAt: string
  updatedAt: string
}

export interface UserProfileRawRecord {
  user_id: bigint
  organisation_name: string
  organisation_slug: string
  email?: string
  inserted_date: Date
  updated_date: Date
  synced_date: Date
  full_name?: string
  avatar_url?: string
  credit: number
  credit_alert_lower_then?: number
  used_count_today: number
}

export interface UserProfileResponse {
  internalId: number
  organisationName: string
  organisationSlug: string
  email?: string
  insertedDate: Date
  updatedDate: Date
  syncedDate: Date
  fullName?: string
  avatarUrl?: string
  credit: number
  creditAlertLowerThen?: number
  usedCountToday: number
}
