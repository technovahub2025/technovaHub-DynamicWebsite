// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cookieParser from "cookie-parser";
import galleryRoutes from "./routers/galleryRoutes.js";
import courseRoutes from "./routers/courseRoutes.js"
import auth from "./routers/authRoutes.js"
import certificateRoutes from "./routers/certificateRoutes.js";
import softwareSolution from "./routers/softwareRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

connectDB();
app.use("/api/gallery", galleryRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/auth", auth);
app.use("/api/certificate", certificateRoutes);
app.use("/api/softwareSolution", softwareSolution);




app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
