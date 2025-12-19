import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import connection from "./database/db.js";

dotenv.config();

const makeAdmin = async () => {
  await connection();

  const userEmail = process.argv[2];
  if (!userEmail) {
    console.error("Please provide an email as a command line argument.");
    process.exit(1);
  }

  try {
    const user = await User.findOne({ email: userEmail });

    if (!user) {
      console.error("User not found.");
      process.exit(1);
    }

    user.role = "admin";
    await user.save();
    console.log(`Successfully promoted ${user.name} (${user.email}) to admin.`);
  } catch (error) {
    console.error("Error making user admin", error);
  } finally {
    mongoose.disconnect();
  }
};

makeAdmin();