import React from "react";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import Title from "../Components/Title";

const Contact = () => {
  const contactCards = [
    {
      icon: <MapPin style={{ color: "#2563eb", width: 26, height: 26 }} />,
      title: "Address",
      info: "48, Lawspet Main Road, Puducherry",
      bg: "linear-gradient(135deg, rgba(219,234,254,0.8), rgba(191,219,254,0.5))",
    },
    {
      icon: <Phone style={{ color: "#1e40af", width: 26, height: 26 }} />,
      title: "Phone",
      info: "+91 9360962810",
      bg: "linear-gradient(135deg, rgba(191,219,254,0.8), rgba(147,197,253,0.5))",
    },
    {
      icon: <Mail style={{ color: "#3b82f6", width: 26, height: 26 }} />,
      title: "Email",
      info: "technovahubcareer@gmail.com",
      bg: "linear-gradient(135deg, rgba(219,234,254,0.9), rgba(147,197,253,0.6))",
    },
    {
      icon: <Clock style={{ color: "#1d4ed8", width: 26, height: 26 }} />,
      title: "Working Hours",
      info: "9:00 AM - 9:00 PM",
      bg: "linear-gradient(135deg, rgba(191,219,254,0.9), rgba(147,197,253,0.6))",
    },
  ];

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "80px",
        marginTop: "120px",
        padding: "0 20px",
      }}
    >
      {/* Light Background Gradient */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(135deg, rgba(240,249,255,1), rgba(219,234,254,0.6))",
          zIndex: -1,
          borderRadius: "20px",
        }}
      ></div>

      <Title text="Contact Us" />

      {/* Flex Container */}
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          gap: "2.5rem",
          justifyContent: "space-between",
          marginTop: "3rem",
        }}
      >
        {/* Left: Contact Info */}
        <div
          style={{
            flex: "1 1 450px",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {contactCards.map((card, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                padding: "1.5rem",
                borderRadius: "14px",
                background: card.bg,
                backdropFilter: "blur(10px)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 8px 20px rgba(37,99,235,0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.boxShadow =
                  "0 4px 12px rgba(0,0,0,0.08)";
              }}
            >
              <div
                style={{
                  padding: "14px",
                  background: "#fff",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 3px 8px rgba(37,99,235,0.2)",
                }}
              >
                {card.icon}
              </div>
              <div>
                <h3
                  style={{
                    fontWeight: "700",
                    fontSize: "1.1rem",
                    color: "#1e3a8a",
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    marginTop: "5px",
                    color: "#334155",
                    fontSize: "0.96rem",
                  }}
                >
                  {card.info}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Right: Google Map */}
        <div
          style={{
            flex: "1 1 450px",
            height: "480px",
            borderRadius: "18px",
            overflow: "hidden",
            boxShadow: "0 8px 25px rgba(37,99,235,0.25)",
            border: "2px solid rgba(219,234,254,0.9)",
            transition: "transform 0.5s ease",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.transform = "scale(1.02)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.transform = "scale(1)")
          }
        >
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
