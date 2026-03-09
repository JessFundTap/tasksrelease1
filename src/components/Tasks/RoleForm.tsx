import React, { useState, useEffect } from 'react';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

interface RoleFormProps {
  readOnly?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const RoleForm: React.FC<RoleFormProps> = ({ readOnly = false, onValidationChange }) => {
  const { setUserRole } = useTaskVisibility();
  const [role, setRole] = useState<string>('');
  const [hasConsent, setHasConsent] = useState<boolean>(false);

  const roleOptions = [
    { value: 'owner-director', label: 'Owner or Director' },
    { value: 'employee', label: 'Employee' },
    { value: 'external-advisor', label: 'External Advisor' }
  ];

  const isOwnerDirector = role === 'owner-director';
  const showConsentSection = isOwnerDirector;
  const showNotification = role && !isOwnerDirector;

  useEffect(() => {
    const isValid = role && (role !== 'owner-director' || hasConsent);
    onValidationChange?.(isValid);
  }, [role, hasConsent, onValidationChange]);

  const handleRoleChange = (newRole: string) => {
    setRole(newRole);
    setUserRole(newRole);
  };

  const handleConsentChange = (checked: boolean) => {
    setHasConsent(checked);
  };

  return (
    <div className="relative">
      <form className="space-y-6">
        {/* Role Selection */}
        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
              1
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">What's Your Role In The Business?</p>
              <p className="text-gray-600 text-sm mt-0.5">Select your role in the business</p>
            </div>
          </div>

          <div className="space-y-2">
            {roleOptions.map((option) => (
              <label
                key={option.value}
                className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all duration-200 ${
                  readOnly ? 'opacity-50 cursor-not-allowed' :
                  role === option.value
                    ? 'border-gray-200 bg-fundtap-light'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-fundtap-light/20'
                }`}
              >
                <input
                  type="radio"
                  name="role"
                  value={option.value}
                  checked={role === option.value}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  disabled={readOnly}
                  className="sr-only"
                />
                <div className="font-medium text-gray-900">{option.label}</div>
              </label>
            ))}
          </div>
        </div>

        {/* Consent Section - Only shown if owner/director */}
        {showConsentSection && (
          <>
            <div className="border-t border-gray-100" />
            <div>
              <div className="flex gap-4 mb-5">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                  2
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-lg text-gray-900 font-semibold">Consent</p>
                  <p className="text-gray-600 text-sm mt-0.5">
                    To meet our <a href="#" className="text-fundtap-secondary hover:text-fundtap-secondary/80 underline transition-colors duration-200">AML</a> and <a href="#" className="text-fundtap-secondary hover:text-fundtap-secondary/80 underline transition-colors duration-200">KYC</a> obligations and assess your eligibility, Fundtap requires your consent to obtain <a href="#" className="text-fundtap-secondary hover:text-fundtap-secondary/80 underline transition-colors duration-200">identity and credit checks</a>.
                  </p>
                </div>
              </div>

              <div className="p-4 bg-fundtap-light/30 border border-fundtap-secondary/30 rounded-lg">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="flex-shrink-0 mt-0.5">
                    <input
                      type="checkbox"
                      checked={hasConsent}
                      onChange={(e) => handleConsentChange(e.target.checked)}
                      disabled={readOnly}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-fundtap-secondary focus:ring-2 focus:ring-fundtap-secondary/20 focus:ring-offset-0 transition-all duration-200"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      I consent to Fundtap obtaining identity and credit checks for eligibility assessment.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </>
        )}

        {/* Notification - Only shown if employee or external advisor */}
        {showNotification && (
          <>
            <div className="p-4 bg-fundtap-light border border-fundtap-secondary/30 rounded-lg">
              <p className="text-sm text-fundtap-primary font-medium mb-1">
                A quick heads-up
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">
                To access funding, the business owners or directors will need to complete a quick credit and identity check.
              </p>
              <p className="text-sm text-gray-700 leading-relaxed mt-2">
                You're welcome to keep filling in the details in the meantime. When it's their turn, we'll reach out and guide them through the rest.
              </p>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default RoleForm;
