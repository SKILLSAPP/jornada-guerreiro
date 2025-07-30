import React from 'react';

interface ProgressBarProps {
  current: number;
  total: number;
}

const ProgressBar = ({ current, total }: ProgressBarProps) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-700 rounded-full h-4 border border-gray-600">
      <div
        className="bg-yellow-400 h-full rounded-full transition-all duration-500 ease-out"
        style={{ width: `${Math.min(percentage, 100)}%` }}
      ></div>
    </div>
  );
};

export default ProgressBar;