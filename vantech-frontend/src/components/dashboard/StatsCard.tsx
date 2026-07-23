// src/components/dashboard/StatsCards.tsx
import { TrendingUp, Users, Server, DollarSign } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const stats = [
  {
    title: 'Active Projects',
    value: '12',
    change: '+2 from last month',
    icon: TrendingUp,
    color: 'text-blue-600 bg-blue-100 dark:bg-blue-900/30',
  },
  {
    title: 'Team Members',
    value: '24',
    change: '+4 from last month',
    icon: Users,
    color: 'text-green-600 bg-green-100 dark:bg-green-900/30',
  },
  {
    title: 'Server Uptime',
    value: '99.9%',
    change: 'Last 30 days',
    icon: Server,
    color: 'text-purple-600 bg-purple-100 dark:bg-purple-900/30',
  },
  {
    title: 'Monthly Revenue',
    value: '$45,231',
    change: '+12.5% from last month',
    icon: DollarSign,
    color: 'text-orange-600 bg-orange-100 dark:bg-orange-900/30',
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <Card key={stat.title} hoverable className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {stat.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                {stat.value}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {stat.change}
              </p>
            </div>
            
            <div className={`p-3 rounded-lg ${stat.color}`}>
              <stat.icon className="h-6 w-6" />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}