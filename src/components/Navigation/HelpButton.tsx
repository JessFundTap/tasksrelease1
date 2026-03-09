import React, { useState, useRef, useEffect } from 'react';
import { HelpCircle, BookOpen, MessageCircle, Mail, ExternalLink } from 'lucide-react';

const HelpButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-50 transition-colors duration-200"
        title="Help & Support"
      >
        <HelpCircle size={20} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50 animate-fadeIn">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">Help & Support</p>
          </div>

          <div className="py-2">
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <BookOpen size={16} className="text-gray-500" />
              <span>Documentation</span>
              <ExternalLink size={14} className="ml-auto text-gray-400" />
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <MessageCircle size={16} className="text-gray-500" />
              <span>Live Chat</span>
            </button>

            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150 flex items-center gap-3"
            >
              <Mail size={16} className="text-gray-500" />
              <span>Contact Support</span>
            </button>
          </div>

          <div className="px-4 py-3 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Need help? Our team is available 24/7
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default HelpButton;
