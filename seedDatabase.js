require('dotenv').config();
const mongoose = require('mongoose');
const Staff = require('./models/Staff');
const Service = require('./models/Service');
const Resource = require('./models/Resource');
const Blog = require('./models/Blog');
const Facility = require('./models/Facility');
const User = require('./models/User');

// Staff data
const staffData = [
  {
    name: 'Dr. Rajesh Kumar',
    role: 'Doctor',
    specialization: 'Addiction Medicine',
    qualification: 'MBBS, MD (Psychiatry)',
    experience: 15,
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop',
    bio: 'Dr. Kumar has over 15 years of experience in treating substance abuse disorders and mental health conditions.',
    email: 'rajesh.kumar@hopepath.com',
    phone: '+91 98765 43210',
    isActive: true
  },
  {
    name: 'Dr. Priya Sharma',
    role: 'Psychiatrist',
    specialization: 'Behavioral Health',
    qualification: 'MBBS, MD (Psychiatry), DNB',
    experience: 12,
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=300&h=300&fit=crop',
    bio: 'Specializes in cognitive behavioral therapy and psychiatric treatment for addiction recovery.',
    email: 'priya.sharma@hopepath.com',
    phone: '+91 98765 43211',
    isActive: true
  },
  {
    name: 'Amit Patel',
    role: 'Counselor',
    specialization: 'Substance Abuse Counseling',
    qualification: 'MA Psychology, Certified Addiction Counselor',
    experience: 8,
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop',
    bio: 'Experienced counselor focused on individual and group therapy for addiction recovery.',
    email: 'amit.patel@hopepath.com',
    phone: '+91 98765 43212',
    isActive: true
  },
  {
    name: 'Sneha Reddy',
    role: 'Therapist',
    specialization: 'Family Therapy',
    qualification: 'MSW, Licensed Clinical Social Worker',
    experience: 10,
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop',
    bio: 'Helps families heal and rebuild relationships affected by addiction.',
    email: 'sneha.reddy@hopepath.com',
    phone: '+91 98765 43213',
    isActive: true
  },
  {
    name: 'Dr. Arun Mehta',
    role: 'Doctor',
    specialization: 'Internal Medicine',
    qualification: 'MBBS, MD (Internal Medicine)',
    experience: 18,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=300&h=300&fit=crop',
    bio: 'Manages medical complications and physical health during recovery.',
    email: 'arun.mehta@hopepath.com',
    phone: '+91 98765 43214',
    isActive: true
  }
];

// Services data
const servicesData = [
  {
    title: 'Residential Treatment Program',
    description: 'Comprehensive 30-60 day inpatient program with 24/7 medical supervision, individual therapy, group counseling, and holistic wellness activities.',
    category: 'Addiction Recovery',
    duration: '30-60 days',
    price: 150000,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&h=300&fit=crop',
    features: [
      '24/7 Medical Supervision',
      'Individual Therapy Sessions',
      'Group Counseling',
      'Family Therapy',
      'Nutritional Support',
      'Fitness Activities'
    ],
    capacity: 20,
    enrolled: 12,
    isActive: true
  },
  {
    title: 'Outpatient Counseling',
    description: 'Flexible counseling sessions for those who can maintain daily responsibilities while receiving treatment. Includes individual and group therapy.',
    category: 'Counseling',
    duration: '12-16 weeks',
    price: 25000,
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
    features: [
      'Weekly Sessions',
      'Individual Counseling',
      'Group Support',
      'Flexible Scheduling',
      'Family Involvement'
    ],
    capacity: 50,
    enrolled: 32,
    isActive: true
  },
  {
    title: 'Detox Program',
    description: 'Medically supervised detoxification to safely manage withdrawal symptoms with round-the-clock care and support.',
    category: 'Rehabilitation',
    duration: '5-14 days',
    price: 80000,
    image: 'https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=400&h=300&fit=crop',
    features: [
      'Medical Supervision 24/7',
      'Medication Management',
      'Symptom Monitoring',
      'Comfortable Environment',
      'Nutritional Support'
    ],
    capacity: 15,
    enrolled: 8,
    isActive: true
  },
  {
    title: 'Mental Health Therapy',
    description: 'Specialized therapy for depression, anxiety, PTSD, and co-occurring disorders alongside addiction treatment.',
    category: 'Mental Health',
    duration: '8-12 weeks',
    price: 30000,
    image: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=400&h=300&fit=crop',
    features: [
      'Individual Therapy',
      'Cognitive Behavioral Therapy',
      'Mindfulness Training',
      'Stress Management',
      'Medication Support'
    ],
    capacity: 30,
    enrolled: 18,
    isActive: true
  },
  {
    title: 'Family Support Program',
    description: 'Educational and therapeutic support for families dealing with a loved one\'s addiction. Learn coping strategies and rebuild relationships.',
    category: 'Therapy',
    duration: '6-8 weeks',
    price: 15000,
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=300&fit=crop',
    features: [
      'Family Therapy Sessions',
      'Education Workshops',
      'Support Groups',
      'Communication Skills',
      'Relapse Prevention'
    ],
    capacity: 25,
    enrolled: 15,
    isActive: true
  },
  {
    title: 'Yoga & Meditation Therapy',
    description: 'Holistic wellness program combining yoga, meditation, and mindfulness practices to support mental and physical recovery.',
    category: 'Wellness',
    duration: '4-8 weeks',
    price: 20000,
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400&h=300&fit=crop',
    features: [
      'Daily Yoga Sessions',
      'Guided Meditation',
      'Breathing Exercises',
      'Stress Reduction',
      'Mind-Body Connection'
    ],
    capacity: 40,
    enrolled: 28,
    isActive: true
  }
];

// Resources data
const resourcesData = [
  {
    title: 'Understanding Addiction: A Comprehensive Guide',
    description: 'Learn about the science of addiction, how it affects the brain, and the path to recovery.',
    type: 'Article',
    category: 'Recovery',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=300&h=200&fit=crop',
    content: 'Comprehensive article content about understanding addiction...',
    author: 'Dr. Rajesh Kumar',
    isActive: true,
    views: 245
  },
  {
    title: 'Family Guide to Supporting Recovery',
    description: 'Essential tips for families on how to support their loved ones through the recovery journey.',
    type: 'PDF',
    link: 'https://example.com/family-guide.pdf',
    category: 'Family Support',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=300&h=200&fit=crop',
    author: 'Sneha Reddy',
    isActive: true,
    views: 189
  },
  {
    title: 'Meditation for Mental Wellness',
    description: 'Video series on meditation techniques to manage stress, anxiety, and support recovery.',
    type: 'Video',
    link: 'https://youtube.com/example',
    category: 'Wellness',
    thumbnail: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=300&h=200&fit=crop',
    author: 'Wellness Team',
    isActive: true,
    views: 312
  },
  {
    title: 'Relapse Prevention Strategies',
    description: 'Practical strategies and techniques to prevent relapse and maintain long-term sobriety.',
    type: 'Guide',
    category: 'Recovery',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300&h=200&fit=crop',
    content: 'Detailed guide on relapse prevention...',
    author: 'Amit Patel',
    isActive: true,
    views: 428
  },
  {
    title: 'Managing Co-Occurring Mental Health Disorders',
    description: 'Understanding and treating mental health conditions that often accompany addiction.',
    type: 'Article',
    category: 'Mental Health',
    thumbnail: 'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?w=300&h=200&fit=crop',
    content: 'Article about co-occurring disorders...',
    author: 'Dr. Priya Sharma',
    isActive: true,
    views: 267
  }
];

// Blog data
const blogsData = [
  {
    title: 'My Journey From Darkness to Light: A Recovery Story',
    excerpt: 'After years of struggle with addiction, I found hope and healing. Here\'s my story of transformation and the people who helped me along the way.',
    content: 'Full blog content about recovery journey...',
    author: 'Anonymous Patient',
    image: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=400&fit=crop',
    category: 'Recovery Stories',
    tags: ['recovery', 'inspiration', 'hope'],
    isPublished: true,
    views: 892
  },
  {
    title: '10 Essential Health Tips for Sustainable Recovery',
    excerpt: 'Maintaining physical health is crucial for long-term recovery. Discover ten practical tips to support your wellness journey.',
    content: 'Full blog content about health tips...',
    author: 'Dr. Arun Mehta',
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=400&fit=crop',
    category: 'Health Tips',
    tags: ['health', 'wellness', 'recovery'],
    isPublished: true,
    views: 654
  },
  {
    title: 'Breaking the Stigma: Mental Health and Addiction',
    excerpt: 'Understanding the connection between mental health and addiction, and why seeking help is a sign of strength, not weakness.',
    content: 'Full blog content about mental health stigma...',
    author: 'Dr. Priya Sharma',
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=400&fit=crop',
    category: 'Research',
    tags: ['mental health', 'stigma', 'awareness'],
    isPublished: true,
    views: 743
  },
  {
    title: 'New Treatment Approaches in Addiction Medicine',
    excerpt: 'Recent research reveals innovative treatment methods that are transforming addiction recovery outcomes.',
    content: 'Full blog content about new treatments...',
    author: 'Dr. Rajesh Kumar',
    image: 'https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=800&h=400&fit=crop',
    category: 'News',
    tags: ['research', 'innovation', 'treatment'],
    isPublished: true,
    views: 521
  }
];

// Facility data
const facilitiesData = [
  {
    name: 'Modern Medical Facility',
    description: 'State-of-the-art medical equipment and comfortable patient rooms with 24/7 monitoring systems.',
    category: 'Medical',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=400&fit=crop',
    features: ['ICU', 'Emergency Care', 'Lab Testing', 'Pharmacy'],
    isActive: true
  },
  {
    name: 'Therapy Rooms',
    description: 'Private and group therapy spaces designed for comfort and confidentiality.',
    category: 'Therapeutic',
    image: 'https://images.unsplash.com/photo-1523287562758-66c7fc58967f?w=600&h=400&fit=crop',
    features: ['Individual Rooms', 'Group Spaces', 'Art Therapy', 'Music Room'],
    isActive: true
  },
  {
    name: 'Fitness & Recreation Center',
    description: 'Gym, yoga studio, sports facilities, and outdoor recreation areas for physical wellness.',
    category: 'Recreational',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop',
    features: ['Gym', 'Yoga Studio', 'Sports Court', 'Walking Trails'],
    isActive: true
  },
  {
    name: 'Comfortable Accommodation',
    description: 'Clean, comfortable rooms with modern amenities ensuring a home-like environment.',
    category: 'Accommodation',
    image: 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=600&h=400&fit=crop',
    features: ['Private Rooms', 'Shared Rooms', 'Wi-Fi', 'Common Areas'],
    isActive: true
  },
  {
    name: 'Dining Hall & Nutrition Center',
    description: 'Nutritious meals prepared by expert chefs with dietary considerations for recovery.',
    category: 'Support',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=400&fit=crop',
    features: ['Healthy Meals', 'Special Diets', 'Nutrition Counseling'],
    isActive: true
  }
];

// User data (including an admin)
const usersData = [
  {
    name: 'Admin User',
    email: 'admin@hopepath.com',
    password: 'admin123',
    role: 'admin',
    phone: '+91 98765 00000',
    isActive: true
  },
  {
    name: 'Test Patient',
    email: 'patient@test.com',
    password: 'patient123',
    role: 'patient',
    phone: '+91 98765 11111',
    isActive: true
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery');
    console.log('📦 Connected to MongoDB');

    // Clear existing data
    await Staff.deleteMany({});
    await Service.deleteMany({});
    await Resource.deleteMany({});
    await Blog.deleteMany({});
    await Facility.deleteMany({});
    await User.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Insert new data
    const staff = await Staff.insertMany(staffData);
    console.log(`✅ Seeded ${staff.length} staff members`);

    const services = await Service.insertMany(servicesData);
    console.log(`✅ Seeded ${services.length} services`);

    const resources = await Resource.insertMany(resourcesData);
    console.log(`✅ Seeded ${resources.length} resources`);

    const blogs = await Blog.insertMany(blogsData);
    console.log(`✅ Seeded ${blogs.length} blogs`);

    const facilities = await Facility.insertMany(facilitiesData);
    console.log(`✅ Seeded ${facilities.length} facilities`);

    const users = await User.insertMany(usersData);
    console.log(`✅ Seeded ${users.length} users`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@hopepath.com / admin123');
    console.log('Patient: patient@test.com / patient123');

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
