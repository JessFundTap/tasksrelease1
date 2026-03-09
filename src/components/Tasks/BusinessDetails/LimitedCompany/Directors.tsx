import React, { useEffect, useRef } from 'react';
import { Plus, Trash2, UserCheck } from 'lucide-react';
import HelpTooltip from '../../../HelpTooltip/HelpTooltip';

export interface Director {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface DirectorsProps {
  directors: Director[];
  readOnly?: boolean;
  onAddDirector: () => void;
  onUpdateDirector: (id: string, field: keyof Director, value: string) => void;
  onRemoveDirector: (id: string) => void;
}

const Directors: React.FC<DirectorsProps> = ({
  directors,
  readOnly = false,
  onAddDirector,
  onUpdateDirector,
  onRemoveDirector
}) => {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(directors.length);

  useEffect(() => {
    if (directors.length > prevCountRef.current && lastItemRef.current) {
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 650);
    }
    prevCountRef.current = directors.length;
  }, [directors.length]);

  return (
    <div>
      {directors.length === 0 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onAddDirector}
            disabled={readOnly}
            className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Director
          </button>
        </div>
      ) : (
        <div className="space-y-2.5">
          {directors.map((director, index) => (
            <div
              key={director.id}
              ref={index === directors.length - 1 ? lastItemRef : null}
              className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Director {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => onRemoveDirector(director.id)}
                  disabled={readOnly}
                  className="text-red-500 hover:text-red-700 p-1 hover:bg-red-50 rounded transition-all duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Legal Name
                  <HelpTooltip content="Enter their legal first and last name as it appears on official documents." />
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={director.firstName}
                    onChange={(e) => onUpdateDirector(director.id, 'firstName', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    value={director.lastName}
                    onChange={(e) => onUpdateDirector(director.id, 'lastName', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Last name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={director.email}
                    onChange={(e) => onUpdateDirector(director.id, 'email', e.target.value)}
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
                    value={director.phone}
                    onChange={(e) => onUpdateDirector(director.id, 'phone', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="Enter mobile number"
                  />
                </div>
              </div>
            </div>
          ))}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={onAddDirector}
              disabled={readOnly}
              className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Director
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Directors;