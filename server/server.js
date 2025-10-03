// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import galleryRoutes from "./routers/galleryRoutes.js";
import courseRoutes from "./routers/courseRoutes.js";
import auth from "./routers/authRoutes.js";
import certificateRoutes from "./routers/certificateRoutes.js";
import softwareSolution from "./routers/softwareRoutes.js";

dotenv.config();

const app = express();

// Allowed frontend URLs
const allowedOrigins = [
  "http://localhost:5173",
  "https://technova-hub-dynamic-website.vercel.app"
];

// CORS setup with Authorization header
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"], // allow auth header
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", auth);
app.use("/api/certificate", certificateRoutes);
app.use("/api/softwareSolution", softwareSolution);

// Global error handler for CORS issues
app.use((err, req, res, next) => {
  if (err instanceof Error && err.message === "Not allowed by CORS") {
    res.status(403).json({ message: err.message });
  } else {
    next(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
