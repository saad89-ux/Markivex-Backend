import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import rateLimit from "express-rate-limit";
import errorHandler from "./middleware/errorHandler.js";

// Route imports
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import contactRoutes from "./routes/contact.routes.js";
import serviceRoutes from "./routes/service.routes.js";
import portfolioRoutes from "./routes/portfolio.routes.js";
import testimonialRoutes from "./routes/testimonial.routes.js";
import uploadRoutes from "./routes/upload.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import userDashboardrouter from "./routes/userDashboard.routes.js"
const app = express();

// ----- SECURITY & PERFORMANCE -----
app.use(helmet()); // Security headers

// Rate limiting: limit all requests
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP
  message: "Too many requests, try again later",
});
app.use(limiter);

// CORS
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  })
);

// Logging
if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined")); // detailed logs in production
} else {
  app.use(morgan("dev")); // dev-friendly logs
}

// Body parsers
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ----- ROUTES -----
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/userdashboard",userDashboardrouter)
// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Markivex API is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

export default app;
