import type { Access } from 'payload'

export const authenticatedOrPublished: Access = ({ req: { user } }) => {
  if (user?.collection==='admins'){
    return Boolean(user)
  }

  return {
    _status: {
      equals: 'published',
    },
  }
}
