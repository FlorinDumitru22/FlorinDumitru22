'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { materialSchema, type MaterialInput } from '@/lib/validations';

export default function MaterialsManager() {
  const [materials, setMaterials] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm<MaterialInput>({
    resolver: zodResolver(materialSchema),
  });

  const onSubmit = async (data: MaterialInput) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/materials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const newMaterial = await response.json();
        setMaterials([...materials, newMaterial]);
        reset();
        alert('Material added successfully!');
      } else {
        alert('Failed to add material');
      }
    } catch (error) {
      console.error('Error adding material:', error);
      alert('Error adding material');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this material?')) return;

    try {
      const response = await fetch(`/api/admin/materials/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMaterials(materials.filter(mat => mat._id !== id));
        alert('Material deleted successfully!');
      }
    } catch (error) {
      console.error('Error deleting material:', error);
    }
  };

  const totalBudgeted = materials.reduce((sum, m) => sum + m.budgeted, 0);
  const totalActual = materials.reduce((sum, m) => sum + m.actual, 0);
  const variance = totalBudgeted - totalActual;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Materials & Costs Manager</h1>

        {/* Budget Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Budgeted</h3>
            <p className="text-3xl font-bold text-gray-900">€{totalBudgeted.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Total Actual</h3>
            <p className="text-3xl font-bold text-gray-900">€{totalActual.toLocaleString()}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-sm font-medium text-gray-500 mb-2">Variance</h3>
            <p className={`text-3xl font-bold ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {variance >= 0 ? '+' : ''}€{variance.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Add Material Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add Material/Cost</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Material Name *
                </label>
                <input
                  {...register('name')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Oak timber beams"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category *
                </label>
                <select
                  {...register('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  <option value="lumber">Lumber</option>
                  <option value="insulation">Insulation</option>
                  <option value="roofing">Roofing</option>
                  <option value="foundation">Foundation</option>
                  <option value="tools">Tools</option>
                  <option value="other">Other</option>
                </select>
                {errors.category && (
                  <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Budgeted Amount (€) *
                </label>
                <input
                  {...register('budgeted', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
                {errors.budgeted && (
                  <p className="text-red-500 text-sm mt-1">{errors.budgeted.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Actual Cost (€) *
                </label>
                <input
                  {...register('actual', { valueAsNumber: true })}
                  type="number"
                  step="0.01"
                  min="0"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="0.00"
                />
                {errors.actual && (
                  <p className="text-red-500 text-sm mt-1">{errors.actual.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Supplier
              </label>
              <input
                {...register('supplier')}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Supplier name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                {...register('notes')}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Additional notes or specifications"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Material'}
            </button>
          </form>
        </div>

        {/* Materials List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Materials & Costs Breakdown</h2>
          {materials.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No materials added yet. Start tracking your costs above.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-semibold">Material</th>
                    <th className="text-left py-3 px-4 font-semibold">Category</th>
                    <th className="text-right py-3 px-4 font-semibold">Budgeted</th>
                    <th className="text-right py-3 px-4 font-semibold">Actual</th>
                    <th className="text-right py-3 px-4 font-semibold">Variance</th>
                    <th className="text-center py-3 px-4 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((material) => {
                    const variance = material.budgeted - material.actual;
                    return (
                      <tr key={material._id} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div>
                            <p className="font-medium">{material.name}</p>
                            {material.supplier && (
                              <p className="text-sm text-gray-500">{material.supplier}</p>
                            )}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">
                            {material.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">€{material.budgeted.toLocaleString()}</td>
                        <td className="py-3 px-4 text-right">€{material.actual.toLocaleString()}</td>
                        <td className={`py-3 px-4 text-right font-medium ${variance >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {variance >= 0 ? '+' : ''}€{variance.toLocaleString()}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => handleDelete(material._id)}
                            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
