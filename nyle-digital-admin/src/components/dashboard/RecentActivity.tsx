// src/components/dashboard/RecentActivity.tsx
import { Activity, Mail, Briefcase, User, FileText } from 'lucide-react';
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

export default function RecentActivity({ activities }: RecentActivityProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case 'contact':
        return Mail;
      case 'application':
        return Briefcase;
      case 'blog':
        return FileText;
      case 'portfolio':
        return FileText;
      default:
        return Activity;
    }
  };

  const getColor = (type: string) => {
    switch (type) {
      case 'contact':
        return 'text-blue-600 bg-blue-100';
      case 'application':
        return 'text-green-600 bg-green-100';
      case 'blog':
        return 'text-purple-600 bg-purple-100';
      case 'portfolio':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
        <Activity className="h-5 w-5 text-gray-400" />
      </div>

      <div className="space-y-4">
        {activities.length > 0 ? (
          activities.map((activity, index) => {
            const Icon = getIcon(activity.type);
            const colorClass = getColor(activity.type);
            
            return (
              <div key={index} className="flex items-start">
                <div className={`flex-shrink-0 h-10 w-10 rounded-lg flex items-center justify-center ${colorClass}`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDateTime(activity.timestamp)}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-500">No recent activity</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <a
          href="/dashboard/activity"
          className="text-sm font-medium text-blue-600 hover:text-blue-500"
        >
          View all activity →
        </a>
      </div>
    </div>
  );
}