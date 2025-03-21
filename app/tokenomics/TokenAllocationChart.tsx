"use client"

import { useState } from "react"
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip, Sector } from "recharts"

interface TokenAllocationProps {
  tokenAllocation: Array<{
    name: string;
    value: number;
    color: string;
  }>;
}

// Custom active shape for better hover effect
const renderActiveShape = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props;
  const RADIAN = Math.PI / 180;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.9}
      />
      <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" strokeWidth={2} />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333" fontSize={14} fontWeight="bold">
        {payload.name}
      </text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#666" fontSize={12}>
        {`${value}% (${(percent * 100).toFixed(0)}%)`}
      </text>
    </g>
  );
};

// Custom legend formatter for better legend display
const renderLegendText = (value: string, entry: any) => {
  const { color } = entry;
  
  return (
    <span className="text-sm font-medium flex items-center">
      <span className="inline-block w-3 h-3 mr-2 rounded-full" style={{ backgroundColor: color }}></span>
      {value}
    </span>
  );
};

export function TokenAllocationChart({ tokenAllocation }: TokenAllocationProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="w-full h-96 md:h-[400px] relative">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-sm p-4">
        <h3 className="text-center text-sm font-medium text-gray-500 mb-4">Token Distribution</h3>
        <ResponsiveContainer width="100%" height="90%">
          <PieChart>
            <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape}
              data={tokenAllocation}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              onMouseEnter={onPieEnter}
              animationBegin={200}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {tokenAllocation.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color} 
                  stroke="white" 
                  strokeWidth={1}
                  className="transition-opacity duration-300 hover:opacity-90"
                />
              ))}
            </Pie>
            <Tooltip 
              formatter={(value: number) => [`${value}%`, 'Allocation']}
              contentStyle={{ 
                backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                borderRadius: '8px', 
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', 
                border: 'none',
                padding: '8px 12px',
                fontSize: '14px'
              }}
            />
            <Legend 
              layout="vertical" 
              verticalAlign="middle" 
              align="right"
              iconType="circle"
              iconSize={8}
              formatter={renderLegendText}
              wrapperStyle={{
                paddingLeft: '20px',
                fontSize: '13px'
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
