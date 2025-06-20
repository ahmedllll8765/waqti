import React, { useState, useEffect } from 'react';
import { Search, Filter, Plus, Clock, DollarSign, MapPin, Calendar, Eye, Users } from 'lucide-react';
import { Project, SearchFilters } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface ProjectsPageProps {
  setActivePage: (page: string) => void;
  onProjectClick?: (projectId: string) => void;
}

// Mock projects data
const mockProjects: Project[] = [
  {
    id: '1',
    title: 'E-commerce Website Development',
    description: 'Looking for an experienced developer to build a modern e-commerce website with payment integration, inventory management, and admin dashboard.',
    category: 'Web Development',
    client: {
      id: 'client1',
      name: 'Sarah Ahmed',
      email: 'sarah@example.com',
      phone: '+971501234567',
      balance: 15,
      joinedAt: new Date('2023-01-15'),
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      rating: 4.8,
      totalReviews: 12
    },
    budget: {
      min: 20,
      max: 30,
      type: 'fixed',
      currency: 'time'
    },
    duration: 30,
    skillsRequired: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    status: 'open',
    visibility: 'public',
    location: 'Dubai, UAE',
    deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['urgent', 'long-term'],
    requirements: [
      'Minimum 3 years experience',
      'Portfolio of similar projects',
      'Available for regular communication'
    ]
  },
  {
    id: '2',
    title: 'Mobile App UI/UX Design',
    description: 'Need a creative designer to create modern and intuitive UI/UX for a fitness tracking mobile application.',
    category: 'Design',
    client: {
      id: 'client2',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+971502345678',
      balance: 8,
      joinedAt: new Date('2023-02-20'),
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      rating: 4.6,
      totalReviews: 8
    },
    budget: {
      min: 10,
      max: 15,
      type: 'fixed',
      currency: 'time'
    },
    duration: 14,
    skillsRequired: ['Figma', 'Adobe XD', 'Prototyping', 'User Research'],
    status: 'open',
    visibility: 'public',
    location: 'Abu Dhabi, UAE',
    deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    tags: ['design', 'mobile'],
    requirements: [
      'Experience with mobile app design',
      'Understanding of iOS and Android guidelines',
      'Ability to create interactive prototypes'
    ]
  },
  {
    id: '3',
    title: 'Content Writing for Tech Blog',
    description: 'Seeking a skilled content writer to create engaging articles about emerging technologies and software development trends.',
    category: 'Writing',
    client: {
      id: 'client3',
      name: 'Fatima Al-Zahra',
      email: 'fatima@example.com',
      phone: '+971503456789',
      balance: 12,
      joinedAt: new Date('2023-03-10'),
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      rating: 4.9,
      totalReviews: 15
    },
    budget: {
      min: 5,
      max: 8,
      type: 'hourly',
      currency: 'time'
    },
    duration: 7,
    skillsRequired: ['Technical Writing', 'SEO', 'Research', 'WordPress'],
    status: 'open',
    visibility: 'public',
    location: 'Remote',
    deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    updatedAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
    tags: ['writing', 'tech', 'remote'],
    requirements: [
      'Native or fluent English',
      'Experience in tech writing',
      'Knowledge of SEO best practices'
    ]
  }
];

const ProjectsPage: React.FC<ProjectsPageProps> = ({ setActivePage, onProjectClick }) => {
  const { t, isRTL } = useLanguage();
  const { isLoggedIn } = useAuth();
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(mockProjects);
  const [filters, setFilters] = useState<SearchFilters>({
    query: '',
    category: '',
    sortBy: 'newest',
    sortOrder: 'desc'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Web Development',
    'Mobile Development',
    'Design',
    'Writing',
    'Marketing',
    'Translation',
    'Data Entry',
    'Consulting'
  ];

  useEffect(() => {
    let result = [...projects];

    // Apply search filter
    if (filters.query) {
      result = result.filter(project =>
        project.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
        project.description.toLowerCase().includes(filters.query!.toLowerCase()) ||
        project.skillsRequired.some(skill => 
          skill.toLowerCase().includes(filters.query!.toLowerCase())
        )
      );
    }

    // Apply category filter
    if (filters.category) {
      result = result.filter(project => project.category === filters.category);
    }

    // Apply sorting
    result.sort((a, b) => {
      switch (filters.sortBy) {
        case 'newest':
          return filters.sortOrder === 'desc' 
            ? b.createdAt.getTime() - a.createdAt.getTime()
            : a.createdAt.getTime() - b.createdAt.getTime();
        case 'price':
          return filters.sortOrder === 'desc'
            ? b.budget.max - a.budget.max
            : a.budget.max - b.budget.max;
        default:
          return 0;
      }
    });

    setFilteredProjects(result);
  }, [projects, filters]);

  const handleFilterChange = (key: keyof SearchFilters, value: any) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      category: '',
      sortBy: 'newest',
      sortOrder: 'desc'
    });
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
    if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return 'Just now';
  };

  const formatDeadline = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return 'Expired';
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `${days} days left`;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#2E86AB] dark:text-white mb-2">
            {t('projects.title') || 'Browse Projects'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {t('projects.subtitle') || 'Find exciting projects to work on and earn time credits'}
          </p>
        </div>
        {isLoggedIn && (
          <Button
            variant="primary"
            leftIcon={<Plus size={18} />}
            onClick={() => setActivePage('create-project')}
            className="mt-4 md:mt-0"
          >
            {t('projects.postProject') || 'Post a Project'}
          </Button>
        )}
      </div>

      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <input
              type="text"
              placeholder={t('projects.searchPlaceholder') || 'Search projects...'}
              value={filters.query || ''}
              onChange={(e) => handleFilterChange('query', e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={filters.category || ''}
            onChange={(e) => handleFilterChange('category', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('projects.allCategories') || 'All Categories'}</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Sort */}
          <select
            value={filters.sortBy || 'newest'}
            onChange={(e) => handleFilterChange('sortBy', e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
          >
            <option value="newest">{t('projects.sortNewest') || 'Newest First'}</option>
            <option value="price">{t('projects.sortPrice') || 'Highest Budget'}</option>
          </select>

          {/* Filter Toggle */}
          <Button
            variant="outline"
            leftIcon={<Filter size={18} />}
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden"
          >
            {t('projects.filters') || 'Filters'}
          </Button>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'} found
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('projects.noResults') || 'No projects found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('projects.noResultsDesc') || 'Try adjusting your search criteria or check back later for new projects.'}
              </p>
              <Button variant="secondary" onClick={clearFilters}>
                {t('projects.clearFilters') || 'Clear Filters'}
              </Button>
            </div>
          </div>
        ) : (
          filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 overflow-hidden cursor-pointer"
              onClick={() => onProjectClick?.(project.id)}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-xl font-semibold text-[#2E86AB] dark:text-white hover:text-[#1a6a8d] transition-colors">
                        {project.title}
                      </h3>
                      {project.tags?.includes('urgent') && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                          Urgent
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {project.description}
                    </p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-2xl font-bold text-[#F18F01]">
                      {project.budget.min}-{project.budget.max}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {project.budget.currency === 'time' ? 'Hours' : 'USD'} • {project.budget.type}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.skillsRequired.slice(0, 4).map(skill => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-[#2E86AB] bg-opacity-10 text-[#2E86AB] dark:bg-blue-900 dark:text-blue-300 text-xs rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                  {project.skillsRequired.length > 4 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full">
                      +{project.skillsRequired.length - 4} more
                    </span>
                  )}
                </div>

                {/* Meta Information */}
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center">
                    <Clock size={14} className="mr-1" />
                    <span>{formatTimeAgo(project.createdAt)}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span className={formatDeadline(project.deadline!).includes('Expired') ? 'text-red-500' : ''}>
                      {formatDeadline(project.deadline!)}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <MapPin size={14} className="mr-1" />
                    <span>{project.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Users size={14} className="mr-1" />
                    <span>{project.proposals?.length || 0} proposals</span>
                  </div>
                </div>

                {/* Client Info */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                  <div className="flex items-center">
                    <img
                      src={project.client.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={project.client.name}
                      className="w-8 h-8 rounded-full object-cover mr-3"
                    />
                    <div>
                      <div className="font-medium text-gray-900 dark:text-white">
                        {project.client.name}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        ⭐ {project.client.rating} ({project.client.totalReviews} reviews)
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="primary"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!isLoggedIn) {
                        setActivePage('login');
                      } else {
                        // Handle proposal submission
                        console.log('Submit proposal for project:', project.id);
                      }
                    }}
                  >
                    {isLoggedIn ? 'Submit Proposal' : 'Login to Apply'}
                  </Button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredProjects.length > 0 && (
        <div className="text-center mt-8">
          <Button variant="secondary">
            {t('projects.loadMore') || 'Load More Projects'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProjectsPage;