// middleware/multer.js
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage, 
    fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/") || file.mimetype === "image/gif") {
      cb(null, true);
    } else {
      cb(new Error("Only image or GIF files are allowed!"), false);
    }
  }, });

export default upload;
