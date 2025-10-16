import React, { useState } from "react";
import { useEffect } from "react";


const ContactUsIntro = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: "", message: "" });
  const [loading, setLoading] = useState(false);

  // Basic frontend validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email.";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: "", message: "" });

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://localhost:8000/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`, // If user authentication required
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: data.detail || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error while sending contact form:", error);
      setStatus({
        type: "error",
        message: "Failed to send message. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-15">
      {/* Header Section */}
      <div
        className="py-12 text-center"
        style={{ background: "#38B2AC" }}
      >
        <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-white/90 max-w-2xl mx-auto">
          Have questions about RevAI? We’d love to hear from you. Send us a
          message and we’ll respond as soon as possible.
        </p>
      </div>

      {/* Contact Form Section */}
      <div
        className="w-full max-w-xl rounded-2xl p-8 
          shadow-[0_6px_24px_rgba(0,0,0,0.08)] 
          transform transition-all duration-300 ease-in-out 
          hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
          bg-white mx-auto mt-10"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-6">
          Send Us a Message
        </h3>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Your full name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 ${
                errors.name ? "border-red-500" : "border-gray-300"
              } focus:border-teal-500 focus:ring-teal-500`}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 ${
                errors.email ? "border-red-500" : "border-gray-300"
              } focus:border-teal-500 focus:ring-teal-500`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              name="message"
              rows="4"
              placeholder="Tell us how we can help..."
              value={formData.message}
              onChange={handleChange}
              className={`w-full rounded-md border px-3 py-2 ${
                errors.message ? "border-red-500" : "border-gray-300"
              } focus:border-teal-500 focus:ring-teal-500`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-sm mt-1">{errors.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#0D9488" : "#14B8A6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
            onMouseOver={(e) => !loading && (e.currentTarget.style.backgroundColor = "#0D9488")}
            onMouseOut={(e) => !loading && (e.currentTarget.style.backgroundColor = "#14B8A6")}
          >
            {loading ? "Sending..." : "Send message"}
          </button>
        </form>

        {/* Success or Error Feedback */}
        {status.message && (
          <div
            className={`mt-4 text-center p-3 rounded-md ${
              status.type === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {status.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactUsIntro;

// import React from "react";

// const ContactUsIntro = () => {
//   return (
//     <div className="bg-white py-15">
    
//       <div className=" py-12 text-center" style={{
//         background:"#38B2AC"
//           // "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
//       }}>
//         <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
//         <p className="text-white/90 max-w-2xl mx-auto">
//           Have questions about RevAI? We’d love to hear from you. Send us a
//           message and we’ll respond as soon as possible.
//         </p>
//       </div>

//       <div
//         className="w-full max-w-xl rounded-2xl p-8 
//              shadow-[0_6px_24px_rgba(0,0,0,0.08)] 
//              transform transition-all duration-300 ease-in-out 
//              hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
//              bg-white mx-auto mt-10"
// >
//   <h3 className="text-lg font-semibold text-gray-900 mb-6">
//     Send Us a Message
//   </h3>

//   <form className="space-y-5">
//     {/* Name */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Name
//       </label>
//       <input
//         type="text"
//         placeholder="Your full name"
//         className="w-full rounded-md border px-3 py-2 border-[#19A595] focus:border-teal-500 focus:ring-teal-500"
//       />
//     </div>

//     {/* Email */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Email
//       </label>
//       <input
//         type="email"
//         placeholder="your.email@example.com"
//         className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
//       />
//     </div>

//     {/* Message */}
//     <div>
//       <label className="block text-sm font-medium text-gray-700 mb-1">
//         Message
//       </label>
//       <textarea
//         rows="4"
//         placeholder="Tell us how we can help..."
//         className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
//       ></textarea>
//     </div>

//     <button type="submit"
//                 style={{width: '100%',backgroundColor: '#14B8A6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem',
//                 fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.3s',}}
//             onMouseOver={e => e.currentTarget.style.backgroundColor = '#0D9488'}
//             onMouseOut={e => e.currentTarget.style.backgroundColor = '#14B8A6'}>Send message
//             </button>

//   </form>
// </div>

//     </div>
//   );
// };

// export default ContactUsIntro;
