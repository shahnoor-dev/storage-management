"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

interface StorageChartProps {
  data: {
    name: string;
    value: number;
    fill: string;
  }[];
}

export function StorageChart({ data }: StorageChartProps) {
  return (
    <ResponsiveContainer width="100%" height={160}>
      <RadialBarChart
        innerRadius="80%"
        outerRadius="100%"
        barSize={20}
        data={data}
        startAngle={245}
        endAngle={-65}
      >
        {/* This axis creates the background track */}
        <PolarAngleAxis 
            type="number" 
            domain={[0, 90]} 
            angleAxisId={0} 
            tick={false} 
        />
        <RadialBar
          background={{ fill: 'rgba(255, 255, 255, 0.2)' }} // Faint white background track
          dataKey="value"
          cornerRadius={10}
          angleAxisId={0}
        />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}