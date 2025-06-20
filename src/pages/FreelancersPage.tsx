import React, { useState, useEffect } from 'react';
import { Search, Filter, Star, MapPin, Clock, Award, Eye, MessageSquare } from 'lucide-react';
import { User, SearchFilters } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface FreelancersPageProps {
  setActivePage: (page: string) => void;
  onFreelancerClick?: (freelancerId: string) => void;
}

// Mock freelancers data
const mockFreelancers: User[] = [
  {
    id: '1',
    name: 'Ahmed Hassan',
    email: 'ahmed@example.com',
    phone: '+971501234567',
    balance: 25,
    joinedAt: new Date('2023-01-15'),
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    bio: 'Full-stack developer with 5+ years of experience in React, Node.js, and cloud technologies. Passionate about creating scalable web applications.',
    location: 'Dubai, UAE',
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'MongoDB'],
    rating: 4.9,
    totalReviews: 47,
    completedServices: 89,
    responseTime: '1 hour',
    languages: ['English', 'Arabic'],
    reputationScore: 95,
    reliabilityIndex: 'excellent',
    lastActive: new Date(),
    expertiseLevel: 'expert',
    isVerified: true,
    identityVerified: true
  },
  {
    id: '2',
    name: 'Fatima Al-Zahra',
    email: 'fatima@example.com',
    phone: '+971502345678',
    balance: 18,
    joinedAt: new Date('2023-02-20'),
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    bio: 'Creative UI/UX designer specializing in mobile app design and user research. I help businesses create intuitive digital experiences.',
    location: 'Abu Dhabi, UAE',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'User Research', 'Sketch'],
    rating: 4.8,
    totalReviews: 32,
    completedServices: 56,
    responseTime: '2 hours',
    languages: ['English', 'Arabic', 'French'],
    reputationScore: 92,
    reliabilityIndex: 'excellent',
    lastActive: new Date(Date.now() - 30 * 60 * 1000),
    expertiseLevel: 'professional',
    isVerified: true,
    identityVerified: true
  },
  {
    id: '3',
    name: 'Omar Khalil',
    email: 'omar@example.com',
    phone: '+971503456789',
    balance: 12,
    joinedAt: new Date('2023-03-10'),
    avatar: 'https://randomuser.me/api/portraits/men/55.jpg',
    bio: 'Digital marketing specialist with expertise in SEO, social media marketing, and content strategy. Helping businesses grow their online presence.',
    location: 'Sharjah, UAE',
    skills: ['SEO', 'Google Ads', 'Social Media', 'Content Marketing', 'Analytics'],
    rating: 4.7,
    totalReviews: 28,
    completedServices: 41,
    responseTime: '3 hours',
    languages: ['English', 'Arabic'],
    reputationScore: 88,
    reliabilityIndex: 'excellent',
    lastActive: new Date(Date.now() - 2 * 60 * 60 * 1000),
    expertiseLevel: 'professional',
    isVerified: true,
    identityVerified: false
  },
  {
    id: '4',
    name: 'Layla Mohamed',
    email: 'layla@example.com',
    phone: '+971504567890',
    balance: 22,
    joinedAt: new Date('2023-01-25'),
    avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
    bio: 'Professional translator and content writer fluent in Arabic, English, and French. Specializing in technical and business translations.',
    location: 'Dubai, UAE',
    skills: ['Translation', 'Content Writing', 'Copywriting', 'Proofreading', 'Localization'],
    rating: 4.9,
    totalReviews: 51,
    completedServices: 73,
    responseTime: '30 minutes',
    languages: ['Arabic', 'English', 'French'],
    reputationScore: 96,
    reliabilityIndex: 'excellent',
    lastActive: new Date(Date.now() - 15 * 60 * 1000),
    expertiseLevel: 'expert',
    isVerified: true,
    identityVerified: true
  }
];

const FreelancersPage: React.FC<FreelancersPageProps> = ({ setActivePage, onFreelancerClick }) => {
  const { t, isRTL } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [freelancers, setFreelancers] = useState<User[]>(mockFreelancers);
  const [filteredFreelancers, setFilteredFreelancers] = useState<User[]>(mockFreelancers);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    skills: [],
    location: '',
    minRating: 0,
    sortBy: 'rating',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  const allSkills = Array.from(new Set(freelancers.flatMap(f => f.skills || [])));
  const locations = Array.from(new Set(freelancers.map(f => f.location).filter(Boolean)));

  useEffect(() => {
    let result = [...freelancers];

    // Apply search filter
    if (filters.query) {
      result = result.filter(freelancer =>
        freelancer.name.toLowerCase().includes(filters.query!.toLowerCase()) ||
        freelancer.bio?.toLowerCase().includes(filters.query!.toLowerCase()) ||
        freelancer.skills?.some(skill => 
          skill.toLowerCase().includes(filters.query!.toLowerCase())
        )
      );
    }

    // Apply skills filter
    if (filters.skills && filters.skills.length > 0) {
      result = result.filter(freelancer =>
        filters.skills!.some(skill => freelancer.skills?.includes(skill))
      );
    }

    // Apply location filter
    if (filters.location) {
      result = result.filter(freelancer => freelancer.location === filters.location);
    }

    // Apply rating filter
    if (filters.minRating && filters.minRating > 0) {
      result = result.filter(freelancer => (freelancer.rating || 0) >= filters.minRating!);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'rating':
          return filters.sortOrder === 'desc' 
            ? (b.rating || 0) - (a.rating || 0)
            : (a.rating || 0) - (b.rating || 0);
        case 'newest':
          return filters.sortOrder === 'desc'
            ? b.joinedAt.getTime() - a.joinedAt.getTime()
            : a.joinedAt.getTime() - b.joinedAt.getTime();
        default:
          return 0;
      }
    });

    setFilteredFreelancers(result);
  }, [freelancers, filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      skills: [],
      location: '',
      minRating: 0,
      sortBy: 'rating',
      sortOrder: 'desc'
    });
  };

  const getOnlineStatus = (lastActive: Date) => {
    const now = new Date();
    const diff = now.getTime() - lastActive.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    
    if (minutes < 5) return { status: 'online', text: 'Online' };
    if (minutes < 60) return { status: 'recent', text: `${minutes}m ago` };
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return { status: 'away', text: `${hours}h ago` };
    const days = Math.floor(hours / 24);
    return { status: 'offline', text: `${days}d ago` };
  };

  const getReliabilityColor = (index: string) => {
    switch (index) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'average': return 'text-yellow-600 bg-yellow-100';
      case 'poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-[#2E86AB] dark:text-white mb-2">
          {t('freelancers.title') || 'Find Talented Freelancers'}
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          {t('freelancers.subtitle') || 'Connect with skilled professionals ready to help with your projects'}
        </p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t('freelancers.searchPlaceholder') || 'Search freelancers...'}
              value={filters.query || ''}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Location Filter */}
          <select
            value={filters.location || ''}
            onChange={(e) => handleFilterChange('location', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('freelancers.allLocations') || 'All Locations'}</option>
            {locations.map(location => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>

          {/* Rating Filter */}
          <select
            value={filters.minRating || 0}
            onChange={(e) => handleFilterChange('minRating', Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
          >
            <option value={0}>{t('freelancers.anyRating') || 'Any Rating'}</option>
            <option value={4.5}>4.5+ Stars</option>
            <option value={4.0}>4.0+ Stars</option>
            <option value={3.5}>3.5+ Stars</option>
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy || 'rating'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
          >
            <option value="rating">{t('freelancers.sortRating') || 'Highest Rated'}</option>
            <option value="newest">{t('freelancers.sortNewest') || 'Newest Members'}</option>
          </select>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredFreelancers.length} {filteredFreelancers.length === 1 ? 'freelancer' : 'freelancers'} found
        </div>
      </div>

      {/* Freelancers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredFreelancers.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('freelancers.noResults') || 'No freelancers found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('freelancers.noResultsDesc') || 'Try adjusting your search criteria to find more freelancers.'}
              </p>
              <Button variant="secondary" onClick={clearFilters}>
                {t('freelancers.clearFilters') || 'Clear Filters'}
              </Button>
            </div>
          </div>
        ) : (
          filteredFreelancers.map((freelancer, index) => (
            <motion.div
              key={freelancer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer group"
              onClick={() => onFreelancerClick?.(freelancer.id)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start space-x-4 mb-4">
                  <div className="relative">
                    <img
                      src={freelancer.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={freelancer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    {/* Online Status */}
                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                      getOnlineStatus(freelancer.lastActive!).status === 'online' ? 'bg-green-500' :
                      getOnlineStatus(freelancer.lastActive!).status === 'recent' ? 'bg-yellow-500' :
                      'bg-gray-400'
                    }`}></div>
                    {/* Verification Badge */}
                    {freelancer.isVerified && (
                      <div className="absolute -top-1 -right-1 bg-blue-500 text-white rounded-full p-1">
                        <Award size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-[#2E86AB] dark:text-white group-hover:text-[#1a6a8d] transition-colors">
                      {freelancer.name}
                    </h3>
                    <div className="flex items-center space-x-2 mb-1">
                      <div className="flex items-center">
                        <Star className="text-[#F18F01] fill-current" size={14} />
                        <span className="text-sm font-medium ml-1">{freelancer.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({freelancer.totalReviews})</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getReliabilityColor(freelancer.reliabilityIndex!)}`}>
                        {freelancer.reliabilityIndex}
                      </span>
                    </div>
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <MapPin size={12} className="mr-1" />
                      <span>{freelancer.location}</span>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                  {freelancer.bio}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {freelancer.skills?.slice(0, 3).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#2E86AB] bg-opacity-10 text-[#2E86AB] dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {freelancer.skills && freelancer.skills.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{freelancer.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{freelancer.completedServices}</div>
                    <div className="text-gray-500 dark:text-gray-400">Projects</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{freelancer.responseTime}</div>
                    <div className="text-gray-500 dark:text-gray-400">Response</div>
                  </div>
                </div>

                {/* Last Active */}
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                  {getOnlineStatus(freelancer.lastActive!).text}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <Button
                    variant="primary"
                    size="sm"
                    className="flex-1"
                    leftIcon={<Eye size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      onFreelancerClick?.(freelancer.id);
                    }}
                  >
                    View Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<MessageSquare size={14} />}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLoggedIn) {
                        setActivePage('login');
                      } else {
                        setActivePage('messages');
                      }
                    }}
                  >
                    Message
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredFreelancers.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="secondary">
            {t('freelancers.loadMore') || 'Load More Freelancers'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FreelancersPage;