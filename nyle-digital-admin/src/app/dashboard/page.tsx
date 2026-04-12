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
                Admin overview
              </p>
              <h1 className="mt-4 text-3xl font-semibold">
                A tighter control surface for content, leads, and delivery operations.
              </h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-blue-100/85">
                The dashboard now leans into a cleaner blue-forward hierarchy while
                keeping the operational view simple. Shared environment routing also
                keeps the admin and public frontend pointed at the same backend target.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { label: 'API target', value: 'Shared' },
                { label: 'Routing style', value: '/api proxy' },
                { label: 'UI rhythm', value: 'Refined' },
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

      <section className="card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
            Team note
          </p>
          <p className="mt-2 text-sm leading-7 text-slate-600">
            The dashboard navigation now only surfaces live sections, which keeps the
            admin synced with the routes that actually exist today.
          </p>
        </div>
        <div className="inline-flex items-center rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700">
          Active routes only
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </section>
    </div>
  );
}
