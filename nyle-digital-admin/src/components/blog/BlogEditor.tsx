'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ImageUploader } from '@/lib/cloudinary';
import { Image, Tag, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

import 'react-quill/dist/quill.snow.css';

/* ---------------- Schema ---------------- */

const blogSchema = z.object({
  title: z.string().min(5),
  content: z.string().min(100),
  excerpt: z.string().min(50),
  category: z.string().min(1),
  tags: z.string(),
  featuredImage: z.string().url(),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface BlogEditorProps {
  initialData?: Partial<BlogFormData>;
  onSubmit: (data: BlogFormData) => Promise<void>;
  isSubmitting: boolean;
}

/* ---------------- Component ---------------- */

export default function BlogEditor({
  initialData,
  onSubmit,
  isSubmitting,
}: BlogEditorProps) {
  /**  ReactQuill loaded manually on client */
  const [ReactQuill, setReactQuill] = useState<any>(null);

  useEffect(() => {
    // This avoids ALL @types/react conflicts
    const RQ = require('react-quill');
    setReactQuill(() => RQ.default);
  }, []);

  const [tags, setTags] = useState<string[]>(
    initialData?.tags?.split(',') || []
  );
  const [tagInput, setTagInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      content: '',
      excerpt: '',
      category: '',
      tags: '',
      featuredImage: '',
      ...initialData,
    },
  });

  const content = watch('content') || '';
  const featuredImage = watch('featuredImage');

  const addTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...new Set([...tags, tagInput.trim()])];
      setTags(newTags);
      setValue('tags', newTags.join(','));
      setTagInput('');
    }
  };

  const removeTag = (tag: string) => {
    const newTags = tags.filter((t) => t !== tag);
    setTags(newTags);
    setValue('tags', newTags.join(','));
  };

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['link', 'image'],
      ['clean'],
    ],
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {/* Featured Image */}
      <div>
        <label className="font-medium">Featured Image</label>

        {featuredImage ? (
          <img
            src={featuredImage}
            alt="Featured"
            className="w-full h-64 object-cover rounded"
          />
        ) : (
          <ImageUploader onSuccess={(url) => setValue('featuredImage', url)}>
            <div className="border-2 border-dashed p-10 text-center cursor-pointer">
              <Image className="mx-auto text-gray-400" />
              <p>Upload image</p>
            </div>
          </ImageUploader>
        )}
      </div>

      {/* Title */}
      <input
        {...register('title')}
        placeholder="Title"
        className="w-full border p-3 rounded"
      />

      {/* Excerpt */}
      <textarea
        {...register('excerpt')}
        rows={3}
        className="w-full border p-3 rounded"
        placeholder="Excerpt"
      />

      {/* Category */}
      <select {...register('category')} className="w-full border p-3 rounded">
        <option value="">Select category</option>
        <option value="technology">Technology</option>
        <option value="development">Development</option>
        <option value="design">Design</option>
        <option value="business">Business</option>
      </select>

      {/* Tags */}
      <input
        value={tagInput}
        onChange={(e) => setTagInput(e.target.value)}
        onKeyDown={addTag}
        placeholder="Press Enter to add tag"
        className="w-full border p-3 rounded"
      />

      <div className="flex gap-2 flex-wrap">
        {tags.map((tag) => (
          <span key={tag} className="bg-blue-100 px-3 py-1 rounded">
            {tag}
            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="ml-2"
            >
              ×
            </button>
          </span>
        ))}
      </div>

      {/* Content */}
      {ReactQuill && (
        <ReactQuill
          theme="snow"
          value={content}
          onChange={(v: string) => setValue('content', v)}
          modules={modules}
          className="h-96 mb-12"
        />
      )}

      <p className="text-sm text-gray-500">
        <Clock className="inline h-4 w-4 mr-1" />
        Reading time: {Math.ceil(content.split(' ').length / 200)} min
      </p>

      <button
        type="submit"
        disabled={isSubmitting}
        className="px-6 py-3 bg-blue-600 text-white rounded disabled:opacity-50"
      >
        {isSubmitting ? 'Saving...' : 'Publish'}
      </button>
    </form>
  );
}
