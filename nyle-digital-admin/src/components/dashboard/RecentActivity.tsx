import Link from 'next/link';
import { Activity, Briefcase, FileText, Mail } from 'lucide-react';
import { formatDateTime } from '@/lib/utils';

interface ActivityItem {
  type: 'contact' | 'application' | 'blog' | 'portfolio';
  message: string;
  timestamp: string;
  data: any;
}

interface RecentActivityProps {
  activities: ActivityItem[];
}

const activityMeta = {
  contact: {
    icon: Mail,
    color: 'bg-blue-50 text-blue-700',
  },
  application: {
    icon: Briefcase,
    color: 'bg-slate-100 text-slate-700',
  },
  blog: {
    icon: FileText,
    color: 'bg-cyan-50 text-cyan-700',
  },
  portfolio: {
    icon: Activity,
    color: 'bg-indigo-50 text-indigo-700',
  },
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <div className="card p-6">
      <div className="mb-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-700">
          Recent activity
        </p>
        <h2 className="mt-2 text-xl font-semibold text-slate-950">
          Latest movement across the admin
        </h2>
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const meta =
              activityMeta[activity.type] || activityMeta.portfolio;
            const Icon = meta.icon;

            return (
              <div
                key={`${activity.type}-${index}`}
                className="flex gap-4 rounded-[1.5rem] border border-slate-200 bg-slate-50 px-4 py-4"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-2xl ${meta.color}`}
                >
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-6 text-slate-900">
                    {activity.message}
                  </p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-slate-500">
                    {formatDateTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="rounded-[1.5rem] border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
            No recent activity yet.
          </div>
        )}
      </div>

      <div className="mt-6 border-t border-slate-100 pt-5">
        <Link
          href="/dashboard/contacts"
          className="text-sm font-semibold text-blue-700 hover:text-blue-800"
        >
          Review active queues
        </Link>
      </div>
    </div>
  );
}
