import React, { useState, useEffect } from 'react';
import { Search, Calendar, User, Eye, Heart, MessageSquare, Tag } from 'lucide-react';
import { BlogPost } from '../types';
import { useLanguage } from '../context/LanguageContext';
import Button from '../components/Button';
import { motion } from 'framer-motion';

interface BlogPageProps {
  setActivePage: (page: string) => void;
  onPostClick?: (postId: string) => void;
}

// Mock blog posts data
const mockPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Future of Time-Based Economy: How Waqti is Revolutionizing Service Exchange',
    slug: 'future-time-based-economy-waqti',
    content: 'In a world where traditional monetary systems are being challenged...',
    excerpt: 'Explore how time-based currencies are changing the way we think about value exchange and community collaboration.',
    author: {
      id: 'author1',
      name: 'Dr. Sarah Ahmed',
      email: 'sarah@waqti.com',
      phone: '',
      balance: 0,
      joinedAt: new Date('2023-01-01'),
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg'
    },
    category: 'Economy',
    tags: ['time-economy', 'innovation', 'future'],
    featuredImage: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    published: true,
    publishedAt: new Date('2024-01-15'),
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-15'),
    views: 1250,
    likes: 89
  },
  {
    id: '2',
    title: '10 Tips for Successful Freelancing on Time-Exchange Platforms',
    slug: 'tips-successful-freelancing-time-exchange',
    content: 'Freelancing on time-exchange platforms requires a different approach...',
    excerpt: 'Learn the essential strategies for building a successful freelance career using time as currency.',
    author: {
      id: 'author2',
      name: 'Ahmed Hassan',
      email: 'ahmed@waqti.com',
      phone: '',
      balance: 0,
      joinedAt: new Date('2023-01-01'),
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg'
    },
    category: 'Freelancing',
    tags: ['freelancing', 'tips', 'success'],
    featuredImage: 'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg',
    published: true,
    publishedAt: new Date('2024-01-12'),
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-12'),
    views: 890,
    likes: 67
  },
  {
    id: '3',
    title: 'Building Trust in Digital Service Marketplaces',
    slug: 'building-trust-digital-service-marketplaces',
    content: 'Trust is the foundation of any successful marketplace...',
    excerpt: 'Discover how verification systems and community feedback create safer online service exchanges.',
    author: {
      id: 'author3',
      name: 'Fatima Al-Zahra',
      email: 'fatima@waqti.com',
      phone: '',
      balance: 0,
      joinedAt: new Date('2023-01-01'),
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg'
    },
    category: 'Technology',
    tags: ['trust', 'security', 'marketplace'],
    featuredImage: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    published: true,
    publishedAt: new Date('2024-01-10'),
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-10'),
    views: 654,
    likes: 45
  }
];

const BlogPage: React.FC<BlogPageProps> = ({ setActivePage, onPostClick }) => {
  const { t, isRTL } = useLanguage();
  const [posts, setPosts] = useState<BlogPost[]>(mockPosts);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(mockPosts);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const categories = Array.from(new Set(posts.map(post => post.category)));
  const allTags = Array.from(new Set(posts.flatMap(post => post.tags)));

  useEffect(() => {
    let result = [...posts];

    // Apply search filter
    if (searchQuery) {
      result = result.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply category filter
    if (selectedCategory) {
      result = result.filter(post => post.category === selectedCategory);
    }

    // Apply tag filter
    if (selectedTag) {
      result = result.filter(post => post.tags.includes(selectedTag));
    }

    // Sort by publish date (newest first)
    result.sort((a, b) => {
      const dateA = a.publishedAt || a.createdAt;
      const dateB = b.publishedAt || b.createdAt;
      return dateB.getTime() - dateA.getTime();
    });

    setFilteredPosts(result);
  }, [posts, searchQuery, selectedCategory, selectedTag]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedTag('');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-[#2E86AB] dark:text-white mb-4">
          {t('blog.title') || 'Waqti Blog'}
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          {t('blog.subtitle') || 'Insights, tips, and stories from the world of time-based service exchange'}
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
              placeholder={t('blog.searchPlaceholder') || 'Search articles...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2E86AB] dark:bg-gray-700 dark:text-white"
          >
            <option value="">{t('blog.allCategories') || 'All Categories'}</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Clear Filters */}
          {(searchQuery || selectedCategory || selectedTag) && (
            <Button variant="outline" onClick={clearFilters}>
              {t('blog.clearFilters') || 'Clear Filters'}
            </Button>
          )}
        </div>

        {/* Popular Tags */}
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('blog.popularTags') || 'Popular Tags'}
          </h3>
          <div className="flex flex-wrap gap-2">
            {allTags.slice(0, 8).map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? '' : tag)}
                className={`px-3 py-1 rounded-full text-sm transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#2E86AB] text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
          {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
        </div>
      </div>

      {/* Featured Post */}
      {filteredPosts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden mb-8 cursor-pointer group"
          onClick={() => onPostClick?.(filteredPosts[0].id)}
        >
          <div className="md:flex">
            <div className="md:w-1/2">
              <img
                src={filteredPosts[0].featuredImage}
                alt={filteredPosts[0].title}
                className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="md:w-1/2 p-8">
              <div className="flex items-center space-x-2 mb-3">
                <span className="px-3 py-1 bg-[#F18F01] text-white text-sm rounded-full">
                  Featured
                </span>
                <span className="px-3 py-1 bg-[#2E86AB] bg-opacity-10 text-[#2E86AB] text-sm rounded-full">
                  {filteredPosts[0].category}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-[#2E86AB] dark:text-white mb-3 group-hover:text-[#1a6a8d] transition-colors">
                {filteredPosts[0].title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                {filteredPosts[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <img
                      src={filteredPosts[0].author.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={filteredPosts[0].author.name}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span>{filteredPosts[0].author.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar size={14} className="mr-1" />
                    <span>{formatDate(filteredPosts[0].publishedAt || filteredPosts[0].createdAt)}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-3 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <Eye size={14} className="mr-1" />
                    <span>{filteredPosts[0].views}</span>
                  </div>
                  <div className="flex items-center">
                    <Heart size={14} className="mr-1" />
                    <span>{filteredPosts[0].likes}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.slice(1).length === 0 ? (
          <div className="col-span-full text-center py-12">
            <div className="max-w-md mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {t('blog.noResults') || 'No articles found'}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {t('blog.noResultsDesc') || 'Try adjusting your search criteria or check back later for new content.'}
              </p>
              <Button variant="secondary" onClick={clearFilters}>
                {t('blog.clearFilters') || 'Clear Filters'}
              </Button>
            </div>
          </div>
        ) : (
          filteredPosts.slice(1).map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden cursor-pointer group hover:shadow-lg transition-all duration-300"
              onClick={() => onPostClick?.(post.id)}
            >
              <div className="relative">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-2 py-1 bg-[#2E86AB] bg-opacity-90 text-white text-xs rounded-full">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-lg font-semibold text-[#2E86AB] dark:text-white mb-2 group-hover:text-[#1a6a8d] transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {post.tags.slice(0, 2).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 text-xs rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                
                {/* Meta */}
                <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                  <div className="flex items-center">
                    <img
                      src={post.author.avatar || 'https://randomuser.me/api/portraits/men/1.jpg'}
                      alt={post.author.name}
                      className="w-5 h-5 rounded-full mr-2"
                    />
                    <span>{post.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center">
                      <Eye size={12} className="mr-1" />
                      <span>{post.views}</span>
                    </div>
                    <div className="flex items-center">
                      <Heart size={12} className="mr-1" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  {formatDate(post.publishedAt || post.createdAt)}
                </div>
              </div>
            </motion.article>
          ))
        )}
      </div>

      {/* Load More */}
      {filteredPosts.length > 0 && (
        <div className="text-center mt-12">
          <Button variant="secondary">
            {t('blog.loadMore') || 'Load More Articles'}
          </Button>
        </div>
      )}

      {/* Newsletter Signup */}
      <div className="bg-gradient-to-r from-[#2E86AB] to-[#1a6a8d] rounded-xl p-8 mt-12 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">
          {t('blog.newsletter.title') || 'Stay Updated'}
        </h3>
        <p className="mb-6 opacity-90">
          {t('blog.newsletter.description') || 'Get the latest insights and tips delivered to your inbox'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <input
            type="email"
            placeholder={t('blog.newsletter.emailPlaceholder') || 'Enter your email'}
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
          />
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#2E86AB]">
            {t('blog.newsletter.subscribe') || 'Subscribe'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;