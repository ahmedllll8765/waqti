import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const TermsPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className={`text-3xl font-bold mb-6 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('terms.title')}
        </h2>
        
        <p className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('terms.description')}
        </p>
        
        <div className="space-y-8">
          <div>
            <h3 className={`text-xl font-bold mb-3 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
              1. {t('terms.section1')}
            </h3>
            <p className={`${isRTL ? 'text-right' : 'text-left'}`}>
              {t('terms.section1Text')}
            </p>
          </div>
          
          <div>
            <h3 className={`text-xl font-bold mb-3 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
              2. {t('terms.section2')}
            </h3>
            <p className={`${isRTL ? 'text-right' : 'text-left'}`}>
              {t('terms.section2Text')}
            </p>
          </div>
          
          <div>
            <h3 className={`text-xl font-bold mb-3 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
              3. {t('terms.section3')}
            </h3>
            <p className={`${isRTL ? 'text-right' : 'text-left'}`}>
              {t('terms.section3Text')}
            </p>
          </div>
          
          <div>
            <h3 className={`text-xl font-bold mb-3 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
              4. {t('terms.section4')}
            </h3>
            <p className={`${isRTL ? 'text-right' : 'text-left'}`}>
              {t('terms.section4Text')}
            </p>
          </div>
        </div>
        
        <div className="mt-10 bg-gray-50 p-6 rounded-lg border border-gray-200">
          <h4 className={`font-bold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>Report a Violation</h4>
          <p className={`mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
            If you encounter any violations of these terms or have concerns about another user's behavior, please report it to us immediately.
          </p>
          <div className="flex justify-center">
            <button className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Report a Violation
            </button>
          </div>
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

export default TermsPage;