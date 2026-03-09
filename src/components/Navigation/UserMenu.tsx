import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Settings, Building2, RotateCcw, LogOut, ChevronDown } from 'lucide-react';

interface UserMenuProps {
  onReset: () => void;
}

const UserMenu: React.FC<UserMenuProps> = ({ onReset }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const userName = 'Demo User';

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-gray-50 transition-colors duration-200"
      >
        <span className="text-sm font-medium text-gray-700">
          {userName}
        </span>
        <div className="w-8 h-8 rounded-full bg-gray-700 text-white flex items-center justify-center text-xs font-medium">
          {getInitials(userName)}
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-500 transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{userName}</p>
            <p className="text-xs text-gray-500 mt-0.5">Demo Company Limited</p>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/account');
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <User size={16} className="text-gray-500" />
              Account Settings
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/company-settings');
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <Building2 size={16} className="text-gray-500" />
              Company Settings
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
                navigate('/preferences');
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <Settings size={16} className="text-gray-500" />
              Preferences
            </button>
          </div>

          <div className="border-t border-gray-100 py-2">
            <button
              onClick={() => {
                setIsOpen(false);
                onReset();
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <RotateCcw size={16} className="text-gray-500" />
              Reset Prototype
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 transition-colors duration-150 flex items-center gap-3"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
