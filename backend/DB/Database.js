import mongoose from "mongoose";

export const connectDB = async () => {
    const db = process.env.MONGO_URL || "mongodb://127.0.0.1:27017/expensetracker";

    try {
        const { connection } = await mongoose.connect(db, { useNewUrlParser: true });
        console.log(`MongoDB Connected to ${connection.host}`);
    } catch (error) {
        console.error(`MongoDB Connection Error: ${error.message}`);
    }
};