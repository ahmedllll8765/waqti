import React from 'react';
import { Home, Search, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface Custom404PageProps {
  setActivePage: (page: string) => void;
}

const Custom404Page: React.FC<Custom404PageProps> = ({ setActivePage }) => {
  const { t, isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#2E86AB] to-[#1a6a8d] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center text-white max-w-2xl mx-auto"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <div className="text-9xl font-bold opacity-20 mb-4">404</div>
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 mx-auto mb-6"
            >
              <div className="w-full h-full border-4 border-white border-opacity-30 rounded-full relative">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-[#F18F01] rounded-full"></div>
                <div className="absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full"></div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-white bg-opacity-60 rounded-full"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            {t('404.title') || 'Page Not Found'}
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90">
            {t('404.subtitle') || 'Oops! The page you\'re looking for doesn\'t exist.'}
          </p>
          <p className="text-lg mb-8 opacity-75">
            {t('404.description') || 'It might have been moved, deleted, or you entered the wrong URL.'}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className={`flex flex-col sm:flex-row gap-4 justify-center ${isRTL ? 'sm:flex-row-reverse' : ''}`}
        >
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Home size={20} />}
            onClick={() => setActivePage('home')}
            className="border-white text-white hover:bg-white hover:text-[#2E86AB]"
          >
            {t('404.goHome') || 'Go Home'}
          </Button>
          <Button
            variant="outline"
            size="lg"
            leftIcon={<Search size={20} />}
            onClick={() => setActivePage('services')}
            className="border-white text-white hover:bg-white hover:text-[#2E86AB]"
          >
            {t('404.browseServices') || 'Browse Services'}
          </Button>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 pt-8 border-t border-white border-opacity-20"
        >
          <h3 className="text-lg font-semibold mb-4 opacity-90">
            {t('404.helpfulLinks') || 'You might be looking for:'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <button
              onClick={() => setActivePage('services')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.services') || 'Services'}
            </button>
            <button
              onClick={() => setActivePage('projects')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.projects') || 'Projects'}
            </button>
            <button
              onClick={() => setActivePage('freelancers')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.freelancers') || 'Freelancers'}
            </button>
            <button
              onClick={() => setActivePage('about')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.about') || 'About'}
            </button>
            <button
              onClick={() => setActivePage('support')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.support') || 'Support'}
            </button>
            <button
              onClick={() => setActivePage('blog')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.blog') || 'Blog'}
            </button>
            <button
              onClick={() => setActivePage('login')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.login') || 'Login'}
            </button>
            <button
              onClick={() => setActivePage('register')}
              className="text-white hover:text-[#F18F01] transition-colors opacity-75 hover:opacity-100"
            >
              {t('nav.register') || 'Register'}
            </button>
          </div>
        </motion.div>

        {/* Contact Support */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="mt-8 text-sm opacity-75"
        >
          <p>
            {t('404.stillNeedHelp') || 'Still need help?'}{' '}
            <button
              onClick={() => setActivePage('support')}
              className="underline hover:text-[#F18F01] transition-colors"
            >
              {t('404.contactSupport') || 'Contact our support team'}
            </button>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Custom404Page;