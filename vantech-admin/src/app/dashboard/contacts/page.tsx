// src/app/dashboard/contacts/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, Mail, Phone, Calendar, User, Building } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { adminApi } from '@/lib/api/adminClient';
import { formatDate } from '@/lib/utils';

const columns = [
  {
    header: 'Contact',
    accessorKey: 'name',
    cell: (info: any) => (
      <div className="flex items-center">
        <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="h-5 w-5 text-blue-600" />
        </div>
        <div className="ml-3">
          <p className="font-medium text-gray-900">{info.getValue()}</p>
          <p className="text-sm text-gray-500">{info.row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    header: 'Company',
    accessorKey: 'company',
    cell: (info: any) => (
      <div className="flex items-center">
        <Building className="h-4 w-4 text-gray-400 mr-2" />
        <span>{info.getValue() || 'Not specified'}</span>
      </div>
    ),
  },
  {
    header: 'Service',
    accessorKey: 'serviceType',
    cell: (info: any) => (
      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
        {info.getValue().replace('_', ' ')}
      </span>
    ),
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: (info: any) => <StatusBadge status={info.getValue()} />,
  },
  {
    header: 'Date',
    accessorKey: 'createdAt',
    cell: (info: any) => (
      <div className="flex items-center">
        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
        {formatDate(info.getValue())}
      </div>
    ),
  },
  {
    header: 'Actions',
    cell: (info: any) => (
      <div className="flex items-center space-x-2">
        <a
          href={`mailto:${info.row.original.email}`}
          className="p-1.5 text-gray-400 hover:text-green-600 rounded-lg hover:bg-green-50"
          title="Send Email"
        >
          <Mail className="h-4 w-4" />
        </a>
        {info.row.original.phone && (
          <a
            href={`tel:${info.row.original.phone}`}
            className="p-1.5 text-gray-400 hover:text-blue-600 rounded-lg hover:bg-blue-50"
            title="Call"
          >
            <Phone className="h-4 w-4" />
          </a>
        )}
      </div>
    ),
  },
];

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);

  const { data: contacts, isLoading } = useQuery({
    queryKey: ['contacts', { search, status: statusFilter, page }],
    queryFn: () => adminApi.getContacts({
      search,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      page,
      limit: 10,
    }),
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contact Submissions</h1>
          <p className="mt-1 text-sm text-gray-600">
            Manage all contact form submissions from your website
          </p>
        </div>
        <button className="mt-4 sm:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Export Contacts
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search contacts by name, email, or company..."
                className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <select title="statusFilter"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="in_progress">In Progress</option>
                <option value="converted">Converted</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total', value: contacts?.data?.pagination?.total || 0, color: 'bg-blue-100 text-blue-800' },
          { label: 'New', value: contacts?.data?.data?.filter((c: any) => c.status === 'new').length || 0, color: 'bg-green-100 text-green-800' },
          { label: 'Contacted', value: contacts?.data?.data?.filter((c: any) => c.status === 'contacted').length || 0, color: 'bg-purple-100 text-purple-800' },
          { label: 'Converted', value: contacts?.data?.data?.filter((c: any) => c.status === 'converted').length || 0, color: 'bg-amber-100 text-amber-800' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-gray-200 p-4">
            <p className="text-sm text-gray-600">{stat.label}</p>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <DataTable
          columns={columns}
          data={contacts?.data?.data || []}
          loading={isLoading}
          pagination={{
            currentPage: page,
            totalPages: contacts?.data?.pagination?.pages || 1,
            onPageChange: setPage,
          }}
        />
      </div>
    </div>
  );
}