import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ReviewCheckerLanding = () => {
 const navigate = useNavigate();

  const handleDemoClick = () => {
    navigate("/Analyzer"); // make sure this matches your route exactly
  };

  const handleLearnMoreClick = () => {
    navigate("/About");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background:
          "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
      }}
    >
      <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Section */}
        <div className="max-w-xl">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-snug mb-4 font-black">
            Check if a review is{" "}
            <span className="bg-gradient-to-r from-teal-700 to-teal-400  bg-clip-text text-transparent font-black">
              Real or Fake
            </span>{" "}
            with AI
          </h1>
          <p className="text-gray-700 mb-6 text-lg">
            Identify authentic product reviews with our powerful AI sentiment
            analysis. Get accurate insights and make informed purchase
            decisions.
          </p>
          <div className="flex gap-4">
            {/* <button
                  className="text-white font-medium py-2.5 px-6 rounded-lg shadow-md"
                  style={{
                    backgroundColor: "#1E88E5", // Blue fill
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
                  }}
                  > Try Demo
                </button>

                <button
                  className="text-teal-600 font-medium py-2.5 px-6 rounded-lg shadow-md border"
                  style={{
                    backgroundColor: "#ffffff", // White background
                    border: "1px solid #14B8A6", // Teal border
                    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
                  }}
                  > Learn More
                </button> */}

            <button
              className="text-white font-medium py-2.5 px-6 rounded-lg shadow-md"
              style={{
                background: "linear-gradient(90deg, #14B8A6, #14B8A6)",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
              }} onClick={handleDemoClick}
            >
              Try Demo
            </button>
            <button
              className="text-black font-medium py-2.5 px-6 rounded-lg shadow-md"
              style={{
                backgroundColor: "#FDE047",
                boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
              }} onClick={handleLearnMoreClick}
            >
              Learn more
            </button>
          </div>
        </div>

        {/* Right Section - Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/Intro.png"
            alt="Review Analysis Illustration"
            className="w-[480px] max-w-full"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default ReviewCheckerLanding;
