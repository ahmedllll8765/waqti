import { Service, Transaction } from '../types';

// Categories
export const categories = [
  'Design',
  'Teaching',
  'Programming',
  'Translation',
  'Writing',
  'Music',
  'Cooking',
  'Photography'
];

// Mock services data
export const services: Service[] = [
  {
    id: '1',
    title: 'Professional Web Development',
    description: 'I offer expert web development services using modern technologies like React, Vue, and Node.js. Whether you need a new website, help with an existing project, or advice on best practices, I can help you bring your ideas to life with clean, efficient code.',
    category: 'Programming',
    provider: {
      id: '101',
      name: 'Ahmed Hassan',
      email: 'ahmed@example.com',
      phone: '+971501234567',
      balance: 8,
      joinedAt: new Date('2023-01-15'),
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    hourlyRate: 2,
    location: 'Dubai',
    rating: 4.8,
    reviews: 24,
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '2',
    title: 'Arabic-English Translation',
    description: 'Native Arabic speaker offering professional translation services. I can translate documents, websites, books, and more with accuracy and attention to cultural nuances. Fast turnaround and competitive rates.',
    category: 'Translation',
    provider: {
      id: '102',
      name: 'Layla Mohamed',
      email: 'layla@example.com',
      phone: '+971502345678',
      balance: 12,
      joinedAt: new Date('2023-02-20'),
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    hourlyRate: 1,
    location: 'Abu Dhabi',
    rating: 4.9,
    reviews: 36,
    image: 'https://images.pexels.com/photos/7092613/pexels-photo-7092613.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '3',
    title: 'Graphic Design & Branding',
    description: 'Creative graphic designer specializing in branding, logo design, and marketing materials. I help businesses create a cohesive visual identity that resonates with their target audience and stands out in the market.',
    category: 'Design',
    provider: {
      id: '103',
      name: 'Sara Ali',
      email: 'sara@example.com',
      phone: '+971503456789',
      balance: 9,
      joinedAt: new Date('2023-03-10'),
      avatar: 'https://randomuser.me/api/portraits/women/63.jpg'
    },
    hourlyRate: 2,
    location: 'Sharjah',
    rating: 4.7,
    reviews: 19,
    image: 'https://images.pexels.com/photos/6444/pencil-typography-black-design.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '4',
    title: 'Math Tutoring for All Levels',
    description: 'Experienced math tutor offering personalized lessons for students from elementary to university level. I explain complex concepts in simple terms and help students build confidence in their abilities. Online and in-person sessions available.',
    category: 'Teaching',
    provider: {
      id: '104',
      name: 'Omar Farooq',
      email: 'omar@example.com',
      phone: '+971504567890',
      balance: 15,
      joinedAt: new Date('2023-01-05'),
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    },
    hourlyRate: 1,
    location: 'Dubai',
    rating: 5.0,
    reviews: 42,
    image: 'https://images.pexels.com/photos/6238039/pexels-photo-6238039.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '5',
    title: 'Piano Lessons for Beginners',
    description: 'Classically trained pianist offering lessons for beginners of all ages. Learn proper technique, music theory, and how to read sheet music. Patient and encouraging teaching style. No previous experience necessary.',
    category: 'Music',
    provider: {
      id: '105',
      name: 'Nadia Khan',
      email: 'nadia@example.com',
      phone: '+971505678901',
      balance: 7,
      joinedAt: new Date('2023-04-15'),
      avatar: 'https://randomuser.me/api/portraits/women/29.jpg'
    },
    hourlyRate: 2,
    location: 'Abu Dhabi',
    rating: 4.6,
    reviews: 13,
    image: 'https://images.pexels.com/photos/1246437/pexels-photo-1246437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '6',
    title: 'Content Writing & Copywriting',
    description: 'Professional writer offering content creation for websites, blogs, social media, and marketing materials. SEO-optimized writing that engages your audience and drives conversions. English and Arabic content available.',
    category: 'Writing',
    provider: {
      id: '106',
      name: 'Fatima Hussein',
      email: 'fatima@example.com',
      phone: '+971506789012',
      balance: 10,
      joinedAt: new Date('2023-02-28'),
      avatar: 'https://randomuser.me/api/portraits/women/17.jpg'
    },
    hourlyRate: 1,
    location: 'Dubai',
    rating: 4.8,
    reviews: 27,
    image: 'https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '7',
    title: 'Middle Eastern Cooking Classes',
    description: 'Learn authentic Middle Eastern recipes from an experienced chef. Classes cover traditional dishes from across the region, cooking techniques, and ingredient selection. Small group sessions with hands-on instruction.',
    category: 'Cooking',
    provider: {
      id: '107',
      name: 'Yousef Mahmoud',
      email: 'yousef@example.com',
      phone: '+971507890123',
      balance: 14,
      joinedAt: new Date('2023-03-20'),
      avatar: 'https://randomuser.me/api/portraits/men/41.jpg'
    },
    hourlyRate: 3,
    location: 'Sharjah',
    rating: 4.9,
    reviews: 31,
    image: 'https://images.pexels.com/photos/8250762/pexels-photo-8250762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '8',
    title: 'Professional Photography',
    description: 'Experienced photographer specializing in portraits, events, and commercial photography. Professional equipment and editing included. Digital and print deliverables available.',
    category: 'Photography',
    provider: {
      id: '108',
      name: 'Zainab Ali',
      email: 'zainab@example.com',
      phone: '+971508901234',
      balance: 11,
      joinedAt: new Date('2023-01-25'),
      avatar: 'https://randomuser.me/api/portraits/women/57.jpg'
    },
    hourlyRate: 2,
    location: 'Dubai',
    rating: 4.7,
    reviews: 22,
    image: 'https://images.pexels.com/photos/3373716/pexels-photo-3373716.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '9',
    title: 'Mobile App Development',
    description: 'Develop native and cross-platform mobile apps for iOS and Android. Full-service development from concept to deployment. Experience with React Native, Flutter, and Swift.',
    category: 'Programming',
    provider: {
      id: '109',
      name: 'Khalid Rahman',
      email: 'khalid@example.com',
      phone: '+971509012345',
      balance: 8,
      joinedAt: new Date('2023-04-05'),
      avatar: 'https://randomuser.me/api/portraits/men/55.jpg'
    },
    hourlyRate: 3,
    location: 'Abu Dhabi',
    rating: 4.8,
    reviews: 18,
    image: 'https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  },
  {
    id: '10',
    title: 'English Language Tutoring',
    description: 'Improve your English speaking, writing, and comprehension with a TESOL-certified teacher. Personalized lessons focused on your goals, whether for business, academic, or everyday use.',
    category: 'Teaching',
    provider: {
      id: '110',
      name: 'Aisha Malik',
      email: 'aisha@example.com',
      phone: '+971500123456',
      balance: 13,
      joinedAt: new Date('2023-02-10'),
      avatar: 'https://randomuser.me/api/portraits/women/39.jpg'
    },
    hourlyRate: 1,
    location: 'Dubai',
    rating: 4.9,
    reviews: 37,
    image: 'https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'
  }
];

// Mock transactions data
export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 2,
    description: 'Graphic Design Service',
    date: new Date('2023-06-10T14:30:00'),
    serviceId: '3'
  },
  {
    id: '2',
    type: 'credit',
    amount: 3,
    description: 'Cooking Class',
    date: new Date('2023-06-08T10:15:00'),
    serviceId: '7'
  },
  {
    id: '3',
    type: 'debit',
    amount: 1,
    description: 'English Tutoring Session',
    date: new Date('2023-06-05T16:45:00'),
    serviceId: '10'
  },
  {
    id: '4',
    type: 'credit',
    amount: 2,
    description: 'Web Development Consultation',
    date: new Date('2023-06-02T11:30:00'),
    serviceId: '1'
  },
  {
    id: '5',
    type: 'debit',
    amount: 2,
    description: 'Mobile App Development',
    date: new Date('2023-05-28T09:00:00'),
    serviceId: '9'
  },
  {
    id: '6',
    type: 'credit',
    amount: 1,
    description: 'Translation Services',
    date: new Date('2023-05-25T15:20:00'),
    serviceId: '2'
  }
];