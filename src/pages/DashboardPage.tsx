import React, { useState } from 'react';
import { Clock, User, Bell, MessageSquare, Calendar, FileText, Settings, LogOut, Plus } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';

interface DashboardPageProps {
  setActivePage: (page: string) => void;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ setActivePage }) => {
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  
  if (!user) {
    setActivePage('login');
    return null;
  }
  
  const handleLogout = () => {
    logout();
    setActivePage('home');
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:grid lg:grid-cols-[250px_1fr] min-h-screen">
        {/* Sidebar - Desktop */}
        <div className="hidden lg:block bg-gradient-to-b from-[#343a40] to-[#23272b] text-white p-5">
          <h3 className="text-xl font-bold py-4 border-b border-gray-700 mb-6 flex items-center">
            <User className="mr-2" size={20} />
            {user.name}
          </h3>
          
          <ul className="space-y-1">
            <li>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'overview' ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'
                }`}
                onClick={() => setActiveTab('overview')}
              >
                <Clock className="mr-3" size={18} />
                Overview
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'myServices' ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'
                }`}
                onClick={() => setActiveTab('myServices')}
              >
                <FileText className="mr-3" size={18} />
                My Services
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'bookings' ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'
                }`}
                onClick={() => setActivePage('bookings')}
              >
                <Calendar className="mr-3" size={18} />
                Bookings
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'messages' ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'
                }`}
                onClick={() => setActivePage('messages')}
              >
                <MessageSquare className="mr-3" size={18} />
                Messages
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'notifications' ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'
                }`}
                onClick={() => setActivePage('notifications')}
              >
                <Bell className="mr-3" size={18} />
                Notifications
              </button>
            </li>
            <li>
              <button
                className={`w-full flex items-center px-4 py-3 rounded-lg transition-colors ${
                  activeTab === 'settings' ? 'bg-white bg-opacity-10' : 'hover:bg-white hover:bg-opacity-5'
                }`}
                onClick={() => setActiveTab('settings')}
              >
                <Settings className="mr-3" size={18} />
                Settings
              </button>
            </li>
            <li className="mt-6">
              <button
                className="w-full flex items-center px-4 py-3 rounded-lg text-red-300 hover:bg-red-900 hover:bg-opacity-20 transition-colors"
                onClick={handleLogout}
              >
                <LogOut className="mr-3" size={18} />
                Logout
              </button>
            </li>
          </ul>
        </div>
        
        {/* Mobile Tabs */}
        <div className="lg:hidden bg-white border-b border-gray-200 overflow-x-auto">
          <div className="flex p-2">
            <button
              className={`flex-1 px-4 py-2 text-center rounded-lg ${
                activeTab === 'overview' ? 'bg-[#2E86AB] text-white' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('overview')}
            >
              <Clock className="mx-auto mb-1" size={18} />
              <span className="text-xs">Overview</span>
            </button>
            
            <button
              className={`flex-1 px-4 py-2 text-center rounded-lg ${
                activeTab === 'myServices' ? 'bg-[#2E86AB] text-white' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('myServices')}
            >
              <FileText className="mx-auto mb-1" size={18} />
              <span className="text-xs">Services</span>
            </button>
            
            <button
              className={`flex-1 px-4 py-2 text-center rounded-lg ${
                activeTab === 'bookings' ? 'bg-[#2E86AB] text-white' : 'text-gray-600'
              }`}
              onClick={() => setActivePage('bookings')}
            >
              <Calendar className="mx-auto mb-1" size={18} />
              <span className="text-xs">Bookings</span>
            </button>
            
            <button
              className={`flex-1 px-4 py-2 text-center rounded-lg ${
                activeTab === 'messages' ? 'bg-[#2E86AB] text-white' : 'text-gray-600'
              }`}
              onClick={() => setActivePage('messages')}
            >
              <MessageSquare className="mx-auto mb-1" size={18} />
              <span className="text-xs">Messages</span>
            </button>
            
            <button
              className={`flex-1 px-4 py-2 text-center rounded-lg ${
                activeTab === 'more' ? 'bg-[#2E86AB] text-white' : 'text-gray-600'
              }`}
              onClick={() => setActiveTab('more')}
            >
              <span className="text-xs">More</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl font-bold mb-6">Dashboard Overview</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-gray-500 mb-2">Balance</h3>
                  <div className="text-3xl font-bold text-[#F18F01]">{user.balance} Hours</div>
                  <button
                    className="mt-4 text-[#2E86AB] text-sm font-medium hover:underline"
                    onClick={() => setActivePage('wallet')}
                  >
                    Go to Wallet
                  </button>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-gray-500 mb-2">Active Bookings</h3>
                  <div className="text-3xl font-bold text-[#2E86AB]">3</div>
                  <button 
                    className="mt-4 text-[#2E86AB] text-sm font-medium hover:underline"
                    onClick={() => setActivePage('bookings')}
                  >
                    View Bookings
                  </button>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-gray-500 mb-2">Unread Messages</h3>
                  <div className="text-3xl font-bold text-[#2E86AB]">5</div>
                  <button 
                    className="mt-4 text-[#2E86AB] text-sm font-medium hover:underline"
                    onClick={() => setActivePage('messages')}
                  >
                    View Messages
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Upcoming Bookings</h2>
                  
                  <div className="divide-y">
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Web Development Consultation</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Tomorrow
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">2:00 PM - 3:00 PM</p>
                    </div>
                    
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Arabic Language Lesson</h4>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                          Next Week
                        </span>
                      </div>
                      <p className="text-sm text-gray-500">Monday, 10:00 AM - 11:00 AM</p>
                    </div>
                  </div>
                  
                  <button 
                    className="mt-4 text-[#2E86AB] text-sm font-medium hover:underline"
                    onClick={() => setActivePage('bookings')}
                  >
                    View All Bookings
                  </button>
                </div>
                
                <div className="bg-white rounded-xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold mb-4">Recent Transactions</h2>
                  
                  <div className="divide-y">
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Graphic Design Service</h4>
                        <span className="text-red-600 font-medium">-2 Hours</span>
                      </div>
                      <p className="text-sm text-gray-500">Yesterday</p>
                    </div>
                    
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">Cooking Class</h4>
                        <span className="text-green-600 font-medium">+3 Hours</span>
                      </div>
                      <p className="text-sm text-gray-500">3 days ago</p>
                    </div>
                  </div>
                  
                  <button 
                    className="mt-4 text-[#2E86AB] text-sm font-medium hover:underline"
                    onClick={() => setActivePage('wallet')}
                  >
                    View All Transactions
                  </button>
                </div>
              </div>
              
              <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
                <h2 className="text-xl font-bold mb-4">Create a New Service</h2>
                <p className="mb-4 text-gray-600">
                  Share your skills with the community and earn time points!
                </p>
                <Button
                  variant="primary"
                  leftIcon={<Plus size={18} />}
                  onClick={() => setActivePage('create-service')}
                >
                  Create Service
                </Button>
              </div>
            </div>
          )}
          
          {activeTab === 'myServices' && (
            <div className="animate-fadeIn">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Services</h1>
                <Button 
                  variant="primary" 
                  leftIcon={<Plus size={18} />}
                  onClick={() => setActivePage('create-service')}
                >
                  Add New Service
                </Button>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <p className="text-center py-8 text-gray-500">
                  You haven't created any services yet.
                </p>
                <div className="text-center">
                  <Button
                    variant="primary"
                    leftIcon={<Plus size={18} />}
                    onClick={() => setActivePage('create-service')}
                  >
                    Create Your First Service
                  </Button>
                </div>
              </div>
            </div>
          )}
          
          {/* Placeholder content for other tabs */}
          {(activeTab === 'settings') && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl font-bold mb-6">Settings</h1>
              
              <div className="bg-white rounded-xl p-8 shadow-sm">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Account Settings</h3>
                    <div className="space-y-4">
                      <Button
                        variant="secondary"
                        onClick={() => setActivePage('userProfile')}
                      >
                        Edit Profile
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setActivePage('notifications')}
                      >
                        Notification Preferences
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-medium mb-4">Security</h3>
                    <div className="space-y-4">
                      <Button variant="secondary">
                        Change Password
                      </Button>
                      <Button variant="secondary">
                        Two-Factor Authentication
                      </Button>
                    </div>
                  </div>
                  
                  <div className="pt-6 border-t border-gray-200">
                    <Button
                      variant="outline"
                      className="text-red-600 border-red-600 hover:bg-red-50"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Mobile More Menu */}
          {activeTab === 'more' && (
            <div className="animate-fadeIn">
              <h1 className="text-2xl font-bold mb-6">More Options</h1>
              
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <button
                  className="w-full text-left px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                  onClick={() => setActivePage('notifications')}
                >
                  <div className="flex items-center">
                    <Bell className="mr-3" size={18} />
                    Notifications
                  </div>
                </button>
                
                <button
                  className="w-full text-left px-6 py-4 border-b border-gray-100 hover:bg-gray-50"
                  onClick={() => setActiveTab('settings')}
                >
                  <div className="flex items-center">
                    <Settings className="mr-3" size={18} />
                    Settings
                  </div>
                </button>
                
                <button
                  className="w-full text-left px-6 py-4 text-red-600 hover:bg-red-50"
                  onClick={handleLogout}
                >
                  <div className="flex items-center">
                    <LogOut className="mr-3" size={18} />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;