import React, { useState, useEffect } from 'react';

import Trustees, { Trustee } from './BusinessDetails/TradingTrust/Trustees';
import TrustDeedAndAmendments from './BusinessDetails/TradingTrust/TrustDeedAndAmendments';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

interface TrustDetailsFormProps {
  readOnly?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const TrustDetailsForm: React.FC<TrustDetailsFormProps> = ({ readOnly = false, onValidationChange }) => {
  const { getTrustName } = useTaskVisibility();
  const [trustName, setTrustName] = useState('');
  const [trustees, setTrustees] = useState<Trustee[]>([]);

  useEffect(() => {
    const contextTrustName = getTrustName();
    if (contextTrustName && !trustName) {
      setTrustName(contextTrustName);
    }
  }, [getTrustName]);

  useEffect(() => {
    const hasAtLeastOneTrustee = trustees.length > 0;
    const isValid = trustName.trim() !== '' && hasAtLeastOneTrustee;
    onValidationChange?.(isValid);
  }, [trustName, trustees, onValidationChange]);

  const addTrustee = () => {
    if (readOnly) return;
    const newTrustee: Trustee = {
      id: Date.now().toString(),
      name: '',
      email: '',
      phone: '',
      type: 'individual',
      isProfessional: false,
      contactPreference: 'self',
      directorName: ''
    };
    setTrustees([...trustees, newTrustee]);
  };

  const updateTrustee = (id: string, field: keyof Trustee, value: string | boolean) => {
    if (readOnly) return;
    setTrustees(trustees.map(trustee =>
      trustee.id === id ? { ...trustee, [field]: value } : trustee
    ));
  };

  const removeTrustee = (id: string) => {
    if (readOnly) return;
    setTrustees(trustees.filter(trustee => trustee.id !== id));
  };

  return (
    <div className="relative">
      <form className="space-y-6">
        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
              1
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">Verify Your Trust Details</p>
              <p className="text-gray-600 text-sm mt-0.5">Please confirm these details are correct. If anything is incorrect, update it below.</p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trust Name
            </label>
            <input
              type="text"
              value={trustName}
              onChange={(e) => setTrustName(e.target.value)}
              disabled={readOnly}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
              placeholder="Enter trust name"
            />
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
              2
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">Add Trustees</p>
              <p className="text-gray-600 text-sm mt-0.5">List all trustees involved in managing your trust</p>
            </div>
          </div>
          <Trustees
            trustees={trustees}
            readOnly={readOnly}
            onAddTrustee={addTrustee}
            onUpdateTrustee={updateTrustee}
            onRemoveTrustee={removeTrustee}
          />
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
              3
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">Upload Trust Deed And Amendments</p>
              <p className="text-gray-600 text-sm mt-0.5">Upload your trust deed and any amendments that have been made</p>
            </div>
          </div>
          <TrustDeedAndAmendments />
        </div>
      </form>
    </div>
  );
};

export default TrustDetailsForm;