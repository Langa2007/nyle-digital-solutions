'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Upload } from 'lucide-react';
import Link from 'next/link';
import { adminApi } from '@/lib/api/adminClient';

export default function NewBlogPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: '',
    featuredImage: '',
    status: 'draft' as 'draft' | 'published',
    tags: '',
  });

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

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

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
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const submitData = {
        ...formData,
        tags: formData.tags
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        publishedAt: formData.status === 'published' ? new Date() : null,
      };

      await adminApi.post('/blog', submitData);
      alert('Blog post created successfully!');
      router.push('/dashboard/blog');
    } catch (error) {
      console.error('Failed to create blog post:', error);
      alert('Failed to create blog post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Link
          href="/dashboard/blog"
          className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to Blog
        </Link>
      </div>

      <div className="max-w-3xl rounded-2xl border border-slate-200 bg-white p-8">
        <h1 className="text-2xl font-bold text-slate-900">Publish New Post</h1>
        <p className="mt-2 text-sm text-slate-600">
          Share your thoughts and insights with your audience.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div>
            <label className="block text-sm font-medium text-slate-700">Post Title *</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="e.g., Tips for Building Scalable Applications"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Excerpt *</label>
            <textarea
              name="excerpt"
              value={formData.excerpt}
              onChange={handleInputChange}
              required
              rows={2}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Brief summary that appears in listings..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Content *</label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleInputChange}
              required
              rows={10}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-mono focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="Write your blog post content here..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700">Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="e.g., Technology, Business"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleInputChange}
                aria-label="Post status"
                className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="draft">Draft</option>
                <option value="published">Publish Now</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700">Featured Image</label>
            {formData.featuredImage ? (
              <div className="mt-2 space-y-3">
                <div className="relative h-48 w-full overflow-hidden rounded-lg bg-slate-100">
                  <img
                    src={formData.featuredImage}
                    alt="Featured"
                    className="h-full w-full object-cover"
                  />
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
            <label className="block text-sm font-medium text-slate-700">Tags</label>
            <input
              type="text"
              name="tags"
              value={formData.tags}
              onChange={handleInputChange}
              className="mt-2 w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              placeholder="software, development, tips (comma-separated)"
            />
          </div>

          <div className="flex gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={() => router.push('/dashboard/blog')}
              className="flex-1 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? 'Publishing...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
