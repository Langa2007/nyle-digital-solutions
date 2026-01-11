// src/components/ui/StatusBadge.tsx
import { cn } from '@/lib/utils';

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'new':
      case 'pending':
        return {
          text: 'New',
          className: 'bg-yellow-100 text-yellow-800',
        };
      case 'contacted':
      case 'reviewed':
        return {
          text: 'Contacted',
          className: 'bg-blue-100 text-blue-800',
        };
      case 'in_progress':
      case 'shortlisted':
        return {
          text: 'In Progress',
          className: 'bg-purple-100 text-purple-800',
        };
      case 'converted':
      case 'hired':
        return {
          text: 'Converted',
          className: 'bg-green-100 text-green-800',
        };
      case 'archived':
      case 'rejected':
        return {
          text: 'Archived',
          className: 'bg-gray-100 text-gray-800',
        };
      default:
        return {
          text: status,
          className: 'bg-gray-100 text-gray-800',
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        config.className
      )}
    >
      {config.text}
    </span>
  );
}