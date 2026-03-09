import React, { useEffect, useRef } from 'react';
import { Plus, Trash2, Shield } from 'lucide-react';
import HelpTooltip from '../../../HelpTooltip/HelpTooltip';

export interface Trustee {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  type: 'individual' | 'company';
  isProfessional: boolean;
  contactPreference?: 'self' | 'behalf';
  directorName?: string;
  directorFirstName?: string;
  directorLastName?: string;
}

interface TrusteesProps {
  trustees: Trustee[];
  readOnly?: boolean;
  onAddTrustee: () => void;
  onUpdateTrustee: (id: string, field: keyof Trustee, value: string | boolean) => void;
  onRemoveTrustee: (id: string) => void;
}

const Trustees: React.FC<TrusteesProps> = ({
  trustees,
  readOnly = false,
  onAddTrustee,
  onUpdateTrustee,
  onRemoveTrustee
}) => {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(trustees.length);

  useEffect(() => {
    if (trustees.length > prevCountRef.current && lastItemRef.current) {
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 650);
    }
    prevCountRef.current = trustees.length;
  }, [trustees.length]);

  return (
    <div>
      {trustees.length === 0 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onAddTrustee}
            disabled={readOnly}
            className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Trustee
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {trustees.map((trustee, index) => (
            <div
              key={trustee.id}
              ref={index === trustees.length - 1 ? lastItemRef : null}
              className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Trustee {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => onRemoveTrustee(trustee.id)}
                  disabled={readOnly}
                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Trustee Type
                </label>
                <select
                  value={trustee.type}
                  onChange={(e) => onUpdateTrustee(trustee.id, 'type', e.target.value)}
                  disabled={readOnly}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                >
                  <option value="individual">Individual</option>
                  <option value="company">Company</option>
                </select>
              </div>

              {trustee.type === 'individual' ? (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Legal Name
                    <HelpTooltip content="Enter their legal first and last name as it appears on official documents." />
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={trustee.firstName || ''}
                      onChange={(e) => onUpdateTrustee(trustee.id, 'firstName' as any, e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      value={trustee.lastName || ''}
                      onChange={(e) => onUpdateTrustee(trustee.id, 'lastName' as any, e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={trustee.name}
                    onChange={(e) => onUpdateTrustee(trustee.id, 'name', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Enter company name"
                  />
                </div>
              )}

              {trustee.type === 'company' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Director's Legal Name
                    <HelpTooltip content="Enter their legal first and last name as it appears on official documents." />
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={trustee.directorFirstName || ''}
                      onChange={(e) => onUpdateTrustee(trustee.id, 'directorFirstName' as any, e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="First name"
                    />
                    <input
                      type="text"
                      value={trustee.directorLastName || ''}
                      onChange={(e) => onUpdateTrustee(trustee.id, 'directorLastName' as any, e.target.value)}
                      disabled={readOnly}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                      placeholder="Last name"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {trustee.type === 'company' ? 'Director Email Address' : 'Email Address'}
                  </label>
                  <input
                    type="email"
                    value={trustee.email}
                    onChange={(e) => onUpdateTrustee(trustee.id, 'email', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Enter email address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {trustee.type === 'company' ? 'Director Mobile Number' : 'Mobile Number'}
                  </label>
                  <input
                    type="tel"
                    value={trustee.phone}
                    onChange={(e) => onUpdateTrustee(trustee.id, 'phone', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id={`professional-${trustee.id}`}
                  checked={trustee.isProfessional}
                  onChange={(e) => onUpdateTrustee(trustee.id, 'isProfessional', e.target.checked)}
                  disabled={readOnly}
                  className="rounded border-gray-300 text-fundtap-primary focus:ring-2 focus:ring-fundtap-primary/20 transition-all duration-200"
                />
                <label htmlFor={`professional-${trustee.id}`} className="ml-2 text-sm text-gray-700">
                  Professional trustee
                </label>
              </div>

              {trustee.isProfessional && (
                <div className="mt-4 p-4 bg-fundtap-light border border-fundtap-light rounded-lg">
                  <h5 className="font-medium text-fundtap-primary mb-3">Professional Trustee Communication</h5>
                  <div className="space-y-2">
                    <div className="flex items-start">
                      <input
                        type="radio"
                        id={`contact-self-${trustee.id}`}
                        name={`contact-${trustee.id}`}
                        value="self"
                        checked={trustee.contactPreference === 'self'}
                        onChange={(e) => onUpdateTrustee(trustee.id, 'contactPreference', e.target.value)}
                        disabled={readOnly}
                        className="mt-0.5 text-fundtap-primary focus:ring-2 focus:ring-fundtap-primary/20"
                      />
                      <label htmlFor={`contact-self-${trustee.id}`} className="ml-2 text-sm text-gray-700">
                        I'll contact them myself, just send me what they need
                      </label>
                    </div>
                    <div className="flex items-start">
                      <input
                        type="radio"
                        id={`contact-behalf-${trustee.id}`}
                        name={`contact-${trustee.id}`}
                        value="behalf"
                        checked={trustee.contactPreference === 'behalf'}
                        onChange={(e) => onUpdateTrustee(trustee.id, 'contactPreference', e.target.value)}
                        disabled={readOnly}
                        className="mt-0.5 text-fundtap-primary focus:ring-2 focus:ring-fundtap-primary/20"
                      />
                      <label htmlFor={`contact-behalf-${trustee.id}`} className="ml-2 text-sm text-gray-700">
                        Yes, contact them on my behalf
                      </label>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onAddTrustee}
              disabled={readOnly}
              className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Trustee
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Trustees;