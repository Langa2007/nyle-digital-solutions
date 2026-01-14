// src/app/dashboard/portfolio/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Image, Globe, Github, Edit, Trash2 } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import { adminApi } from '@/lib/api/adminClient';
import Link from 'next/link';

const columns = [
  {
    header: 'Project',
    accessorKey: 'title',
    cell: (info: any) => (
      <div className="flex items-center">
        {info.row.original.featuredImage ? (
          <img
            src={info.row.original.featuredImage}
            alt={info.getValue()}
            className="h-12 w-12 rounded-lg object-cover"
          />
        ) : (
          <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
            <Image className="h-6 w-6 text-gray-400" />
          </div>
        )}
        <div className="ml-3">
          <p className="font-medium text-gray-900">{info.getValue()}</p>
          <p className="text-sm text-gray-500">{info.row.original.category}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'Client',
    accessorKey: 'client',
  },
  {
    header: 'Technologies',
    accessorKey: 'technologies',
    cell: (info: any) => (
      <div className="flex flex-wrap gap-1">
        {info.getValue()?.slice(0, 3).map((tech: string) => (
          <span key={tech} className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
            {tech}
          </span>
        ))}
        {info.getValue()?.length > 3 && (
          <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded">
            +{info.getValue().length - 3}
          </span>
        )}
      </div>
    ),
  },
  {
    header: 'Links',
    cell: (info: any) => (
      <div className="flex items-center space-x-2">
        {info.row.original.liveUrl && (
          <a
            href={info.row.original.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-blue-600 hover:bg-blue-50 rounded"
          >
            <Globe className="h-4 w-4" />
          </a>
        )}
        {info.row.original.githubUrl && (
          <a
            href={info.row.original.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1 text-gray-600 hover:bg-gray-50 rounded"
          >
            <Github className="h-4 w-4" />
          </a>
        )}
      </div>
    ),
  },
  {
    header: 'Actions',
    cell: (info: any) => (
      <div className="flex items-center space-x-2">
        <Link
          href={`/dashboard/portfolio/edit/${info.row.original.id}`}
          className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button title= "Delete Project"
         className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function PortfolioPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: portfolio, isLoading } = useQuery({
    queryKey: ['portfolio', { search, page }],
    queryFn: () => adminApi.getPortfolioItems({
      search,
      page,
      limit: 10,
    }),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          <p className="mt-1 text-sm text-gray-600">
            Showcase your projects and case studies
          </p>
        </div>
        <Link
          href="/dashboard/portfolio/new"
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Project
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
            placeholder="Search portfolio projects..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Projects', value: portfolio?.data?.length || 0 },
          { label: 'Featured', value: portfolio?.data?.filter((p: any) => p.featured).length || 0 },
          { label: 'Categories', value: new Set(portfolio?.data?.map((p: any) => p.category)).size || 0 },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-6">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-3xl font-bold mt-2">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={portfolio?.data || []}
          loading={isLoading}
          pagination={{
            currentPage: page,
            totalPages: Math.ceil((portfolio?.data?.length || 0) / 10),
            onPageChange: setPage,
          }}
        />
      </div>
    </div>
  );
}