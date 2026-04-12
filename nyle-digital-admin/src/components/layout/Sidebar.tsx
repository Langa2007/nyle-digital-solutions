'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  LogOut,
  Palette,
  Server,
  Users,
  X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Contacts', href: '/dashboard/contacts', icon: Users },
  { name: 'Applications', href: '/dashboard/applications', icon: Briefcase },
  { name: 'Blog', href: '/dashboard/blog', icon: FileText },
  { name: 'Portfolio', href: '/dashboard/portfolio', icon: Palette },
  { name: 'Services', href: '/dashboard/services', icon: Server },
];

interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export default function Sidebar({ open, setOpen }: SidebarProps) {
  const pathname = usePathname();
  const { logout, user } = useAuth();

  return (
    <>
      {open ? (
        <button
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
          onClick={() => setOpen(false)}
          aria-label="Close sidebar overlay"
        />
      ) : null}

      <aside
        className={cn(
          'fixed inset-y-4 left-4 z-50 flex w-[17rem] flex-col rounded-[2rem] border border-slate-200/70 bg-white/92 p-4 shadow-[0_30px_80px_-42px_rgba(15,23,42,0.45)] backdrop-blur-xl transition-transform duration-300 lg:translate-x-0',
          open ? 'translate-x-0' : '-translate-x-[120%]'
        )}
      >
        <div className="mb-6 flex items-center justify-between gap-3">
          <Link href="/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-400 text-white shadow-lg shadow-blue-600/20">
              <Palette className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-700">
                Nyle Digital
              </p>
              <p className="text-sm text-slate-500">Admin system</p>
            </div>
          </Link>

          <button
            onClick={() => setOpen(false)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-500 hover:border-blue-200 hover:text-blue-700 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="rounded-[1.5rem] border border-blue-100 bg-blue-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-blue-700">
            Signed in
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900">
            {user?.firstName} {user?.lastName}
          </p>
          <p className="text-sm text-slate-500">{user?.role}</p>
        </div>

        <nav className="mt-6 flex-1 space-y-2">
          {navigation.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition',
                  isActive
                    ? 'bg-slate-950 text-white shadow-lg shadow-slate-900/10'
                    : 'text-slate-600 hover:bg-blue-50 hover:text-blue-700'
                )}
                onClick={() => setOpen(false)}
              >
                <item.icon
                  className={cn(
                    'h-5 w-5',
                    isActive ? 'text-blue-300' : 'text-slate-400'
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
            Environment sync
          </p>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            Shared `.env` values now drive API routing for the admin and public site.
          </p>
        </div>

        <button onClick={logout} className="btn-secondary mt-4 w-full py-3">
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </button>
      </aside>
    </>
  );
}
