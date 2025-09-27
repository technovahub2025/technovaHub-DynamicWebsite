import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  const contactCards = [
    {
      icon: <MapPin className="text-blue-500 w-6 h-6 mt-1" />,
      title: "Address",
      info: "48, Lawspet Main Road, Pudhucherry",
    },
    {
      icon: <Phone className="text-green-500 w-6 h-6 mt-1" />,
      title: "Phone",
      info: "9360962810",
    },
    {
      icon: <Mail className="text-red-500 w-6 h-6 mt-1" />,
      title: "Email",
      info: "technovahubcareer@gmail.com",
    },
    {
      icon: <Clock className="text-yellow-500 w-6 h-6 mt-1" />,
      title: "Working Hours",
      info: "Morning 9:00 AM to Evening 9:00 PM",
    },
  ];

  return (
    <div className="mb-12 mt-[130px] px-4 md:px-20">
      <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center text-gray-800">
        Contact Us
      </h2>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side: Contact Cards */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {contactCards.map((card, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-white shadow-md rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-400/50"
            >
              {card.icon}
              <div>
                <h3 className="font-semibold text-lg text-gray-700">{card.title}</h3>
                <p className="text-gray-500">{card.info}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Map */}
        <div className="md:w-1/2 h-96 md:h-[500px] rounded-xl overflow-hidden shadow-md">
          <iframe
            title="Technovahub Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.5204113856966!2d79.8105151147982!3d11.928178391930036!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5361f3c6c00001%3A0x1234567890abcdef!2s48%20Lawspet%20Main%20Rd%2C%20Puducherry%2C%20India!5e0!3m2!1sen!2sin!4v1695792000000!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default Contact;
