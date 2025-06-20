import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { UserPlus, Upload, Check } from 'lucide-react';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface ProviderRegistrationPageProps {
  setActivePage: (page: string) => void;
}

const serviceCategories = [
  'teaching',
  'design',
  'programming',
  'translation',
  'writing',
  'consulting',
  'coaching',
  'other'
];

const ProviderRegistrationPage: React.FC<ProviderRegistrationPageProps> = ({ setActivePage }) => {
  const { t, isRTL } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [certificates, setCertificates] = useState<File[]>([]);

  const validationSchema = Yup.object({
    fullName: Yup.string()
      .min(3, 'Name must be at least 3 characters')
      .max(50, 'Name must be less than 50 characters')
      .required('Name is required'),
    email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    phone: Yup.string()
      .matches(/^\+971[0-9]{9}$/, 'Phone number must start with +971 followed by 9 digits')
      .required('Phone number is required'),
    password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
    serviceType: Yup.string()
      .required('Service type is required'),
    experience: Yup.string()
      .min(50, 'Experience description must be at least 50 words')
      .max(300, 'Experience description must be less than 300 words')
      .required('Experience description is required'),
    termsAccepted: Yup.boolean()
      .oneOf([true], 'You must accept the terms and conditions')
  });

  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      phone: '+971',
      password: '',
      serviceType: '',
      experience: '',
      termsAccepted: false
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      setError('');

      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key as keyof typeof values]);
        });

        certificates.forEach(file => {
          formData.append('certificates', file);
        });

        const response = await fetch('/api/auth/signup/provider', {
          method: 'POST',
          body: formData
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.message || 'Registration failed');
        }

        // Registration successful
        setActivePage('verification');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => {
        const validTypes = ['application/pdf', 'image/png', 'image/jpeg'];
        return validTypes.includes(file.type);
      });
      setCertificates(prev => [...prev, ...validFiles]);
    }
  };

  const removeCertificate = (index: number) => {
    setCertificates(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8"
      >
        <div className={`flex items-center justify-center mb-8 ${isRTL ? 'flex-row-reverse' : ''}`}>
          <UserPlus className={`${isRTL ? 'ml-3' : 'mr-3'} text-[#2E86AB]`} size={32} />
          <h1 className="text-3xl font-bold text-[#2E86AB]">Service Provider Registration</h1>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Full Name
            </label>
            <input
              type="text"
              {...formik.getFieldProps('fullName')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            />
            {formik.touched.fullName && formik.errors.fullName && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.fullName}</div>
            )}
          </div>

          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Email
            </label>
            <input
              type="email"
              {...formik.getFieldProps('email')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            />
            {formik.touched.email && formik.errors.email && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
            )}
          </div>

          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Phone Number
            </label>
            <PhoneInput
              international={false}
              defaultCountry="AE"
              value={formik.values.phone}
              onChange={(value) => formik.setFieldValue('phone', value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            />
            {formik.touched.phone && formik.errors.phone && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.phone}</div>
            )}
          </div>

          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Password
            </label>
            <input
              type="password"
              {...formik.getFieldProps('password')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            />
            {formik.touched.password && formik.errors.password && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.password}</div>
            )}
          </div>

          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Service Type
            </label>
            <select
              {...formik.getFieldProps('serviceType')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            >
              <option value="">Select a service type</option>
              {serviceCategories.map(category => (
                <option key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </option>
              ))}
            </select>
            {formik.touched.serviceType && formik.errors.serviceType && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.serviceType}</div>
            )}
          </div>

          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Experience Description
            </label>
            <textarea
              {...formik.getFieldProps('experience')}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
            />
            {formik.touched.experience && formik.errors.experience && (
              <div className="text-red-600 text-sm mt-1">{formik.errors.experience}</div>
            )}
          </div>

          <div>
            <label className={`block text-gray-700 font-medium mb-2 ${isRTL ? 'text-right' : ''}`}>
              Certificates (Optional)
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
              <input
                type="file"
                onChange={handleFileChange}
                multiple
                accept=".pdf,.png,.jpg,.jpeg"
                className="hidden"
                id="certificates"
              />
              <label
                htmlFor="certificates"
                className="flex flex-col items-center justify-center cursor-pointer"
              >
                <Upload className="text-gray-400 mb-2" size={24} />
                <span className="text-gray-600">Click to upload certificates</span>
                <span className="text-sm text-gray-500">(PDF, PNG, JPG)</span>
              </label>
            </div>
            {certificates.length > 0 && (
              <div className="mt-4 space-y-2">
                {certificates.map((file, index) => (
                  <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                    <span className="text-sm truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeCertificate(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              {...formik.getFieldProps('termsAccepted')}
              className="mt-1"
            />
            <label className={`${isRTL ? 'mr-2' : 'ml-2'} text-gray-700`}>
              I agree to the{' '}
              <button
                type="button"
                onClick={() => setActivePage('terms')}
                className="text-[#2E86AB] hover:underline"
              >
                terms and conditions
              </button>
            </label>
          </div>
          {formik.touched.termsAccepted && formik.errors.termsAccepted && (
            <div className="text-red-600 text-sm">{formik.errors.termsAccepted}</div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full"
            isLoading={isSubmitting}
            leftIcon={<Check size={18} />}
          >
            Register as Service Provider
          </Button>
        </form>

        <p className="text-center mt-6">
          Already have an account?{' '}
          <button
            onClick={() => setActivePage('login')}
            className="text-[#2E86AB] hover:underline"
          >
            Login
          </button>
        </p>
      </motion.div>
    </div>
  );
};

export default ProviderRegistrationPage;