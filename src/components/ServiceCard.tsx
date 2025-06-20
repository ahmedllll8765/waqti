import React from 'react';
import { Clock, Star, MapPin } from 'lucide-react';
import { Service } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface ServiceCardProps {
  service: Service;
  onClick?: () => void;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onClick }) => {
  const { isRTL } = useLanguage();
  
  // Icons mapping for service categories
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'design':
        return <i className="fas fa-palette"></i>;
      case 'teaching':
        return <i className="fas fa-chalkboard-teacher"></i>;
      case 'programming':
        return <i className="fas fa-code"></i>;
      case 'translation':
        return <i className="fas fa-language"></i>;
      case 'writing':
        return <i className="fas fa-pen-fancy"></i>;
      case 'music':
        return <i className="fas fa-music"></i>;
      case 'cooking':
        return <i className="fas fa-utensils"></i>;
      default:
        return <i className="fas fa-briefcase"></i>;
    }
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border border-gray-100 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      <div className="h-40 md:h-48 overflow-hidden relative">
        <img 
          src={service.image} 
          alt={service.title} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-white bg-opacity-90 text-[#2E86AB] text-xs font-medium rounded-full">
            {service.category}
          </span>
        </div>
      </div>
      
      <div className="p-4 md:p-6">
        <div className={`flex items-start mb-3 md:mb-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#2E86AB] bg-opacity-10 flex items-center justify-center text-[#2E86AB] text-lg md:text-xl flex-shrink-0">
            {getCategoryIcon(service.category)}
          </div>
          <div className={`${isRTL ? 'mr-3' : 'ml-3'} min-w-0 flex-1`}>
            <h3 className="text-base md:text-lg font-semibold text-[#2E86AB] line-clamp-2 leading-tight">
              {service.title}
            </h3>
          </div>
        </div>
        
        <p className="text-gray-600 mb-3 md:mb-4 line-clamp-2 text-sm md:text-base leading-relaxed">
          {service.description}
        </p>
        
        <div className={`flex items-center justify-between mt-4 md:mt-5 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <img 
              src={service.provider.avatar || "https://randomuser.me/api/portraits/men/32.jpg"} 
              alt={service.provider.name} 
              className="w-6 h-6 md:w-8 md:h-8 rounded-full object-cover"
              loading="lazy"
            />
            <span className={`text-xs md:text-sm text-gray-700 font-medium ${isRTL ? 'ml-2' : 'ml-2'} truncate`}>
              {service.provider.name}
            </span>
          </div>
          
          <div className="px-2 md:px-3 py-1 bg-gray-100 rounded-full text-xs md:text-sm font-semibold text-[#2E86AB] flex items-center flex-shrink-0">
            <Clock className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            {service.hourlyRate} {service.hourlyRate === 1 ? 'Hour' : 'Hours'}
          </div>
        </div>
        
        <div className={`flex items-center justify-between mt-3 md:mt-4 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
          <div className={`flex items-center ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={index}
                  className={`w-3 h-3 md:w-4 md:h-4 ${
                    index < service.rating
                      ? 'text-[#F18F01] fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-xs md:text-sm text-gray-500 ${isRTL ? 'ml-2' : 'ml-2'}`}>
              ({service.reviews})
            </span>
          </div>
          
          <div className={`flex items-center text-xs md:text-sm text-gray-500 ${isRTL ? 'flex-row-reverse' : 'flex-row'}`}>
            <MapPin className="w-3 h-3 md:w-4 md:h-4 mr-1" />
            <span className="truncate">{service.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;