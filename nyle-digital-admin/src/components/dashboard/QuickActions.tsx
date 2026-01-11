// src/components/dashboard/QuickActions.tsx
import { Plus, MessageSquare, FileText, Image, Server, Users } from 'lucide-react';
import Link from 'next/link';

export default function QuickActions() {
  const actions = [
    {
      title: 'New Blog Post',
      description: 'Create a new blog article',
      icon: FileText,
      color: 'bg-blue-500',
      href: '/dashboard/blog/new',
    },
    {
      title: 'Add Portfolio Item',
      description: 'Showcase a new project',
      icon: Image,
      color: 'bg-green-500',
      href: '/dashboard/portfolio/new',
    },
    {
      title: 'Create Service',
      description: 'Add a new service offering',
      icon: Server,
      color: 'bg-purple-500',
      href: '/dashboard/services/new',
    },
    {
      title: 'Review Contacts',
      description: 'Check new contact submissions',
      icon: Users,
      color: 'bg-orange-500',
      href: '/dashboard/contacts',
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
        <Plus className="h-5 w-5 text-gray-400" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {actions.map((action) => {
          const Icon = action.icon;
          
          return (
            <Link
              key={action.title}
              href={action.href}
              className="group p-4 border border-gray-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all duration-200"
            >
              <div className="flex items-center">
                <div className={`h-10 w-10 rounded-lg flex items-center justify-center ${action.color}`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                    {action.title}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          <p>Need help? <a href="#" className="text-blue-600 hover:text-blue-500">Check documentation</a></p>
        </div>
      </div>
    </div>
  );
}