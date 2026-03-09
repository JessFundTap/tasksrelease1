import React, { useState, useEffect, useMemo } from 'react';
import { FileText, CheckCircle2, X } from 'lucide-react';
import HelpTooltip from '../HelpTooltip/HelpTooltip';
import { useTaskVisibility } from '../../contexts/TaskVisibilityContext';

interface Agreement {
  id: string;
  title: string;
  description: string;
  signed: boolean;
}

interface AgreementsFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

const AgreementsForm: React.FC<AgreementsFormProps> = ({ onValidationChange }) => {
  const { shouldShowTrustTask, getTrustName, shouldShowShareholdingCompanyTask } = useTaskVisibility();

  const allAgreements: Agreement[] = [
    {
      id: 'fundtap-agreement',
      title: 'Fundtap Agreement',
      description: 'Terms and conditions for Fundtap funding services.',
      signed: false
    },
    {
      id: 'trust-guarantee',
      title: 'Trust Guarantee',
      description: 'Guarantee provided by the trust entity for funding arrangements.',
      signed: false
    },
    {
      id: 'corporate-guarantee',
      title: 'Corporate Guarantee',
      description: 'Guarantee from related companies to secure the funding facility.',
      signed: false
    }
  ];

  const agreements = useMemo(() => {
    const showTrust = shouldShowTrustTask();
    const trustName = getTrustName();
    const showCorporateGuarantee = shouldShowShareholdingCompanyTask();

    return allAgreements.filter(agreement => {
      if (agreement.id === 'trust-guarantee') {
        return showTrust;
      }
      if (agreement.id === 'corporate-guarantee') {
        return showCorporateGuarantee;
      }
      return true;
    }).map(agreement => {
      if (agreement.id === 'trust-guarantee' && trustName) {
        return {
          ...agreement,
          title: `Trust Guarantee - ${trustName}`
        };
      }
      return agreement;
    });
  }, [shouldShowTrustTask, getTrustName, shouldShowShareholdingCompanyTask]);

  const [signedAgreements, setSignedAgreements] = useState<Record<string, boolean>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentAgreement, setCurrentAgreement] = useState<Agreement | null>(null);

  useEffect(() => {
    const allSigned = agreements.every(a => signedAgreements[a.id] === true);
    onValidationChange?.(allSigned);
  }, [agreements, signedAgreements, onValidationChange]);

  const handleSignDocument = (agreement: Agreement) => {
    setCurrentAgreement(agreement);
    setIsModalOpen(true);
  };

  const handleConfirmSign = () => {
    if (currentAgreement) {
      setSignedAgreements(prev => ({
        ...prev,
        [currentAgreement.id]: true
      }));
    }
    setIsModalOpen(false);
    setCurrentAgreement(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentAgreement(null);
  };

  const getPlaceholderDocument = (agreementTitle: string) => {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${agreementTitle}</title>
          <style>
            body { 
              font-family: Arial, sans-serif; 
              margin: 40px; 
              line-height: 1.6; 
              color: #333;
            }
            .header { 
              text-align: center; 
              border-bottom: 2px solid #0A2640; 
              padding-bottom: 20px; 
              margin-bottom: 30px; 
            }
            .signature-section { 
              margin-top: 50px; 
              border: 1px solid #ddd; 
              padding: 20px; 
              background-color: #f9f9f9; 
            }
            .signature-box { 
              border: 1px solid #999; 
              height: 60px; 
              margin: 10px 0; 
              background-color: white; 
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>FUNDTAP</h1>
            <h2>${agreementTitle}</h2>
          </div>
          
          <p><strong>Agreement Date:</strong> ${new Date().toLocaleDateString()}</p>
          
          <h3>Terms and Conditions</h3>
          <p>This is a placeholder document for the ${agreementTitle}. The actual document content will be provided by our third-party document provider.</p>
          
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          
          <h3>Obligations</h3>
          <p>The parties agree to the following terms and conditions as outlined in this ${agreementTitle}:</p>
          <ul>
            <li>Compliance with all applicable laws and regulations</li>
            <li>Timely payment of all fees and charges</li>
            <li>Maintenance of accurate records and documentation</li>
            <li>Notification of any material changes to business circumstances</li>
          </ul>
          
          <div class="signature-section">
            <h3>Digital Signature Required</h3>
            <p><strong>Signatory Name:</strong> ________________________</p>
            <p><strong>Title:</strong> ________________________</p>
            <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            
            <p><strong>Digital Signature:</strong></p>
            <div class="signature-box"></div>
            
            <p><em>By clicking "Confirm & Sign" below, you agree to be bound by the terms of this ${agreementTitle}.</em></p>
          </div>
        </body>
      </html>
    `;
  };

  return (
    <div className="relative">
      <div className="space-y-6">
            {/* Agreement Documents Section */}
            <div>
              <div className="flex gap-4 mb-5">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-semibold text-gray-600">
                  1
                </div>
                <div className="flex-1">
                  <p className="text-lg text-gray-900 font-semibold">Review And Sign Documents</p>
                  <p className="text-gray-600 text-sm mt-0.5">Review and digitally sign each document with your witness present</p>
                </div>
              </div>

              {/* Witness Requirements */}
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-5">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-amber-600 text-xs font-bold">!</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-900 mb-1">Witness Requirements</p>
                    <p className="text-sm text-amber-800">
                      Your witness must not be a business associate and must be over 18.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-2.5">
                {agreements.map((agreement) => {
                  const isSigned = signedAgreements[agreement.id] === true;
                  return (
                    <div key={agreement.id} className="bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-300 hover:shadow-sm transition-all duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 bg-fundtap-light/30 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                            {isSigned ? (
                              <CheckCircle2 className="w-5 h-5 text-fundtap-secondary" />
                            ) : (
                              <FileText className="w-5 h-5 text-fundtap-primary" />
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-3 mb-2">
                              <h4 className="font-semibold text-gray-900">{agreement.title}</h4>
                              {isSigned && (
                                <span className="inline-flex items-center px-2 py-1 bg-fundtap-secondary text-white text-xs font-medium rounded-full">
                                  Signed
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600">
                              {agreement.description}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSignDocument(agreement)}
                          className={`px-4 py-2 text-sm font-medium rounded-lg border transition-all duration-200 ${
                            isSigned
                              ? 'text-gray-500 bg-gray-100 border-gray-200 cursor-default'
                              : 'text-fundtap-primary hover:text-fundtap-primary bg-white hover:bg-fundtap-light/30 border-gray-200 hover:border-gray-300'
                          }`}
                          disabled={isSigned}
                        >
                          {isSigned ? 'View Signed' : 'Sign Document'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

      {/* Document Signing Modal */}
      {isModalOpen && currentAgreement && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl h-full max-h-[90vh] flex flex-col">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h3 className="text-xl font-semibold text-gray-900">
                Sign Document: {currentAgreement.title}
              </h3>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600 p-1 hover:bg-gray-100 rounded-lg transition-all duration-200"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Document iFrame */}
            <div className="flex-1 p-6">
              <iframe
                srcDoc={getPlaceholderDocument(currentAgreement.title)}
                className="w-full h-full border border-gray-300 rounded-lg"
                title={`${currentAgreement.title} Document`}
              />
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-4 p-6 border-t border-gray-200">
              <button
                onClick={handleCloseModal}
                className="px-6 py-3 text-gray-700 font-medium border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmSign}
                className="px-6 py-3 bg-fundtap-primary text-white font-medium rounded-xl hover:bg-fundtap-primary/90 hover:scale-[1.02] shadow-md transition-all duration-200 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                Confirm & Sign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgreementsForm;