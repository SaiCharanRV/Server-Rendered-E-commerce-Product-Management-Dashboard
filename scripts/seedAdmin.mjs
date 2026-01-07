// scripts/seedAdmin.mjs
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI in .env.local');
  process.exit(1);
}

// Minimal User Schema for seeding
const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' },
});

const User = mongoose.models.User || mongoose.model('User', UserSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB.');

    const email = 'admin@test.com'; // YOUR DUMMY EMAIL
    const password = 'admin123';    // YOUR DUMMY PASSWORD

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log('Admin user already exists.');
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      name: 'Primary Admin',
      email: email,
      password: hashedPassword,
      role: 'admin',
    });

    console.log('✅ Admin created successfully!');
    console.log(`Email: ${email}`);
    console.log(`Password: ${password}`);
  } catch (error) {
    console.error('Error seeding admin:', error);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

seed();