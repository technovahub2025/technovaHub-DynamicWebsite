import React, { useEffect, useState } from "react";
import { getGalleryImages } from "../../api/gallaryApi";
import Title from "../../Components/Title";
import AOS from "aos";
import "aos/dist/aos.css";
import { GrChapterNext } from "react-icons/gr";
import { GrChapterPrevious } from "react-icons/gr";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getGalleryImages();
        setImages(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();

    // Initialize AOS
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const handleNext = () => {
    setSelectedIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setSelectedIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <section className="overflow-hidden mb-10 text-gray-700">
      <Title text="Gallery" />

      <div className="flex justify-center p-3">
        <div className="grid gap-3 md:gap-6 mt-5 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl w-full">
          {images.map((img, index) => (
            <div
              key={img._id}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer hover:scale-105 transform transition duration-300"
              onClick={() => setSelectedIndex(index)}
              data-aos="zoom-in" // AOS zoom-in effect
            >
              <img
                src={img.imageUrl}
                alt="gallery"
                className="w-full h-56 md:h-64 object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedIndex !== null && (
        <div
          className="fixed inset-0 bg-white/50 bg-opacity-40 backdrop-blur-md flex justify-center items-center z-50 transition-opacity duration-300 ease-in-out"
          onClick={() => setSelectedIndex(null)}
        >
          <div
            className="relative max-w-3xl w-full p-5 transform transition-transform duration-300 ease-in-out scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-2 text-white bg-black rounded-full px-2 text-2xl font-bold hover:text-gray-300"
              onClick={() => setSelectedIndex(null)}
            >
              &times;
            </button>

            <img
              src={images[selectedIndex].imageUrl}
              alt="selected"
              className="w-full h-auto rounded-lg shadow-xl animate-fadeIn"
            />

            {/* Prev & Next Buttons */}
            <button
              className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/50 text-white px-10 py-5 rounded-md hover:bg-black transition"
              onClick={handlePrev}
            >
             <GrChapterPrevious />
            </button>
            <button
              className="absolute top-1/2 right-[-30px] transform -translate-y-1/2 bg-black/50 text-white px-10 py-5 rounded-md hover:bg-black transition"
              onClick={handleNext}
            >
             <GrChapterNext />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
