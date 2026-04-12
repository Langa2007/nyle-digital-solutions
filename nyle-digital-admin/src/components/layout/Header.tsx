'use client';

import { Bell, Menu, Search } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';

interface HeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

const titles: Record<string, { title: string; subtitle: string }> = {
  '/dashboard': {
    title: 'Operations dashboard',
    subtitle: 'Track content, inbound activity, and service operations from one place.',
  },
  '/dashboard/contacts': {
    title: 'Contacts',
    subtitle: 'Review inbound leads and respond with better context.',
  },
  '/dashboard/applications': {
    title: 'Applications',
    subtitle: 'Follow candidate flow and status changes clearly.',
  },
  '/dashboard/blog': {
    title: 'Blog',
    subtitle: 'Create and refine public-facing content.',
  },
  '/dashboard/portfolio': {
    title: 'Portfolio',
    subtitle: 'Curate work examples and delivery proof points.',
  },
  '/dashboard/services': {
    title: 'Services',
    subtitle: 'Keep service messaging aligned with what the team delivers.',
  },
};

export default function Header({ setSidebarOpen }: HeaderProps) {
  const pathname = usePathname();
  const { user } = useAuth();
  const current = titles[pathname] || titles['/dashboard'];

  return (
    <header className="sticky top-0 z-30 px-4 pt-4 sm:px-6 lg:px-8">
      <div className="admin-shell flex flex-col gap-4 rounded-[1.75rem] px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-start gap-3">
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-600 hover:border-blue-200 hover:text-blue-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-blue-700">
              {current.title}
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-7 text-slate-500">
              {current.subtitle}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search the admin..."
              className="input-field min-w-[16rem] pl-10 pr-4 py-2.5"
            />
          </div>

          <button
            title="Notifications"
            className="relative inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-blue-600" />
          </button>

          <div className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-cyan-400 text-sm font-semibold text-white">
              {user?.firstName?.[0]}
              {user?.lastName?.[0]}
            </div>
            <div className="pr-1">
              <p className="text-sm font-semibold text-slate-900">
                {user?.firstName} {user?.lastName}
              </p>
              <p className="text-xs text-slate-500">{user?.role}</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
