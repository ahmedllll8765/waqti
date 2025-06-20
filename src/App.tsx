import React, { useState } from 'react';
import Header from './components/Layout/Header';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import WalletPage from './pages/WalletPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProviderRegistrationPage from './pages/ProviderRegistrationPage';
import PhoneVerificationPage from './pages/PhoneVerificationPage';
import ExpertiseVerificationPage from './pages/ExpertiseVerificationPage';
import AboutPage from './pages/AboutPage';
import SupportPage from './pages/SupportPage';
import TermsPage from './pages/TermsPage';
import PrivacyPage from './pages/PrivacyPage';
import DashboardPage from './pages/DashboardPage';
import ServiceDetailPage from './pages/ServiceDetailPage';
import CreateServicePage from './pages/CreateServicePage';
import MessagesPage from './pages/MessagesPage';
import NotificationsPage from './pages/NotificationsPage';
import UserProfilePage from './pages/UserProfilePage';
import BookingManagementPage from './pages/BookingManagementPage';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [previousPage, setPreviousPage] = useState('services');
  const [verificationPhone, setVerificationPhone] = useState('');
  const { isLoading } = useAuth();

  const handleServiceClick = (serviceId: string) => {
    setPreviousPage(activePage);
    setSelectedServiceId(serviceId);
    setActivePage('serviceDetail');
  };

  const handleUserClick = (userId: string) => {
    setPreviousPage(activePage);
    setSelectedUserId(userId);
    setActivePage('userProfile');
  };

  const handlePhoneVerification = (phone: string) => {
    setVerificationPhone(phone);
    setActivePage('phone-verification');
  };

  const handleVerificationComplete = () => {
    setActivePage('expertise-verification');
  };

  const goBack = () => {
    setActivePage(previousPage);
    setSelectedServiceId(null);
    setSelectedUserId(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} onServiceClick={handleServiceClick} />;
      case 'services':
        return <ServicesPage onServiceClick={handleServiceClick} />;
      case 'wallet':
        return <WalletPage />;
      case 'login':
        return <LoginPage setActivePage={setActivePage} />;
      case 'register':
        return <RegisterPage setActivePage={setActivePage} />;
      case 'provider-register':
        return <ProviderRegistrationPage setActivePage={setActivePage} onPhoneVerification={handlePhoneVerification} />;
      case 'phone-verification':
        return (
          <PhoneVerificationPage
            phone={verificationPhone}
            onVerificationComplete={handleVerificationComplete}
            setActivePage={setActivePage}
          />
        );
      case 'expertise-verification':
        return <ExpertiseVerificationPage setActivePage={setActivePage} />;
      case 'about':
        return <AboutPage />;
      case 'support':
        return <SupportPage />;
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'dashboard':
        return <DashboardPage setActivePage={setActivePage} />;
      case 'create-service':
        return <CreateServicePage setActivePage={setActivePage} />;
      case 'messages':
        return <MessagesPage setActivePage={setActivePage} />;
      case 'notifications':
        return <NotificationsPage setActivePage={setActivePage} />;
      case 'bookings':
        return <BookingManagementPage setActivePage={setActivePage} />;
      case 'userProfile':
        return <UserProfilePage setActivePage={setActivePage} userId={selectedUserId || undefined} />;
      case 'serviceDetail':
        return selectedServiceId ? (
          <ServiceDetailPage 
            serviceId={selectedServiceId} 
            setActivePage={setActivePage} 
            goBack={goBack}
          />
        ) : (
          <ServicesPage onServiceClick={handleServiceClick} />
        );
      default:
        return <HomePage setActivePage={setActivePage} onServiceClick={handleServiceClick} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E86AB] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header activePage={activePage} setActivePage={setActivePage} />
      {renderPage()}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;