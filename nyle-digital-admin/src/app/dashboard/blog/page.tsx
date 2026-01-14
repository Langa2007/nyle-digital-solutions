// src/app/dashboard/blog/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Edit, Trash2, Eye, Calendar } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import { adminApi } from '@/lib/api/adminClient';
import { formatDate } from '@/lib/utils';
import Link from 'next/link';

const columns = [
  {
    header: 'Title',
    accessorKey: 'title',
    cell: (info: any) => (
      <div>
        <p className="font-medium text-gray-900">{info.getValue()}</p>
        <p className="text-sm text-gray-500">{info.row.original.excerpt?.substring(0, 60)}...</p>
      </div>
    ),
  },
  {
    header: 'Category',
    accessorKey: 'category',
    cell: (info: any) => (
      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        {info.getValue()}
      </span>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (info: any) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        info.getValue() === 'published' 
          ? 'bg-green-100 text-green-800'
          : 'bg-yellow-100 text-yellow-800'
      }`}>
        {info.getValue()}
      </span>
    ),
  },
  {
    header: 'Views',
    accessorKey: 'views',
  },
  {
    header: 'Published',
    accessorKey: 'publishedAt',
    cell: (info: any) => (
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
        {info.getValue() ? formatDate(info.getValue()) : 'Draft'}
      </div>
    ),
  },
  {
    header: 'Actions',
    cell: (info: any) => (
      <div className="flex items-center space-x-2">
        <Link
          href={`/blog/${info.row.original.slug}`}
          target="_blank"
          className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
        </Link>
        <Link
          href={`/dashboard/blog/edit/${info.row.original.id}`}
          className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button title= "Delete Post"
         className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function BlogPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: posts, isLoading } = useQuery({
    queryKey: ['blog-posts', { search, page }],
    queryFn: () => adminApi.getBlogPosts({
      search,
      page,
      limit: 10,
    }),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Blog Posts</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your blog posts and content
          </p>
        </div>
        <Link
          href="/dashboard/blog/new"
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          New Post
        </Link>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search blog posts..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Posts', value: posts?.data?.pagination?.total || 0 },
          { label: 'Published', value: posts?.data?.data?.filter((p: any) => p.status === 'published').length || 0 },
          { label: 'Total Views', value: posts?.data?.data?.reduce((sum: number, post: any) => sum + (post.views || 0), 0) || 0 },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value.toLocaleString()}</p>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={posts?.data?.data || []}
          loading={isLoading}
          pagination={{
            currentPage: page,
            totalPages: posts?.data?.pagination?.pages || 1,
            onPageChange: setPage,
          }}
        />
      </div>
    </div>
  );
}