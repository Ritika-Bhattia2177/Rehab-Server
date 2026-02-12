require('dotenv').config();
const mongoose = require('mongoose');
const Testimonial = require('./models/Testimonial');

const testimonials = [
  {
    name: 'Rahul S.',
    rating: 5,
    review: 'I walked in feeling lost and hopeless. The doctors and counselors here treated me with kindness and gave me the strength to rebuild my life. I am forever grateful.',
    avatar: '👨',
    verified: true,
    isActive: true
  },
  {
    name: 'Priya M.',
    rating: 5,
    review: 'The environment is safe, supportive, and truly focused on healing. The therapy sessions helped me understand myself and move forward with confidence.',
    avatar: '👩',
    verified: true,
    isActive: true
  },
  {
    name: 'Arjun K.',
    rating: 5,
    review: 'This center didn\'t just help me recover — it helped me rediscover who I am. The staff genuinely care about every patient.',
    avatar: '👨‍💼',
    verified: true,
    isActive: true
  },
  {
    name: 'Sneha D.',
    rating: 5,
    review: 'After struggling for years, I finally found a place that understood my journey. The holistic approach to treatment changed everything for me.',
    avatar: '👩‍⚕️',
    verified: true,
    isActive: true
  },
  {
    name: 'Vikram P.',
    rating: 5,
    review: 'The counselors here are phenomenal. They never judged me and helped me work through my deepest challenges. My family and I are grateful.',
    avatar: '🧑',
    verified: true,
    isActive: true
  }
];

async function seedTestimonials() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery');
    console.log('📦 Connected to MongoDB');

    // Clear existing testimonials
    await Testimonial.deleteMany({});
    console.log('🗑️  Cleared existing testimonials');

    // Insert new testimonials
    const result = await Testimonial.insertMany(testimonials);
    console.log(`✅ Successfully seeded ${result.length} testimonials`);

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding testimonials:', error);
    process.exit(1);
  }
}

seedTestimonials();
