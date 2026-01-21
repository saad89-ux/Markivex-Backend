import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import mongoose from "mongoose";
import User from "../models/User.model.js";
import connectDB from "../config/db.js";

const seedAdmin = async () => {
  try {
    await connectDB();

    const exists = await User.findOne({ 
      email: "admin@markivex.com" 
    });

    if (exists) {
      console.log("⚠️  Admin already exists");
      console.log("Email:", exists.email);
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("Admin@123", 12);

    const admin = await User.create({
      name: "Markivex Admin",
      email: "admin@markivex.com",
      password: hashedPassword,
      role: "admin",
    });

    console.log("\n✅ Admin created successfully!");
    console.log("═══════════════════════════════════");
    console.log("Email:    admin@markivex.com");
    console.log("Password: Admin@123");
    console.log("═══════════════════════════════════");
    console.log("⚠️  IMPORTANT: Change password after first login!\n");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error.message);
    process.exit(1);
  }
};

seedAdmin();