import Link from 'next/link';
import { Briefcase, FileText, Palette, Server, Users } from 'lucide-react';

const actions = [
  {
    title: 'Contacts',
    description: 'View and manage business inquiries.',
    icon: Users,
    color: 'from-blue-600 to-cyan-400',
    href: '/dashboard/contacts',
  },
  {
    title: 'Applications',
    description: 'Review job applications and hire talent.',
    icon: Briefcase,
    color: 'from-slate-900 to-slate-700',
    href: '/dashboard/applications',
  },
  {
    title: 'Blog',
    description: 'Create and publish blog articles.',
    icon: FileText,
    color: 'from-blue-500 to-indigo-500',
    href: '/dashboard/blog',
  },
  {
    title: 'Portfolio',
    description: 'Showcase your best projects and work.',
    icon: Palette,
    color: 'from-cyan-500 to-blue-500',
    href: '/dashboard/portfolio',
  },
  {
    title: 'Services',
    description: 'Update your service offerings and pricing.',
    icon: Server,
    color: 'from-slate-800 to-blue-700',
    href: '/dashboard/services',
  },
];

export default function QuickActions() {
  return (
    <div className="card p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
          Quick actions
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">
          Manage your business
        </h2>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4 transition hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${action.color} text-white shadow-lg`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 group-hover:text-blue-700">
                    {action.title}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-500">
                    {action.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
