// src/app/dashboard/applications/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { ColumnDef } from '@tanstack/react-table';
import DataTable from '@/components/ui/DataTable';
import StatusBadge from '@/components/ui/StatusBadge';
import { adminApi } from '@/lib/api/adminClient';
import { formatDate } from '@/lib/utils';
import { Eye, Mail, Phone, FileText, Download, MoreVertical } from 'lucide-react';
import toast from 'react-hot-toast';

// Define TypeScript types
interface JobApplication {
  id: string;
  jobId: string;
  fullName: string;
  email: string;
  phone: string;
  resume: string;
  coverLetter: string;
  experience: number;
  currentCompany?: string;
  status: 'pending' | 'reviewed' | 'shortlisted' | 'rejected' | 'hired';
  notes?: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  appliedAt: string;
  createdAt: string;
  updatedAt: string;
}

export default function ApplicationsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [search, setSearch] = useState('');

  const { data: applications, isLoading, refetch } = useQuery({
    queryKey: ['applications', { page, status: statusFilter, search }],
    queryFn: () => adminApi.getApplications({ 
      page, 
      status: statusFilter !== 'all' ? statusFilter : undefined,
      search: search || undefined
    }),
  });

  const handleStatusUpdate = async (id: string, status: JobApplication['status']) => {
    try {
      await adminApi.updateApplicationStatus(id, { status });
      toast.success('Application status updated');
      refetch();
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const downloadResume = (url: string, name: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `${name.replace(/\s+/g, '_')}_resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const columns: ColumnDef<JobApplication>[] = [
    {
      header: 'Applicant',
      accessorKey: 'fullName',
      cell: ({ row }) => (
        <div className="flex items-center">
          <div className="h-10 w-10 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
            <span className="font-medium text-green-700">
              {row.original.fullName[0]}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-medium text-gray-900">{row.original.fullName}</p>
            <p className="text-sm text-gray-500">{row.original.email}</p>
            <div className="flex items-center mt-1">
              <Phone className="h-3 w-3 text-gray-400 mr-1" />
              <span className="text-xs text-gray-500">{row.original.phone}</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      header: 'Position',
      accessorKey: 'jobId',
      cell: ({ row }) => (
        <div>
          <p className="font-medium text-gray-900">{row.original.jobId}</p>
          {row.original.currentCompany && (
            <p className="text-sm text-gray-500">
              Current: {row.original.currentCompany}
            </p>
          )}
        </div>
      ),
    },
    {
      header: 'Experience',
      accessorKey: 'experience',
      cell: ({ row }) => (
        <div className="text-center">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            {row.original.experience} years
          </span>
        </div>
      ),
    },
    {
      header: 'Status',
      accessorKey: 'status',
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      header: 'Applied',
      accessorKey: 'appliedAt',
      cell: ({ row }) => formatDate(row.original.appliedAt),
    },
    {
      header: 'Actions',
      cell: ({ row }) => (
        <div className="flex items-center space-x-2">
          <button
            onClick={() => downloadResume(row.original.resume, row.original.fullName)}
            className="p-1.5 text-gray-400 hover:text-blue-600"
            title="Download Resume"
          >
            <Download className="h-4 w-4" />
          </button>
          <a
            href={`mailto:${row.original.email}`}
            className="p-1.5 text-gray-400 hover:text-green-600"
            title="Send Email"
          >
            <Mail className="h-4 w-4" />
          </a>
          <div className="relative group">
            <button title= "More Actions"
             className="p-1.5 text-gray-400 hover:text-gray-600">
              <MoreVertical className="h-4 w-4" />
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleStatusUpdate(row.original.id, 'reviewed')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Mark as Reviewed
              </button>
              <button
                onClick={() => handleStatusUpdate(row.original.id, 'shortlisted')}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Shortlist
              </button>
              <button
                onClick={() => handleStatusUpdate(row.original.id, 'rejected')}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              >
                Reject
              </button>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'reviewed', label: 'Reviewed' },
    { value: 'shortlisted', label: 'Shortlisted' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'hired', label: 'Hired' },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Job Applications</h1>
        <p className="mt-2 text-sm text-gray-600">
          Review and manage job applications
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-white rounded-lg shadow p-4">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, email, or position..."
              className="block w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-4">
            <select title= "Filter by Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="block w-full md:w-48 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[
          { label: 'Total', value: applications?.data?.pagination?.total || 0, color: 'bg-blue-100 text-blue-800' },
          { label: 'Pending', value: applications?.data?.data?.filter((a: JobApplication) => a.status === 'pending').length || 0, color: 'bg-yellow-100 text-yellow-800' },
          { label: 'Shortlisted', value: applications?.data?.data?.filter((a: JobApplication) => a.status === 'shortlisted').length || 0, color: 'bg-green-100 text-green-800' },
          { label: 'Hired', value: applications?.data?.data?.filter((a: JobApplication) => a.status === 'hired').length || 0, color: 'bg-purple-100 text-purple-800' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg shadow p-4">
            <p className="text-sm font-medium text-gray-600">{stat.label}</p>
            <p className="text-2xl font-semibold mt-2">{stat.value}</p>
            <div className="mt-2">
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${stat.color}`}>
                {stat.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Data Table */}
      <DataTable<JobApplication>
        columns={columns}
        data={applications?.data?.data || []}
        loading={isLoading}
        pagination={{
          currentPage: page,
          totalPages: applications?.data?.pagination?.pages || 1,
          onPageChange: setPage,
        }}
      />
    </div>
  );
}