import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#050B1A] text-gray-300 py-6 md:py-8 px-4 md:px-12">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

       
        <div>
          <h2 className="text-xl font-semibold text-white">RevAI</h2>
          <p className="mt-2 text-sm leading-snug">
            AI-powered review analysis for smarter shopping decisions.
          </p>
        </div>

      
        <div>
          <h3 className="text-base font-semibold text-white mb-2">Quick Links</h3>
          <ul className="space-y-1 md:space-y-2 text-sm">
            <li><a href="/" className="hover:text-white">Home</a></li>
            <li><a href="/analyzer" className="hover:text-white">Review Analyzer</a></li>
            <li><a href="/dashboard" className="hover:text-white">Dashboard</a></li>
          </ul>
        </div>

   
        <div>
          <h3 className="text-base font-semibold text-white mb-2">Company</h3>
          <ul className="space-y-1 md:space-y-2 text-sm">
            <li><a href="/about" className="hover:text-white">About</a></li>
            <li><a href="/contact" className="hover:text-white">Contact</a></li>
            <li><a href="/signup" className="hover:text-white">SignUp</a></li>
            <li><a href="/login" className="hover:text-white">Login</a></li>
          </ul>
        </div>

     
        <div>
          <h3 className="text-base font-semibold text-white mb-2">Contact Us</h3>
          <ul className="space-y-1 md:space-y-2 text-sm">
            <li>
              <a href="mailto:Support@revai.com" className="hover:text-white">
                Support@revai.com
              </a>
            </li>
            <li className="hover:text-white">Kathmandu, Nepal</li>
          </ul>
        </div>
      </div>

     
      <div className="text-center text-xs text-gray-500 mt-4 md:mt-6 pt-3 md:pt-4 border-t border-gray-800">
        © 2024 RevAI. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
