import React, { useState } from 'react';
import { 
  Home, 
  Briefcase, 
  Users, 
  Wallet, 
  Info, 
  HelpCircle, 
  FileText, 
  User, 
  LogIn, 
  UserPlus,
  Menu,
  X,
  Moon,
  Sun,
  Globe
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';

interface NavigationProps {
  activePage: string;
  setActivePage: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activePage, setActivePage }) => {
  const { isLoggedIn, user } = useAuth();
  const { language, setLanguage, t, isRTL } = useLanguage();
  const { theme, setTheme, isDark } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ar' : 'en');
  };

  const toggleTheme = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const handleNavClick = (page: string) => {
    setActivePage(page);
    setMobileMenuOpen(false);
  };

  const navigationItems = [
    { key: 'home', label: t('nav.home'), icon: Home, public: true },
    { key: 'projects', label: t('nav.projects') || 'Projects', icon: Briefcase, public: true },
    { key: 'services', label: t('nav.services'), icon: FileText, public: true },
    { key: 'freelancers', label: t('nav.freelancers') || 'Freelancers', icon: Users, public: true },
    { key: 'wallet', label: t('nav.wallet'), icon: Wallet, public: false },
    { key: 'about', label: t('nav.about'), icon: Info, public: true },
    { key: 'support', label: t('nav.support'), icon: HelpCircle, public: true },
    { key: 'blog', label: t('nav.blog') || 'Blog', icon: FileText, public: true },
  ];

  const visibleItems = navigationItems.filter(item => item.public || isLoggedIn);

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="container mx-auto px-4">
        <div className={`flex justify-between items-center h-16 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          {/* Logo */}
          <div 
            className={`flex items-center cursor-pointer ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}
            onClick={() => handleNavClick('home')}
          >
            <div className="w-8 h-8 bg-gradient-to-r from-[#2E86AB] to-[#F18F01] rounded-lg flex items-center justify-center mr-2">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-[#2E86AB] dark:text-white">Waqti</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            {visibleItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.key)}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activePage === item.key
                      ? 'bg-[#2E86AB] text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <Icon size={16} className="mr-1" />
                  {item.label}
                </button>
              );
            })}
          </div>

          {/* Right Side Controls */}
          <div className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Switch language"
            >
              <Globe size={18} />
            </button>

            {/* User Menu */}
            {isLoggedIn ? (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('userProfile')}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                  ) : (
                    <User size={18} className="text-gray-700 dark:text-gray-300" />
                  )}
                  <span className="hidden md:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    {user?.name}
                  </span>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center space-x-2">
                <button
                  onClick={() => handleNavClick('login')}
                  className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <LogIn size={16} className="mr-1" />
                  {t('nav.login')}
                </button>
                <button
                  onClick={() => handleNavClick('register')}
                  className="flex items-center px-3 py-2 text-sm font-medium bg-[#F18F01] text-white hover:bg-[#d97d00] rounded-lg transition-colors"
                >
                  <UserPlus size={16} className="mr-1" />
                  {t('nav.register')}
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 dark:border-gray-700 py-4">
            <div className="space-y-2">
              {visibleItems.map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    onClick={() => handleNavClick(item.key)}
                    className={`w-full flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activePage === item.key
                        ? 'bg-[#2E86AB] text-white'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    <Icon size={16} className="mr-2" />
                    {item.label}
                  </button>
                );
              })}

              {!isLoggedIn && (
                <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                  <button
                    onClick={() => handleNavClick('login')}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                  >
                    <LogIn size={16} className="mr-2" />
                    {t('nav.login')}
                  </button>
                  <button
                    onClick={() => handleNavClick('register')}
                    className="w-full flex items-center px-3 py-2 text-sm font-medium bg-[#F18F01] text-white hover:bg-[#d97d00] rounded-lg transition-colors"
                  >
                    <UserPlus size={16} className="mr-2" />
                    {t('nav.register')}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;