import React, { useState, useEffect } from 'react';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

interface AboutBusinessFormProps {
  readOnly?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const AboutBusinessForm: React.FC<AboutBusinessFormProps> = ({ readOnly = false, onValidationChange }) => {
  const { facilitySize, setFacilitySize } = useTaskVisibility();
  const [businessDescription, setBusinessDescription] = useState<string>('');
  const [localFacilitySize, setLocalFacilitySize] = useState<string>(facilitySize);

  const facilitySizeOptions = [
    { value: 'below-30', label: 'Below $30,000' },
    { value: '30-100', label: '$30,000 - $100,000' },
    { value: '100-250', label: '$100,000 - $250,000' },
    { value: 'above-250', label: 'Above $250,000' }
  ];

  useEffect(() => {
    const isValid = businessDescription.trim().length > 0 && localFacilitySize.trim().length > 0;
    onValidationChange?.(isValid);
  }, [businessDescription, localFacilitySize, onValidationChange]);

  const handleDescriptionChange = (value: string) => {
    setBusinessDescription(value);
  };

  const handleFacilitySizeChange = (value: string) => {
    setLocalFacilitySize(value);
    setFacilitySize(value);
  };

  return (
    <div className="relative">
      <form className="space-y-6">
        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              1
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">Business Overview</p>
              <p className="text-gray-600 text-sm mt-0.5">Tell us about your business in your own words.</p>
            </div>
          </div>

          <div>
            <textarea
              value={businessDescription}
              onChange={(e) => handleDescriptionChange(e.target.value)}
              disabled={readOnly}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 resize-none"
              placeholder="e.g. We're a civil construction company based in Auckland. We work with commercial developers and councils on small to mid-sized infrastructure projects. We invoice progressively as milestones are completed, typically on 30 to 60 day terms. Our main costs are wages, subcontractors, and materials, so timing between paying suppliers and receiving payment can create cashflow gaps."
            />
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              2
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">Facility Size</p>
              <p className="text-gray-600 text-sm mt-0.5">What size facility do you need?</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {facilitySizeOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center justify-center p-4 border rounded-lg cursor-pointer transition-all duration-200 text-center ${
                  readOnly ? 'opacity-50 cursor-not-allowed' :
                  localFacilitySize === option.value
                    ? 'border-gray-200 bg-fundtap-light'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-fundtap-light/20'
                }`}
              >
                <input
                  type="radio"
                  name="facilitySize"
                  value={option.value}
                  checked={localFacilitySize === option.value}
                  onChange={(e) => handleFacilitySizeChange(e.target.value)}
                  disabled={readOnly}
                  className="sr-only"
                />
                <div className="font-medium text-gray-900">{option.label}</div>
              </label>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AboutBusinessForm;
