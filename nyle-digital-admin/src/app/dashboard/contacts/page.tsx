// src/app/dashboard/contacts/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Search, Filter, MoreVertical, Eye, Mail, Phone, Check, Archive } from 'lucide-react';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { adminApi } from '@/lib/api/adminClient';
import ContactModal from '@/components/contacts/ContactModal';
import toast from 'react-hot-toast';

const statusOptions = [
  { value: 'all', label: 'All Status' },
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'in_progress', label: 'In Progress' },
  { value: 'converted', label: 'Converted' },
  { value: 'archived', label: 'Archived' },
];

export default function ContactsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [selectedContact, setSelectedContact] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: contacts, isLoading, refetch } = useQuery({
    queryKey: ['contacts', { search, status: statusFilter, page }],
    queryFn: () => adminApi.getContacts({ search, status: statusFilter !== 'all' ? statusFilter : undefined, page }),
  });

  const columns = [
    {
      header: 'Name',
      accessorKey: 'name',
      cell: (info: any) => (
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
            <span className="font-medium text-blue-700">
              {info.getValue()[0]}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{info.getValue()}</p>
            <p className="text-sm text-gray-500">{info.row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      header: 'Service',
      accessorKey: 'serviceType',
      cell: (info: any) => (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {info.getValue()}
        </span>
      ),
    },
    {
      header: 'Budget',
      accessorKey: 'budget',
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: (info: any) => <StatusBadge status={info.getValue()} />,
    },
    {
      header: 'Date',
      accessorKey: 'createdAt',
      cell: (info: any) => new Date(info.getValue()).toLocaleDateString(),
    },
    {
      header: 'Actions',
      cell: (info: any) => (
        <div className="flex items-center space-x-2">
          <button title="View Details"
            onClick={() => {
              setSelectedContact(info.row.original);
              setIsModalOpen(true);
            }}
            className="p-1.5 text-gray-400 hover:text-blue-600"
          >
            <Eye className="h-4 w-4" />
          </button>
          <a
            href={`mailto:${info.row.original.email}`}
            className="p-1.5 text-gray-400 hover:text-green-600"
          >
            <Mail className="h-4 w-4" />
          </a>
          <button title ="Mark as Contacted"
            onClick={async () => {
              try {
                await adminApi.updateContactStatus(info.row.original.id, {
                  status: 'contacted',
                });
                toast.success('Marked as contacted');
                refetch();
              } catch (error) {
                toast.error('Failed to update status');
              }
            }}
            className="p-1.5 text-gray-400 hover:text-green-600"
          >
            <Check className="h-4 w-4" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Contacts</h1>
        <p className="mt-2 text-sm text-gray-600">
          Manage and respond to contact form submissions
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
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
                placeholder="Search contacts..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <select title= "Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full md:w-48 pl-3 pr-10 py-2 text-base border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {statusOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Data Table */}
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

      {/* Contact Modal */}
      <ContactModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedContact(null);
        }}
        contact={selectedContact}
        onUpdate={refetch}
      />
    </div>
  );
}