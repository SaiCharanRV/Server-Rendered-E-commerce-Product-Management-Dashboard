"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Defs,
  LinearGradient,
  Stop
} from 'recharts';

interface SalesChartProps {
  data: { name: string; quantity: number }[];
}

export default function SalesChart({ data }: SalesChartProps) {
  if (data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 h-full flex flex-col justify-center">
        <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
          📈 Sales Performance
        </h3>
        <div className="flex flex-col items-center justify-center h-64 text-gray-400">
          <div className="text-4xl mb-2">📊</div>
          No sales data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-gray-800">📈 Product Sales</h3>
          <p className="text-sm text-gray-500">Inventory performance by quantity sold</p>
        </div>
        <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-bold rounded-full">
          Live Updates
        </span>
      </div>

      <ResponsiveContainer width="100%" height={350}>
        <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
          <defs>
            {/* Soft Blue Gradient for the Area fill */}
            <linearGradient id="colorQuantity" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
          
          <XAxis 
            dataKey="name" 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            dy={15}
          />
          
          <YAxis 
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#9ca3af', fontSize: 12 }}
          />

          <Tooltip 
            cursor={{ stroke: '#3b82f6', strokeWidth: 2 }}
            contentStyle={{ 
              backgroundColor: 'white', 
              border: 'none',
              borderRadius: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
            }}
          />

          <Area 
            type="monotone" 
            dataKey="quantity" 
            stroke="#3b82f6" 
            strokeWidth={3}
            fillOpacity={1} 
            fill="url(#colorQuantity)" 
            name="Units Sold"
            animationDuration={1500}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}