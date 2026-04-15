'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/adminClient';

export default function NewServicePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    detailedDescription: '',
    category: '',
    startingPrice: '',
    features: '',
    technologies: '',
    icon: '',
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        features: formData.features
          .split('\n')
          .map((f) => f.trim())
          .filter(Boolean),
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        startingPrice: formData.startingPrice ? parseInt(formData.startingPrice) : null,
      };

      await adminApi.post('/services', submitData);
      alert('Service created successfully!');
      router.push('/dashboard/services');
    } catch (error) {
      console.error('Failed to create service:', error);
      alert('Failed to create service');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/services"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Services
        </Link>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">Add New Service</h1>
        <p className="mt-2 text-sm text-slate-600">
          Create a new service offering for your business.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Service Name *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g., Custom Web Development"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Short Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={2}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Brief description of the service..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Detailed Description</label>
            <textarea
              name="detailedDescription"
              value={formData.detailedDescription}
              onChange={handleInputChange}
              rows={4}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Provide more details about what's included..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Category</label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g., Development, Design, Consulting"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Starting Price</label>
            <input
              type="number"
              name="startingPrice"
              value={formData.startingPrice}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g., 5000"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Features (one per line)
            </label>
            <textarea
              name="features"
              value={formData.features}
              onChange={handleInputChange}
              rows={4}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">
              Technologies (comma-separated)
            </label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="React, Node.js, TypeScript"
            />
          </div>

          <div className="flex gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => router.push('/dashboard/services')}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Creating...' : 'Create Service'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
