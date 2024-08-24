import * as React from 'react'
import { getSession } from '../app/actions'

export const Header = async () => {
  const session = await getSession()

  return <div>Logged in as {session?.user?.email ?? 'null'}</div>
}
