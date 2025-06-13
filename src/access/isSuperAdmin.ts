import type { Access } from 'payload'
import { Admin } from '../payload-types'

export const isSuperAdminAccess: Access = ({ req }): boolean => {
  return isSuperAdmin(req.user)
}

export const isSuperAdmin = (user: Admin | null): boolean => {
  return Boolean(user?.roles?.includes('super-admin'))
}

