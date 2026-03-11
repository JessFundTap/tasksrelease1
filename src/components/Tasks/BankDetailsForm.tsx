import React, { useState, useEffect } from 'react';
import { Ban as BankIcon, Shield, ChevronRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import MultiFileUploader, { ACCEPT_STATEMENTS, MIME_STATEMENTS, HINT_STATEMENTS } from '../FileUpload/MultiFileUploader';

interface BankAccount {
  id: string;
  name: string;
  number: string;
  integration: string;
}

interface BankDetailsFormProps {
  onValidationChange?: (isValid: boolean) => void;
}

const BankDetailsForm: React.FC<BankDetailsFormProps> = ({ onValidationChange }) => {
  const [selectedBankAccountId, setSelectedBankAccountId] = useState<string | null>(null);
  const [selectedManual, setSelectedManual] = useState(false);

  const [bankName, setBankName] = useState('');
  const [accountHolderName, setAccountHolderName] = useState('');
  const [bankCode, setBankCode] = useState('');
  const [branchCode, setBranchCode] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [suffix, setSuffix] = useState('');
  const [bankStatementFiles, setBankStatementFiles] = useState<File[]>([]);

  const prefilledAccounts: BankAccount[] = [
    {
      id: '1',
      name: 'Main account',
      number: '12-3456-7891011-121',
      integration: 'Xero'
    },
    {
      id: '2',
      name: 'Savings Account',
      number: '12-3456-7891011-122',
      integration: 'Xero'
    },
    {
      id: '3',
      name: 'Business Cheque Account',
      number: '12-3456-7891011-123',
      integration: 'Xero'
    },
    {
      id: '4',
      name: 'Operating Account',
      number: '12-3456-7891011-124',
      integration: 'QuickBooks'
    },
    {
      id: '5',
      name: 'Reserve Account',
      number: '12-3456-7891011-125',
      integration: 'Xero'
    }
  ];

  const isManualComplete = bankName && accountHolderName && bankCode && branchCode && accountNumber && suffix;
  const isValid = selectedBankAccountId || isManualComplete;

  useEffect(() => {
    onValidationChange?.(isValid);
  }, [selectedBankAccountId, bankName, accountHolderName, bankCode, branchCode, accountNumber, suffix, onValidationChange]);

  const handleAccountSelect = (accountId: string) => {
    setSelectedBankAccountId(accountId);
    setSelectedManual(false);
  };

  const handleSelectManual = () => {
    setSelectedManual(true);
    setSelectedBankAccountId(null);
  };

  const handleBackToAccounts = () => {
    setSelectedManual(false);
    setBankName('');
    setAccountHolderName('');
    setBankCode('');
    setBranchCode('');
    setAccountNumber('');
    setSuffix('');
    setBankStatementFiles([]);
  };

  return (
    <div className="relative">
      <div>
        <div className="flex gap-4 mb-5">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
            1
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-lg text-gray-900 font-semibold">Funding Account</p>
            <p className="text-gray-600 text-sm mt-0.5">Select where you'd like to receive funds</p>
          </div>
        </div>

        {!selectedManual ? (
          <div className="space-y-2.5">
            <div className="space-y-2.5 mb-4">
              {prefilledAccounts.map((account) => (
                <button
                  key={account.id}
                  onClick={() => handleAccountSelect(account.id)}
                  className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all duration-200 ${
                    selectedBankAccountId === account.id
                      ? 'border-gray-200 bg-fundtap-light'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-fundtap-light/20'
                  }`}
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      account.integration === 'Xero' ? 'bg-fundtap-light' : 'bg-fundtap-secondary/20'
                    }`}>
                      <span className={`text-xs font-bold ${
                        account.integration === 'Xero' ? 'text-fundtap-secondary' : 'text-fundtap-primary'
                      }`}>
                        {account.integration === 'Xero' ? 'X' : 'QB'}
                      </span>
                    </div>
                    <div className="text-left min-w-0">
                      <div className="font-medium text-gray-900">{account.name}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0 ml-3">
                    <div className="text-right">
                      <div className="text-sm text-gray-500">{account.number}</div>
                    </div>
                    {selectedBankAccountId === account.id && (
                      <CheckCircle2 className="w-5 h-5 text-fundtap-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={handleSelectManual}
              className="text-sm text-fundtap-primary font-medium hover:text-fundtap-primary/80 transition-colors duration-200 mt-6"
            >
              Or Add Bank Account Manually
            </button>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            <button
              type="button"
              onClick={handleBackToAccounts}
              className="flex items-center gap-2 text-fundtap-primary font-medium text-sm hover:text-fundtap-primary/80 transition-colors duration-200 mb-4"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to accounts
            </button>

            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bank Name
                </label>
                <select
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 bg-white"
                >
                  <option value="">Select your bank</option>
                  <option value="anz">ANZ</option>
                  <option value="westpac">Westpac</option>
                  <option value="bnz">BNZ</option>
                  <option value="asb">ASB</option>
                  <option value="kiwibank">Kiwibank</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Account Holder Name
                </label>
                <input
                  type="text"
                  value={accountHolderName}
                  onChange={(e) => setAccountHolderName(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                  placeholder="Enter account holder name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Bank Code
                  </label>
                  <input
                    type="text"
                    value={bankCode}
                    onChange={(e) => setBankCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                    placeholder="12"
                    maxLength={2}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Branch Code
                  </label>
                  <input
                    type="text"
                    value={branchCode}
                    onChange={(e) => setBranchCode(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                    placeholder="3456"
                    maxLength={4}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Account Number
                  </label>
                  <input
                    type="text"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                    placeholder="7891011"
                    maxLength={8}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Suffix
                  </label>
                  <input
                    type="text"
                    value={suffix}
                    onChange={(e) => setSuffix(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200"
                    placeholder="121"
                    maxLength={3}
                  />
                </div>
              </div>
            </form>

            <div className="border-t border-gray-200 pt-6 mt-6">
              <label className="block text-sm font-medium text-gray-900 mb-3">Bank Statement</label>
              <p className="text-sm text-gray-600 mb-4">To verify the bank account</p>
              <MultiFileUploader
                id="bank-statement"
                files={bankStatementFiles}
                onChange={setBankStatementFiles}
                accept={ACCEPT_STATEMENTS}
                mimeTypes={MIME_STATEMENTS}
                label="Upload bank statement"
                hint={HINT_STATEMENTS}
                maxFiles={5}
              />
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-100" />

      <div className="pt-6">
        <div className="flex gap-4 mb-5">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-fundtap-secondary/20 flex items-center justify-center text-xs font-semibold text-fundtap-primary">
            2
          </div>
          <div className="flex-1 pt-0.5">
            <p className="text-lg text-gray-900 font-semibold">Repayment Setup</p>
            <p className="text-gray-600 text-sm mt-0.5">Automatic repayments via direct debit from the account above</p>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-fundtap-secondary to-fundtap-primary rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg">GC</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">GoCardless Direct Debit Setup</h3>
                <p className="text-sm text-gray-600 mt-0.5">Secure payment authorization</p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-lg p-8 bg-gray-50 min-h-[300px] flex flex-col items-center justify-center space-y-4">
              <div className="text-center">
                <div className="w-16 h-16 bg-fundtap-light rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🔐</span>
                </div>
                <p className="font-semibold text-gray-900 mb-2">GoCardless Embedded Form</p>
                <p className="text-sm text-gray-600">Enter your bank details securely</p>
              </div>
              <div className="w-full max-w-md space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Account Holder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-fundtap-secondary focus:border-transparent outline-none"
                    disabled
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Bank Code</label>
                    <input
                      type="text"
                      placeholder="12"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-fundtap-secondary focus:border-transparent outline-none"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">Branch Code</label>
                    <input
                      type="text"
                      placeholder="3456"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-fundtap-secondary focus:border-transparent outline-none"
                      disabled
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">Account Number</label>
                  <input
                    type="text"
                    placeholder="7891011"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-fundtap-secondary focus:border-transparent outline-none"
                    disabled
                  />
                </div>
              </div>
              <button
                type="button"
                className="w-full max-w-md mt-4 px-4 py-2.5 bg-fundtap-secondary text-fundtap-primary font-medium rounded-lg hover:bg-fundtap-secondary/80 transition-colors duration-200 text-sm"
                disabled
              >
                Authorize Direct Debit
              </button>
              <p className="text-xs text-gray-500 text-center">Mock GoCardless embed - authorization disabled for demo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BankDetailsForm;