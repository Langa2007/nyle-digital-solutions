// src/components/dashboard/StatsChart.tsx
'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface ChartData {
  month: string;
  revenue: number;
  contacts: number;
}

interface StatsChartProps {
  data: ChartData[];
}

export default function StatsChart({ data }: StatsChartProps) {
  // Default data if no data provided
  const chartData = data.length > 0 ? data : [
    { month: 'Jan', revenue: 4000, contacts: 240 },
    { month: 'Feb', revenue: 3000, contacts: 139 },
    { month: 'Mar', revenue: 9800, contacts: 980 },
    { month: 'Apr', revenue: 3908, contacts: 480 },
    { month: 'May', revenue: 4800, contacts: 380 },
    { month: 'Jun', revenue: 3800, contacts: 430 },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            stroke="#666"
            fontSize={12}
          />
          <YAxis 
            stroke="#666"
            fontSize={12}
            tickFormatter={(value) => `$${value / 1000}k`}
          />
          <Tooltip 
            formatter={(value: number, name: string) => {
              if (name === 'revenue') return [formatCurrency(value), 'Revenue'];
              return [value, 'Contacts'];
            }}
            labelStyle={{ color: '#666', fontSize: 12 }}
            contentStyle={{ 
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '0.5rem',
              padding: '0.5rem',
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#3b82f6"
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="contacts"
            stroke="#10b981"
            strokeWidth={2}
            dot={{ strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}