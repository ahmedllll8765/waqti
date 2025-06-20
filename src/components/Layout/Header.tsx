import React, { useState } from 'react';
import { Clock, Bell, MessageSquare, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

interface HeaderProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Header: React.FC<HeaderProps> = ({ activePage, setActivePage }) => {
  const { isLoggedIn, user } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-[#2E86AB] to-[#1a6a8d] text-white py-4 shadow-md sticky top-0 z-50">
      <nav className={`container mx-auto px-4 flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} justify-between items-center`}>
        <div className={`flex items-center text-2xl font-bold ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <Clock className={`${isRTL ? 'ml-2' : 'mr-2'}`} />
          <span>Waqti</span>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Desktop Navigation */}
        <ul className={`hidden md:flex ${isRTL ? 'flex-row-reverse' : 'flex-row'} items-center`}>
          <li className={`mx-2`}>
            <button
              onClick={toggleLanguage}
              className="px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
            >
              {language === 'en' ? 'العربية' : 'English'}
            </button>
          </li>
          <li className={`mx-2`}>
            <button
              onClick={() => handleNavClick('home')}
              className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                activePage === 'home' ? 'bg-white bg-opacity-20' : ''
              }`}
            >
              {t('nav.home')}
            </button>
          </li>
          <li className={`mx-2`}>
            <button
              onClick={() => handleNavClick('services')}
              className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                activePage === 'services' ? 'bg-white bg-opacity-20' : ''
              }`}
            >
              {t('nav.services')}
            </button>
          </li>
          
          {isLoggedIn && (
            <>
              <li className={`mx-2`}>
                <button
                  onClick={() => handleNavClick('wallet')}
                  className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                    activePage === 'wallet' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  {t('nav.wallet')}
                </button>
              </li>
              <li className={`mx-2`}>
                <button
                  onClick={() => handleNavClick('messages')}
                  className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all relative ${
                    activePage === 'messages' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  <MessageSquare size={18} />
                  <span className="absolute -top-1 -right-1 bg-[#F18F01] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    2
                  </span>
                </button>
              </li>
              <li className={`mx-2`}>
                <button
                  onClick={() => handleNavClick('notifications')}
                  className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all relative ${
                    activePage === 'notifications' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  <Bell size={18} />
                  <span className="absolute -top-1 -right-1 bg-[#F18F01] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    3
                  </span>
                </button>
              </li>
              <li className={`mx-2`}>
                <button
                  onClick={() => handleNavClick('userProfile')}
                  className={`flex items-center px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                    activePage === 'userProfile' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover mr-2"
                    />
                  ) : (
                    <User size={18} className="mr-2" />
                  )}
                  <span className="hidden lg:inline">{user?.name}</span>
                </button>
              </li>
            </>
          )}
          
          <li className={`mx-2`}>
            <button
              onClick={() => handleNavClick('about')}
              className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                activePage === 'about' ? 'bg-white bg-opacity-20' : ''
              }`}
            >
              {t('nav.about')}
            </button>
          </li>
          <li className={`mx-2`}>
            <button
              onClick={() => handleNavClick('support')}
              className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                activePage === 'support' ? 'bg-white bg-opacity-20' : ''
              }`}
            >
              {t('nav.support')}
            </button>
          </li>
          
          {!isLoggedIn && (
            <>
              <li className={`mx-2`}>
                <button
                  onClick={() => handleNavClick('register')}
                  className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                    activePage === 'register' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  {t('nav.register')}
                </button>
              </li>
              <li className={`mx-2`}>
                <button
                  onClick={() => handleNavClick('login')}
                  className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                    activePage === 'login' ? 'bg-white bg-opacity-20' : ''
                  }`}
                >
                  {t('nav.login')}
                </button>
              </li>
            </>
          )}
          
          {isLoggedIn && (
            <li className={`mx-2`}>
              <button
                onClick={() => handleNavClick('dashboard')}
                className={`px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                  activePage === 'dashboard' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                {t('nav.dashboard')}
              </button>
            </li>
          )}
        </ul>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1a6a8d] text-white">
          <ul className="flex flex-col p-4">
            <li className="py-2">
              <button
                onClick={toggleLanguage}
                className="w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all"
              >
                {language === 'en' ? 'العربية' : 'English'}
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => handleNavClick('home')}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                  activePage === 'home' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                {t('nav.home')}
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => handleNavClick('services')}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                  activePage === 'services' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                {t('nav.services')}
              </button>
            </li>
            
            {isLoggedIn && (
              <>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('wallet')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'wallet' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    {t('nav.wallet')}
                  </button>
                </li>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('messages')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'messages' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    Messages
                  </button>
                </li>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('notifications')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'notifications' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    Notifications
                  </button>
                </li>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('userProfile')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'userProfile' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    Profile
                  </button>
                </li>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('dashboard')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'dashboard' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    {t('nav.dashboard')}
                  </button>
                </li>
              </>
            )}
            
            <li className="py-2">
              <button
                onClick={() => handleNavClick('about')}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                  activePage === 'about' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                {t('nav.about')}
              </button>
            </li>
            <li className="py-2">
              <button
                onClick={() => handleNavClick('support')}
                className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                  activePage === 'support' ? 'bg-white bg-opacity-20' : ''
                }`}
              >
                {t('nav.support')}
              </button>
            </li>
            
            {!isLoggedIn && (
              <>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('register')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'register' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    {t('nav.register')}
                  </button>
                </li>
                <li className="py-2">
                  <button
                    onClick={() => handleNavClick('login')}
                    className={`w-full text-left px-3 py-2 rounded-lg hover:bg-white hover:bg-opacity-20 transition-all ${
                      activePage === 'login' ? 'bg-white bg-opacity-20' : ''
                    }`}
                  >
                    {t('nav.login')}
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;