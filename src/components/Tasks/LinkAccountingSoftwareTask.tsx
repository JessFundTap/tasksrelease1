import React from 'react';
import { Link, Shield, Zap, CheckCircle2 } from 'lucide-react';

interface LinkAccountingSoftwareTaskProps {
  readOnly?: boolean;
}

const LinkAccountingSoftwareTask: React.FC<LinkAccountingSoftwareTaskProps> = ({ 
  readOnly = false 
}) => {
  return (
    <div className="relative">
      <div className="space-y-6">
        {/* Benefits Section */}
        <div>
          <p className="text-base font-medium text-gray-900 mb-2">Connect your accounting software</p>
          <p className="text-sm text-gray-600 mb-4">
            Securely connect your accounting software to automatically sync invoices and speed up funding decisions
          </p>

          <div className="bg-fundtap-light/30 border border-fundtap-secondary/30 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-3">Benefits of connecting:</p>
            <div className="space-y-2.5">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-fundtap-secondary flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Automatically sync your invoices</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-fundtap-secondary flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Check eligibility faster</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-fundtap-secondary flex-shrink-0"></div>
                <span className="text-sm text-gray-700">Speed up funding decisions</span>
              </div>
            </div>
          </div>

          {!readOnly && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-amber-600 text-xs font-bold">!</span>
                </div>
                <div>
                  <p className="text-sm font-medium text-amber-900 mb-1">Complete on Invoices Page</p>
                  <p className="text-sm text-amber-800">
                    Please return to the "My Invoices" page to connect your accounting software. The connection modal will appear automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

          {readOnly && (
            <div className="bg-fundtap-secondary/10 border border-fundtap-secondary/20 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-fundtap-secondary" />
                <span className="font-medium text-gray-800">Accounting software connected successfully!</span>
              </div>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="pt-6 border-t border-gray-100">
          <div className="bg-fundtap-light/30 border border-fundtap-secondary/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-fundtap-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Bank-level Security</p>
                <p className="text-sm text-gray-600">
                  We use read-only access with 256-bit encryption. We can see your invoices but never access your bank accounts or make changes to your data.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LinkAccountingSoftwareTask;