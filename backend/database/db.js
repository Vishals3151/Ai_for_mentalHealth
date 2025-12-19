import mongoose from "mongoose";

export const Connection = async () => {
    const URL = process.env.MONGO_URI;  // ✅ fixed spelling

    try {
        await mongoose.connect(URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
        });
        console.log("✅ Database connected successfully!");
    } catch (error) {
        console.error("❌ Error while connecting with the database:", error.message);
    }
};

export default Connection;
