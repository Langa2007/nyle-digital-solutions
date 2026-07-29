'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Upload, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/adminClient';
import ImageCropper from '@/components/ui/ImageCropper';

interface EditPortfolioPageProps {
  params: Promise<{ id: string }>;
}

export default function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const router = useRouter();
  const { id } = React.use(params);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    client: '',
    technologies: '',
    featuredImage: '',
    liveUrl: '',
    githubUrl: '',
    results: '',
  });

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showCropper, setShowCropper] = useState(false);

  useEffect(() => {
    async function fetchPortfolioItem() {
      try {
        const response = await adminApi.getPortfolioItem(id);
        const item = response.data.data;
        if (item) {
          setFormData({
            title: item.title || '',
            description: item.description || '',
            category: item.category || '',
            client: item.client || '',
            technologies: Array.isArray(item.technologies) ? item.technologies.join(', ') : '',
            featuredImage: item.featuredImage || '',
            liveUrl: item.liveUrl || '',
            githubUrl: item.githubUrl || '',
            results: item.results || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch portfolio item:', error);
        alert('Failed to load portfolio item details.');
        router.push('/dashboard/portfolio');
      } finally {
        setIsLoading(false);
      }
    }

    fetchPortfolioItem();
  }, [id, router]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert('File size exceeds 10MB limit (max 10MB)');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setSelectedImage(reader.result as string);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const onCropComplete = async (croppedBlob: Blob) => {
    setShowCropper(false);
    setIsSaving(true);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', croppedBlob, 'project-image.jpg');

      const response = await adminApi.post('/admin/upload/image', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const imageUrl = response.data.data.url || response.data.data.secure_url;
      setFormData((prev) => ({
        ...prev,
        featuredImage: imageUrl,
      }));
    } catch (error) {
      console.error('Image upload failed:', error);
      alert('Failed to upload image');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      const submitData = {
        ...formData,
        technologies: formData.technologies
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
      };

      await adminApi.updatePortfolioItem(id, submitData);
      alert('Portfolio item updated successfully!');
      router.push('/dashboard/portfolio');
    } catch (error) {
      console.error('Failed to update portfolio item:', error);
      alert('Failed to update portfolio item');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/portfolio"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Portfolio
        </Link>
      </div>

      <div className="max-w-2xl rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">Edit Project</h1>
        <p className="mt-2 text-sm text-slate-600">
          Modify the details of your portfolio project.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Project Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g., E-Commerce Platform"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Description *</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              required
              rows={4}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Describe the project and its impact..."
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
              placeholder="e.g., Web Platform, Mobile App"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Client</label>
            <input
              type="text"
              name="client"
              value={formData.client}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Company name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Technologies</label>
            <input
              type="text"
              name="technologies"
              value={formData.technologies}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="React, Node.js, PostgreSQL (comma-separated)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Project Image</label>
            {formData.featuredImage ? (
              <div className="mt-2 space-y-3">
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-100">
                  <img
                    src={formData.featuredImage}
                    alt="Project"
                    className="h-full w-full object-cover"
                  />
                  {isSaving && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[2px]">
                      <Loader2 className="h-8 w-8 animate-spin text-white" />
                    </div>
                  )}
                </div>
                <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-slate-300 px-4 py-2 text-sm hover:bg-slate-50">
                  <Upload className="h-4 w-4" />
                  Change Image
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            ) : (
              <label className="mt-2 flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-slate-300 px-4 py-12 text-center hover:bg-slate-50">
                <Upload className="h-8 w-8 text-slate-400" />
                <p className="mt-2 text-sm font-medium text-slate-600">Click to upload</p>
                <p className="text-xs text-slate-500">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Live URL</label>
            <input
              type="url"
              name="liveUrl"
              value={formData.liveUrl}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="https://example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">GitHub URL</label>
            <input
              type="url"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="https://github.com/..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Results</label>
            <textarea
              name="results"
              value={formData.results}
              onChange={handleInputChange}
              rows={3}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g., Increased conversion by 25%, improved performance..."
            />
          </div>

          <div className="flex gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => router.push('/dashboard/portfolio')}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>

      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCropComplete={onCropComplete}
          onCancel={() => setShowCropper(false)}
          aspectRatio={16 / 9}
        />
      )}
    </div>
  );
}
