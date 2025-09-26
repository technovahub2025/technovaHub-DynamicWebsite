// server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import galleryRoutes from "./routers/galleryRoutes.js";
import courseRoutes from "./routers/courseRoutes.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 9000;

app.get("/", (req, res) => {
  res.send("API is working 🚀");
});

connectDB();
app.use("/api/gallery", galleryRoutes);
app.use("/api/courses", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
