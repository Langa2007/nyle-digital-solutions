// src/app/dashboard/services/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, Settings, DollarSign, Clock, Edit, Trash2 } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import { adminApi } from '@/lib/api/adminClient';
import Link from 'next/link';

const columns = [
  {
    header: 'Service',
    accessorKey: 'title',
    cell: (info: any) => (
      <div>
        <p className="font-medium text-gray-900">{info.getValue()}</p>
        <p className="text-sm text-gray-500">{info.row.original.description?.substring(0, 60)}...</p>
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
    header: 'Pricing',
    accessorKey: 'startingPrice',
    cell: (info: any) => (
      <div className="flex items-center">
        <DollarSign className="h-4 w-4 text-gray-400 mr-1" />
        <span>{info.getValue() ? `$${info.getValue()}` : 'Custom'}</span>
      </div>
    ),
  },
  {
    header: 'Delivery',
    accessorKey: 'deliveryTime',
    cell: (info: any) => (
      <div className="flex items-center">
        <Clock className="h-4 w-4 text-gray-400 mr-1" />
        <span>{info.getValue() || 'Custom'}</span>
      </div>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'active',
    cell: (info: any) => (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
        info.getValue() 
          ? 'bg-green-100 text-green-800'
          : 'bg-red-100 text-red-800'
      }`}>
        {info.getValue() ? 'Active' : 'Inactive'}
      </span>
    ),
  },
  {
    header: 'Actions',
    cell: (info: any) => (
      <div className="flex items-center space-x-2">
        <Link
          href={`/dashboard/services/edit/${info.row.original.id}`}
          className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"
        >
          <Edit className="h-4 w-4" />
        </Link>
        <button title= "Delete Service"
         className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg hover:bg-red-50">
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    ),
  },
];

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const { data: services, isLoading } = useQuery({
    queryKey: ['services', { search, page }],
    queryFn: () => adminApi.getServices({
      search,
      page,
      limit: 10,
    }),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Services</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage your service offerings and pricing
          </p>
        </div>
        <Link
          href="/dashboard/services/new"
          className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Service
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
            placeholder="Search services..."
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: 'Total Services', value: services?.data?.length || 0 },
          { label: 'Active', value: services?.data?.filter((s: any) => s.active).length || 0 },
          { label: 'Categories', value: new Set(services?.data?.map((s: any) => s.category)).size || 0 },
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
          data={services?.data || []}
          loading={isLoading}
          pagination={{
            currentPage: page,
            totalPages: Math.ceil((services?.data?.length || 0) / 10),
            onPageChange: setPage,
          }}
        />
      </div>
    </div>
  );
}