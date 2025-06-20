import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const AboutPage: React.FC = () => {
  const { t, isRTL } = useLanguage();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="bg-white rounded-xl shadow-md p-8">
        <h2 className={`text-3xl font-bold mb-8 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-center'}`}>
          {t('about.title')}
        </h2>
        
        <p className={`text-lg mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('about.description')}
        </p>
        
        <h3 className={`text-xl font-bold mb-4 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('about.howItWorks')}
        </h3>
        
        <ol className={`list-decimal ${isRTL ? 'pr-6 text-right' : 'pl-6'} mb-8`}>
          <li className="mb-2">{t('about.step1')}</li>
          <li className="mb-2">{t('about.step2')}</li>
          <li className="mb-2">{t('about.step3')}</li>
          <li className="mb-2">{t('about.step4')}</li>
        </ol>
        
        <h3 className={`text-xl font-bold mb-4 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-left'}`}>
          {t('about.why')}
        </h3>
        
        <ul className={`list-disc ${isRTL ? 'pr-6 text-right' : 'pl-6'} mb-8`}>
          <li className="mb-2">{t('about.reason1')}</li>
          <li className="mb-2">{t('about.reason2')}</li>
          <li className="mb-2">{t('about.reason3')}</li>
        </ul>
        
        <div className="bg-gray-50 p-6 rounded-lg mt-8 border-l-4 border-[#F18F01]">
          <h4 className="font-bold mb-2">Time Points are not a digital currency</h4>
          <p>Time Points are not a digital currency and cannot be traded outside the platform - Licensed by UAE Electronic Commerce Authority</p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;