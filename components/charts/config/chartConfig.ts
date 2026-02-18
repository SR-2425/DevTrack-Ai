/**
 * ============================================================================
 * CHART CONFIGURATION
 * ============================================================================
 * This file centralizes all styling and configuration for Recharts components.
 * By defining colors, gradients, and styles here, we ensure a consistent
 * look and feel across all data visualizations in the application.
 *
 * It is designed to be theme-aware, providing distinct color palettes
 * for both light and dark modes.
 * ============================================================================
 */

interface ChartColorPalette {
  primary: string;
  secondary: string;
  grid: string;
  text: string;
  tooltipBg: string;
  tooltipText: string;
}

export const chartColors: { light: ChartColorPalette; dark: ChartColorPalette } = {
  light: {
    primary: '#3b82f6',    // blue-600
    secondary: '#a855f7',  // purple-500
    grid: '#f1f5f9',      // slate-100
    text: '#64748b',      // slate-500
    tooltipBg: '#ffffff',
    tooltipText: '#0f172a' // slate-900
  },
  dark: {
    primary: '#60a5fa',    // blue-400
    secondary: '#c084fc',  // purple-400
    grid: '#1e293b',      // slate-800
    text: '#94a3b8',      // slate-400
    tooltipBg: '#0f172a',  // slate-900
    tooltipText: '#f8fafc' // slate-50
  }
};

// Unique ID for the primary gradient definition used in area charts.
export const GRADIENT_ID = 'primary-gradient';

// Standardized chart typography styles
export const tickStyles = {
  fontSize: 10,
  fontWeight: 'bold',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};
