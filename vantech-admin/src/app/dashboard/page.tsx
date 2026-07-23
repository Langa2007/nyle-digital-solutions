'use client';

import { useQuery } from '@tanstack/react-query';
import { ArrowRight, Briefcase, FileText, MessageSquare, Users } from 'lucide-react';
import RecentActivity from '@/components/dashboard/RecentActivity';
import QuickActions from '@/components/dashboard/QuickActions';
import StatCard from '@/components/dashboard/StatsCard';
import { adminApi } from '@/lib/api/adminClient';

export default function DashboardPage() {
  const { data: stats } = useQuery({
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
      color: 'from-blue-600 to-cyan-400',
    },
    {
      title: 'Job Applications',
      value: stats?.data?.applications?.total || 0,
      change: '+5%',
      icon: Briefcase,
      color: 'from-slate-900 to-slate-700',
    },
    {
      title: 'Unread Messages',
      value: stats?.data?.contacts?.new || 0,
      change: '+3',
      icon: MessageSquare,
      color: 'from-blue-500 to-indigo-500',
    },
    {
      title: 'Blog Posts',
      value: stats?.data?.blog?.total || 0,
      change: '+2',
      icon: FileText,
      color: 'from-cyan-500 to-blue-500',
    },
  ];

  return (
    <div className="space-y-6">
      <section className="card overflow-hidden p-[1px]">
        <div className="rounded-[1.45rem] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 px-6 py-8 text-white sm:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-200">
                Dashboard
              </p>
              <h1 className="mt-4 text-3xl font-semibold">
                Manage your content, leads, and business operations.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/85">
                Control your website content, track leads and applications, and manage all your business information in one place.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'Contacts', value: stats?.data?.contacts?.total || 0 },
                { label: 'Applications', value: stats?.data?.applications?.total || 0 },
                { label: 'Blog Posts', value: stats?.data?.blog?.total || 0 },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-[1.4rem] border border-white/10 bg-white/5 px-4 py-4"
                >
                  <p className="text-xs uppercase tracking-[0.22em] text-blue-200">
                    {item.label}
                  </p>
                  <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </section>

      <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <QuickActions />
        <RecentActivity activities={recentActivity?.data || []} />
      </section>


    </div>
  );
}
