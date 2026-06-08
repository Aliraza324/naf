import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { get, patch, post } from '../../api/service'
import {
  ADMIN_CATEGORIES_API,
  CREATE_CATEGORY_API,
  UPDATE_CATEGORY_API,
} from '../../api/landingRoute'
import toast from '../../utils/toast'

export const adminCategoriesQueryKey = ['admin-categories']

export const useAdminCategories = () => {
  return useQuery({
    queryKey: adminCategoriesQueryKey,
    queryFn: async () => {
      const response = await get(ADMIN_CATEGORIES_API)
      return response?.categories || []
    },
  })
}

export const useCreateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (categoryData) => {
      return post(CREATE_CATEGORY_API, categoryData)
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message || 'Category created successfully')
        queryClient.invalidateQueries({ queryKey: adminCategoriesQueryKey })
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      } else {
        toast.error(data?.message || 'Failed to create category')
      }
    },
    onError: (error) => {
      console.error('Create category error:', error)
    },
  })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ id, data }) => {
      return patch(UPDATE_CATEGORY_API(id), data)
    },
    onSuccess: (data) => {
      if (data?.success) {
        toast.success(data.message || 'Category updated successfully')
        queryClient.invalidateQueries({ queryKey: adminCategoriesQueryKey })
        queryClient.invalidateQueries({ queryKey: ['categories'] })
      } else {
        toast.error(data?.message || 'Failed to update category')
      }
    },
    onError: (error) => {
      console.error('Update category error:', error)
    },
  })
}
