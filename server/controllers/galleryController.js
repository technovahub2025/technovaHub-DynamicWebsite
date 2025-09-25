import Gallery from "../models/GalleryModels.js";






// UPLOAD MULTIPLE IMAGES
export const uploadImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0)
      return res.status(400).json({ message: "Images are required" });

    const galleryItems = req.files.map(file => ({
      imageUrl: `/uploads/${file.filename}`,
    }));

    const savedImages = await Gallery.insertMany(galleryItems);
    res.status(201).json(savedImages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL IMAGES (unchanged)
export const getImages = async (req, res) => {
  try {
    const images = await Gallery.find().sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE IMAGE (unchanged)
export const getImage = async (req, res) => {
  try {
    const image = await Gallery.findById(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json(image);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// DELETE IMAGE (unchanged)
export const deleteImage = async (req, res) => {
  try {
    const image = await Gallery.findByIdAndDelete(req.params.id);
    if (!image) return res.status(404).json({ message: "Image not found" });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
