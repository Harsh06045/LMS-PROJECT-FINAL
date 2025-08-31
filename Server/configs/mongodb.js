import mongoose from "mongoose";

// Connect to the MongoDB database
const connectDB = async () => {
  try {
    // Check if MONGODB_URI is defined
    if (!process.env.MONGODB_URI) {
      console.log('MONGODB_URI not found, using local MongoDB');
      process.env.MONGODB_URI = 'mongodb://localhost:27017';
    }

    // Add connection event listeners
    mongoose.connection.on('connected', () => console.log('Database Connected'));
    mongoose.connection.on('error', (err) => console.log('Database Connection Error:', err));
    mongoose.connection.on('disconnected', () => console.log('Database Disconnected'));

    // Connect with options to handle SSL issues
    const mongoURI = process.env.MONGODB_URI.includes('mongodb.net') 
      ? `${process.env.MONGODB_URI}/LMS?retryWrites=true&w=majority`
      : `${process.env.MONGODB_URI}/LMS`;

    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(mongoURI, { serverSelectionTimeoutMS: 5000 });
    console.log('MongoDB connection successful');
  } catch (error) {
    console.error('MongoDB connection failed:', error.message);
    // Don't exit the process, let the server continue without DB
  }
}

export default connectDB;
