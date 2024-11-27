// utils/dbConnect.js
import mongoose from 'mongoose';

// This function ensures we don't reconnect to the database unnecessarily
const dbConnect = async () => {
    if (mongoose.connections[0].readyState) {
        return; // Already connected
    }

    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        throw new Error('Database connection failed');
    }
};

export default dbConnect;
