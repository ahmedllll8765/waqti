import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Shield, Eye, Lock, Database, UserCheck, Mail } from 'lucide-react';

const PrivacyPage: React.FC = () => {
  const { isRTL } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8">
        <div className="text-center mb-8">
          <Shield className="w-16 h-16 text-[#2E86AB] mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-[#2E86AB] mb-2">Privacy Policy</h1>
          <p className="text-gray-600">Last updated: January 2024</p>
        </div>
        
        <div className="space-y-8">
          <section>
            <div className="flex items-center mb-4">
              <Eye className="w-6 h-6 text-[#F18F01] mr-3" />
              <h2 className="text-xl font-bold text-[#2E86AB]">Information We Collect</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold mb-3">Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Name, email address, and phone number</li>
                <li>Profile information and service descriptions</li>
                <li>Transaction history and time credit balance</li>
                <li>Communication records within the platform</li>
              </ul>
              
              <h3 className="font-semibold mb-3 mt-6">Technical Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Device information and browser type</li>
                <li>IP address and location data</li>
                <li>Usage patterns and platform interactions</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Database className="w-6 h-6 text-[#F18F01] mr-3" />
              <h2 className="text-xl font-bold text-[#2E86AB]">How We Use Your Information</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Provide and maintain the Waqti platform services</li>
                <li>Process service exchanges and manage time credits</li>
                <li>Verify user identity and prevent fraud</li>
                <li>Send important notifications about your account</li>
                <li>Improve our services and user experience</li>
                <li>Comply with legal obligations and resolve disputes</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Lock className="w-6 h-6 text-[#F18F01] mr-3" />
              <h2 className="text-xl font-bold text-[#2E86AB]">Data Protection & Security</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We implement industry-standard security measures to protect your personal information:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security audits and vulnerability assessments</li>
                <li>Access controls and authentication protocols</li>
                <li>Secure data centers with 24/7 monitoring</li>
                <li>Employee training on data protection practices</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 text-[#F18F01] mr-3" />
              <h2 className="text-xl font-bold text-[#2E86AB]">Your Rights</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">You have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Access:</strong> Request a copy of your personal data</li>
                <li><strong>Correction:</strong> Update or correct inaccurate information</li>
                <li><strong>Deletion:</strong> Request deletion of your personal data</li>
                <li><strong>Portability:</strong> Export your data in a machine-readable format</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Restriction:</strong> Request limitation of data processing</li>
              </ul>
            </div>
          </section>

          <section>
            <div className="flex items-center mb-4">
              <Mail className="w-6 h-6 text-[#F18F01] mr-3" />
              <h2 className="text-xl font-bold text-[#2E86AB]">Contact Us</h2>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> privacy@waqti.com</p>
                <p><strong>Phone:</strong> +971 4 000 0000</p>
                <p><strong>Address:</strong> Dubai, United Arab Emirates</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2E86AB] mb-4">Cookies Policy</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-4">
                We use cookies and similar technologies to enhance your experience on our platform:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Analytics Cookies:</strong> Help us understand how you use our platform</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements</li>
              </ul>
              <p className="text-gray-700 mt-4">
                You can manage your cookie preferences through your browser settings.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-[#2E86AB] mb-4">Updates to This Policy</h2>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700">
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new Privacy Policy on this page and updating the "Last updated" date. 
                Your continued use of the platform after any changes constitutes acceptance of the updated policy.
              </p>
            </div>
          </section>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-600">
          <p>
            Time Points are not a digital currency and cannot be traded outside the platform - Licensed by UAE Electronic Commerce Authority
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;