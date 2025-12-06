'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { galleryImageSchema, type GalleryImageInput } from '@/lib/validations';

interface GalleryImage extends GalleryImageInput {
  _id: string;
  createdAt: string;
}

export default function GalleryManager() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<GalleryImageInput>({
    resolver: zodResolver(galleryImageSchema),
  });

  const onSubmit = async (data: GalleryImageInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newImage = await response.json();
        setImages([...images, newImage]);
        reset();
        alert('Image added successfully!');
      } else {
        alert('Failed to add image');
      }
    } catch (error) {
      console.error('Error adding image:', error);
      alert('Error adding image');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) return;

    try {
      const response = await fetch(`/api/admin/gallery/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setImages(images.filter(img => img._id !== id));
        alert('Image deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Gallery Manager</h1>

        {/* Add Image Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Image</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Title *
              </label>
              <input
                {...register('title')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter image title"
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
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
                placeholder="Enter image description"
              />
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

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL *
              </label>
              <input
                {...register('imageUrl')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://example.com/image.jpg"
              />
              {errors.imageUrl && (
                <p className="text-red-500 text-sm mt-1">{errors.imageUrl.message}</p>
              )}
              <p className="text-sm text-gray-500 mt-1">
                Note: In production, integrate with cloud storage (Cloudinary, AWS S3, etc.)
              </p>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Image'}
            </button>
          </form>
        </div>

        {/* Images Grid */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Gallery Images</h2>
          {images.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No images yet. Add your first project image above.
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map((image) => (
                <div key={image._id} className="border rounded-lg overflow-hidden">
                  <img
                    src={image.imageUrl}
                    alt={image.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-lg">{image.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{image.description}</p>
                    <span className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                      {image.stage}
                    </span>
                    <button
                      onClick={() => handleDelete(image._id)}
                      className="mt-3 w-full bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
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
