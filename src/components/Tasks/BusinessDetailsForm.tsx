import React, { useState, useEffect } from 'react';

import Directors, { Director } from './BusinessDetails/LimitedCompany/Directors';
import Shareholders, { Shareholder } from './BusinessDetails/LimitedCompany/Shareholders';
import Partners, { Partner } from './BusinessDetails/Partnership/Partners';
import OtherControllers, { Controller } from './BusinessDetails/Common/OtherControllers';
import Trustees, { Trustee } from './BusinessDetails/TradingTrust/Trustees';
import TrustDeedAndAmendments from './BusinessDetails/TradingTrust/TrustDeedAndAmendments';
import HelpTooltip from '../HelpTooltip/HelpTooltip';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

interface TrustDetailsData {
  trustName: string;
  abnOrNzbn: string;
}

interface BusinessDetailsFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

const BusinessDetailsForm: React.FC<BusinessDetailsFormProps> = ({ onValidationChange }) => {
  const { addTrustRequirement, removeTrustRequirement, addCompanyShareholdingRequirement, removeCompanyShareholdingRequirement } = useTaskVisibility();

  const [businessName, setBusinessName] = useState('Demo Company Limited');
  const [registrationNumber, setRegistrationNumber] = useState('12345678');
  const [businessType, setBusinessType] = useState('Limited Company');

  // State for all business structure data
  const [otherDirectors, setOtherDirectors] = useState<Director[]>([]);
  const [shareholders, setShareholders] = useState<Shareholder[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [otherControllers, setOtherControllers] = useState<Controller[]>([]);
  
  // Trading Trust specific state
  const [trustees, setTrustees] = useState<Trustee[]>([]);
  const [trustDetails, setTrustDetails] = useState<TrustDetailsData>({
    trustName: '',
    abnOrNzbn: ''
  });

  // Director management functions
  const addDirector = () => {
    const newDirector: Director = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    setOtherDirectors([...otherDirectors, newDirector]);
  };

  const updateDirector = (id: string, field: keyof Director, value: string) => {
    setOtherDirectors(otherDirectors.map(director => 
      director.id === id ? { ...director, [field]: value } : director
    ));
  };

  const removeDirector = (id: string) => {
    setOtherDirectors(otherDirectors.filter(director => director.id !== id));
  };

  // Shareholder management functions
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

  // Partner management functions
  const addPartner = () => {
    const newPartner: Partner = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    setPartners([...partners, newPartner]);
  };

  const updatePartner = (id: string, field: keyof Partner, value: string) => {
    setPartners(partners.map(partner => 
      partner.id === id ? { ...partner, [field]: value } : partner
    ));
  };

  const removePartner = (id: string) => {
    setPartners(partners.filter(partner => partner.id !== id));
  };

  // Controller management functions
  const addController = () => {
    const newController: Controller = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: ''
    };
    setOtherControllers([...otherControllers, newController]);
  };

  const updateController = (id: string, field: keyof Controller, value: string) => {
    setOtherControllers(otherControllers.map(controller => 
      controller.id === id ? { ...controller, [field]: value } : controller
    ));
  };

  const removeController = (id: string) => {
    setOtherControllers(otherControllers.filter(controller => controller.id !== id));
  };

  // Trustee management functions (for Trading Trust)
  const addTrustee = () => {
    const newTrustee: Trustee = {
      id: Date.now().toString(),
      name: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      type: 'individual',
      isProfessional: false,
      contactPreference: 'self',
      directorFirstName: '',
      directorLastName: ''
    };
    setTrustees([...trustees, newTrustee]);
  };

  const updateTrustee = (id: string, field: keyof Trustee, value: string | boolean) => {
    setTrustees(trustees.map(trustee => 
      trustee.id === id ? { ...trustee, [field]: value } : trustee
    ));
  };

  const removeTrustee = (id: string) => {
    setTrustees(trustees.filter(trustee => trustee.id !== id));
  };

  const updateTrustDetails = (field: keyof TrustDetailsData, value: string) => {
    setTrustDetails(prev => ({ ...prev, [field]: value }));
  };

  useEffect(() => {
    const trustShareholder = shareholders.find(
      sh => sh.type === 'trust-held' &&
      parseFloat(sh.percentage) >= 25 &&
      sh.name.trim() !== ''
    );

    if (trustShareholder) {
      addTrustRequirement('shareholder', trustShareholder.name);
    } else {
      removeTrustRequirement('shareholder');
    }
  }, [shareholders, addTrustRequirement, removeTrustRequirement]);

  useEffect(() => {
    if (businessType === 'Trading Trust' && trustDetails.trustName.trim() !== '') {
      addTrustRequirement('business-type', trustDetails.trustName);
    } else {
      removeTrustRequirement('business-type');
    }
  }, [businessType, trustDetails.trustName, addTrustRequirement, removeTrustRequirement]);

  useEffect(() => {
    const companyShareholder = shareholders.find(
      sh => sh.type === 'company-held' &&
      parseFloat(sh.percentage) >= 25 &&
      sh.name.trim() !== ''
    );

    if (companyShareholder) {
      addCompanyShareholdingRequirement('shareholder', companyShareholder.name);
    } else {
      removeCompanyShareholdingRequirement('shareholder');
    }
  }, [shareholders, addCompanyShareholdingRequirement, removeCompanyShareholdingRequirement]);

  const getStepNumber = () => {
    let stepNum = 1;
    const steps: { [key: string]: number } = {
      businessDetails: stepNum++
    };

    if (businessType !== 'Trading Trust') {
      if (businessType === 'Limited Company') {
        steps.directors = stepNum++;
      }
      if (businessType === 'Partnership' || businessType === 'LLP') {
        steps.partners = stepNum++;
      }
      if (businessType === 'Limited Company') {
        steps.shareholders = stepNum++;
      }
      if (businessType === 'Limited Company' || businessType === 'Sole Trader') {
        steps.controllers = stepNum++;
      }
    }

    return steps;
  };

  const steps = getStepNumber();

  useEffect(() => {
    // Validation logic
    const hasBusinessName = businessName.trim().length > 0;
    const hasRegistrationNumber = registrationNumber.trim().length > 0;
    const hasBusinessType = businessType !== 'Not Sure';

    let isValid = hasBusinessName && hasRegistrationNumber && hasBusinessType;

    // Trading Trust specific validation
    if (businessType === 'Trading Trust') {
      const hasTrustName = trustDetails.trustName.trim().length > 0;
      isValid = isValid && hasTrustName;
    }

    // Note: Controllers (Account Users) are optional, so we don't validate them

    onValidationChange?.(isValid);
  }, [businessName, registrationNumber, businessType, trustDetails, onValidationChange]);

  const getLegalNameLabel = () => {
    switch (businessType) {
      case 'Limited Company':
        return 'Legal Company Name';
      case 'Sole Trader':
        return 'Trading Name';
      case 'Partnership':
        return 'Legal Partnership Name';
      case 'LLP':
        return 'Legal Partnership Name';
      case 'Trading Trust':
        return 'Legal Trading Name';
      default:
        return 'Legal Business Name';
    }
  };

  return (
    <div className="relative">
      <form className="space-y-6">
        {/* ============================================ */}
        {/* BUSINESS DETAILS */}
        {/* ============================================ */}
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
                Business Type
              </label>
              <select
                value={businessType}
                onChange={(e) => setBusinessType(e.target.value)}
                className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
              >
                <option value="Not Sure">Not Sure</option>
                <option value="Limited Company">Limited Company</option>
                <option value="Sole Trader">Sole Trader</option>
                <option value="Partnership">Partnership</option>
                <option value="LLP">Limited Liability Partnership</option>
                <option value="Trading Trust">Trading Trust</option>
              </select>
            </div>

            {businessType === 'Trading Trust' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trust Name
                </label>
                <input
                  type="text"
                  value={trustDetails.trustName}
                  onChange={(e) => updateTrustDetails('trustName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                  placeholder="Enter trust name"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                {getLegalNameLabel()}
                {businessType !== 'Trading Trust' && (
                  <HelpTooltip content='Enter your full legal business name as registered, including "Limited", "Ltd", or "Pty Ltd", to ensure your documents are correct.' />
                )}
              </label>
              <input
                type="text"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                NZBN or ABN
              </label>
              <input
                type="text"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
              />
            </div>
          </div>
        </div>

        {/* ============================================ */}
        {/* BUSINESS STRUCTURE SECTIONS */}
        {/* ============================================ */}
        {businessType !== 'Trading Trust' && (
          <>
            {/* Directors Section - Only for Limited Company */}
            {businessType === 'Limited Company' && (
              <>
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
                    directors={otherDirectors}
                    onAddDirector={addDirector}
                    onUpdateDirector={updateDirector}
                    onRemoveDirector={removeDirector}
                  />
                </div>
              </>
            )}

            {/* Partners Section - Only for Partnership and LLP */}
            {(businessType === 'Partnership' || businessType === 'LLP') && (
              <>
                <div className="border-t border-gray-100" />
                <div>
                  <div className="flex gap-4 mb-5">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
                      {steps.partners}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h2 className="text-lg font-semibold text-gray-900">Add Your Partners</h2>
                      <p className="text-sm text-gray-600 mt-0.5">List all partners involved in your business</p>
                    </div>
                  </div>
                  <Partners
                    partners={partners}
                    onAddPartner={addPartner}
                    onUpdatePartner={updatePartner}
                    onRemovePartner={removePartner}
                  />
                </div>
              </>
            )}

            {/* Shareholder Details Section - Only for Limited Company */}
            {businessType === 'Limited Company' && (
              <>
                <div className="border-t border-gray-100" />
                <div>
                  <div className="flex gap-4 mb-5">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
                      {steps.shareholders}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h2 className="text-lg font-semibold text-gray-900">Add Your Shareholders</h2>
                      <p className="text-sm text-gray-600 mt-0.5">Specify shareholders and their ownership percentages</p>
                    </div>
                  </div>
                  <Shareholders
                    shareholders={shareholders}
                    onAddShareholder={addShareholder}
                    onUpdateShareholder={updateShareholder}
                    onRemoveShareholder={removeShareholder}
                  />
                </div>
              </>
            )}

            {/* Controllers Section - Only for Limited Company and Sole Trader */}
            {(businessType === 'Limited Company' || businessType === 'Sole Trader') && (
              <>
                <div className="border-t border-gray-100" />
                <div>
                  <div className="flex gap-4 mb-5">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
                      {steps.controllers}
                    </div>
                    <div className="flex-1 pt-0.5">
                      <h2 className="text-lg font-semibold text-gray-900">Add Account Users</h2>
                      <p className="text-sm text-gray-600 mt-0.5">Include anyone else who needs access to this account</p>
                    </div>
                  </div>
                  <OtherControllers
                    controllers={otherControllers}
                    businessType={businessType}
                    onAddController={addController}
                    onUpdateController={updateController}
                    onRemoveController={removeController}
                  />
                </div>
              </>
            )}
          </>
        )}

      </form>
    </div>
  );
};

export default BusinessDetailsForm;