import dotenv from "dotenv";
dotenv.config();


import app from "./app.js";
import connectDB from "./config/db.js";

const PORT = process.env.PORT || 5000;

// ----- CONNECT TO DATABASE -----
connectDB();

// Graceful shutdown for production
process.on("SIGINT", async () => {
  console.log("\n⚠️  SIGINT received. Closing MongoDB connection...");
  await import("mongoose").then(({ default: mongoose }) => mongoose.connection.close());
  console.log("✅ MongoDB connection closed. Exiting process.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  console.log("\n⚠️  SIGTERM received. Closing MongoDB connection...");
  await import("mongoose").then(({ default: mongoose }) => mongoose.connection.close());
  console.log("✅ MongoDB connection closed. Exiting process.");
  process.exit(0);
});

// ----- START SERVER -----
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════╗
║                                       ║
║   🚀 Markivex Backend API             ║
║                                       ║
║   Server: http://localhost:${PORT}     ║
║   Status: ✅ Running                   ║
║   Environment: ${process.env.NODE_ENV || "development"}              ║
║                                       ║
╚═══════════════════════════════════════╝
  `);
});
