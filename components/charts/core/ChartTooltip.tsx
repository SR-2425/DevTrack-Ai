import React from 'react';
import { useChartColors } from '../hooks/useChartColors';

/**
 * A standardized, theme-aware tooltip component for Recharts.
 * It uses the centralized color configuration to ensure a consistent
 * look and feel for tooltips across all charts in the application.
 */
const ChartTooltip = ({ active, payload, label }: any) => {
  const colors = useChartColors();

  if (active && payload && payload.length) {
    return (
      <div 
        className="p-4 rounded-2xl shadow-2xl"
        style={{
          backgroundColor: colors.tooltipBg,
          border: `1px solid ${colors.grid}`
        }}
      >
        <p className="text-sm font-black tracking-tight" style={{ color: colors.tooltipText }}>{label}</p>
        {payload.map((pld: any, index: number) => (
          <div key={index} className="flex items-center gap-2 mt-2">
            <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: pld.color || pld.fill }} />
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: colors.text }}>
              {pld.name}: <span className="font-black" style={{ color: colors.tooltipText }}>{pld.value}</span>
            </p>
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ChartTooltip;
