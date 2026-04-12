import { ArrowDown, ArrowUp, LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  change: string;
  icon: LucideIcon;
  color: string;
}

export default function StatCard({
  title,
  value,
  change,
  icon: Icon,
  color,
}: StatCardProps) {
  const isPositive = change.startsWith('+');

  return (
    <div className="card p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="mt-3 text-3xl font-semibold text-slate-950">{value}</p>
          <div className="mt-3 inline-flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm">
            {isPositive ? (
              <ArrowUp className="h-4 w-4 text-emerald-600" />
            ) : (
              <ArrowDown className="h-4 w-4 text-rose-600" />
            )}
            <span
              className={`ml-1 font-semibold ${
                isPositive ? 'text-emerald-600' : 'text-rose-600'
              }`}
            >
              {change}
            </span>
            <span className="ml-2 text-slate-500">from last month</span>
          </div>
        </div>
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}
