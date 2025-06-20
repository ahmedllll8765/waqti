import React, { useState } from 'react';
import { Clock, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import Button from '../Button';

const Footer: React.FC = () => {
  const { t, isRTL } = useLanguage();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleQuickContact = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setEmail('');
    setMessage('');
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-[#2E86AB] to-[#1a6a8d] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className={`flex items-center text-2xl font-bold ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Clock className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={28} />
              <span>Waqti</span>
            </div>
            <p className="text-blue-100 leading-relaxed">
              {t('footer.description') || 'Revolutionary platform for exchanging services using time as currency. Join our community and start trading your skills today!'}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-blue-100 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickLinks') || 'Quick Links'}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('nav.home')}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('nav.services')}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.projects') || 'Projects'}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.freelancers') || 'Freelancers'}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.blog') || 'Blog'}
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.legal') || 'Legal'}</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.terms') || 'Terms of Service'}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.privacy') || 'Privacy Policy'}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.cookies') || 'Cookie Policy'}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('footer.faqs') || 'FAQs'}
                </a>
              </li>
              <li>
                <a href="#" className="text-blue-100 hover:text-white transition-colors">
                  {t('nav.support')}
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Contact Form */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">{t('footer.quickContact') || 'Quick Contact'}</h3>
            <form onSubmit={handleQuickContact} className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('footer.emailPlaceholder') || 'Your email'}
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
                required
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t('footer.messagePlaceholder') || 'Your message'}
                rows={3}
                className="w-full px-3 py-2 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 resize-none"
                required
              />
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="w-full"
                isLoading={isSubmitting}
                leftIcon={<Send size={16} />}
              >
                {t('footer.sendMessage') || 'Send Message'}
              </Button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Mail className={`${isRTL ? 'ml-3' : 'mr-3'} text-blue-100`} size={20} />
              <div>
                <p className="font-medium">Email</p>
                <p className="text-blue-100">support@waqti.com</p>
              </div>
            </div>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <Phone className={`${isRTL ? 'ml-3' : 'mr-3'} text-blue-100`} size={20} />
              <div>
                <p className="font-medium">Phone</p>
                <p className="text-blue-100">+971 4 000 0000</p>
              </div>
            </div>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <MapPin className={`${isRTL ? 'ml-3' : 'mr-3'} text-blue-100`} size={20} />
              <div>
                <p className="font-medium">Location</p>
                <p className="text-blue-100">Dubai, UAE</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white border-opacity-20 mt-8 pt-8">
          <div className={`flex flex-col md:flex-row justify-between items-center ${isRTL ? 'md:flex-row-reverse' : ''}`}>
            <p className="text-blue-100 text-sm">
              © {currentYear} Waqti Platform. {t('footer.allRightsReserved') || 'All rights reserved.'}
            </p>
            <p className="text-blue-100 text-xs mt-2 md:mt-0">
              {t('footer.disclaimer') || 'Time Points are not a digital currency and cannot be traded outside the platform - Licensed by UAE Electronic Commerce Authority'}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;