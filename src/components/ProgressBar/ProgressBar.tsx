import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStep,
  totalSteps,
}) => {
  const percentage = (currentStep / totalSteps) * 100;

  return (
    <div className="w-full space-y-3">
      <div className="flex justify-between items-center">
        <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
          Step {currentStep} of {totalSteps}
        </span>
        <span className="text-xs font-bold text-fundtap-primary">
          {Math.round(percentage)}%
        </span>
      </div>
      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden shadow-inner">
        <div
          className="h-full bg-gradient-secondary transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
