import React, { useState } from 'react';
import { Clock, ChevronLeft, Star, Calendar, User } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { services } from '../data/mockData';

interface ServiceDetailPageProps {
  serviceId: string;
  setActivePage: (page: string) => void;
  goBack: () => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ serviceId, setActivePage, goBack }) => {
  const { t, isRTL } = useLanguage();
  const { user, isLoggedIn } = useAuth();
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [duration, setDuration] = useState(1);
  
  // Find the selected service
  const service = services.find((s) => s.id === serviceId);
  
  if (!service) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Service not found</h2>
        <Button variant="secondary" onClick={goBack}>
          Go Back
        </Button>
      </div>
    );
  }
  
  const totalHours = duration * service.hourlyRate;
  const canBook = isLoggedIn && user!.balance >= totalHours;
  
  const handleBookNow = () => {
    if (!isLoggedIn) {
      setActivePage('login');
      return;
    }
    
    if (canBook) {
      setIsBookingModalOpen(true);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={goBack}
        className={`flex items-center mb-6 text-gray-600 hover:text-gray-900 ${
          isRTL ? 'flex-row-reverse' : 'flex-row'
        }`}
      >
        <ChevronLeft className={`${isRTL ? 'ml-1 rotate-180' : 'mr-1'}`} size={18} />
        <span>Back to services</span>
      </button>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="h-64 md:h-80 relative">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
            <span className="inline-block px-3 py-1 bg-white text-[#2E86AB] rounded-full text-sm font-medium">
              {service.category}
            </span>
          </div>
        </div>
        
        <div className="p-6">
          <div className={`flex justify-between items-start mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <h1 className="text-2xl font-bold text-[#2E86AB]">{service.title}</h1>
            <div className="flex items-center rounded-full bg-gray-100 px-4 py-2">
              <Clock className={`${isRTL ? 'ml-2' : 'mr-2'}`} size={18} />
              <span className="font-semibold text-[#F18F01]">
                {service.hourlyRate} {service.hourlyRate === 1 ? 'Hour' : 'Hours'}
              </span>
            </div>
          </div>
          
          <div className={`flex flex-wrap gap-3 mb-6 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <User className={`${isRTL ? 'ml-1' : 'mr-1'}`} size={14} />
              {service.provider.name}
            </span>
            
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <span className={`${isRTL ? 'ml-1' : 'mr-1'}`}>{service.location}</span>
            </span>
            
            <span className="inline-flex items-center px-3 py-1 bg-gray-100 rounded-full text-sm">
              <Star className={`${isRTL ? 'ml-1' : 'mr-1'} text-[#F18F01]`} size={14} />
              {service.rating} ({service.reviews} reviews)
            </span>
          </div>
          
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>Description</h2>
            <p className={`text-gray-700 leading-relaxed ${isRTL ? 'text-right' : 'text-left'}`}>
              {service.description}
            </p>
          </div>
          
          <div className="mb-8">
            <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>About the Provider</h2>
            <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
              <img
                src={service.provider.avatar || "https://randomuser.me/api/portraits/men/32.jpg"}
                alt={service.provider.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div className={`${isRTL ? 'mr-4 text-right' : 'ml-4'}`}>
                <h3 className="font-semibold text-lg">{service.provider.name}</h3>
                <div className="flex items-center mt-1">
                  <Star className={`${isRTL ? 'ml-1' : 'mr-1'} text-[#F18F01]`} size={14} />
                  <span>{service.rating} ({service.reviews} reviews)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-6">
            <Button
              variant="primary"
              size="lg"
              leftIcon={<Calendar />}
              className="w-full"
              onClick={handleBookNow}
              disabled={isLoggedIn && !canBook}
            >
              {!isLoggedIn ? 'Login to Book' : 
               !canBook ? `Insufficient Balance (Need ${totalHours} Hours)` : 
               'Book Now'}
            </Button>
            
            {isLoggedIn && !canBook && (
              <p className="text-center mt-3 text-red-600">
                You need {totalHours} hours to book this service. Your current balance: {user!.balance} hours.
              </p>
            )}
          </div>
        </div>
      </div>
      
      {/* Booking Modal */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h3 className="text-xl font-bold text-[#2E86AB] mb-6">Book {service.title}</h3>
            
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Select Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2 font-medium">Select Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB]"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2 font-medium">Duration (hours)</label>
                <div className="flex items-center">
                  <button 
                    type="button"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={() => setDuration(Math.max(1, duration - 1))}
                  >
                    <i className="fas fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={duration}
                    onChange={(e) => setDuration(parseInt(e.target.value) || 1)}
                    className="w-20 mx-4 text-center py-2 border border-gray-300 rounded-lg"
                  />
                  <button 
                    type="button"
                    className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center"
                    onClick={() => setDuration(duration + 1)}
                  >
                    <i className="fas fa-plus"></i>
                  </button>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between mb-2">
                  <span>Rate per hour:</span>
                  <span>{service.hourlyRate} Hours</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Duration:</span>
                  <span>{duration} {duration === 1 ? 'Hour' : 'Hours'}</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>{totalHours} Hours</span>
                </div>
              </div>
              
              <div className="flex gap-4">
                <Button 
                  variant="secondary" 
                  className="flex-1"
                  onClick={() => setIsBookingModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button 
                  variant="primary" 
                  className="flex-1"
                  disabled={!date || !time}
                >
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ServiceDetailPage;