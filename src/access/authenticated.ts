import type { AccessArgs } from 'payload'
import type { Admin } from '@/payload-types'

type isAuthenticated = (args: AccessArgs<Admin>) => boolean

export const authenticated: isAuthenticated = ({ req: { user } }) => {
  if (user?.collection==='admins'){
    return Boolean(user)

  }
  return false;

}
