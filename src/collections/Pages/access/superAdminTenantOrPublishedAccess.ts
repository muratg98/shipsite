import type { Access } from 'payload'
import { isSuperAdmin } from '@/access/isSuperAdmin'
import { getUserTenantIDs } from '@/utilities/getUserTenantID'
import { extractID } from '@/utilities/extractID'
import type { Admin } from '@/payload-types'

export const superAdminTenantOrPublishedAccess: Access = ({ req: { user } }) => {
  if (user) {
    if (isSuperAdmin(user)) {
      return true
    }

    if (user.collection === 'admins') {
      const adminUser = user as Admin

      const adminTenantIDs = getUserTenantIDs(adminUser, 'tenant-admin')
      const viewerTenantIDs = getUserTenantIDs(adminUser, 'tenant-viewer')
      const allTenantIDs = [...new Set([...adminTenantIDs, ...viewerTenantIDs])]
      const userTenantIDs = (adminUser.tenants || []).map(({ tenant }) => extractID(tenant))

      const hasMatchingTenant = userTenantIDs.some(id => allTenantIDs.includes(id))

      if (hasMatchingTenant) {
        return true
      }
    }
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
