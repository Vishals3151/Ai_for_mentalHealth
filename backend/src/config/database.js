import mongoose from 'mongoose';

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      autoIndex: true, retryWrites: true, w: 'majority',
    });
    console.log('🗄️  MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
