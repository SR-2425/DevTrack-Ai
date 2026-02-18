import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { LanguageData } from '../../../types';
import BaseChart from '../core/BaseChart';
import ChartTooltip from '../core/ChartTooltip';

interface SkillsPieChartProps {
  data: LanguageData[];
  isLoading?: boolean;
}

/**
 * Secondary Chart: Displays the distribution of programming languages.
 * Simple and effective for showing parts of a whole.
 */
const SkillsPieChart: React.FC<SkillsPieChartProps> = ({ data, isLoading }) => {
  return (
    <BaseChart
      title="Stack Distribution"
      description="Your most used technologies"
      isLoading={isLoading}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            innerRadius="70%"
            outerRadius="90%"
            paddingAngle={5}
            dataKey="value"
            nameKey="name"
          >
            {data.map((entry) => <Cell key={`cell-${entry.name}`} fill={entry.color} />)}
          </Pie>
          <Tooltip content={<ChartTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    </BaseChart>
  );
};

export default React.memo(SkillsPieChart);
