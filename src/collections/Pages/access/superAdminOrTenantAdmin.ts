import { getUserTenantIDs } from '@/utilities/getUserTenantID'
import { isSuperAdmin } from '../../../access/isSuperAdmin'
import { Access } from 'payload'

/**
 * Tenant admins and super admins can will be allowed access
 */
export const superAdminOrTenantAdminAccess: Access = ({ req: { user } }) => {
  if (!user) {
    return false
  }

  if (isSuperAdmin(user)) {
    return true
  }

  if (getUserTenantIDs(user, 'tenant-admin')) {
    return true
  }
  return {
    _status: {
      equals: 'published',
    },
  }
}