import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Webcam from 'react-webcam';
import { motion } from 'framer-motion';
import { Upload, Camera, Trash2, CheckCircle, Shield, Link } from 'lucide-react';
import Button from '../components/Button';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

interface ExpertiseVerificationPageProps {
  setActivePage: (page: string) => void;
}

const ExpertiseVerificationPage: React.FC<ExpertiseVerificationPageProps> = ({ setActivePage }) => {
  const { isRTL } = useLanguage();
  const { user } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Identity verification
  const [identityDoc, setIdentityDoc] = useState<File | null>(null);
  const [selfieMode, setSelfieMode] = useState(false);
  const [selfieImage, setSelfieImage] = useState<string | null>(null);
  
  // Professional verification
  const [resume, setResume] = useState<File | null>(null);
  const [certificates, setCertificates] = useState<File[]>([]);
  const [portfolioLink, setPortfolioLink] = useState('');
  const [linkedinLink, setLinkedinLink] = useState('');
  const [githubLink, setGithubLink] = useState('');
  const [behanceLink, setBehanceLink] = useState('');
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (currentStep === 1) {
      setIdentityDoc(acceptedFiles[0]);
    } else if (currentStep === 2) {
      if (acceptedFiles[0].type === 'application/pdf') {
        setResume(acceptedFiles[0]);
      } else {
        setCertificates(prev => [...prev, ...acceptedFiles]);
      }
    }
  }, [currentStep]);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: currentStep === 1 
      ? { 'image/*': ['.jpeg', '.jpg', '.png'] }
      : { 'application/pdf': ['.pdf'], 'image/*': ['.jpeg', '.jpg', '.png'] }
  });

  const webcamRef = React.useRef<Webcam>(null);
  const capture = React.useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setSelfieImage(imageSrc);
      setSelfieMode(false);
    }
  }, [webcamRef]);

  const handleSubmit = async () => {
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      if (identityDoc) formData.append('identityDocument', identityDoc);
      if (selfieImage) formData.append('selfieWithId', selfieImage);
      if (resume) formData.append('resume', resume);
      certificates.forEach(cert => formData.append('certificates', cert));
      
      formData.append('portfolioLink', portfolioLink);
      formData.append('linkedinLink', linkedinLink);
      formData.append('githubLink', githubLink);
      formData.append('behanceLink', behanceLink);
      formData.append('yearsOfExperience', yearsOfExperience.toString());

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      if (currentStep === 1) {
        setCurrentStep(2);
      } else {
        setActivePage('dashboard');
      }
    } catch (err) {
      setError('Verification submission failed. Please try again.');
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
        className="max-w-2xl mx-auto bg-white rounded-xl shadow-md p-8"
      >
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-[#2E86AB] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#2E86AB] mb-2">
            {currentStep === 1 ? 'Identity Verification' : 'Professional Verification'}
          </h2>
          <p className="text-gray-600">
            {currentStep === 1 
              ? 'Please provide your identity documents and a selfie for verification'
              : 'Upload your professional credentials and portfolio'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {currentStep === 1 ? (
          <>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Emirates ID or Passport</h3>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#2E86AB]"
              >
                <input {...getInputProps()} />
                {identityDoc ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>{identityDoc.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIdentityDoc(null);
                      }}
                      className="ml-2 text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-2" />
                    <p>Drop your ID here or click to upload</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Selfie with ID</h3>
              {selfieMode ? (
                <div className="relative">
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full rounded-lg"
                  />
                  <Button
                    variant="primary"
                    className="mt-4"
                    onClick={capture}
                  >
                    Take Photo
                  </Button>
                </div>
              ) : selfieImage ? (
                <div className="relative">
                  <img
                    src={selfieImage}
                    alt="Selfie with ID"
                    className="w-full rounded-lg"
                  />
                  <Button
                    variant="secondary"
                    className="mt-4"
                    onClick={() => setSelfieImage(null)}
                  >
                    Retake Photo
                  </Button>
                </div>
              ) : (
                <Button
                  variant="secondary"
                  leftIcon={<Camera />}
                  onClick={() => setSelfieMode(true)}
                >
                  Take Selfie
                </Button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="mb-6">
              <h3 className="font-semibold mb-2">Resume/CV</h3>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#2E86AB]"
              >
                <input {...getInputProps()} />
                {resume ? (
                  <div className="flex items-center justify-center">
                    <CheckCircle className="text-green-500 mr-2" />
                    <span>{resume.name}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setResume(null);
                      }}
                      className="ml-2 text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <Upload className="mx-auto mb-2" />
                    <p>Upload your CV (PDF format)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Certificates</h3>
              <div
                {...getRootProps()}
                className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-[#2E86AB]"
              >
                <input {...getInputProps()} />
                <div>
                  <Upload className="mx-auto mb-2" />
                  <p>Upload certificates (PDF or images)</p>
                </div>
              </div>
              {certificates.length > 0 && (
                <div className="mt-4 space-y-2">
                  {certificates.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                      <span>{cert.name}</span>
                      <button
                        onClick={() => setCertificates(prev => prev.filter((_, i) => i !== index))}
                        className="text-red-500"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Professional Links</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Portfolio URL
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <Link size={18} />
                    </span>
                    <input
                      type="url"
                      value={portfolioLink}
                      onChange={(e) => setPortfolioLink(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-[#2E86AB] focus:border-[#2E86AB]"
                      placeholder="https://your-portfolio.com"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    LinkedIn Profile
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <i className="fab fa-linkedin"></i>
                    </span>
                    <input
                      type="url"
                      value={linkedinLink}
                      onChange={(e) => setLinkedinLink(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-[#2E86AB] focus:border-[#2E86AB]"
                      placeholder="https://linkedin.com/in/your-profile"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    GitHub Profile
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <i className="fab fa-github"></i>
                    </span>
                    <input
                      type="url"
                      value={githubLink}
                      onChange={(e) => setGithubLink(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-[#2E86AB] focus:border-[#2E86AB]"
                      placeholder="https://github.com/your-username"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Behance Profile
                  </label>
                  <div className="flex">
                    <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500">
                      <i className="fab fa-behance"></i>
                    </span>
                    <input
                      type="url"
                      value={behanceLink}
                      onChange={(e) => setBehanceLink(e.target.value)}
                      className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md border border-gray-300 focus:ring-[#2E86AB] focus:border-[#2E86AB]"
                      placeholder="https://behance.net/your-profile"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Years of Experience</h3>
              <input
                type="number"
                min="0"
                value={yearsOfExperience}
                onChange={(e) => setYearsOfExperience(parseInt(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-[#2E86AB] focus:border-[#2E86AB]"
              />
            </div>
          </>
        )}

        <div className="flex justify-between mt-8">
          <Button
            variant="secondary"
            onClick={() => setActivePage('dashboard')}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleSubmit}
            isLoading={isLoading}
            disabled={currentStep === 1 ? !identityDoc || !selfieImage : !resume}
          >
            {currentStep === 1 ? 'Next Step' : 'Submit Verification'}
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ExpertiseVerificationPage;