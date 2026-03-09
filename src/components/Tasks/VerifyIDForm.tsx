import React, { useState, useEffect } from 'react';
import { CheckCircle2, Loader2, ArrowLeft } from 'lucide-react';

interface VerifyIDFormProps {
  readOnly?: boolean;
  storedPhone?: string;
  onValidationChange?: (isValid: boolean) => void;
}

const VerifyIDForm: React.FC<VerifyIDFormProps> = ({
  readOnly = false,
  storedPhone = '',
  onValidationChange
}) => {
  const [showPhoneInput, setShowPhoneInput] = useState(false);
  const [phone, setPhone] = useState(storedPhone);
  const [linkSent, setLinkSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [countryCode, setCountryCode] = useState('+64');

  useEffect(() => {
    onValidationChange?.(true);
  }, [onValidationChange]);

  const handlePhoneChange = (value: string) => {
    setPhone(value);
  };

  const handleLinkSent = async () => {
    setSending(true);
    await new Promise((res) => setTimeout(res, 1000));
    setSending(false);
    setLinkSent(true);
  };

  const maskedPhone = (num: string) => {
    const digits = num.replace(/\D/g, '');
    if (digits.length < 4) return num;
    const last2 = digits.slice(-2);
    const prefix = num.slice(0, num.indexOf(digits.slice(-4, -2)));
    return `+64 ••• ••• ••${last2}`;
  };


  return (
    <div className="relative">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Verify Your Identity</h3>
          <p className="text-sm text-gray-600">
            Scan the QR code with your mobile device camera to link to APLYiD and complete your ID check. You will need your drivers licence or passport handy for this step.
          </p>
        </div>
        <div className="flex-shrink-0 ml-4 relative group">
          <button type="button" className="w-5 h-5 text-gray-400 hover:text-gray-600 transition-colors duration-200">
            <svg className="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 16v-4m0-4h.01" />
            </svg>
          </button>
          <div className="absolute top-6 right-0 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
            <p className="text-xs font-semibold text-gray-900 mb-2">Why we verify your identity</p>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">
              As part of providing a financial product, Fundtap must verify your identity.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed mb-2">
              We use APLYiD to securely complete this check. You will be asked to verify your identity using your driver licence or passport.
            </p>
            <p className="text-xs text-gray-700 leading-relaxed">
              All personal data is encrypted. APLYiD does not store your information beyond the period set out in its privacy policy.
            </p>
            <div className="absolute -top-1 right-2 w-2 h-2 bg-white border-l border-t border-gray-200 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {!showPhoneInput ? (
        <>
          <div className="flex flex-col items-center justify-center mb-6">
            <div className="bg-white p-4 rounded-lg border border-gray-200 flex flex-col items-center">
              <p className="text-sm font-medium text-gray-700 mb-4">Official APLYiD verification</p>
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=https://example.com/verify"
                alt="Identity Verification QR Code"
                className="w-40 h-40 rounded-lg"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 my-6"></div>

          <div className="flex flex-col items-center gap-3 w-full">
            <button
              type="button"
              onClick={() => setShowPhoneInput(true)}
              className="text-sm text-fundtap-primary font-medium underline-offset-2 hover:underline focus:outline-none transition-colors duration-200"
            >
              Can't scan the QR code? <span className="font-semibold">Send link to mobile</span>
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="space-y-4">
            {!linkSent && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => setShowPhoneInput(false)}
                    className="text-fundtap-primary hover:text-fundtap-primary/80 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">Back to QR code</span>
                </div>

                <div className="space-y-3">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile phone number
                  </label>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="w-full sm:w-auto px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 text-sm bg-white"
                    >
                      <option value="+64">NZ +64</option>
                      <option value="+61">AU +61</option>
                    </select>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => handlePhoneChange(e.target.value)}
                      placeholder="21 123 4567"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-fundtap-primary/20 focus:border-fundtap-primary focus:outline-none transition-colors duration-200 text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleLinkSent}
                      disabled={sending || !phone.trim()}
                      className="w-full sm:w-auto px-6 py-3 bg-fundtap-primary text-white text-sm font-medium rounded-lg hover:bg-fundtap-primary/90 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                      {sending ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Sending...
                        </>
                      ) : (
                        'Send'
                      )}
                    </button>
                  </div>
                </div>
              </>
            )}

            {linkSent && (
              <>
                <div className="flex items-center gap-2 mb-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowPhoneInput(false);
                      setLinkSent(false);
                    }}
                    className="text-fundtap-primary hover:text-fundtap-primary/80 transition-colors duration-200"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>
                  <span className="text-sm text-gray-600">Back to QR code</span>
                </div>

                <div className="p-4 bg-fundtap-light/30 border border-fundtap-secondary/30 rounded-lg flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-fundtap-primary flex-shrink-0" />
                  <span className="text-sm font-medium text-fundtap-primary">Link sent to {maskedPhone(phone)}</span>
                </div>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );

};

export default VerifyIDForm;
