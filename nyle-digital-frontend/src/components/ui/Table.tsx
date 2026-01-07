// src/components/ui/Table.tsx
import { cn } from '@/lib/utils';

interface TableProps extends React.TableHTMLAttributes<HTMLTableElement> {
  striped?: boolean;
  hoverable?: boolean;
}

interface TableHeaderProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableBodyProps extends React.HTMLAttributes<HTMLTableSectionElement> {}

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  hoverable?: boolean;
}

interface TableCellProps extends React.TdHTMLAttributes<HTMLTableCellElement> {
  header?: boolean;
}

const Table = ({ className, striped = true, hoverable = true, ...props }: TableProps) => {
  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
      <table
        className={cn(
          'w-full text-sm',
          striped && 'divide-y divide-gray-200 dark:divide-gray-700',
          hoverable && '[&_tbody_tr:hover]:bg-gray-50 dark:[&_tbody_tr:hover]:bg-gray-800',
          className
        )}
        {...props}
      />
    </div>
  );
};

const TableHeader = ({ className, ...props }: TableHeaderProps) => (
  <thead className={cn('bg-gray-50 dark:bg-gray-800', className)} {...props} />
);

const TableBody = ({ className, ...props }: TableBodyProps) => (
  <tbody className={cn('divide-y divide-gray-200 dark:divide-gray-700', className)} {...props} />
);

const TableRow = ({ className, hoverable = true, ...props }: TableRowProps) => (
  <tr
    className={cn(
      'transition-colors',
      hoverable && 'hover:bg-gray-50 dark:hover:bg-gray-800',
      className
    )}
    {...props}
  />
);

const TableHead = ({ className, ...props }: TableCellProps) => (
  <th
    className={cn(
      'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider',
      className
    )}
    {...props}
  />
);

const TableCell = ({ className, header = false, ...props }: TableCellProps) => {
  const Component = header ? 'th' : 'td';
  
  return (
    <Component
      className={cn(
        'px-6 py-4 whitespace-nowrap text-sm',
        header
          ? 'text-gray-900 dark:text-white font-medium'
          : 'text-gray-700 dark:text-gray-300',
        className
      )}
      {...props}
    />
  );
};

export { Table, TableHeader, TableBody, TableRow, TableHead, TableCell };