import React, { useEffect, useRef } from 'react';
import { Plus, Trash2, Shield } from 'lucide-react';
import HelpTooltip from '../../../HelpTooltip/HelpTooltip';

export interface Controller {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

interface OtherControllersProps {
  controllers: Controller[];
  businessType: string;
  readOnly?: boolean;
  onAddController: () => void;
  onUpdateController: (id: string, field: keyof Controller, value: string) => void;
  onRemoveController: (id: string) => void;
}

const OtherControllers: React.FC<OtherControllersProps> = ({
  controllers,
  businessType,
  readOnly = false,
  onAddController,
  onUpdateController,
  onRemoveController
}) => {
  const lastItemRef = useRef<HTMLDivElement>(null);
  const prevCountRef = useRef(controllers.length);

  useEffect(() => {
    if (controllers.length > prevCountRef.current && lastItemRef.current) {
      setTimeout(() => {
        lastItemRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 650);
    }
    prevCountRef.current = controllers.length;
  }, [controllers.length]);

  return (
    <div>
      {controllers.length === 0 ? (
        <div className="flex justify-center">
          <button
            type="button"
            onClick={onAddController}
            disabled={readOnly}
            className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
          >
            <Plus className="w-4 h-4" />
            Add Person
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {controllers.map((controller, index) => (
            <div
              key={controller.id}
              ref={index === controllers.length - 1 ? lastItemRef : null}
              className="bg-white border border-gray-200 rounded-lg p-4 space-y-4"
            >
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-gray-800">Person {index + 1}</h4>
                <button
                  type="button"
                  onClick={() => onRemoveController(controller.id)}
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
                    value={controller.firstName}
                    onChange={(e) => onUpdateController(controller.id, 'firstName', e.target.value)}
                    disabled={readOnly}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                    placeholder="First name"
                  />
                  <input
                    type="text"
                    value={controller.lastName}
                    onChange={(e) => onUpdateController(controller.id, 'lastName', e.target.value)}
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
                    value={controller.email}
                    onChange={(e) => onUpdateController(controller.id, 'email', e.target.value)}
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
                    value={controller.phone}
                    onChange={(e) => onUpdateController(controller.id, 'phone', e.target.value)}
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
              onClick={onAddController}
              disabled={readOnly}
              className="flex items-center gap-2 px-4 py-2 text-fundtap-primary hover:text-fundtap-primary font-medium bg-white hover:bg-fundtap-light/30 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200"
            >
              <Plus className="w-4 h-4" />
              Add Person
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OtherControllers;