import type { Access, AccessArgs } from 'payload'
import type { Admin } from '@/payload-types'
import { isSuperAdmin } from '@/access/isSuperAdmin'

export const isTenantAdminOrSuperAdmin: Access = ({ req }) => {
  const user = req.user as Admin | undefined

  if (!user) return false

  if (isSuperAdmin(user)) return true

  const isTenantAdmin = user.tenants?.some(t =>
    t.roles?.includes('tenant-admin')
  )

  return !!isTenantAdmin
}