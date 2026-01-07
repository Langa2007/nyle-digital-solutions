// src/components/dashboard/ProjectTable.tsx
import { MoreVertical, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const projects = [
  {
    name: 'E-Commerce Platform',
    client: 'TechCorp Inc.',
    dueDate: '2024-01-15',
    status: 'active',
    progress: 75,
    team: 4,
  },
  {
    name: 'Healthcare Portal',
    client: 'MediCare Solutions',
    dueDate: '2024-02-01',
    status: 'active',
    progress: 45,
    team: 6,
  },
  {
    name: 'Finance Dashboard',
    client: 'FinServe Corp',
    dueDate: '2024-01-10',
    status: 'completed',
    progress: 100,
    team: 3,
  },
  {
    name: 'Mobile Banking App',
    client: 'Urban Bank',
    dueDate: '2024-03-15',
    status: 'planning',
    progress: 20,
    team: 5,
  },
  {
    name: 'Inventory System',
    client: 'Retail Giant',
    dueDate: '2024-02-28',
    status: 'delayed',
    progress: 30,
    team: 4,
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case 'active':
      return <Clock className="h-4 w-4 text-blue-500" />;
    case 'completed':
      return <CheckCircle className="h-4 w-4 text-green-500" />;
    case 'delayed':
      return <XCircle className="h-4 w-4 text-red-500" />;
    default:
      return <Clock className="h-4 w-4 text-gray-500" />;
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active':
      return 'In Progress';
    case 'completed':
      return 'Completed';
    case 'delayed':
      return 'Delayed';
    default:
      return 'Planning';
  }
};

export default function ProjectTable() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Active Projects
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Overview of all active projects
          </p>
        </div>
        <Button>New Project</Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Project Name</TableHead>
            <TableHead>Client</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Progress</TableHead>
            <TableHead>Team Size</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {projects.map((project) => (
            <TableRow key={project.name}>
              <TableCell className="font-medium text-gray-900 dark:text-white">
                {project.name}
              </TableCell>
              <TableCell>{project.client}</TableCell>
              <TableCell>{project.dueDate}</TableCell>
              <TableCell>
                <div className="flex items-center">
                  {getStatusIcon(project.status)}
                  <span className="ml-2">{getStatusText(project.status)}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <span className="ml-2 text-sm">{project.progress}%</span>
                </div>
              </TableCell>
              <TableCell>{project.team} members</TableCell>
              <TableCell>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
}