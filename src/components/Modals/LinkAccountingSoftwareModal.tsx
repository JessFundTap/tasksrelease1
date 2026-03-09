import React from 'react';
import { X, HelpCircle, Shield, Lock } from 'lucide-react';

interface LinkAccountingSoftwareModalProps {
  isOpen: boolean;
  onSoftwareSelected: (software: string) => void;
  onModalDismissed: () => void;
}

const LinkAccountingSoftwareModal: React.FC<LinkAccountingSoftwareModalProps> = ({
  isOpen,
  onSoftwareSelected,
  onModalDismissed
}) => {
  if (!isOpen) return null;

  const softwareOptions = [
    { name: 'Xero', logo: '/src/assets/xero_software_logo.svg.png' },
    { name: 'QuickBooks', logo: '/src/assets/quickbooks-symbol.png' },
    { name: 'MYOB', logo: '/src/assets/myob_logo.png' },
    { name: 'Reckon', logo: '/src/assets/short-logo-copy.png' }
  ];

  const handleSelectSoftware = (software: string) => {
    onSoftwareSelected(software);
  };

  const handleNoSoftware = () => {
    onModalDismissed();
  };

  const handleSkip = () => {
    onModalDismissed();
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={onModalDismissed}
    >
      <div 
        className="bg-white rounded-xl shadow-2xl w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with title and tooltip */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">Select your accounting software.</h2>
          {/* Tooltip */}
          <div className="relative group">
            <HelpCircle className="w-4 h-4 text-fundtap-primary hover:text-fundtap-primary cursor-help transition-colors duration-200" />
            <div className="absolute top-6 right-0 w-64 bg-fundtap-primary text-white text-sm rounded-lg p-3 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              <p>Linking your accounting software helps us:</p>
              <ul className="mt-2 space-y-1 text-xs">
                <li>• Automatically sync your invoices</li>
                <li>• Check eligibility faster</li>
                <li>• Speed up funding decisions</li>
              </ul>
              <div className="mt-3 pt-2 border-t border-white/20">
                <div className="flex items-center gap-2">
                  <Shield className="w-3 h-3" />
                  <Lock className="w-3 h-3" />
                  <span className="text-xs">Bank-level security • FCA regulated</span>
                </div>
              </div>
              <div className="absolute -top-1 right-4 w-2 h-2 bg-fundtap-primary transform rotate-45"></div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-600 text-sm mb-6">
            Securely connect your accounting software to check eligibility and speed up funding.
          </p>

          {/* Software options */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            {softwareOptions.map((software) => {
              return (
                <button
                  key={software.name}
                  onClick={() => handleSelectSoftware(software.name)}
                  className="w-full flex flex-col items-center gap-3 p-6 rounded-xl border border-gray-200 hover:border-fundtap-primary hover:bg-fundtap-light/20 transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
                >
                  <div className="w-12 h-12 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={software.logo} 
                      alt={`${software.name} logo`}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <span className="font-medium text-sm text-gray-900">{software.name}</span>
                </button>
              );
            })}
          </div>

          {/* I don't use any of these option */}
          <button 
            onClick={handleNoSoftware}
            className="text-gray-600 hover:text-gray-800 text-sm underline font-medium text-center block w-full mb-4 transition-colors duration-200"
          >
            I don't use any of these
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkAccountingSoftwareModal;