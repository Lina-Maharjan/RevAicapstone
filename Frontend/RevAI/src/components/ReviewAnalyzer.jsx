import React, { useState, useEffect } from "react";

const ReviewAnalyzer = () => {
  const [reviewText, setReviewText] = useState("");
  const [productURL, setProductURL] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleAnalyze = (e) => {
    e.preventDefault();
    console.log("Analyzing:", { reviewText, productURL });
  };

  return (
    <div className="bg-white pt-[60px]">
      {/* Header Section */}
      <div className="py-6 text-center bg-gradient-to-b from-[#F0FDFA] to-[#CCFBF1] shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">Review Analyzer</h2>
        <p className="text-gray-600 text-sm max-w-3xl mx-auto px-4 leading-relaxed">
          Paste a product review below to analyze its authenticity and sentiment.
          You can drop the product URL, enter the review text, or use both for enhanced detection.
        </p>
      </div>

      {/* Main Section */}
      <div className="flex flex-col md:flex-row items-start justify-start gap-6 px-2 md:px-6 py-12 bg-white">
        {/* Left Box (Input Section) */}
        <div className="w-full md:basis-[580px] md:flex-shrink-0 border border-[#19A595] bg-white rounded-lg shadow-sm p-8">

          {/* Manual Review Input */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1 text-base">Paste Review Manually</h3>
            <p className="text-gray-600 text-xs mb-3">
              Enter the review text to analyze its authenticity.
            </p>
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Enter the review text here..."
              className="w-full h-32 border rounded-md p-3 text-gray-800 text-sm
              placeholder-gray-400 focus:ring-2 focus:ring-[#19A595] focus:border-[#19A595] outline-none resize-none
              bg-[#F5FFFD] border-[#19A595]" // border color updated
            ></textarea>
          </div>

          {/* OR Divider */}
          <div className="flex items-center justify-center mb-6">
            <div className="border-t border-gray-300 flex-1"></div>
            <span className="mx-4 text-gray-500 text-xs font-medium">OR</span>
            <div className="border-t border-gray-300 flex-1"></div>
          </div>

          {/* Product URL Input */}
          <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow-sm">
            <h3 className="font-bold text-gray-900 mb-1 text-base">Paste Product URL</h3>
            <p className="text-gray-600 text-xs mb-3">
              Enter a product URL to analyze all its reviews
            </p>
            <div className="flex items-center border border-[#19A595] focus-within:ring-2 focus-within:ring-[#19A595] focus-within:border-[#19A595] rounded-md p-3 bg-[#F5FFFD] transition-all duration-200">
              <img
                src="/link.png" // URL icon image in public folder
                alt="URL Icon"
                className="h-8 w-8"
              />
              <input
                type="text"
                value={productURL}
                onChange={(e) => setProductURL(e.target.value)}
                placeholder="https://example.com/product/123"
                className="flex-1 ml-2 bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"
              />
            </div>
          </div>

          {/* Analyze Button */}
          <button
            onClick={handleAnalyze}
            disabled={loading}
            style={{
              width: "100%",
              backgroundColor: loading ? "#A7F3D0" : "#14B8A6",
              color: "white",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              fontWeight: "600",
              cursor: loading ? "not-allowed" : "pointer",
              transition: "background-color 0.3s",
            }}
          >
            {loading ? "Analyzing..." : "Start Analyzing"}
          </button>

        </div>

        {/* Right Side Illustration */}
        <div className="max-w-4x md:flex-1 min-w-0 flex justify-start md:mt-8">
          <img
            src="/ReviewAnalyzer.png"
            alt="Review Analysis Illustration"
            className="w-full h-auto object-contain max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalyzer;




// import React from "react";

// const ReviewAnalyzer = () => {
//   return (
//     <div
//       className="min-h-screen flex flex-col items-center px-4 py-12 pt-24"
//       style={{
//         background:
//           "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
//       }}
//     >
//       {/* Heading outside the box */}
//       <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F766E] mb-2 text-center">
//         Review Analyzer
//       </h2>
//       <p className="text-center text-gray-700 text-lg mb-8 max-w-2xl">
//         Paste a product review below to analyze its authenticity and sentiment
//       </p>

//       {/* White box */}
//       <div className="w-full max-w-5xl border border-gray-200 bg-white p-8 rounded-xl relative -top-4 shadow-md">
//         {/* Form area */}
//         <div className="relative mb-8">
//           {/* Label */}
//           <label className="block text-gray-800 font-medium mb-2">
//             Paste product review here
//           </label>

//           {/* Textarea */}
//           <textarea
//             placeholder="Enter the product review you want to analyze……"
//             className="w-full relative -top-4 mt-7 h-52 rounded-md p-4 bg-[#ECFDF5] text-gray-800 placeholder-gray-400 outline-none resize-none"
//           ></textarea>
//         </div>

//         {/* Analyze Button */}
//         <div className="text-center">
//           <button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white font-semibold py-3 px-6  relative -top-5 rounded-xl shadow-md hover:brightness-110 transition duration-300">
//             Start Analyzing
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ReviewAnalyzer;


