import React, { useState } from 'react';
import { Calendar, Clock, User, CheckCircle, XCircle, AlertCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';

interface Booking {
  id: string;
  serviceId: string;
  serviceTitle: string;
  clientId: string;
  clientName: string;
  providerId: string;
  providerName: string;
  status: 'pending' | 'confirmed' | 'in-progress' | 'completed' | 'cancelled';
  date: Date;
  duration: number;
  totalHours: number;
  notes?: string;
  createdAt: Date;
}

interface BookingManagementPageProps {
  setActivePage: (page: string) => void;
}

const BookingManagementPage: React.FC<BookingManagementPageProps> = ({ setActivePage }) => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState<'all' | 'pending' | 'confirmed' | 'completed'>('all');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);

  // Mock bookings data
  const [bookings] = useState<Booking[]>([
    {
      id: '1',
      serviceId: '1',
      serviceTitle: 'Professional Web Development',
      clientId: '201',
      clientName: 'Sarah Ali',
      providerId: user?.id || '',
      providerName: user?.name || '',
      status: 'pending',
      date: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
      duration: 2,
      totalHours: 4,
      notes: 'Need a modern e-commerce website with payment integration',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2)
    },
    {
      id: '2',
      serviceId: '2',
      serviceTitle: 'Arabic-English Translation',
      clientId: user?.id || '',
      clientName: user?.name || '',
      providerId: '102',
      providerName: 'Layla Mohamed',
      status: 'confirmed',
      date: new Date(Date.now() + 1000 * 60 * 60 * 48), // Day after tomorrow
      duration: 1,
      totalHours: 1,
      notes: 'Business documents translation needed urgently',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 6)
    },
    {
      id: '3',
      serviceId: '3',
      serviceTitle: 'Graphic Design & Branding',
      clientId: '203',
      clientName: 'Omar Farooq',
      providerId: user?.id || '',
      providerName: user?.name || '',
      status: 'completed',
      date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3 days ago
      duration: 3,
      totalHours: 6,
      notes: 'Logo design and brand identity package',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5)
    },
    {
      id: '4',
      serviceId: '4',
      serviceTitle: 'Math Tutoring for All Levels',
      clientId: user?.id || '',
      clientName: user?.name || '',
      providerId: '104',
      providerName: 'Omar Farooq',
      status: 'in-progress',
      date: new Date(),
      duration: 1,
      totalHours: 1,
      notes: 'Help with calculus problems',
      createdAt: new Date(Date.now() - 1000 * 60 * 60 * 4)
    }
  ]);

  const filteredBookings = bookings.filter(booking => {
    if (activeTab === 'all') return true;
    return booking.status === activeTab;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="text-yellow-500" size={20} />;
      case 'confirmed':
        return <CheckCircle className="text-blue-500" size={20} />;
      case 'in-progress':
        return <Clock className="text-purple-500" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <AlertCircle className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-purple-100 text-purple-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleBookingAction = (bookingId: string, action: 'accept' | 'reject' | 'complete' | 'cancel') => {
    // Handle booking actions
    console.log(`${action} booking ${bookingId}`);
    setShowModal(false);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const isProvider = (booking: Booking) => booking.providerId === user?.id;

  if (!user) {
    setActivePage('login');
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-2xl font-bold text-[#2E86AB] mb-4">Booking Management</h1>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
            {[
              { key: 'all', label: 'All Bookings' },
              { key: 'pending', label: 'Pending' },
              { key: 'confirmed', label: 'Confirmed' },
              { key: 'completed', label: 'Completed' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === tab.key
                    ? 'bg-white text-[#2E86AB] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {filteredBookings.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-8 text-center">
              <Calendar className="mx-auto mb-4 text-gray-400" size={48} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
              <p className="text-gray-600">
                {activeTab === 'all' 
                  ? "You don't have any bookings yet."
                  : `No ${activeTab} bookings at the moment.`}
              </p>
            </div>
          ) : (
            filteredBookings.map(booking => (
              <div key={booking.id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(booking.status)}
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="text-lg font-medium text-gray-900 truncate">
                            {booking.serviceTitle}
                          </h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </div>
                        
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                          <div className="flex items-center">
                            <User size={16} className="mr-1" />
                            <span>
                              {isProvider(booking) ? `Client: ${booking.clientName}` : `Provider: ${booking.providerName}`}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-1" />
                            <span>{formatDate(booking.date)}</span>
                          </div>
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{booking.duration} hours • {booking.totalHours} time credits</span>
                          </div>
                        </div>
                        
                        {booking.notes && (
                          <p className="text-gray-700 text-sm">{booking.notes}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-4 lg:mt-0 lg:ml-4">
                    <Button
                      variant="secondary"
                      size="sm"
                      leftIcon={<MessageSquare size={16} />}
                      onClick={() => setActivePage('messages')}
                    >
                      Message
                    </Button>
                    
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowModal(true);
                      }}
                    >
                      {booking.status === 'pending' && isProvider(booking) ? 'Respond' :
                       booking.status === 'confirmed' ? 'Manage' :
                       booking.status === 'in-progress' ? 'Complete' :
                       'View Details'}
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Booking Details Modal */}
        {showModal && selectedBooking && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-[#2E86AB]">Booking Details</h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle size={24} />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Service</h4>
                  <p className="text-gray-700">{selectedBooking.serviceTitle}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">
                      {isProvider(selectedBooking) ? 'Client' : 'Provider'}
                    </h4>
                    <p className="text-gray-700">
                      {isProvider(selectedBooking) ? selectedBooking.clientName : selectedBooking.providerName}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Status</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedBooking.status)}`}>
                      {selectedBooking.status.charAt(0).toUpperCase() + selectedBooking.status.slice(1)}
                    </span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">Scheduled Date & Time</h4>
                  <p className="text-gray-700">{formatDate(selectedBooking.date)}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Duration</h4>
                    <p className="text-gray-700">{selectedBooking.duration} hours</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Total Cost</h4>
                    <p className="text-gray-700">{selectedBooking.totalHours} time credits</p>
                  </div>
                </div>
                
                {selectedBooking.notes && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-2">Notes</h4>
                    <p className="text-gray-700">{selectedBooking.notes}</p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                <Button
                  variant="secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </Button>
                
                {selectedBooking.status === 'pending' && isProvider(selectedBooking) && (
                  <>
                    <Button
                      variant="outline"
                      onClick={() => handleBookingAction(selectedBooking.id, 'reject')}
                      className="text-red-600 border-red-600 hover:bg-red-50"
                    >
                      Decline
                    </Button>
                    <Button
                      variant="primary"
                      onClick={() => handleBookingAction(selectedBooking.id, 'accept')}
                    >
                      Accept
                    </Button>
                  </>
                )}
                
                {selectedBooking.status === 'confirmed' && (
                  <Button
                    variant="outline"
                    onClick={() => handleBookingAction(selectedBooking.id, 'cancel')}
                    className="text-red-600 border-red-600 hover:bg-red-50"
                  >
                    Cancel
                  </Button>
                )}
                
                {selectedBooking.status === 'in-progress' && (
                  <Button
                    variant="primary"
                    onClick={() => handleBookingAction(selectedBooking.id, 'complete')}
                  >
                    Mark Complete
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingManagementPage;