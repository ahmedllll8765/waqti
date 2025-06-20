import React, { useState } from 'react';
import Navigation from './components/Layout/Navigation';
import Footer from './components/Layout/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ServicesPage from './pages/ServicesPage';
import FreelancersPage from './pages/FreelancersPage';
import BlogPage from './pages/BlogPage';
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
import Custom404Page from './pages/Custom404Page';
import { LanguageProvider } from './context/LanguageContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [activePage, setActivePage] = useState('home');
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [selectedFreelancerId, setSelectedFreelancerId] = useState<string | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
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

  const handleProjectClick = (projectId: string) => {
    setPreviousPage(activePage);
    setSelectedProjectId(projectId);
    setActivePage('projectDetail');
  };

  const handleFreelancerClick = (freelancerId: string) => {
    setPreviousPage(activePage);
    setSelectedFreelancerId(freelancerId);
    setActivePage('userProfile');
  };

  const handlePostClick = (postId: string) => {
    setPreviousPage(activePage);
    setSelectedPostId(postId);
    setActivePage('postDetail');
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
    setSelectedProjectId(null);
    setSelectedFreelancerId(null);
    setSelectedPostId(null);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <HomePage setActivePage={setActivePage} onServiceClick={handleServiceClick} />;
      case 'projects':
        return <ProjectsPage setActivePage={setActivePage} onProjectClick={handleProjectClick} />;
      case 'services':
        return <ServicesPage onServiceClick={handleServiceClick} />;
      case 'freelancers':
        return <FreelancersPage setActivePage={setActivePage} onFreelancerClick={handleFreelancerClick} />;
      case 'blog':
        return <BlogPage setActivePage={setActivePage} onPostClick={handlePostClick} />;
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
        return <UserProfilePage setActivePage={setActivePage} userId={selectedUserId || selectedFreelancerId || undefined} />;
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
      case '404':
        return <Custom404Page setActivePage={setActivePage} />;
      default:
        return <Custom404Page setActivePage={setActivePage} />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2E86AB] mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className="min-h-screen">
        {renderPage()}
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LanguageProvider>
          <AppContent />
        </LanguageProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;