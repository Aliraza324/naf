import { useCallback, useState, useEffect } from 'react'
import { patch, get } from '../../api/service'
import { GET_DEALER_PROFILE_API, UPDATE_DEALER_PROFILE_API, UPDATE_DEALER_PASSWORD_API } from '../../api/landingRoute'
import toast from '../../utils/toast'

// ─── Dealer Profile Hook ───────────────────────────────────────────────────

export function useDealerProfile() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true)
        const data = await get(GET_DEALER_PROFILE_API)
        setProfile(data?.data || data)
      } catch (err) {
        toast.error(err?.response?.data?.message || 'Failed to load profile')
      } finally {
        setLoading(false)
      }
    }
    fetchProfile()
  }, [])

  const updateProfile = useCallback(async (form) => {
    try {
      setSaving(true)
      const data = await patch(UPDATE_DEALER_PROFILE_API, form)
      if (data?.success) {
        setProfile(data?.data || form)
        toast.success(data.message || 'Profile updated successfully')
        return { success: true }
      }
      toast.error(data?.message || 'Failed to update profile')
      return { success: false }
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update profile')
      return { success: false }
    } finally {
      setSaving(false)
    }
  }, [])

  return { profile, loading, saving, updateProfile }
}

// ─── Dealer Password Hook ──────────────────────────────────────────────────

const getPasswordErrorMessage = (data) => {
  if (!data) return 'Failed to update password'
  const failed = data?.details?.failedRequirements
  if (failed?.length) {
    return `${data.message || 'Password requirements not met'}: ${failed.join(', ')}`
  }
  return data.message || 'Failed to update password'
}

export function useDealerPasswordSetting() {
  const [savingPassword, setSavingPassword] = useState(false)

  const updateDealerPassword = useCallback(async (passwordForm) => {
    const payload = {
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword,
      confirmPassword: passwordForm.confirmPassword,
    }

    try {
      setSavingPassword(true)
      const data = await patch(UPDATE_DEALER_PASSWORD_API, payload)

      if (data?.success) {
        toast.success(data.message || 'Password updated successfully')
        return {
          success: true,
          message: data.message || 'Password updated successfully',
          checks: data.checks,
        }
      }

      const message = getPasswordErrorMessage(data)
      toast.error(message)
      return {
        success: false,
        error: message,
        checks: data?.details?.checks,
        failedRequirements: data?.details?.failedRequirements || [],
      }
    } catch (err) {
      const data = err?.response?.data || {}
      const message = getPasswordErrorMessage(data) || err?.message || 'Network error'
      toast.error(message)
      return {
        success: false,
        error: message,
        checks: data?.details?.checks,
        failedRequirements: data?.details?.failedRequirements || [],
      }
    } finally {
      setSavingPassword(false)
    }
  }, [])

  return { savingPassword, updateDealerPassword }
}