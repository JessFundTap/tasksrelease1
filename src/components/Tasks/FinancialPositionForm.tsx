import React, { useState, useEffect } from 'react';
import { DollarSign, Upload } from 'lucide-react';
import PropertyOwners from './FinancialPosition/PropertyOwners';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

export interface PropertyOwner {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  type: 'individual' | 'trust' | 'company';
}

interface FinancialPositionFormProps {
  readOnly?: boolean;
  onValidationChange?: (isValid: boolean) => void;
}

const FinancialPositionForm: React.FC<FinancialPositionFormProps> = ({ readOnly = false, onValidationChange }) => {
  const { addTrustRequirement, removeTrustRequirement, addCompanyShareholdingRequirement, removeCompanyShareholdingRequirement, facilitySize } = useTaskVisibility();

  const [propertyAddress, setPropertyAddress] = useState<string>('');
  const [propertyOwnership, setPropertyOwnership] = useState<'personally' | 'trust' | 'company'>('personally');
  const [propertyOwners, setPropertyOwners] = useState<PropertyOwner[]>([]);
  const [trustName, setTrustName] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const showMortgageStatement = facilitySize === '100-250' || facilitySize === 'above-250';

  useEffect(() => {
    if (propertyOwnership === 'trust' && trustName.trim() !== '') {
      addTrustRequirement('property', trustName);
    } else {
      removeTrustRequirement('property');
    }
  }, [propertyOwnership, trustName, addTrustRequirement, removeTrustRequirement]);

  useEffect(() => {
    if (propertyOwnership === 'company' && companyName.trim() !== '') {
      addCompanyShareholdingRequirement('property', companyName);
    } else {
      removeCompanyShareholdingRequirement('property');
    }
  }, [propertyOwnership, companyName, addCompanyShareholdingRequirement, removeCompanyShareholdingRequirement]);

  useEffect(() => {
    if (!propertyAddress) {
      onValidationChange?.(false);
      return;
    }
    if (propertyOwnership === 'personally' && propertyOwners.length === 0) {
      onValidationChange?.(false);
      return;
    }
    if (propertyOwnership === 'trust' && !trustName) {
      onValidationChange?.(false);
      return;
    }
    if (propertyOwnership === 'company' && !companyName) {
      onValidationChange?.(false);
      return;
    }
    if (showMortgageStatement && !uploadedFile) {
      onValidationChange?.(false);
      return;
    }
    onValidationChange?.(true);
  }, [propertyAddress, propertyOwnership, propertyOwners, trustName, companyName, showMortgageStatement, uploadedFile, onValidationChange]);

  const addPropertyOwner = () => {
    if (readOnly) return;
    const newOwner: PropertyOwner = {
      id: Date.now().toString(),
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      type: 'individual'
    };
    const updated = [...propertyOwners, newOwner];
    setPropertyOwners(updated);
  };

  const updatePropertyOwner = (id: string, field: keyof PropertyOwner, value: string) => {
    if (readOnly) return;
    const updated = propertyOwners.map(owner =>
      owner.id === id ? { ...owner, [field]: value } : owner
    );
    setPropertyOwners(updated);
  };

  const removePropertyOwner = (id: string) => {
    if (readOnly) return;
    const updated = propertyOwners.filter(owner => owner.id !== id);
    setPropertyOwners(updated);
  };

  const isValidFileType = (file: File): boolean => {
    const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
    return validTypes.includes(file.type);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (readOnly) return;
    const file = event.target.files?.[0];
    if (file && isValidFileType(file)) {
      setUploadedFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (readOnly) return;
    const file = event.dataTransfer.files?.[0];
    if (file && isValidFileType(file)) {
      setUploadedFile(file);
    }
  };

  const removeUploadedFile = () => {
    if (readOnly) return;
    setUploadedFile(null);
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
              <p className="text-lg text-gray-900 font-semibold">Property Details</p>
              <p className="text-gray-600 text-sm mt-0.5">Required for funding over $30,000</p>
            </div>
          </div>

          <p className="text-gray-600 text-sm mb-6">
            To help us get a clearer picture of the business and its owners' financial position, please provide some basic details about property ownership.
          </p>

          {/* Property Address Search */}
          <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  value={propertyAddress}
                  onChange={(e) => setPropertyAddress(e.target.value)}
                  disabled={readOnly}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                  placeholder="Start typing the property address..."
                />
                <p className="text-xs text-gray-500 mt-1">
                  We'll search for the property details automatically as you type
                </p>
              </div>

          {/* Property Ownership */}
          <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  How is this property owned?
                </label>
                <select
                  value={propertyOwnership}
                  onChange={(e) => setPropertyOwnership(e.target.value as 'personally' | 'trust' | 'company')}
                  disabled={readOnly}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                >
                  <option value="personally">Personally owned</option>
                  <option value="trust">Owned by a trust</option>
                  <option value="company">Owned by a company</option>
                </select>
              </div>

          {/* Property Owners Section */}
          <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  {propertyOwnership === 'personally' ? 'Property Owners' :
                   propertyOwnership === 'trust' ? 'Trust Details' :
                   'Company Details'}
                </label>

            {propertyOwnership === 'personally' && (
              <PropertyOwners
                owners={propertyOwners}
                readOnly={readOnly}
                onAddOwner={addPropertyOwner}
                onUpdateOwner={updatePropertyOwner}
                onRemoveOwner={removePropertyOwner}
              />
            )}

            {propertyOwnership === 'trust' && (
              <input
                type="text"
                value={trustName}
                onChange={(e) => setTrustName(e.target.value)}
                disabled={readOnly}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                placeholder="Enter the trust name"
              />
            )}

            {propertyOwnership === 'company' && (
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                disabled={readOnly}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                placeholder="Enter the company name"
              />
            )}
          </div>
        </div>

        {/* Mortgage Statement Upload Section - Only shown for facilities $100k+ */}
        {showMortgageStatement && (
          <>
            <div className="border-t border-gray-100" />
            <div>
              <div className="flex gap-4 mb-5">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                  2
                </div>
                <div className="flex-1 pt-0.5">
                  <p className="text-lg text-gray-900 font-semibold">Mortgage Statement</p>
                  <p className="text-gray-600 text-sm mt-0.5">Recent statement (within 3 months)</p>
                </div>
              </div>

              {!uploadedFile ? (
                <div
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-colors duration-200"
                >
                  <input
                    type="file"
                    id="mortgage-statement"
                    accept=".pdf,.png,.jpg,.jpeg"
                    onChange={handleFileUpload}
                    disabled={readOnly}
                    className="hidden"
                  />
                  <label htmlFor="mortgage-statement" className="cursor-pointer block">
                    <Upload className="w-5 h-5 text-fundtap-primary mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900 mb-1">Upload statement</p>
                    <p className="text-xs text-gray-600">Drag and drop or click to upload</p>
                    <p className="text-xs text-gray-500 mt-1">Accepted file types: JPG, JPEG, PDF, PNG</p>
                  </label>
                </div>
              ) : (
                <div className="border border-gray-200 rounded-lg p-4 flex items-center justify-between bg-gray-50">
                  <div className="flex items-center gap-3 min-w-0">
                    <Upload className="w-4 h-4 text-fundtap-primary flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">{uploadedFile.name}</p>
                      <p className="text-xs text-gray-500">{(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeUploadedFile}
                    disabled={readOnly}
                    className="text-sm text-red-600 hover:text-red-700 font-medium flex-shrink-0 ml-4"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default FinancialPositionForm;