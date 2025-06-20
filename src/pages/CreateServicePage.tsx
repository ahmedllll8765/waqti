import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Plus, Upload, X, Camera } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface CreateServicePageProps {
  setActivePage: (page: string) => void;
}

const serviceCategories = [
  'Design',
  'Teaching',
  'Programming',
  'Translation',
  'Writing',
  'Music',
  'Cooking',
  'Photography',
  'Consulting',
  'Marketing',
  'Video Editing',
  'Data Entry'
];

const exchangeTypes = [
  { value: 'time', label: 'Time Exchange Only' },
  { value: 'money', label: 'Money Payment Only' },
  { value: 'hybrid', label: 'Both Time & Money' }
];

const CreateServicePage: React.FC<CreateServicePageProps> = ({ setActivePage }) => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const [images, setImages] = useState<File[]>([]);
  const [videos, setVideos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const validationSchema = Yup.object({
    title: Yup.string()
      .min(10, 'Title must be at least 10 characters')
      .max(100, 'Title must be less than 100 characters')
      .required('Title is required'),
    description: Yup.string()
      .min(50, 'Description must be at least 50 characters')
      .max(1000, 'Description must be less than 1000 characters')
      .required('Description is required'),
    category: Yup.string().required('Category is required'),
    exchangeType: Yup.string().required('Exchange type is required'),
    hourlyRate: Yup.number()
      .min(1, 'Hourly rate must be at least 1 hour')
      .max(10, 'Hourly rate cannot exceed 10 hours')
      .required('Hourly rate is required'),
    location: Yup.string().required('Location is required'),
    duration: Yup.number()
      .min(1, 'Duration must be at least 1 hour')
      .required('Duration is required'),
    keywords: Yup.string()
      .min(5, 'Keywords must be at least 5 characters')
      .required('Keywords are required'),
    moneyPrice: Yup.number().when('exchangeType', {
      is: (val: string) => val === 'money' || val === 'hybrid',
      then: (schema) => schema.min(1, 'Price must be greater than 0').required('Price is required'),
      otherwise: (schema) => schema.notRequired()
    }),
    suggestedExchange: Yup.string().when('exchangeType', {
      is: (val: string) => val === 'time' || val === 'hybrid',
      then: (schema) => schema.min(10, 'Suggested exchange must be at least 10 characters').required('Suggested exchange is required'),
      otherwise: (schema) => schema.notRequired()
    })
  });

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      category: '',
      exchangeType: 'time',
      hourlyRate: 1,
      location: '',
      duration: 1,
      keywords: '',
      moneyPrice: 0,
      suggestedExchange: ''
    },
    validationSchema,
    onSubmit: async (values) => {
      if (!user) {
        setActivePage('login');
        return;
      }

      setIsSubmitting(true);
      setError('');

      try {
        const formData = new FormData();
        Object.keys(values).forEach(key => {
          formData.append(key, values[key as keyof typeof values].toString());
        });

        images.forEach(file => formData.append('images', file));
        videos.forEach(file => formData.append('videos', file));

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        setActivePage('dashboard');
      } catch (err) {
        setError('Failed to create service. Please try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  });

  const onImageDrop = (acceptedFiles: File[]) => {
    setImages(prev => [...prev, ...acceptedFiles.slice(0, 5 - prev.length)]);
  };

  const onVideoDrop = (acceptedFiles: File[]) => {
    setVideos(prev => [...prev, ...acceptedFiles.slice(0, 2 - prev.length)]);
  };

  const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
    onDrop: onImageDrop,
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
    maxFiles: 5
  });

  const { getRootProps: getVideoRootProps, getInputProps: getVideoInputProps } = useDropzone({
    onDrop: onVideoDrop,
    accept: { 'video/*': ['.mp4', '.mov', '.avi'] },
    maxFiles: 2
  });

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeVideo = (index: number) => {
    setVideos(prev => prev.filter((_, i) => i !== index));
  };

  if (!user) {
    setActivePage('login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#2E86AB] mb-2">Create New Service</h1>
          <p className="text-gray-600">Share your skills and start earning time credits</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={formik.handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#2E86AB]">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Service Title</label>
                <input
                  type="text"
                  {...formik.getFieldProps('title')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  placeholder="e.g., Professional Web Development Services"
                />
                {formik.touched.title && formik.errors.title && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.title}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Category</label>
                <select
                  {...formik.getFieldProps('category')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                >
                  <option value="">Select a category</option>
                  {serviceCategories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                {formik.touched.category && formik.errors.category && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.category}</div>
                )}
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">Location</label>
                <input
                  type="text"
                  {...formik.getFieldProps('location')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  placeholder="e.g., Dubai, UAE"
                />
                {formik.touched.location && formik.errors.location && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.location}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Description</label>
                <textarea
                  {...formik.getFieldProps('description')}
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  placeholder="Describe your service in detail..."
                />
                {formik.touched.description && formik.errors.description && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.description}</div>
                )}
              </div>

              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-2">Keywords (for search)</label>
                <input
                  type="text"
                  {...formik.getFieldProps('keywords')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  placeholder="e.g., web development, react, javascript, frontend"
                />
                {formik.touched.keywords && formik.errors.keywords && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.keywords}</div>
                )}
              </div>
            </div>
          </div>

          {/* Exchange Type & Pricing */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#2E86AB]">Exchange Type & Pricing</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">Exchange Type</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {exchangeTypes.map(type => (
                    <label key={type.value} className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-[#2E86AB]">
                      <input
                        type="radio"
                        name="exchangeType"
                        value={type.value}
                        checked={formik.values.exchangeType === type.value}
                        onChange={formik.handleChange}
                        className="mr-3"
                      />
                      <span>{type.label}</span>
                    </label>
                  ))}
                </div>
                {formik.touched.exchangeType && formik.errors.exchangeType && (
                  <div className="text-red-600 text-sm mt-1">{formik.errors.exchangeType}</div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Time Rate (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    {...formik.getFieldProps('hourlyRate')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  />
                  {formik.touched.hourlyRate && formik.errors.hourlyRate && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.hourlyRate}</div>
                  )}
                </div>

                <div>
                  <label className="block text-gray-700 font-medium mb-2">Service Duration (Hours)</label>
                  <input
                    type="number"
                    min="1"
                    {...formik.getFieldProps('duration')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  />
                  {formik.touched.duration && formik.errors.duration && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.duration}</div>
                  )}
                </div>
              </div>

              {(formik.values.exchangeType === 'money' || formik.values.exchangeType === 'hybrid') && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Money Price (USD)</label>
                  <input
                    type="number"
                    min="1"
                    {...formik.getFieldProps('moneyPrice')}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                    placeholder="Enter price in USD"
                  />
                  {formik.touched.moneyPrice && formik.errors.moneyPrice && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.moneyPrice}</div>
                  )}
                </div>
              )}

              {(formik.values.exchangeType === 'time' || formik.values.exchangeType === 'hybrid') && (
                <div>
                  <label className="block text-gray-700 font-medium mb-2">Suggested Services for Exchange</label>
                  <textarea
                    {...formik.getFieldProps('suggestedExchange')}
                    rows={3}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                    placeholder="e.g., Graphic design, content writing, social media management..."
                  />
                  {formik.touched.suggestedExchange && formik.errors.suggestedExchange && (
                    <div className="text-red-600 text-sm mt-1">{formik.errors.suggestedExchange}</div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Media Upload */}
          <div className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4 text-[#2E86AB]">Media & Portfolio</h2>
            
            <div className="space-y-6">
              {/* Images */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Images (Max 5)</label>
                <div
                  {...getImageRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#2E86AB]"
                >
                  <input {...getImageInputProps()} />
                  <Upload className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-gray-600">Drop images here or click to upload</p>
                  <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB each</p>
                </div>
                
                {images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                    {images.map((file, index) => (
                      <div key={index} className="relative">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-24 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(index)}
                          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Videos */}
              <div>
                <label className="block text-gray-700 font-medium mb-2">Videos (Max 2)</label>
                <div
                  {...getVideoRootProps()}
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#2E86AB]"
                >
                  <input {...getVideoInputProps()} />
                  <Camera className="mx-auto mb-2 text-gray-400" size={24} />
                  <p className="text-gray-600">Drop videos here or click to upload</p>
                  <p className="text-sm text-gray-500">MP4, MOV, AVI up to 50MB each</p>
                </div>
                
                {videos.length > 0 && (
                  <div className="space-y-2 mt-4">
                    {videos.map((file, index) => (
                      <div key={index} className="flex items-center justify-between bg-white p-3 rounded-lg">
                        <span className="text-sm truncate">{file.name}</span>
                        <button
                          type="button"
                          onClick={() => removeVideo(index)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setActivePage('dashboard')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              isLoading={isSubmitting}
              leftIcon={<Plus size={18} />}
            >
              Create Service
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default CreateServicePage;