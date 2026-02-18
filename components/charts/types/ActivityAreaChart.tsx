import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ActivityPoint } from '../../../types';
import BaseChart from '../core/BaseChart';
import ChartTooltip from '../core/ChartTooltip';
import { useChartColors } from '../hooks/useChartColors';
import { GRADIENT_ID, tickStyles } from '../config/chartConfig';

interface ActivityAreaChartProps {
  data: ActivityPoint[];
  isLoading?: boolean;
}

/**
 * Primary Chart: Displays user's coding activity over time.
 * This is a high-emphasis chart, featuring a gradient fill and detailed tooltips.
 */
const ActivityAreaChart: React.FC<ActivityAreaChartProps> = ({ data, isLoading }) => {
  const colors = useChartColors();

  return (
    <BaseChart
      title="Work Activity"
      description="See how much you code each day"
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id={GRADIENT_ID} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={colors.primary} stopOpacity={0.15}/>
              <stop offset="95%" stopColor={colors.primary} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={colors.grid} />
          <XAxis 
            dataKey="label" 
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
          <Tooltip content={<ChartTooltip />} cursor={{ fill: colors.primary, fillOpacity: 0.05 }} />
          <Area 
            type="monotone" 
            dataKey="commits" 
            stroke={colors.primary} 
            fillOpacity={1} 
            fill={`url(#${GRADIENT_ID})`} 
            strokeWidth={4} 
            name="Commits"
          />
        </AreaChart>
      </ResponsiveContainer>
    </BaseChart>
  );
};

export default React.memo(ActivityAreaChart);
