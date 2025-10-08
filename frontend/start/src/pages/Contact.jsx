import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Title from "../Components/Title";

const Contact = () => {
  const contactCards = [
    {
      icon: <MapPin className="text-blue-400 w-6 h-6" />,
      title: "Address",
      info: "48, Lawspet Main Road, Puducherry",
      bg: "bg-gradient-to-r from-blue-400/20 to-blue-100/20",
    },
    {
      icon: <Phone className="text-green-400 w-6 h-6" />,
      title: "Phone",
      info: "9360962810",
      bg: "bg-gradient-to-r from-green-400/20 to-green-100/20",
    },
    {
      icon: <Mail className="text-red-400 w-6 h-6" />,
      title: "Email",
      info: "technovahubcareer@gmail.com",
      bg: "bg-gradient-to-r from-red-400/20 to-red-100/20",
    },
    {
      icon: <Clock className="text-yellow-400 w-6 h-6" />,
      title: "Working Hours",
      info: "9:00 AM - 9:00 PM",
      bg: "bg-gradient-to-r from-yellow-400/20 to-yellow-100/20",
    },
  ];

  return (
    <div className="relative mb-12 mt-[130px] px-4 md:px-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/40 via-purple-100/30 to-pink-100/30 -z-10 rounded-xl"></div>

      <Title text="Contact Us" />

      <div className="flex flex-col md:flex-row gap-12 mt-10">
        {/* Left Side: Contact Cards */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className={`
                flex items-start gap-4 p-6 rounded-xl backdrop-blur-md shadow-lg hover:shadow-xl transition-all duration-300 ${card.bg}
              `}
            >
              <div className="p-3 bg-white/30 rounded-full flex items-center justify-center shadow-md">
                {card.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800">{card.title}</h3>
                <p className="text-gray-600 mt-1">{card.info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Map */}
        <div className="md:w-1/2 h-96 md:h-[500px] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 border-2 border-white/30 backdrop-blur-md">
          <iframe
            title="Technovahub Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5204113856966!2d79.8105151147982!3d11.928178391930036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361f3c6c00001%3A0x1234567890abcdef!2s48%20Lawspet%20Main%20Rd%2C%20Puducherry%2C%20India!5e0!3m2!1sen!2sin!4v1695792000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="hover:scale-105 transition-transform duration-500"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
