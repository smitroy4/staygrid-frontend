import { useState, useEffect, type FormEvent } from 'react'
import { User, Mail, Calendar, Save } from 'lucide-react'
import { getProfile, updateProfile } from '../../api/users'
import type { UserDto, Gender } from '../../types'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import toast from 'react-hot-toast'

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [saving, setSaving] = useState(false)

  const [name, setName] = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [gender, setGender] = useState<Gender | ''>('')

  useEffect(() => {
    setLoading(true)
    getProfile()
      .then((user) => {
        setProfile(user)
        setName(user.name || '')
        setDateOfBirth(user.dateOfBirth || '')
        setGender(user.gender || '')
      })
      .catch((err) => setError(err?.response?.data?.error?.message || 'Failed to load profile'))
      .finally(() => setLoading(false))
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      await updateProfile({
        name,
        dateOfBirth: dateOfBirth || undefined,
        gender: (gender as Gender) || undefined,
      })
      toast.success('Profile updated')
    } catch (err: any) {
      toast.error(err?.response?.data?.error?.message || 'Update failed')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <LoadingSpinner fullPage text="Loading profile..." />
  if (error) return <div className="max-w-2xl mx-auto px-4 py-8"><ErrorMessage message={error} /></div>

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-16 h-16 rounded-full bg-brand-600 flex items-center justify-center">
          <User className="w-8 h-8 text-white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{profile?.name || 'My Profile'}</h1>
          <p className="text-surface-400 text-sm">{profile?.email}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-surface-800 rounded-xl p-6 border border-surface-700 space-y-5">
        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-700 border border-surface-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            <input
              type="email"
              value={profile?.email || ''}
              disabled
              className="w-full bg-surface-700 border border-surface-600 rounded-lg pl-10 pr-4 py-2.5 text-surface-400 cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1">Date of Birth</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-surface-500" />
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full bg-surface-700 border border-surface-600 rounded-lg pl-10 pr-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors [color-scheme:dark]"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-surface-300 mb-1">Gender</label>
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value as Gender)}
            className="w-full bg-surface-700 border border-surface-600 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:border-brand-500 transition-colors"
          >
            <option value="">Prefer not to say</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
            <option value="OTHERS">Others</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="flex items-center justify-center gap-2 bg-brand-600 hover:bg-brand-500 disabled:opacity-50 text-white px-6 py-2.5 rounded-lg font-medium transition-colors"
        >
          <Save className="w-4 h-4" />
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  )
}
