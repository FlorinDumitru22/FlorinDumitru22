'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Admin {
  username: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)

  const checkAuth = useCallback(async () => {
    try {
      const res = await fetch('/api/auth/me')
      if (!res.ok) {
        router.push('/admin')
        return
      }
      const data = await res.json()
      setAdmin(data.admin)
    } catch {
      router.push('/admin')
    } finally {
      setLoading(false)
    }
  }, [router])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/admin')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-display font-bold text-primary-700">
            Admin Dashboard
          </h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">Welcome, {admin?.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="text-gray-600 mb-2">Total Raised</div>
            <div className="text-3xl font-bold text-primary-700">€32,450</div>
          </div>
          <div className="card">
            <div className="text-gray-600 mb-2">Supporters</div>
            <div className="text-3xl font-bold text-secondary-500">147</div>
          </div>
          <div className="card">
            <div className="text-gray-600 mb-2">Build Progress</div>
            <div className="text-3xl font-bold text-primary-700">38%</div>
          </div>
          <div className="card">
            <div className="text-gray-600 mb-2">Volunteers</div>
            <div className="text-3xl font-bold text-secondary-500">89</div>
          </div>
        </div>

        {/* Management Sections */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/admin/funding" className="card hover:shadow-lg transition">
            <div className="text-4xl mb-4">💰</div>
            <h3 className="text-xl font-bold mb-2">Funding Management</h3>
            <p className="text-gray-600">Update goals, stages, and progress</p>
          </Link>

          <Link href="/admin/gallery" className="card hover:shadow-lg transition">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-bold mb-2">Gallery</h3>
            <p className="text-gray-600">Upload and manage project images</p>
          </Link>

          <Link href="/admin/timeline" className="card hover:shadow-lg transition">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-2">Timeline</h3>
            <p className="text-gray-600">Add construction milestones</p>
          </Link>

          <Link href="/admin/volunteers" className="card hover:shadow-lg transition">
            <div className="text-4xl mb-4">👷</div>
            <h3 className="text-xl font-bold mb-2">Volunteers</h3>
            <p className="text-gray-600">Manage build days and signups</p>
          </Link>

          <Link href="/admin/materials" className="card hover:shadow-lg transition">
            <div className="text-4xl mb-4">🔨</div>
            <h3 className="text-xl font-bold mb-2">Materials & Costs</h3>
            <p className="text-gray-600">Track budget and expenses</p>
          </Link>

          <Link href="/admin/settings" className="card hover:shadow-lg transition">
            <div className="text-4xl mb-4">⚙️</div>
            <h3 className="text-xl font-bold mb-2">Settings</h3>
            <p className="text-gray-600">Change credentials and preferences</p>
          </Link>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 card">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            {[
              { time: '2 hours ago', action: 'New supporter: John D. - €50' },
              { time: '5 hours ago', action: 'Gallery updated: Foundation photos added' },
              { time: '1 day ago', action: 'Build day scheduled: Dec 14-15' },
              { time: '2 days ago', action: 'Materials updated: Timber costs' },
            ].map((item, idx) => (
              <div key={idx} className="flex justify-between items-center border-b border-gray-200 pb-3">
                <span>{item.action}</span>
                <span className="text-sm text-gray-500">{item.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
