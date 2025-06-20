import React from 'react';
import { UserPlus, Search, Clock, Users, TrendingUp } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import ServiceCard from '../components/ServiceCard';
import Button from '../components/Button';
import { services } from '../data/mockData';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface HomePageProps {
  setActivePage: (page: string) => void;
  onServiceClick: (serviceId: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ setActivePage, onServiceClick }) => {
  const { t, isRTL } = useLanguage();
  const [heroRef, heroInView] = useInView({ triggerOnce: true });
  const [statsRef, statsInView] = useInView({ triggerOnce: true });
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true });
  const [howItWorksRef, howItWorksInView] = useInView({ triggerOnce: true });
  
  // Get popular services (top 6 by rating)
  const popularServices = [...services]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 6);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div>
      {/* Hero Section */}
      <motion.div 
        ref={heroRef}
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={fadeInUp}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-[#2E86AB] to-[#1a6a8d] text-white py-12 md:py-20 relative overflow-hidden"
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1 
            variants={fadeInUp}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 md:mb-6 leading-tight"
          >
            {t('hero.title')}
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto mb-8 md:mb-10 opacity-90 px-4"
          >
            {t('hero.subtitle')}
          </motion.p>
          
          {/* Hero buttons */}
          <motion.div 
            variants={fadeInUp}
            className={`flex flex-col sm:flex-row gap-4 justify-center mt-6 md:mt-8 px-4 ${isRTL ? 'sm:flex-row-reverse' : ''}`}
          >
            <Button 
              size="lg" 
              leftIcon={<UserPlus />}
              onClick={() => setActivePage('register')}
              className="w-full sm:w-auto"
            >
              {t('hero.join')}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              leftIcon={<Search />}
              onClick={() => setActivePage('services')}
              className="w-full sm:w-auto"
            >
              {t('hero.browse')}
            </Button>
          </motion.div>

          {/* Statistics */}
          <motion.div 
            ref={statsRef}
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-8 mt-12 md:mt-16 px-4"
          >
            <div className="bg-white bg-opacity-10 rounded-lg p-4 md:p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-bold mb-2">100+</div>
              <div className="text-sm md:text-lg">Active Services</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 md:p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-bold mb-2">500+</div>
              <div className="text-sm md:text-lg">Registered Users</div>
            </div>
            <div className="bg-white bg-opacity-10 rounded-lg p-4 md:p-6 backdrop-blur-sm transform hover:scale-105 transition-transform">
              <div className="text-2xl md:text-3xl font-bold mb-2">1,000+</div>
              <div className="text-sm md:text-lg">Hours Exchanged</div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Popular Services Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <motion.h2 
          ref={servicesRef}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className={`text-2xl md:text-3xl font-bold mb-8 md:mb-10 text-[#2E86AB] relative ${isRTL ? 'text-right' : 'text-center'}`}
        >
          {t('services.popular')}
          <span className="block mx-auto mt-4 w-20 h-1 bg-[#F18F01]"></span>
        </motion.h2>
        
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
        >
          {popularServices.map((service, index) => (
            <motion.div
              key={service.id}
              variants={fadeInUp}
              initial="hidden"
              animate={servicesInView ? "visible" : "hidden"}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <ServiceCard 
                service={service} 
                onClick={() => onServiceClick(service.id)}
              />
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          animate={servicesInView ? "visible" : "hidden"}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-8 md:mt-10"
        >
          <Button 
            variant="secondary" 
            onClick={() => setActivePage('services')}
          >
            {t('services.viewAll')}
          </Button>
        </motion.div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.h2 
            ref={howItWorksRef}
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            variants={fadeInUp}
            className={`text-2xl md:text-3xl font-bold mb-8 md:mb-12 text-[#2E86AB] ${isRTL ? 'text-right' : 'text-center'}`}
          >
            {t('hero.howItWorks')}
            <span className="block mx-auto mt-4 w-20 h-1 bg-[#F18F01]"></span>
          </motion.h2>
          
          <motion.div 
            initial="hidden"
            animate={howItWorksInView ? "visible" : "hidden"}
            variants={fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
          >
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-[#2E86AB] bg-opacity-10 rounded-full flex items-center justify-center text-[#2E86AB] mx-auto mb-4">
                <UserPlus size={32} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#2E86AB]">Register</h3>
              <p className="text-gray-600 text-sm md:text-base">{t('hero.step1')}</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-[#2E86AB] bg-opacity-10 rounded-full flex items-center justify-center text-[#2E86AB] mx-auto mb-4">
                <TrendingUp size={32} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#2E86AB]">Offer Services</h3>
              <p className="text-gray-600 text-sm md:text-base">{t('hero.step2')}</p>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="bg-white p-6 rounded-xl shadow-md text-center transform hover:scale-105 transition-transform"
            >
              <div className="w-16 h-16 bg-[#2E86AB] bg-opacity-10 rounded-full flex items-center justify-center text-[#2E86AB] mx-auto mb-4">
                <Clock size={32} />
              </div>
              <h3 className="text-lg md:text-xl font-semibold mb-3 text-[#2E86AB]">Get Services</h3>
              <p className="text-gray-600 text-sm md:text-base">{t('hero.step3')}</p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Time Exchange Explanation Section */}
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-8 md:mb-12"
          >
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-[#2E86AB]">
              Understanding Time Exchange
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our platform revolutionizes service exchange by using time as the universal currency
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-[#2E86AB]">How Time Currency Works</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start">
                    <Clock className="text-[#F18F01] mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm md:text-base">1 hour of service = 1 time credit</span>
                  </li>
                  <li className="flex items-start">
                    <Users className="text-[#F18F01] mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm md:text-base">Everyone's time is valued equally</span>
                  </li>
                  <li className="flex items-start">
                    <TrendingUp className="text-[#F18F01] mr-3 mt-1 flex-shrink-0" size={16} />
                    <span className="text-sm md:text-base">Earn credits by helping others</span>
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-[#2E86AB] to-[#1a6a8d] text-white p-6 rounded-lg">
                <h4 className="font-semibold mb-3">Example Exchange</h4>
                <div className="text-sm space-y-2">
                  <p>Sarah teaches Arabic for 2 hours → Earns 2 credits</p>
                  <p>Ahmed designs a logo (2 hour service) → Costs 2 credits</p>
                  <p>Sarah uses her credits to get Ahmed's design service</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;