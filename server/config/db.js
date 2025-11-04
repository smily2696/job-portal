import mongoose from "mongoose";

// Function to connect MongoDB
const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("✅ MongoDB connected successfully");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
    } catch (error) {
        console.error("❌ MongoDB connection error:", error.message);
        process.exit(1);
    }
};

export default connectDB;
