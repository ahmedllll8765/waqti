import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { motion } from 'framer-motion';
import { Shield, CheckCircle } from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';

interface PhoneVerificationPageProps {
  phone: string;
  onVerificationComplete: () => void;
  setActivePage: (page: string) => void;
}

const PhoneVerificationPage: React.FC<PhoneVerificationPageProps> = ({
  phone,
  onVerificationComplete,
  setActivePage
}) => {
  const { isRTL } = useLanguage();
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      if (otp === '123456') { // For demo purposes
        setIsVerified(true);
        setTimeout(() => {
          onVerificationComplete();
        }, 1000);
      } else {
        setError('Invalid verification code');
      }
    } catch (err) {
      setError('Verification failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    setError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      alert('New code sent!');
    } catch (err) {
      setError('Failed to send code. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md mx-auto bg-white rounded-xl shadow-md p-8"
      >
        <div className="text-center mb-8">
          {isVerified ? (
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          ) : (
            <Shield className="w-16 h-16 text-[#2E86AB] mx-auto mb-4" />
          )}
          <h2 className="text-2xl font-bold text-[#2E86AB] mb-2">
            {isVerified ? 'Phone Verified!' : 'Verify Your Phone'}
          </h2>
          <p className="text-gray-600">
            {isVerified
              ? 'Your phone number has been successfully verified.'
              : `We've sent a verification code to ${phone}`}
          </p>
        </div>

        {!isVerified && (
          <>
            <div className="mb-8">
              <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderInput={(props) => (
                  <input
                    {...props}
                    className="w-12 h-12 text-center border border-gray-300 rounded-lg mx-1 focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  />
                )}
                containerStyle={`flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-center`}
              />
              {error && (
                <p className="text-red-600 text-sm text-center mt-2">{error}</p>
              )}
            </div>

            <div className="space-y-4">
              <Button
                variant="primary"
                className="w-full"
                onClick={handleVerify}
                isLoading={isLoading}
              >
                Verify Code
              </Button>

              <div className="text-center">
                <button
                  onClick={handleResendCode}
                  className="text-[#2E86AB] hover:underline text-sm"
                  disabled={isLoading}
                >
                  Didn't receive the code? Resend
                </button>
              </div>
            </div>
          </>
        )}

        <div className="mt-6 text-center">
          <button
            onClick={() => setActivePage('login')}
            className="text-gray-600 hover:text-gray-800 text-sm"
          >
            Back to Login
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default PhoneVerificationPage;