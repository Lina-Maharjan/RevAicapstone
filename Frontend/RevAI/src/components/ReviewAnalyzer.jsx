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


import React, { useState } from "react";

const ReviewAnalyzer = () => {
  const [inputType, setInputType] = useState("review");
  const [input, setInput] = useState("");

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-12 pt-24"
      style={{
        background:
          "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
      }}
    >
      {/* Heading */}
      <h2 className="text-3xl md:text-4xl font-extrabold text-[#0F766E] mb-2 text-center">
        Review Analysis
      </h2>
      <p className="text-center text-gray-700 text-lg mb-8 max-w-2xl">
        Paste your product review or URL to analyze authenticity and sentiment
      </p>

      {/* Main White Box */}
      <div className="w-full max-w-5xl border border-gray-200 bg-white p-8 rounded-xl shadow-lg">
        {/* Tabs */}
        <div className="flex justify-center space-x-4 mb-6">
          <button
            onClick={() => setInputType("review")}
            className={`py-2 px-4 rounded-lg font-semibold transition ${
              inputType === "review"
                ? "bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white"
                : "bg-[#ECFDF5] text-gray-600 hover:bg-[#D1FAE5]"
            }`}
          >
            📝 Paste Review
          </button>

          <button
            onClick={() => setInputType("url")}
            className={`py-2 px-4 rounded-lg font-semibold transition ${
              inputType === "url"
                ? "bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white"
                : "bg-[#ECFDF5] text-gray-600 hover:bg-[#D1FAE5]"
            }`}
          >
            🌐 Paste URL
          </button>
        </div>

        {/* Input Area */}
        {inputType === "review" ? (
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter the product review you want to analyze…"
            className="w-full h-48 rounded-md p-4 bg-[#ECFDF5] text-gray-800 placeholder-gray-400 outline-none resize-none mb-6"
          ></textarea>
        ) : (
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Paste product page URL here…"
            className="w-full rounded-md p-4 bg-[#ECFDF5] text-gray-800 placeholder-gray-400 outline-none mb-6"
          />
        )}

        {/* Analyze Button */}
        <div className="text-center">
          <button className="bg-gradient-to-r from-[#14B8A6] to-[#0D9488] text-white font-semibold py-3 px-6 rounded-xl shadow-md hover:brightness-110 transition duration-300">
            Start Analyzing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAnalyzer;


