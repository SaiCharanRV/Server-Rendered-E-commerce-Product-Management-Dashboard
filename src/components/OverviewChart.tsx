"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartData {
  name: string;
  value: number;
}

const COLORS = ['#2563EB', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#6366F1'];

export default function OverviewChart({ data }: { data: ChartData[] }) {
  // Calculate total value to display in the middle
  const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div 
      className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col relative"
      style={{ height: "500px", minHeight: "500px" }} 
    >
      <div className="mb-2">
        <h3 className="text-lg font-bold text-gray-800">
          Inventory Value Distribution
        </h3>
        <p className="text-sm text-gray-500">Breakdown of total asset value</p>
      </div>
      
      <div className="flex-1 w-full min-h-0 relative">
        {/* CENTER METRIC - Absolutely positioned in the middle of the donut */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ transform: 'translateY(-20px)' }}>
          <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">Total Value</span>
          <span className="text-2xl font-black text-gray-900">₹{totalValue.toLocaleString()}</span>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data as any}
              cx="50%"
              cy="45%" 
              innerRadius={110}  // <--- Creates the Donut hole
              outerRadius={150} 
              paddingAngle={5}   // <--- Adds modern gaps between slices
              cornerRadius={8}   // <--- Rounds the edges of the slices
              dataKey="value"
              animationBegin={0}
              animationDuration={1500}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  stroke="none"
                  className="hover:opacity-80 transition-opacity outline-none"
                />
              ))}
            </Pie>
            
            <Tooltip 
              formatter={(value: any) => `₹${(value ?? 0).toLocaleString()}`}
               contentStyle={{ 
                 borderRadius: '12px', 
                 border: 'none', 
                 boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
                 padding: '12px'
               }}
            />
            
            <Legend 
              verticalAlign="bottom" 
              align="center"
              iconType="circle"
              layout="horizontal"
              wrapperStyle={{ 
                paddingTop: "20px", 
                fontSize: "12px", 
                fontWeight: "600",
                color: "#4B5563"
              }} 
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}