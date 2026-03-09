import React, { useState, useEffect } from 'react';
import Directors, { Director } from './BusinessDetails/LimitedCompany/Directors';
import Shareholders, { Shareholder } from './BusinessDetails/LimitedCompany/Shareholders';
import HelpTooltip from '../HelpTooltip/HelpTooltip';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

interface ShareholdingCompanyDetailsFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

const ShareholdingCompanyDetailsForm: React.FC<ShareholdingCompanyDetailsFormProps> = ({ onValidationChange }) => {
  const { getShareholdingCompanyName } = useTaskVisibility();

  const companyName = getShareholdingCompanyName();
  const [directors, setDirectors] = useState<Director[]>([]);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);

  const addDirector = () => {
    const newDirector: Director = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    setDirectors([...directors, newDirector]);
  };

  const updateDirector = (id: string, field: keyof Director, value: string) => {
    setDirectors(directors.map(director =>
      director.id === id ? { ...director, [field]: value } : director
    ));
  };

  const removeDirector = (id: string) => {
    setDirectors(directors.filter(director => director.id !== id));
  };

  const addShareholder = () => {
    const newShareholder: Shareholder = {
      id: Date.now().toString(),
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      percentage: '',
      type: 'personally-held'
    };
    setShareholders([...shareholders, newShareholder]);
  };

  const updateShareholder = (id: string, field: keyof Shareholder, value: string) => {
    setShareholders(shareholders.map(shareholder =>
      shareholder.id === id ? { ...shareholder, [field]: value } : shareholder
    ));
  };

  const removeShareholder = (id: string) => {
    setShareholders(shareholders.filter(shareholder => shareholder.id !== id));
  };

  useEffect(() => {
    const isValid = companyName.trim() !== '';
    onValidationChange?.(isValid);
  }, [companyName, onValidationChange]);

  const steps = {
    businessDetails: 1,
    directors: 2,
    shareholders: 3
  };

  return (
    <div className="relative">
      <form className="space-y-6">
        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
              {steps.businessDetails}
            </div>
            <div className="flex-1 pt-0.5">
              <p className="text-lg text-gray-900 font-semibold">Verify Your Business Details</p>
              <p className="text-gray-600 text-sm mt-0.5">Please confirm these details are correct. If anything is incorrect, update it below.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Legal Company Name
                <HelpTooltip content='This is the company name that holds the shares.' />
              </label>
              <input
                type="text"
                value={companyName}
                readOnly
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
              {steps.directors}
            </div>
            <div className="flex-1 pt-0.5">
              <h2 className="text-lg font-semibold text-gray-900">Add Your Directors</h2>
              <p className="text-sm text-gray-600 mt-0.5">Include any additional directors not already listed</p>
            </div>
          </div>
          <Directors
            directors={directors}
            onAddDirector={addDirector}
            onUpdateDirector={updateDirector}
            onRemoveDirector={removeDirector}
          />
        </div>

        <div className="border-t border-gray-100" />

        <div>
          <div className="flex gap-4 mb-5">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
              {steps.shareholders}
            </div>
            <div className="flex-1 pt-0.5">
              <h2 className="text-lg font-semibold text-gray-900">Add Shareholders</h2>
              <p className="text-sm text-gray-600 mt-0.5">Provide details for shareholders with 25% or more ownership</p>
            </div>
          </div>
          <Shareholders
            shareholders={shareholders}
            onAddShareholder={addShareholder}
            onUpdateShareholder={updateShareholder}
            onRemoveShareholder={removeShareholder}
          />
        </div>
      </form>
    </div>
  );
};

export default ShareholdingCompanyDetailsForm;
