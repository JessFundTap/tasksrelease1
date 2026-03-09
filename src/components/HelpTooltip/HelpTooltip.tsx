import React from 'react';
import { HelpCircle } from 'lucide-react';

interface HelpTooltipProps {
  content?: string;
}

const HelpTooltip: React.FC<HelpTooltipProps> = ({ content }) => {
  if (content) {
    return (
      <span className="inline-block ml-1 group relative">
        <HelpCircle className="w-4 h-4 text-gray-400 hover:text-gray-600 transition-colors duration-200 inline-block cursor-help" />
        <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 pointer-events-none">
          <div className="space-y-3">
            <p className="text-xs text-gray-700">{content}</p>

            <div className="border-t border-gray-200 pt-3">
              <h4 className="text-xs font-semibold text-gray-900 mb-2">Need help?</h4>
              <p className="text-xs text-gray-600 mb-2">Our onboarding team is here to assist you</p>

              <div className="space-y-1.5 text-xs">
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <a href="mailto:info@fundtap.co" className="ml-1 text-fundtap-secondary hover:text-fundtap-secondary/80">
                    info@fundtap.co
                  </a>
                </div>

                <div>
                  <span className="font-medium text-gray-700">NZ:</span>
                  <a href="tel:+6408001234567" className="ml-1 text-fundtap-secondary hover:text-fundtap-secondary/80">
                    0800 123 4567
                  </a>
                </div>

                <div>
                  <span className="font-medium text-gray-700">AU:</span>
                  <a href="tel:+611800123456" className="ml-1 text-fundtap-secondary hover:text-fundtap-secondary/80">
                    1800 123 456
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 bg-white border-b border-r border-gray-200 transform rotate-45"></div>
        </div>
      </span>
    );
  }

  return (
    <div className="absolute top-4 right-6 sm:top-6 sm:right-8 group z-50">
      <div className="relative">
        <button className="w-5 h-5 text-fundtap-secondary/60 hover:text-fundtap-secondary transition-colors duration-200">
          <HelpCircle className="w-full h-full" />
        </button>

        <div className="absolute top-6 right-0 w-64 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-900">Need help?</h4>
            <p className="text-xs text-gray-600">Our onboarding team is here to assist you</p>

            <div className="space-y-2 text-xs">
              <div>
                <span className="font-medium text-gray-700">Email:</span>
                <a href="mailto:info@fundtap.co" className="ml-1 text-fundtap-secondary hover:text-fundtap-secondary/80">
                  info@fundtap.co
                </a>
              </div>

              <div>
                <span className="font-medium text-gray-700">NZ Phone:</span>
                <a href="tel:+6408001234567" className="ml-1 text-fundtap-secondary hover:text-fundtap-secondary/80">
                  0800 123 4567
                </a>
              </div>

              <div>
                <span className="font-medium text-gray-700">AU Phone:</span>
                <a href="tel:+611800123456" className="ml-1 text-fundtap-secondary hover:text-fundtap-secondary/80">
                  1800 123 456
                </a>
              </div>
            </div>
          </div>

          <div className="absolute -top-1 right-2 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
        </div>
      </div>
    </div>
  );
};

export default HelpTooltip;