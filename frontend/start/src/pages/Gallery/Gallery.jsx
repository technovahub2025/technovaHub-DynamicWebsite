import React, { useEffect, useState } from "react";
import { getGalleryImages } from "../../api/gallaryapi";

const Gallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data); 
        console.log(data)
      } catch (error) {
        console.error(error); 
      }
    };

    fetchData();
  }, []);

  return (
    <section className="overflow-hidden mt-[100px] mb-10 text-gray-700">
      <h1 className="text-center text-3xl text-blue-500 mb-6">Gallery</h1>
      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((img) => (
          <div key={img._id} className="overflow-hidden rounded-lg shadow hover:scale-105 transform transition duration-300">
            <img
              src={img.imageUrl}
              alt="gallery"
              className="w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
