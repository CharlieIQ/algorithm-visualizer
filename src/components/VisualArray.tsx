import React from 'react';
import { ArrayElement } from '../types';

// Props for the VisualArray component
interface VisualArrayProps {
  elements: ArrayElement[];
  onElementChange?: (index: number, newValue: number) => void;
  editable?: boolean;
  maxHeight?: number;
}

/**
 * This component visualizes an array of numbers as vertical bars.
 * Each bar's height corresponds to its value, and colors indicate different states
 * (default, comparing, swapping, sorted).
 * 
 * If `editable` is true, users can modify the values directly via input fields below each bar.
 * @param param0 - VisualArrayProps
 * @returns 
 */
const VisualArray: React.FC<VisualArrayProps> = ({
  elements,
  onElementChange,
  editable = false,
  maxHeight = 400
}) => {
  // Calculate dimensions
  const maxValue = Math.max(...elements.map(el => el.value));
  const containerWidth = Math.min(1000, Math.max(600, elements.length * 50)); // Dynamic width
  const barWidth = Math.max(15, Math.min(50, Math.floor(containerWidth / elements.length) - 4)); // Account for gaps

  // Determine bar color based on state
  const getBarColor = (state: ArrayElement['state']) => {
    switch (state) {
      case 'comparing':
        return 'bg-yellow-500';
      case 'swapping':
        return 'bg-red-500';
      case 'sorted':
        return 'bg-green-500';
      default:
        return 'bg-primary-500';
    }
  };

  // Handle value change for editable inputs
  const handleValueChange = (index: number, newValue: string) => {
    const value = parseInt(newValue) || 0;
    // Only allow values between 1 and 100
    if (value >= 1 && value <= 100 && onElementChange) {
      onElementChange(index, value);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 w-full">
      <div
        className="flex items-end justify-center space-x-1 mb-4 mx-auto px-4"
        style={{
          height: maxHeight + 50,
          width: 'fit-content',
          maxWidth: '100%',
          minWidth: `${Math.min(containerWidth, 800)}px`
        }}
      >
        {elements.map((element, index) => {
          const height = (element.value / maxValue) * maxHeight;
          return (
            <div
              key={element.id}
              className="flex flex-col items-center"
              style={{ width: barWidth }}
            >
              <div
                className={`${getBarColor(element.state)} transition-all duration-300 ease-in-out rounded-t-sm flex items-end justify-center pb-2`}
                style={{
                  height: Math.max(height, 30),
                  width: barWidth,
                }}
              >
                <span className="text-white text-xs font-semibold">
                  {element.value}
                </span>
              </div>
              {editable && (
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={element.value}
                  onChange={(e) => handleValueChange(index, e.target.value)}
                  className="w-full mt-2 px-2 py-1 text-xs border border-dark-600 rounded focus:outline-none focus:border-primary-500 bg-dark-800 text-white"
                />
              )}
            </div>
          );
        })}
      </div>

      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-primary-500 rounded"></div>
          <span className="text-dark-300">Default</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded"></div>
          <span className="text-dark-300">Comparing</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-dark-300">Swapping</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-dark-300">Sorted</span>
        </div>
      </div>
    </div>
  );
};

export default VisualArray;
