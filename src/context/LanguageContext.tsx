import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

interface LanguageProviderProps {
  children: ReactNode;
}

export const translations = {
  en: {
    'nav.home': 'Home',
    'nav.services': 'Services',
    'nav.wallet': 'Wallet',
    'nav.about': 'About',
    'nav.support': 'Support',
    'nav.login': 'Login',
    'nav.register': 'Create New Account',
    'nav.dashboard': 'Dashboard',
    'hero.title': 'Exchange Services Using Time as Currency',
    'hero.subtitle': 'Offer your skills and earn time to get what you need without using money',
    'hero.join': 'Join Us',
    'hero.browse': 'Browse Services',
    'hero.howItWorks': 'How It Works',
    'hero.step1': 'Register and get 2 free hours',
    'hero.step2': 'Offer services to earn time',
    'hero.step3': 'Use time to get services',
    'services.popular': 'Popular Services',
    'services.all': 'All Available Services',
    'services.viewAll': 'View All Services',
    'services.search': 'Search services...',
    'services.filters': 'Filters',
    'services.clearFilters': 'Clear Filters',
    'services.category': 'Category',
    'services.location': 'Location',
    'services.rating': 'Minimum Rating',
    'services.maxHours': 'Maximum Hours',
    'services.noResults': 'No services found',
    'services.adjustFilters': 'Try adjusting your filters or search terms',
    'wallet.title': 'Time Wallet',
    'wallet.add': 'Add Hours',
    'wallet.balance': 'Your Current Balance',
    'wallet.hours': 'Hours',
    'wallet.gift': 'Gift',
    'wallet.transfer': 'Transfer',
    'wallet.history': 'Transaction History',
    'login.title': 'Login',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.button': 'Login',
    'login.register': 'Don\'t have an account?',
    'login.registerLink': 'Register Now',
    'login.terms': 'Terms & Conditions and Privacy Policy',
    'login.demo': 'Demo credentials for testing:',
    'register.title': 'Create New Account',
    'register.name': 'Full Name',
    'register.email': 'Email',
    'register.password': 'Password',
    'register.confirmPassword': 'Confirm Password',
    'register.phone': 'Phone Number',
    'register.button': 'Register',
    'register.login': 'Already have an account?',
    'register.loginLink': 'Login',
    'about.title': 'About Waqti',
    'about.description': 'Waqti is a platform that allows users to exchange services using time as a currency. This means that you can offer your skills and earn time to get what you need without using money.',
    'about.howItWorks': 'How it Works',
    'about.step1': 'Register for an account.',
    'about.step2': 'Offer your services and earn time.',
    'about.step3': 'Browse services offered by other users.',
    'about.step4': 'Exchange your earned time for the services you need.',
    'about.why': 'Why Use Waqti?',
    'about.reason1': 'Save money by exchanging services instead of paying.',
    'about.reason2': 'Utilize your free time to earn valuable services.',
    'about.reason3': 'Connect with other users in your community.',
    'support.title': 'Support',
    'support.description': 'How can we help you?',
    'support.email': 'Email Support',
    'support.phone': 'Phone Support',
    'support.chat': 'Live Chat',
    'support.faq': 'Frequently Asked Questions',
    'support.contact': 'Contact Us',
    'terms.title': 'Terms and Conditions',
    'terms.description': 'These terms and conditions govern your use of the Waqti platform.',
    'terms.section1': 'Account Registration',
    'terms.section1Text': 'You must be at least 18 years old to register for an account. You must provide accurate and complete information when registering.',
    'terms.section2': 'Service Exchange',
    'terms.section2Text': 'Users are responsible for the quality of the services they offer. Waqti is not responsible for any disputes between users.',
    'terms.section3': 'Time Currency',
    'terms.section3Text': 'Time is the currency used on the platform. You can earn time by offering services and use time to get services from other users.',
    'terms.section4': 'Prohibited Activities',
    'terms.section4Text': 'You may not use the platform for any illegal or unauthorized purpose. You may not use the platform to harass, abuse, or threaten other users.',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.close': 'Close'
  },
  ar: {
    'nav.home': 'الرئيسية',
    'nav.services': 'الخدمات',
    'nav.wallet': 'المحفظة',
    'nav.about': 'عن المنصة',
    'nav.support': 'الدعم',
    'nav.login': 'تسجيل الدخول',
    'nav.register': 'إنشاء حساب جديد',
    'nav.dashboard': 'لوحة التحكم',
    'hero.title': 'تبادل الخدمات باستخدام الوقت كعملة',
    'hero.subtitle': 'قدم مهاراتك واكسب وقتًا للحصول على ما تحتاجه دون استخدام المال',
    'hero.join': 'انضم إلينا',
    'hero.browse': 'تصفح الخدمات',
    'hero.howItWorks': 'كيف يعمل',
    'hero.step1': 'سجل واحصل على ساعتين مجانًا',
    'hero.step2': 'قدم خدمات لكسب الوقت',
    'hero.step3': 'استخدم الوقت للحصول على خدمات',
    'services.popular': 'الخدمات الشائعة',
    'services.all': 'جميع الخدمات المتاحة',
    'services.viewAll': 'عرض جميع الخدمات',
    'services.search': 'البحث في الخدمات...',
    'services.filters': 'المرشحات',
    'services.clearFilters': 'مسح المرشحات',
    'services.category': 'الفئة',
    'services.location': 'الموقع',
    'services.rating': 'أقل تقييم',
    'services.maxHours': 'أقصى عدد ساعات',
    'services.noResults': 'لم يتم العثور على خدمات',
    'services.adjustFilters': 'جرب تعديل المرشحات أو مصطلحات البحث',
    'wallet.title': 'محفظة الوقت',
    'wallet.add': 'إضافة ساعات',
    'wallet.balance': 'رصيدك الحالي',
    'wallet.hours': 'ساعات',
    'wallet.gift': 'إهداء',
    'wallet.transfer': 'تحويل',
    'wallet.history': 'سجل المعاملات',
    'login.title': 'تسجيل الدخول',
    'login.email': 'البريد الإلكتروني',
    'login.password': 'كلمة المرور',
    'login.button': 'تسجيل الدخول',
    'login.register': 'ليس لديك حساب؟',
    'login.registerLink': 'سجل الآن',
    'login.terms': 'الشروط والأحكام وسياسة الخصوصية',
    'login.demo': 'بيانات تجريبية للاختبار:',
    'register.title': 'إنشاء حساب جديد',
    'register.name': 'الاسم الكامل',
    'register.email': 'البريد الإلكتروني',
    'register.password': 'كلمة المرور',
    'register.confirmPassword': 'تأكيد كلمة المرور',
    'register.phone': 'رقم الهاتف',
    'register.button': 'تسجيل',
    'register.login': 'لديك حساب بالفعل؟',
    'register.loginLink': 'تسجيل الدخول',
    'about.title': 'عن وقتي',
    'about.description': 'وقتي هي منصة تتيح للمستخدمين تبادل الخدمات باستخدام الوقت كعملة. هذا يعني أنه يمكنك تقديم مهاراتك وكسب الوقت للحصول على ما تحتاجه دون استخدام المال.',
    'about.howItWorks': 'كيف تعمل',
    'about.step1': 'سجل للحصول على حساب.',
    'about.step2': 'قدم خدماتك واكسب وقتًا.',
    'about.step3': 'تصفح الخدمات التي يقدمها المستخدمون الآخرون.',
    'about.step4': 'تبادل الوقت المكتسب مقابل الخدمات التي تحتاجها.',
    'about.why': 'لماذا تستخدم وقتي؟',
    'about.reason1': 'وفر المال من خلال تبادل الخدمات بدلاً من الدفع.',
    'about.reason2': 'استفد من وقت فراغك لكسب خدمات قيمة.',
    'about.reason3': 'تواصل مع مستخدمين آخرين في مجتمعك.',
    'support.title': 'الدعم',
    'support.description': 'كيف يمكننا مساعدتك؟',
    'support.email': 'الدعم عبر البريد الإلكتروني',
    'support.phone': 'الدعم عبر الهاتف',
    'support.chat': 'المحادثة المباشرة',
    'support.faq': 'الأسئلة الشائعة',
    'support.contact': 'اتصل بنا',
    'terms.title': 'الشروط والأحكام',
    'terms.description': 'تحكم هذه الشروط والأحكام استخدامك لمنصة وقتي.',
    'terms.section1': 'تسجيل الحساب',
    'terms.section1Text': 'يجب أن يكون عمرك 18 عامًا على الأقل للتسجيل للحصول على حساب. يجب عليك تقديم معلومات دقيقة وكاملة عند التسجيل.',
    'terms.section2': 'تبادل الخدمات',
    'terms.section2Text': 'المستخدمون مسؤولون عن جودة الخدمات التي يقدمونها. وقتي ليست مسؤولة عن أي نزاعات بين المستخدمين.',
    'terms.section3': 'عملة الوقت',
    'terms.section3Text': 'الوقت هو العملة المستخدمة على المنصة. يمكنك كسب الوقت من خلال تقديم الخدمات واستخدام الوقت للحصول على خدمات من مستخدمين آخرين.',
    'terms.section4': 'الأنشطة المحظورة',
    'terms.section4Text': 'لا يجوز لك استخدام المنصة لأي غرض غير قانوني أو غير مصرح به. لا يجوز لك استخدام المنصة لمضايقة أو إساءة أو تهديد المستخدمين الآخرين.',
    'common.loading': 'جاري التحميل...',
    'common.error': 'حدث خطأ',
    'common.success': 'نجح',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.save': 'حفظ',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.back': 'رجوع',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.close': 'إغلاق'
  }
};

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');
  const isRTL = language === 'ar';

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
    document.body.style.fontFamily = lang === 'ar' ? 'Tajawal, sans-serif' : 'system-ui, sans-serif';
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ar')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const value = {
    language,
    setLanguage,
    t,
    isRTL
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};