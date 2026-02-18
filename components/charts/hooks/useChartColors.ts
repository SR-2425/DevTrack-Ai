import { useState, useEffect } from 'react';
import { chartColors } from '../config/chartConfig';

/**
 * A custom React hook that provides the appropriate color palette
 * for charts based on the application's current theme (light/dark).
 *
 * It listens for changes to the theme and provides the updated colors,
 * ensuring charts are always in sync with the UI.
 */
export const useChartColors = () => {
  const [isDarkMode, setIsDarkMode] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  useEffect(() => {
    // Observer to watch for class changes on the <html> element.
    // This is more robust than event listeners for theme changes.
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  return isDarkMode ? chartColors.dark : chartColors.light;
};
