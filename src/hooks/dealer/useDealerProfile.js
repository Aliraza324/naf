import { useState, useEffect, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { get, patch } from '../../api/service'
import { GET_DEALER_PROFILE_API, UPDATE_DEALER_PROFILE_API } from '../../api/landingRoute'
import { selectUser, updateUserProfile } from '../../features/auth/authSlice'
import toast from '../../utils/toast'

/**
 * useDealerProfile
 * 1. Immediately seeds the form from the Redux auth user.
 * 2. Then fetches fresh data from GET /dealer/profile.
 * 3. Updates profile with PATCH /dealer/profile.
 */
export default function useDealerProfile() {
  const reduxUser = useSelector(selectUser)
  const dispatch = useDispatch()

  const [profile, setProfile] = useState(() => reduxUser || null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (reduxUser && !profile) {
      setProfile(reduxUser)
    }
  }, [reduxUser, profile])

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)

      const data = await get(GET_DEALER_PROFILE_API)

      if (data?.success && data?.profile) {
        setProfile(data.profile)
      }
    } catch (err) {
      const message = err?.message || 'Failed to load profile'

      if (message.includes('Route not found') || err?.response?.status === 404) {
        setProfile((currentProfile) => currentProfile || reduxUser || null)
        setError(null)
        return
      }

      setError(message)
    } finally {
      setLoading(false)
    }
  }, [reduxUser])

  useEffect(() => {
    fetchProfile()
  }, [fetchProfile])

  const updateProfile = useCallback(async (formData) => {
    try {
      setSaving(true)
      setError(null)

      const payload = {
        fullName: formData.fullName,
        dealerName: formData.fullName,
        username: formData.username,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        phone: formData.phoneNumber,
        birthDate: formData.birthDate,
        address: formData.address,
        location: formData.address,
        ...(formData.profileImage ? { profileImage: formData.profileImage } : {}),
      }

      const data = await patch(UPDATE_DEALER_PROFILE_API, payload)

      if (data?.success && data?.profile) {
        setProfile(data.profile)
        dispatch(updateUserProfile({
          name: data.profile.fullName || data.profile.dealerName,
          email: data.profile.email,
          avatar: data.profile.profileImage || data.profile.image,
        }))
        toast.success(data.message || 'Profile updated successfully')
        return { success: true, profile: data.profile }
      }

      return { success: false, error: data?.message || 'Failed to update profile' }
    } catch (err) {
      const message = err?.message || 'Failed to update profile'
      setError(message)
      toast.error(message)
      return { success: false, error: message }
    } finally {
      setSaving(false)
    }
  }, [])

  return {
    profile,
    loading,
    saving,
    error,
    fetchProfile,
    updateProfile,
  }
}
