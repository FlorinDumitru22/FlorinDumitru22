'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { buildDaySchema, type BuildDayInput } from '@/lib/validations';

export default function VolunteersManager() {
  const [buildDays, setBuildDays] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<BuildDayInput>({
    resolver: zodResolver(buildDaySchema),
  });

  const onSubmit = async (data: BuildDayInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/builddays', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newBuildDay = await response.json();
        setBuildDays([...buildDays, newBuildDay]);
        reset();
        alert('Build day scheduled successfully!');
      } else {
        alert('Failed to schedule build day');
      }
    } catch (error) {
      console.error('Error scheduling build day:', error);
      alert('Error scheduling build day');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this build day?')) return;

    try {
      const response = await fetch(`/api/admin/builddays/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setBuildDays(buildDays.filter(day => day._id !== id));
        alert('Build day deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting build day:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Volunteer Schedule Manager</h1>

        {/* Schedule Build Day Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Schedule New Build Day</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date *
              </label>
              <input
                {...register('date')}
                type="date"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              {errors.date && (
                <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time *
                </label>
                <input
                  {...register('startTime')}
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.startTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.startTime.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time *
                </label>
                <input
                  {...register('endTime')}
                  type="time"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {errors.endTime && (
                  <p className="text-red-500 text-sm mt-1">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Maximum Volunteers *
              </label>
              <input
                {...register('maxVolunteers', { valueAsNumber: true })}
                type="number"
                min="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., 10"
              />
              {errors.maxVolunteers && (
                <p className="text-red-500 text-sm mt-1">{errors.maxVolunteers.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                {...register('description')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Brief description of the day's activities"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tasks
              </label>
              <textarea
                {...register('tasks')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="List of tasks for the day (one per line)"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Scheduling...' : 'Schedule Build Day'}
            </button>
          </form>
        </div>

        {/* Build Days List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Scheduled Build Days</h2>
          {buildDays.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No build days scheduled yet. Schedule your first volunteer day above.
            </p>
          ) : (
            <div className="space-y-4">
              {buildDays.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).map((day) => (
                <div key={day._id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">
                        {new Date(day.date).toLocaleDateString('en-US', { 
                          weekday: 'long', 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        🕐 {day.startTime} - {day.endTime}
                      </p>
                      <p className="text-sm text-gray-600">
                        👥 {day.volunteers?.length || 0} / {day.maxVolunteers} volunteers signed up
                      </p>
                      {day.description && (
                        <p className="text-sm text-gray-700 mt-2">{day.description}</p>
                      )}
                      {day.tasks && (
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-700">Tasks:</p>
                          <p className="text-sm text-gray-600">{day.tasks}</p>
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(day._id)}
                      className="ml-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
