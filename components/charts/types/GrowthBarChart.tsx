import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import BaseChart from '../core/BaseChart';
import ChartTooltip from '../core/ChartTooltip';
import { useChartColors } from '../hooks/useChartColors';
import { tickStyles } from '../config/chartConfig';

interface GrowthData {
  month: string;
  score: number;
}

interface GrowthBarChartProps {
  data: GrowthData[];
  isLoading?: boolean;
}

/**
 * Secondary Chart: Displays monthly productivity score growth.
 * This is a lower-emphasis chart with a simple, clean design.
 */
const GrowthBarChart: React.FC<GrowthBarChartProps> = ({ data, isLoading }) => {
  const colors = useChartColors();

  return (
    <BaseChart
      title="Monthly Growth"
      description="Your productivity score over time"
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 20, right: 10, left: -20, bottom: 0 }}>
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            stroke={colors.text}
            dy={10}
            tick={tickStyles}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            stroke={colors.text}
            dx={-10}
            tick={tickStyles}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ fill: 'transparent' }} />
          <Bar dataKey="score" fill={colors.primary} radius={[4, 4, 0, 0]} name="Score" />
        </BarChart>
      </ResponsiveContainer>
    </BaseChart>
  );
};

export default React.memo(GrowthBarChart);
