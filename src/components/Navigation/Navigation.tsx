import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu, RotateCcw, X } from 'lucide-react';
import { Logo } from '../../icons';
import UserMenu from './UserMenu';
import TasksNotification from './TasksNotification';
import HelpButton from './HelpButton';

interface NavigationProps {
  showCompanySelector?: boolean;
}

const Navigation: React.FC<NavigationProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showResetModal, setShowResetModal] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleReset = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate('/', { replace: true });
    window.location.reload();
  };

  return (
    <>
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-8">
              <button
                onClick={() => navigate('/')}
                className="text-gray-900 hover:opacity-80 transition-opacity duration-200"
              >
                <Logo />
              </button>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button
                className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors duration-200 flex items-center gap-1.5"
                title="Help & Support"
              >
                <HelpButton />
              </button>
              <div className="w-px h-6 bg-gray-200"></div>
              <UserMenu onReset={() => setShowResetModal(true)} />
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>

      {showMobileMenu && (
        <div className="md:hidden fixed inset-0 top-16 bg-white z-40 animate-fadeIn">
          <div className="flex flex-col h-full">
            <nav className="flex-1 overflow-y-auto px-4 py-6">
              <div className="space-y-1">
                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Support
                  </p>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full px-4 py-3 rounded-lg text-left text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Help & Support
                  </button>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <p className="px-4 text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Account
                  </p>
                  <button
                    onClick={() => {
                      navigate('/account');
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Account Settings
                  </button>
                  <button
                    onClick={() => {
                      navigate('/company-settings');
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Company Settings
                  </button>
                  <button
                    onClick={() => {
                      navigate('/preferences');
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Preferences
                  </button>
                </div>

                <div className="pt-4 mt-4 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setShowResetModal(true);
                      setShowMobileMenu(false);
                    }}
                    className="w-full px-4 py-3 rounded-lg text-left text-base font-medium text-gray-700 hover:bg-gray-50 transition-all duration-200"
                  >
                    Reset Prototype
                  </button>
                  <button
                    onClick={() => setShowMobileMenu(false)}
                    className="w-full px-4 py-3 rounded-lg text-left text-base font-medium text-red-600 hover:bg-red-50 transition-all duration-200"
                  >
                    Sign Out
                  </button>
                </div>
              </div>
            </nav>

            <div className="border-t border-gray-200 px-4 py-4 bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gray-700 text-white flex items-center justify-center text-sm font-medium">
                  DU
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Demo User</p>
                  <p className="text-xs text-gray-500">Demo Company Limited</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showResetModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 animate-fadeIn">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center">
                <RotateCcw className="text-red-600" size={24} />
              </div>
              <h2 className="text-xl font-bold text-gray-900">Reset Prototype?</h2>
            </div>

            <p className="text-gray-600 mb-6">
              This will clear all your progress and return the prototype to its initial state.
              You'll need to start the onboarding process from the beginning.
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowResetModal(false)}
                className="flex-1 px-4 py-2.5 rounded-full border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="flex-1 px-4 py-2.5 rounded-full bg-red-600 text-white font-medium hover:bg-red-700 transition-colors duration-200"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navigation;
