import React, { useState } from 'react';
import { Edit, Star, MapPin, Calendar, Award, MessageSquare, Shield } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import { services } from '../data/mockData';

interface UserProfilePageProps {
  setActivePage: (page: string) => void;
  userId?: string;
}

const UserProfilePage: React.FC<UserProfilePageProps> = ({ setActivePage, userId }) => {
  const { user } = useAuth();
  const { isRTL } = useLanguage();
  const [activeTab, setActiveTab] = useState('overview');
  const [isEditing, setIsEditing] = useState(false);

  // Mock user data - in real app, fetch based on userId
  const profileUser = userId ? {
    id: userId,
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    balance: 8,
    joinedAt: new Date('2023-01-15'),
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Experienced web developer with 5+ years in React, Node.js, and modern web technologies. Passionate about creating beautiful and functional websites.',
    location: 'Dubai, UAE',
    skills: ['React', 'Node.js', 'JavaScript', 'TypeScript', 'MongoDB', 'AWS'],
    rating: 4.8,
    totalReviews: 24,
    completedServices: 45,
    responseTime: '2 hours',
    languages: ['English', 'Arabic'],
    isVerified: true,
    identityVerified: true
  } : user;

  const userServices = services.filter(service => service.provider.id === profileUser?.id);
  const isOwnProfile = !userId || userId === user?.id;

  const mockReviews = [
    {
      id: '1',
      reviewer: 'Sarah Ali',
      rating: 5,
      comment: 'Excellent work! Ahmed delivered exactly what I needed for my website.',
      date: new Date('2023-12-01'),
      service: 'Web Development'
    },
    {
      id: '2',
      reviewer: 'Omar Farooq',
      rating: 5,
      comment: 'Very professional and responsive. Highly recommended!',
      date: new Date('2023-11-15'),
      service: 'React Development'
    },
    {
      id: '3',
      reviewer: 'Layla Mohamed',
      rating: 4,
      comment: 'Good quality work, delivered on time.',
      date: new Date('2023-11-01'),
      service: 'Frontend Development'
    }
  ];

  if (!profileUser) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">User not found</h2>
        <Button variant="secondary" onClick={() => setActivePage('home')}>
          Go Home
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <img
                src={profileUser.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                alt={profileUser.name}
                className="w-24 h-24 rounded-full object-cover"
              />
              {profileUser.identityVerified && (
                <div className="absolute -bottom-1 -right-1 bg-green-500 text-white rounded-full p-1">
                  <Shield size={16} />
                </div>
              )}
            </div>
            
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <h1 className="text-2xl font-bold text-[#2E86AB]">{profileUser.name}</h1>
                    {profileUser.isVerified && (
                      <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                        Verified
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-gray-600 mb-2">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-1" />
                      <span>{profileUser.location}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-1" />
                      <span>Joined {profileUser.joinedAt.toLocaleDateString()}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Star className="text-[#F18F01] mr-1" size={16} />
                      <span className="font-medium">{profileUser.rating}</span>
                      <span className="text-gray-600 ml-1">({profileUser.totalReviews} reviews)</span>
                    </div>
                    <div className="text-gray-600">
                      {profileUser.completedServices} services completed
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 mt-4 md:mt-0">
                  {isOwnProfile ? (
                    <Button
                      variant="secondary"
                      leftIcon={<Edit size={16} />}
                      onClick={() => setIsEditing(true)}
                    >
                      Edit Profile
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="primary"
                        leftIcon={<MessageSquare size={16} />}
                        onClick={() => setActivePage('messages')}
                      >
                        Message
                      </Button>
                      <Button
                        variant="secondary"
                        onClick={() => setActivePage('services')}
                      >
                        View Services
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {profileUser.bio && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-gray-700">{profileUser.bio}</p>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-[#2E86AB]">{profileUser.balance}</div>
            <div className="text-gray-600">Hours Balance</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-[#F18F01]">{profileUser.completedServices}</div>
            <div className="text-gray-600">Completed</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-green-600">{profileUser.rating}</div>
            <div className="text-gray-600">Rating</div>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">{profileUser.responseTime}</div>
            <div className="text-gray-600">Response Time</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="flex border-b">
            {[
              { key: 'overview', label: 'Overview' },
              { key: 'services', label: 'Services' },
              { key: 'reviews', label: 'Reviews' },
              { key: 'portfolio', label: 'Portfolio' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-4 px-6 text-center font-medium ${
                  activeTab === tab.key
                    ? 'border-b-2 border-[#2E86AB] text-[#2E86AB]'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Skills */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.skills?.map(skill => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-[#2E86AB] bg-opacity-10 text-[#2E86AB] rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {profileUser.languages?.map(language => (
                      <span
                        key={language}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Award className="text-[#F18F01]" size={20} />
                      <div>
                        <p className="font-medium">Completed web development project</p>
                        <p className="text-sm text-gray-600">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                      <Star className="text-[#F18F01]" size={20} />
                      <div>
                        <p className="font-medium">Received 5-star review</p>
                        <p className="text-sm text-gray-600">1 week ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'services' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold">Services Offered</h3>
                  {isOwnProfile && (
                    <Button
                      variant="primary"
                      onClick={() => setActivePage('create-service')}
                    >
                      Add New Service
                    </Button>
                  )}
                </div>
                
                {userServices.length === 0 ? (
                  <div className="text-center py-8">
                    <p className="text-gray-600">No services offered yet</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {userServices.map(service => (
                      <div key={service.id} className="border border-gray-200 rounded-lg p-4">
                        <h4 className="font-medium mb-2">{service.title}</h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{service.description}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-[#F18F01] font-medium">{service.hourlyRate} Hours</span>
                          <div className="flex items-center">
                            <Star className="text-[#F18F01] mr-1" size={14} />
                            <span className="text-sm">{service.rating}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Reviews & Ratings</h3>
                
                <div className="space-y-4">
                  {mockReviews.map(review => (
                    <div key={review.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{review.reviewer}</h4>
                          <p className="text-sm text-gray-600">{review.service}</p>
                        </div>
                        <div className="flex items-center">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <Star
                              key={index}
                              className={`w-4 h-4 ${
                                index < review.rating
                                  ? 'text-[#F18F01] fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-gray-600">
                            {review.date.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'portfolio' && (
              <div>
                <h3 className="text-lg font-semibold mb-6">Portfolio</h3>
                <div className="text-center py-8">
                  <p className="text-gray-600">Portfolio items will be displayed here</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;