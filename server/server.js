import express from "express";
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js";
import galleryRoutes from "./routers/galleryRoutes.js";
import path from "path";

dotenv.config()

const app = express();

app.use(cors());
app.use(express.json())
app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));

const PORT = process.env.PORT || 9000


app.get("/", (req,res)=> {
    res.send("hello api is working")
})

connectDB();


app.use("/api/gallery", galleryRoutes);


app.listen(PORT, ()=> {
    console.log(`Server is working on PORT ${PORT}`)
})



