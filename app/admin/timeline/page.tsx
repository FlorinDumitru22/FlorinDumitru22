'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { timelineEventSchema, type TimelineEventInput } from '@/lib/validations';

export default function TimelineManager() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<TimelineEventInput>({
    resolver: zodResolver(timelineEventSchema),
  });

  const onSubmit = async (data: TimelineEventInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/timeline', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newEvent = await response.json();
        setEvents([...events, newEvent]);
        reset();
        alert('Timeline event added successfully!');
      } else {
        alert('Failed to add timeline event');
      }
    } catch (error) {
      console.error('Error adding timeline event:', error);
      alert('Error adding timeline event');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) return;

    try {
      const response = await fetch(`/api/admin/timeline/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEvents(events.filter(evt => evt._id !== id));
        alert('Event deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Build Timeline Manager</h1>

        {/* Add Event Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Timeline Event</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Event Title *
              </label>
              <input
                {...register('title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="e.g., Foundation Complete"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description *
              </label>
              <textarea
                {...register('description')}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Describe the milestone or progress"
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
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

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Build Stage *
                </label>
                <select
                  {...register('stage')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select stage</option>
                  <option value="planning">Planning</option>
                  <option value="fencing">Fencing</option>
                  <option value="foundations">Foundations</option>
                  <option value="timber-frame">Timber Frame</option>
                  <option value="insulation">Insulation</option>
                  <option value="roof">Roof</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.stage && (
                  <p className="text-red-500 text-sm mt-1">{errors.stage.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL (optional)
              </label>
              <input
                {...register('imageUrl')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/event-photo.jpg"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Event'}
            </button>
          </form>
        </div>

        {/* Events List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Timeline Events</h2>
          {events.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No timeline events yet. Add your first milestone above.
            </p>
          ) : (
            <div className="space-y-4">
              {events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((event) => (
                <div key={event._id} className="border rounded-lg p-4 hover:shadow-md transition">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{event.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                      <div className="flex gap-3 mt-2">
                        <span className="text-sm text-gray-500">
                          📅 {new Date(event.date).toLocaleDateString()}
                        </span>
                        <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                          {event.stage}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(event._id)}
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
