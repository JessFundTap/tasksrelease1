import React, { createContext, useContext, useState, ReactNode } from 'react';

interface TrustRequirement {
  source: 'shareholder' | 'property' | 'business-type';
  trustName: string;
}

interface CompanyShareholdingRequirement {
  source: 'shareholder' | 'property';
  companyName: string;
}

interface TaskVisibilityContextType {
  trustRequirements: TrustRequirement[];
  addTrustRequirement: (source: 'shareholder' | 'property' | 'business-type', trustName: string) => void;
  removeTrustRequirement: (source: 'shareholder' | 'property' | 'business-type') => void;
  shouldShowTrustTask: () => boolean;
  getTrustName: () => string;
  companyShareholdingRequirements: CompanyShareholdingRequirement[];
  addCompanyShareholdingRequirement: (source: 'shareholder' | 'property', companyName: string) => void;
  removeCompanyShareholdingRequirement: (source: 'shareholder' | 'property') => void;
  shouldShowShareholdingCompanyTask: () => boolean;
  getShareholdingCompanyName: () => string;
  userRole: string;
  setUserRole: (role: string) => void;
  shouldShowVerifyIdentityTask: () => boolean;
  facilitySize: string;
  setFacilitySize: (size: string) => void;
  shouldShowPropertyDetailsTask: () => boolean;
  shouldShowAgreementsTask: () => boolean;
  shouldShowVerifyIdentityWaiting: () => boolean;
  shouldShowAgreementsWaiting: () => boolean;
}

const TaskVisibilityContext = createContext<TaskVisibilityContextType | undefined>(undefined);

export const TaskVisibilityProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [trustRequirements, setTrustRequirements] = useState<TrustRequirement[]>([]);
  const [companyShareholdingRequirements, setCompanyShareholdingRequirements] = useState<CompanyShareholdingRequirement[]>([]);
  const [userRole, setUserRole] = useState<string>('');
  const [facilitySize, setFacilitySize] = useState<string>('');

  const addTrustRequirement = (source: 'shareholder' | 'property' | 'business-type', trustName: string) => {
    setTrustRequirements(prev => {
      const filtered = prev.filter(req => req.source !== source);
      return [...filtered, { source, trustName }];
    });
  };

  const removeTrustRequirement = (source: 'shareholder' | 'property' | 'business-type') => {
    setTrustRequirements(prev => prev.filter(req => req.source !== source));
  };

  const shouldShowTrustTask = () => {
    return trustRequirements.length > 0;
  };

  const getTrustName = () => {
    return trustRequirements.length > 0 ? trustRequirements[0].trustName : '';
  };

  const addCompanyShareholdingRequirement = (source: 'shareholder' | 'property', companyName: string) => {
    setCompanyShareholdingRequirements(prev => {
      const filtered = prev.filter(req => req.source !== source);
      return [...filtered, { source, companyName }];
    });
  };

  const removeCompanyShareholdingRequirement = (source: 'shareholder' | 'property') => {
    setCompanyShareholdingRequirements(prev => prev.filter(req => req.source !== source));
  };

  const shouldShowShareholdingCompanyTask = () => {
    return companyShareholdingRequirements.length > 0;
  };

  const getShareholdingCompanyName = () => {
    return companyShareholdingRequirements.length > 0 ? companyShareholdingRequirements[0].companyName : '';
  };

  const shouldShowVerifyIdentityTask = () => {
    return userRole === 'owner-director';
  };

  const shouldShowPropertyDetailsTask = () => {
    return facilitySize && !facilitySize.startsWith('below-30');
  };

  const shouldShowAgreementsTask = () => {
    return userRole === 'owner-director';
  };

  const shouldShowVerifyIdentityWaiting = () => {
    return userRole === 'employee' || userRole === 'external-advisor';
  };

  const shouldShowAgreementsWaiting = () => {
    return userRole === 'employee' || userRole === 'external-advisor';
  };

  return (
    <TaskVisibilityContext.Provider
      value={{
        trustRequirements,
        addTrustRequirement,
        removeTrustRequirement,
        shouldShowTrustTask,
        getTrustName,
        companyShareholdingRequirements,
        addCompanyShareholdingRequirement,
        removeCompanyShareholdingRequirement,
        shouldShowShareholdingCompanyTask,
        getShareholdingCompanyName,
        userRole,
        setUserRole,
        shouldShowVerifyIdentityTask,
        facilitySize,
        setFacilitySize,
        shouldShowPropertyDetailsTask,
        shouldShowAgreementsTask,
        shouldShowVerifyIdentityWaiting,
        shouldShowAgreementsWaiting
      }}
    >
      {children}
    </TaskVisibilityContext.Provider>
  );
};

export const useTaskVisibility = () => {
  const context = useContext(TaskVisibilityContext);
  if (context === undefined) {
    throw new Error('useTaskVisibility must be used within a TaskVisibilityProvider');
  }
  return context;
};
