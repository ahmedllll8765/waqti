import React, { useState } from 'react';
import { UserPlus, Eye, EyeOff } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

interface RegisterPageProps {
  setActivePage: (page: string) => void;
}

const RegisterPage: React.FC<RegisterPageProps> = ({ setActivePage }) => {
  const { t, isRTL } = useLanguage();
  const { register, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError(''); // Clear error when user starts typing
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return 'Name is required';
    }
    
    if (formData.name.trim().length < 2) {
      return 'Name must be at least 2 characters long';
    }
    
    if (!formData.email.trim()) {
      return 'Email is required';
    }
    
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    
    if (!formData.password) {
      return 'Password is required';
    }
    
    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long';
    }
    
    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match';
    }
    
    if (!formData.phone.trim()) {
      return 'Phone number is required';
    }
    
    // Basic phone validation (you can make this more specific)
    if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone.trim())) {
      return 'Please enter a valid phone number';
    }
    
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      const result = await register(
        formData.name.trim(),
        formData.email.trim(),
        formData.password,
        formData.phone.trim()
      );
      
      if (result.success) {
        setActivePage('dashboard');
      } else {
        setError(result.error || 'Registration failed. Please try again.');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-md border-t-4 border-[#2E86AB]">
        <h2 className={`text-2xl font-bold mb-6 text-[#2E86AB] flex items-center justify-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <UserPlus className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('register.title')}
        </h2>
        
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.name')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] focus:border-transparent"
              placeholder="Enter your full name"
              disabled={isSubmitting || isLoading}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.email')}
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] focus:border-transparent"
              placeholder="Enter your email"
              disabled={isSubmitting || isLoading}
              required
            />
          </div>
          
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.password')}
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] focus:border-transparent"
                placeholder="Enter your password"
                disabled={isSubmitting || isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                disabled={isSubmitting || isLoading}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="mb-4">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] focus:border-transparent"
                placeholder="Confirm your password"
                disabled={isSubmitting || isLoading}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                disabled={isSubmitting || isLoading}
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          
          <div className="mb-6">
            <label className={`block text-gray-700 mb-2 font-medium ${isRTL ? 'text-right' : 'text-left'}`}>
              {t('register.phone')}
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange('phone', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] focus:border-transparent"
              placeholder="Enter your phone number"
              disabled={isSubmitting || isLoading}
              required
            />
          </div>
          
          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting || isLoading}
            disabled={isSubmitting || isLoading}
          >
            {t('register.button')}
          </Button>
        </form>
        
        <p className="text-center mt-6">
          {t('register.login')} {' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-[#2E86AB] font-medium hover:underline"
            disabled={isSubmitting || isLoading}
          >
            {t('register.loginLink')}
          </button>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage