// src/app/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  Users,
  Briefcase,
  MessageSquare,
  FileText,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import StatCard from '@/components/dashboard/StatsCard';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import { adminApi } from '@/lib/api/adminClient';

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: () => adminApi.getDashboardStats(),
  });

  const { data: recentActivity } = useQuery({
    queryKey: ['recent-activity'],
    queryFn: () => adminApi.getRecentActivity(),
  });

  const statCards = [
    {
      title: 'Total Contacts',
      value: stats?.data?.contacts?.total || 0,
      change: '+12%',
      icon: Users,
      color: 'bg-blue-500',
    },
    {
      title: 'Job Applications',
      value: stats?.data?.applications?.total || 0,
      change: '+5%',
      icon: Briefcase,
      color: 'bg-green-500',
    },
    {
      title: 'Unread Messages',
      value: stats?.data?.contacts?.new || 0,
      change: '+3',
      icon: MessageSquare,
      color: 'bg-purple-500',
    },
    {
      title: 'Blog Posts',
      value: stats?.data?.blog?.total || 0,
      change: '+2',
      icon: FileText,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-sm text-gray-600">
          Overview of your admin panel and quick insights
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <div className="lg:col-span-2">
          <QuickActions />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity activities={recentActivity?.data || []} />
        </div>
      </div>
    </div>
  );
}