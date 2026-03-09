import React, { useEffect, useRef } from 'react';
import { Plus, Trash2, Users } from 'lucide-react';
import HelpTooltip from '../../../HelpTooltip/HelpTooltip';

export interface Shareholder {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  percentage: string;
  type: 'personally-held' | 'trust-held' | 'company-held';
}

interface ShareholdersProps {
  shareholders: Shareholder[];
  readOnly?: boolean;
  onAddShareholder: () => void;
  onUpdateShareholder: (id: string, field: keyof Shareholder, value: string) => void;
  onRemoveShareholder: (id: string) => void;
}

const Shareholders: React.FC<ShareholdersProps> = ({
  shareholders,
  readOnly = false,
  onAddShareholder,
  onUpdateShareholder,
  onRemoveShareholder
}) => {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(shareholders.length);

  useEffect(() => {
    if (shareholders.length > prevCountRef.current && lastItemRef.current) {
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 650);
    }
    prevCountRef.current = shareholders.length;
  }, [shareholders.length]);

  return (
    <div>
      {shareholders.length === 0 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onAddShareholder}
            disabled={readOnly}
            className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Shareholder
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {shareholders.map((shareholder, index) => (
            <div
              key={shareholder.id}
              ref={index === shareholders.length - 1 ? lastItemRef : null}
              className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Shareholder {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => onRemoveShareholder(shareholder.id)}
                  disabled={readOnly}
                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Shareholding Type
                  </label>
                  <select
                    value={shareholder.type}
                    onChange={(e) => onUpdateShareholder(shareholder.id, 'type', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary/30 transition-all duration-200 bg-white"
                  >
                    <option value="personally-held">Personally held</option>
                    <option value="trust-held">Held by a Trust</option>
                    <option value="company-held">Held by a company</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Percentage of Shareholding
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="25"
                      max="100"
                      step="25"
                      value={shareholder.percentage}
                      onChange={(e) => onUpdateShareholder(shareholder.id, 'percentage', e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="25.00"
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none">
                      <span className="text-gray-500 text-sm">%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                {shareholder.type === 'personally-held' ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Legal Name
                      <HelpTooltip content="Enter their legal first and last name as it appears on official documents." />
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        value={shareholder.firstName || ''}
                        onChange={(e) => onUpdateShareholder(shareholder.id, 'firstName' as any, e.target.value)}
                        disabled={readOnly}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                        placeholder="First name"
                      />
                      <input
                        type="text"
                        value={shareholder.lastName || ''}
                        onChange={(e) => onUpdateShareholder(shareholder.id, 'lastName' as any, e.target.value)}
                        disabled={readOnly}
                        className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                        placeholder="Last name"
                      />
                    </div>
                  </>
                ) : (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {shareholder.type === 'trust-held' ? 'Trust Name' : 'Company Name'}
                    </label>
                    <input
                      type="text"
                      value={shareholder.name}
                      onChange={(e) => onUpdateShareholder(shareholder.id, 'name', e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder={shareholder.type === 'trust-held' ? 'Enter trust name' : 'Enter company name'}
                    />
                  </div>
                )}
              </div>

              {shareholder.type === 'personally-held' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={shareholder.email}
                      onChange={(e) => onUpdateShareholder(shareholder.id, 'email', e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="Enter email address"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mobile Number
                    </label>
                    <input
                      type="tel"
                      value={shareholder.phone}
                      onChange={(e) => onUpdateShareholder(shareholder.id, 'phone', e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="Enter mobile number"
                    />
                  </div>
                </div>
              )}

              {shareholder.type === 'company-held' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    NZBN or ABN
                  </label>
                  <input
                    type="text"
                    value={shareholder.email}
                    onChange={(e) => onUpdateShareholder(shareholder.id, 'email', e.target.value)}
                    disabled={readOnly}
                    className="w-full md:w-1/2 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Enter NZBN or ABN"
                  />
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onAddShareholder}
              disabled={readOnly}
              className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Shareholder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shareholders;