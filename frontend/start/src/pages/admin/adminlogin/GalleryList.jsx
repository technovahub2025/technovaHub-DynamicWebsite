import React from "react";

// Example gallery data
const galleryData = [
  { id: 1, imageUrl: "https://via.placeholder.com/150" },
  { id: 2, imageUrl: "https://via.placeholder.com/150" },
  { id: 3, imageUrl: "https://via.placeholder.com/150" },
];

const GalleryList = () => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-xl md:text-2xl font-semibold mb-4">Gallery List</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b text-left text-sm md:text-base">
                Sl. No
              </th>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b text-left text-sm md:text-base">
                Image
              </th>
              <th className="py-2 px-2 md:py-3 md:px-4 border-b text-left text-sm md:text-base">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {galleryData.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="py-2 px-2 md:py-3 md:px-4 border-b text-sm md:text-base">
                  {index + 1}
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4 border-b">
                  <img
                    src={item.imageUrl}
                    alt={`Gallery ${index + 1}`}
                    className="w-24 h-16 md:w-32 md:h-20 object-cover rounded"
                  />
                </td>
                <td className="py-2 px-2 md:py-3 md:px-4 border-b flex flex-wrap gap-2">
                    
                  <button className="bg-blue-500 text-white px-2 py-1 md:px-3 md:py-1 rounded cursor-pointer transition text-xs md:text-sm">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-2 py-1 md:px-3 md:py-1 rounded hover:bg-red-600 cursor-pointer transition text-xs md:text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GalleryList;
