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
import userDashboardRouter from "./routes/userDashboard.routes.js";

const app = express();

/* ======================================================
   SECURITY & PERFORMANCE
====================================================== */

// Security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

/* ======================================================
   CORS (🔥 FIXED PROPERLY)
====================================================== */

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://markivex-hub.vercel.app",
  process.env.FRONTEND_URL,
];

const corsOptions = {
  origin: (origin, callback) => {
    // allow REST tools (Postman, curl)
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

// 🔑 Handle preflight requests explicitly with same config
app.options("*", cors(corsOptions));

/* ======================================================
   LOGGING
====================================================== */

if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
} else {
  app.use(morgan("dev"));
}

/* ======================================================
   BODY PARSERS
====================================================== */

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

/* ======================================================
   ROUTES
====================================================== */

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/contacts", contactRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/portfolio", portfolioRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/userdashboard", userDashboardRouter);

// Health check
app.get("/", (req, res) => {
  res.json({
    message: "Markivex API is running",
    status: "healthy",
    timestamp: new Date().toISOString(),
  });
});

/* ======================================================
   ERROR HANDLING
====================================================== */

// 404
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Global error handler
app.use(errorHandler);

export default app;
