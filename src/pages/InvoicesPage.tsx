import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ListChecks, ChevronRight } from 'lucide-react';
import Navigation from '../components/Navigation/Navigation';
import InvoicesSection from '../components/InvoicesSection/InvoicesSection';
import LinkAccountingSoftwareModal from '../components/Modals/LinkAccountingSoftwareModal';

enum BannerState {
  ONBOARDING = 'onboarding',
  REVIEWING = 'reviewing'
}

const bannerContent = {
  [BannerState.ONBOARDING]: {
    header: 'Finalise Your Set Up',
    body: 'Complete these steps to keep things moving. We\'ll reach out if we need anything else.',
    buttonText: 'Start',
    showBadge: true,
    isClickable: true,
    bgColor: 'bg-fundtap-secondary',
    textColor: 'text-fundtap-primary'
  },
  [BannerState.REVIEWING]: {
    header: 'We\'re Reviewing Your Details',
    body: 'Submit an invoice while we review your details. We’ll be in touch within 24 hours if we need anything else to finalise your account.',
    buttonText: 'Under Review',
    showBadge: false,
    isClickable: false,
    bgColor: 'bg-fundtap-primary',
    textColor: 'text-white'
  }
};

const InvoicesPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentBannerState, setCurrentBannerState] = useState<BannerState>(BannerState.ONBOARDING);
  const [showAccountingSoftwareModal, setShowAccountingSoftwareModal] = useState(false);
  const [accountingSoftwareLinked, setAccountingSoftwareLinked] = useState(false);

  useEffect(() => {
    // Check if we're coming from completed tasks via navigation state
    if (location.state && location.state.onboardingComplete) {
      setCurrentBannerState(BannerState.REVIEWING);
    } else {
      // Always start in onboarding state (resets on page refresh)
      setCurrentBannerState(BannerState.ONBOARDING);
    }
  }, [location.state]);

  useEffect(() => {
    // Check if accounting software has been linked
    const isLinked = localStorage.getItem('accountingSoftwareLinked') === 'true';
    setAccountingSoftwareLinked(isLinked);
    
    // Show modal if not linked
    if (!isLinked) {
      setShowAccountingSoftwareModal(true);
    }
  }, []);

  const handleSoftwareSelected = (software: string) => {
    console.log('Selected software:', software);
    setAccountingSoftwareLinked(true);
    localStorage.setItem('accountingSoftwareLinked', 'true');
    setShowAccountingSoftwareModal(false);
  };

  const handleModalDismissed = () => {
    setShowAccountingSoftwareModal(false);
  };

  const handleBannerClick = () => {
    if (bannerContent[currentBannerState].isClickable) {
      navigate('/tasks');
    }
  };

  const content = bannerContent[currentBannerState];
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Navigation />

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className={`${content.bgColor} rounded-lg shadow-lg mb-6 overflow-hidden ${content.textColor}`}>
          <div onClick={handleBannerClick} 
            className={`flex items-start gap-3 p-4 transition-all duration-300 sm:items-center sm:p-6 ${
              content.isClickable 
                ? 'hover:bg-white/5 cursor-pointer' 
                : 'cursor-default'
            }`}
          >
            <div className="flex-shrink-0 mt-1 sm:mt-0">
              <ListChecks className={`${content.textColor} w-5 h-5 sm:w-6 sm:h-6`} />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex flex-col sm:flex-row sm:items-center sm:gap-3">
                <h2 className="text-lg font-semibold">{content.header}</h2>
                {content.showBadge && (
                  <span className="inline-flex items-center px-2 py-0.5 mt-1 sm:mt-0 bg-fundtap-primary text-white text-xs font-medium rounded-full w-fit">
                    Required Now
                  </span>
                )}
              </div>
              <p className={`text-sm ${content.textColor}/90 mt-1`}>
                {content.body}
              </p>
            </div>
            <div className="flex-shrink-0 self-center">
              <div className="flex items-center">
                {content.isClickable && (
                  <div className="rounded-lg bg-white/10 p-1 sm:hidden">
                    <ChevronRight size={16} className={content.textColor} />
                  </div>
                )}
                <button 
                  className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    content.isClickable
                      ? currentBannerState === BannerState.ONBOARDING 
                        ? 'bg-fundtap-primary text-white hover:bg-fundtap-primary/90 transform hover:scale-105 hover:shadow-xl'
                        : 'bg-white text-fundtap-primary hover:bg-white/90 transform hover:scale-105 hover:shadow-xl'
                      : 'bg-gray-400 text-white cursor-not-allowed'
                  }`}
                  disabled={!content.isClickable}
                >
                  {content.buttonText}
                  {content.isClickable && <ChevronRight size={18} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        <InvoicesSection />
      </main>

      {/* Accounting Software Modal */}
      <LinkAccountingSoftwareModal
        isOpen={showAccountingSoftwareModal}
        onSoftwareSelected={handleSoftwareSelected}
        onModalDismissed={handleModalDismissed}
      />
    </div>
  );
};

export default InvoicesPage;