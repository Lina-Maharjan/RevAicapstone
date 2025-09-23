import React from "react";

const ContactUsIntro = () => {
  return (
    <div className="bg-white py-16">
      {/* Top Section */}
      <div className=" py-12 text-center" style={{
        background:
          "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
      }}>
        <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
        <p className="text-white/90 max-w-2xl mx-auto">
          Have questions about RevAI? We’d love to hear from you. Send us a
          message and we’ll respond as soon as possible.
        </p>
      </div>

      <div
        className="w-full max-w-xl rounded-2xl p-8 
             shadow-[0_6px_24px_rgba(0,0,0,0.08)] 
             transform transition-all duration-300 ease-in-out 
             hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
             bg-white mx-auto mt-10"
>
  <h3 className="text-lg font-semibold text-gray-900 mb-6">
    Send Us a message
  </h3>

  <form className="space-y-5">
    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Name
      </label>
      <input
        type="text"
        placeholder="Your full name"
        className="w-full rounded-md border px-3 py-2 border-[#19A595] focus:border-teal-500 focus:ring-teal-500"
      />
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Email
      </label>
      <input
        type="email"
        placeholder="your.email@example.com"
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
      />
    </div>

    {/* Message */}
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Message
      </label>
      <textarea
        rows="4"
        placeholder="Tell us how we can help..."
        className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-teal-500 focus:ring-teal-500"
      ></textarea>
    </div>

    <button type="submit"
                style={{width: '100%',backgroundColor: '#3B82F6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem',
                fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.3s',}}
            onMouseOver={e => e.currentTarget.style.backgroundColor = '#14B8A6'} 
            onMouseOut={e => e.currentTarget.style.backgroundColor = '#3B82F6'}>Send message
            </button>

  </form>
</div>

    </div>
  );
};

export default ContactUsIntro;
