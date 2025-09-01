import mongoose from "mongoose";

// Add event listeners once
mongoose.connection.on('connected', () => console.log('Database Connected'));
mongoose.connection.on('error', (err) => console.error('MongoDB connection error:', err));

// Connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/edulearn`);
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error.message);
        process.exit(1); // Optional: exit process on failure
    }
};

export default connectDB;