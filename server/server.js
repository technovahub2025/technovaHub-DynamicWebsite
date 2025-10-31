import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";

// Routers
import galleryRoutes from "./routers/galleryRoutes.js";
import courseRoutes from "./routers/courseRoutes.js";
import authRoutes from "./routers/authRoutes.js";
import certificateRoutes from "./routers/certificateRoutes.js";
import softwareRoutes from "./routers/softwareRoutes.js";
import quatation from "./routers/quoatitionRoutes.js";
import invoice from "./routers/invoiceRoutes.js";
import Arinvoice from "./routers/arounInvoiceRoutes.js";
import salaryRoutes from "./routers/salaryRoutes.js";

// Load environment variables based on NODE_ENV
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env.local" });
}

const app = express();

// ✅ Enable CORS for all origins
app.use(
  cors({
    origin: "*", // Allow all origins
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 9000;

// Test route
app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/gallery", galleryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/certificate", certificateRoutes);
app.use("/api/softwareSolution", softwareRoutes);
app.use("/api/quatation", quatation);
app.use("/api/invoice", invoice);
app.use("/api/arouninvoice", Arinvoice);
app.use("/api/salary", salaryRoutes);

// Global error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong!" });
});

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
