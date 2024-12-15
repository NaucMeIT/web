'use client'

import { useSession } from 'next-auth/react'

export function Header() {
  const { data } = useSession()
  const email = data?.user?.email
  if (!email) return

  return <div>Logged in as {email}</div>
}
