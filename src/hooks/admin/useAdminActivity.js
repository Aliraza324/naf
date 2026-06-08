import { useQuery } from '@tanstack/react-query'
import { get } from '../../api/service'
import { GET_ADMIN_ACTIVITY_API } from '../../api/landingRoute'

export const adminActivityQueryKey = ['admin-activity']

export const useAdminActivity = (limit = 10) => {
  return useQuery({
    queryKey: [...adminActivityQueryKey, limit],
    queryFn: async () => {
      const response = await get(GET_ADMIN_ACTIVITY_API(limit))
      return response || null
    },
  })
}
