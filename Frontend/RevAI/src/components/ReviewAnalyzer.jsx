import React, { useState, useEffect } from "react";
import { apiFetch } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ReviewAnalyzer = () => {
  const [reviewText, setReviewText] = useState("");
  const [productURL, setProductURL] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [demoMessage, setDemoMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if user is logged in
    const token = localStorage.getItem("access_token");
    setIsLoggedIn(!!token);
  }, []);

  // Auto-scroll to results when result updates
  useEffect(() => {
    if (result) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [result]);


  const handleAnalyze = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!reviewText && !productURL) {
      setError("Please enter a review text or product URL");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);
    setDemoMessage("");

    try {
      let response;

      // Determine which endpoints to use based on login status
      const isDemo = !isLoggedIn;

      // If product URL is provided
      if (productURL) {
        const payload = {
          product_url: productURL,
          manual_reviews: reviewText ? [reviewText] : []
        };
        
        if (isDemo) {
          // Use demo endpoint for non-logged-in users
          response = await apiFetch("/demo/analyze-url", {
            method: "POST",
            body: JSON.stringify(payload)
          });
        } else {
          // Use authenticated complete-analysis endpoint (does fetch + analyze in one call)
          response = await apiFetch("/analyze/complete-analysis", {
            method: "POST",
            body: JSON.stringify(payload)
          });
        }
      } 
      // If only review text is provided
      else if (reviewText) {
        const payload = {
          reviews: [reviewText]
        };
        
        if (isDemo) {
          // Use demo text analysis endpoint
          response = await apiFetch("/demo/analyze-text", {
            method: "POST",
            body: JSON.stringify(payload)
          });
        } else {
          // Use authenticated text analysis endpoint
          response = await apiFetch("/text/analyze", {
            method: "POST",
            body: JSON.stringify(payload)
          });
        }
      }

      setResult(response);
      
      // Display demo message (tries remaining) only for non-logged-in users
      if (isDemo && response.message) {
        setDemoMessage(response.message);
      }
      
      console.log("Analysis result:", response);
      
    } catch (err) {
      console.error("Analysis error:", err);
      
      // Check if it's a 429 (demo limit reached) error
      if (err.detail && err.detail.requires_auth) {
        setError(err.detail.message || "Demo limit reached. Please log in to continue.");
      } else {
        setError(typeof err === 'string' ? err : err.message || err.detail || "Failed to analyze. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white pt-[60px]">
      {/* Header Section */}
      <div className="py-6 text-center bg-gradient-to-b from-[#F0FDFA] to-[#CCFBF1] shadow-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-3">
          Review Analyzer {!isLoggedIn && "- Demo Mode"}
        </h2>
        <p className="text-gray-600 text-sm max-w-3xl mx-auto px-4 leading-relaxed">
          Paste a product review below to analyze its authenticity and sentiment.
          You can drop the product URL, enter the review text, or use both for enhanced detection.
        </p>
        {!isLoggedIn && (
          <p className="text-xs text-gray-500 mt-2">
            Demo mode: 3 free tries • <button onClick={() => navigate("/login")} className="text-[#19A595] underline font-semibold hover:text-[#148078]">Log in</button> for unlimited access
          </p>
        )}
      </div>

      {/* Main Section */}
      <div className="flex flex-col lg:flex-row items-start justify-start gap-6 px-2 lg:px-6 py-12 bg-white">
        {/* Left Box (Input Section) */}
        <form onSubmit={handleAnalyze} className="w-full lg:basis-[550px] lg:flex-shrink-0 border border-[#19A595] bg-white rounded-lg shadow-sm p-8">

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
              bg-[#F5FFFD] border-[#19A595]"
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
                src="/link.png" 
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

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-red-600 text-sm">{error}</p>
              {error.includes("Demo limit") && (
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="mt-2 w-full bg-[#19A595] hover:bg-[#148078] text-white font-semibold py-2 px-4 rounded-md transition duration-300"
                >
                  Log In to Continue
                </button>
              )}
            </div>
          )}

          {/* Success/Demo Message */}
          {demoMessage && !error && (
            <div className="mb-4 p-3 bg-teal-50 border border-teal-200 rounded-md">
              <p className="text-teal-700 text-sm">{demoMessage}</p>
            </div>
          )}

          {/* Analyze Button */}
          <button
            type="submit"
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

        </form>

        {/* Right Side Illustration */}
        <div className="w-full lg:flex-1 min-w-0 flex justify-start lg:mt-8">
          <img
            src="/ReviewAnalyzer.png"
            alt="Review Analysis Illustration"
            className="w-full h-auto object-contain"
            style={{ maxWidth: '800px' }}
          />
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="px-2 md:px-6 pb-12 bg-white">
          <div className="max-w-4xl mx-auto border border-[#19A595] rounded-lg p-6 bg-gradient-to-br from-teal-50 to-white shadow-lg">
            <h3 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h3>
            
            {/* Summary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
                <p className="text-2xl font-bold text-[#19A595]">{result.total_reviews || 0}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-1">Fake Reviews</p>
                <p className="text-2xl font-bold text-red-500">{result.fake_count || 0}</p>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <p className="text-sm text-gray-600 mb-1">Genuine Reviews</p>
                <p className="text-2xl font-bold text-green-500">{result.real_count || 0}</p>
              </div>
            </div>

            {/* Sentiment Distribution */}
            {result.sentiment_distribution && (
              <div className="bg-white p-4 rounded-lg shadow mb-4">
                <h4 className="font-bold text-gray-800 mb-3">Sentiment Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Positive: {result.sentiment_distribution.positive || 0}</span>
                    <span className="text-sm font-semibold text-green-600">{result.positive_percentage?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Neutral: {result.sentiment_distribution.neutral || 0}</span>
                    <span className="text-sm font-semibold text-gray-600">{result.neutral_percentage?.toFixed(1) || 0}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700">Negative: {result.sentiment_distribution.negative || 0}</span>
                    <span className="text-sm font-semibold text-red-600">{result.negative_percentage?.toFixed(1) || 0}%</span>
                  </div>
                </div>
              </div>
            )}

            {/* Category Distribution */}
            {result.category_distribution && Object.keys(result.category_distribution).length > 0 && (
              <div className="bg-white p-4 rounded-lg shadow">
                <h4 className="font-bold text-gray-800 mb-3">Category Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(result.category_distribution).map(([category, count]) => (
                    <div key={category} className="flex justify-between items-center">
                      <span className="text-sm text-gray-700 capitalize">{category}</span>
                      <span className="text-sm font-semibold text-[#19A595]">{count}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewAnalyzer;
// import React, { useState, useEffect } from "react";
// import { apiFetch } from "../utils/api";

// const ReviewAnalyzer = () => {
//   const [reviewText, setReviewText] = useState("");
//   const [productURL, setProductURL] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [result, setResult] = useState(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const handleAnalyze = async (e) => {
//     e.preventDefault();
    
//     // Basic validation
//     if (!reviewText && !productURL) {
//       setError("Please enter a review text or product URL");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setResult(null);

//     try {
//       let response;

//       // If product URL is provided, use the URL analysis endpoint
//       if (productURL) {
//         const payload = {
//           product_url: productURL,
//           manual_reviews: reviewText ? [reviewText] : []
//         };
        
//         // First fetch reviews
//         const fetchResponse = await apiFetch("/analyze/fetch-reviews", {
//           method: "POST",
//           body: JSON.stringify(payload)
//         });
        
//         // Then analyze them
//         if (fetchResponse && fetchResponse.reviews) {
//           const analyzePayload = {
//             reviews: fetchResponse.reviews
//           };
//           response = await apiFetch("/text/analyze", {
//             method: "POST",
//             body: JSON.stringify(analyzePayload)
//           });
//         }
//       } 
//       // If only review text is provided, use text analysis endpoint
//       else if (reviewText) {
//         const payload = {
//           reviews: [reviewText]
//         };
//         response = await apiFetch("/text/analyze", {
//           method: "POST",
//           body: JSON.stringify(payload)
//         });
//       }

//       setResult(response);
//       console.log("Analysis result:", response);
      
//     } catch (err) {
//       console.error("Analysis error:", err);
//       setError(typeof err === 'string' ? err : err.message || "Failed to analyze. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="bg-white pt-[60px]">
//       {/* Header Section */}
//       <div className="py-6 text-center bg-gradient-to-b from-[#F0FDFA] to-[#CCFBF1] shadow-xl">
//         <h2 className="text-2xl font-bold text-gray-800 mb-3">Review Analyzer</h2>
//         <p className="text-gray-600 text-sm max-w-3xl mx-auto px-4 leading-relaxed">
//           Paste a product review below to analyze its authenticity and sentiment.
//           You can drop the product URL, enter the review text, or use both for enhanced detection.
//         </p>
//       </div>

//       {/* Main Section */}
//       <div className="flex flex-col lg:flex-row items-start justify-start gap-6 px-2 lg:px-6 py-12 bg-white">
//         {/* Left Box (Input Section) */}
//         <form onSubmit={handleAnalyze} className="w-full lg:basis-[550px] lg:flex-shrink-0 border border-[#19A595] bg-white rounded-lg shadow-sm p-8">

//           {/* Manual Review Input */}
//           <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow-sm">
//             <h3 className="font-bold text-gray-900 mb-1 text-base">Paste Review Manually</h3>
//             <p className="text-gray-600 text-xs mb-3">
//               Enter the review text to analyze its authenticity.
//             </p>
//             <textarea
//               value={reviewText}
//               onChange={(e) => setReviewText(e.target.value)}
//               placeholder="Enter the review text here..."
//               className="w-full h-32 border rounded-md p-3 text-gray-800 text-sm
//               placeholder-gray-400 focus:ring-2 focus:ring-[#19A595] focus:border-[#19A595] outline-none resize-none
//               bg-[#F5FFFD] border-[#19A595]"
//             ></textarea>
//           </div>

//           {/* OR Divider */}
//           <div className="flex items-center justify-center mb-6">
//             <div className="border-t border-gray-300 flex-1"></div>
//             <span className="mx-4 text-gray-500 text-xs font-medium">OR</span>
//             <div className="border-t border-gray-300 flex-1"></div>
//           </div>

//           {/* Product URL Input */}
//           <div className="border border-gray-300 rounded-lg p-4 mb-6 bg-white shadow-sm">
//             <h3 className="font-bold text-gray-900 mb-1 text-base">Paste Product URL</h3>
//             <p className="text-gray-600 text-xs mb-3">
//               Enter a product URL to analyze all its reviews
//             </p>
//             <div className="flex items-center border border-[#19A595] focus-within:ring-2 focus-within:ring-[#19A595] focus-within:border-[#19A595] rounded-md p-3 bg-[#F5FFFD] transition-all duration-200">
//               <img
//                 src="/link.png" 
//                 alt="URL Icon"
//                 className="h-8 w-8"
//               />
//               <input
//                 type="text"
//                 value={productURL}
//                 onChange={(e) => setProductURL(e.target.value)}
//                 placeholder="https://example.com/product/123"
//                 className="flex-1 ml-2 bg-transparent outline-none text-gray-700 text-sm placeholder-gray-400"
//               />
//             </div>
//           </div>

//           {/* Error Message */}
//           {error && (
//             <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
//               <p className="text-red-600 text-sm">{error}</p>
//             </div>
//           )}

//           {/* Analyze Button */}
//           <button
//             type="submit"
//             disabled={loading}
//             style={{
//               width: "100%",
//               backgroundColor: loading ? "#A7F3D0" : "#14B8A6",
//               color: "white",
//               padding: "0.5rem 1rem",
//               borderRadius: "0.5rem",
//               fontWeight: "600",
//               cursor: loading ? "not-allowed" : "pointer",
//               transition: "background-color 0.3s",
//             }}
//           >
//             {loading ? "Analyzing..." : "Start Analyzing"}
//           </button>

//         </form>

//         {/* Right Side Illustration */}
//         <div className="w-full lg:flex-1 min-w-0 flex justify-start lg:mt-8">
//           <img
//             src="/ReviewAnalyzer.png"
//             alt="Review Analysis Illustration"
//             className="w-full h-auto object-contain"
//             style={{ maxWidth: '800px' }}
//           />
//         </div>
//       </div>

//       {/* Results Section */}
//       {result && (
//         <div className="px-2 md:px-6 pb-12 bg-white">
//           <div className="max-w-4xl mx-auto border border-[#19A595] rounded-lg p-6 bg-gradient-to-br from-teal-50 to-white shadow-lg">
//             <h3 className="text-xl font-bold text-gray-800 mb-4">Analysis Results</h3>
            
//             {/* Summary Statistics */}
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <p className="text-sm text-gray-600 mb-1">Total Reviews</p>
//                 <p className="text-2xl font-bold text-[#19A595]">{result.total_reviews || 0}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <p className="text-sm text-gray-600 mb-1">Fake Reviews</p>
//                 <p className="text-2xl font-bold text-red-500">{result.fake_count || 0}</p>
//               </div>
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <p className="text-sm text-gray-600 mb-1">Genuine Reviews</p>
//                 <p className="text-2xl font-bold text-green-500">{result.genuine_count || 0}</p>
//               </div>
//             </div>

//             {/* Sentiment Distribution */}
//             {result.sentiment_distribution && (
//               <div className="bg-white p-4 rounded-lg shadow mb-4">
//                 <h4 className="font-bold text-gray-800 mb-3">Sentiment Distribution</h4>
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-700">Positive: {result.sentiment_distribution.positive || 0}</span>
//                     <span className="text-sm font-semibold text-green-600">{result.positive_percentage?.toFixed(1) || 0}%</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-700">Neutral: {result.sentiment_distribution.neutral || 0}</span>
//                     <span className="text-sm font-semibold text-gray-600">{result.neutral_percentage?.toFixed(1) || 0}%</span>
//                   </div>
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm text-gray-700">Negative: {result.sentiment_distribution.negative || 0}</span>
//                     <span className="text-sm font-semibold text-red-600">{result.negative_percentage?.toFixed(1) || 0}%</span>
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Category Distribution */}
//             {result.category_distribution && Object.keys(result.category_distribution).length > 0 && (
//               <div className="bg-white p-4 rounded-lg shadow">
//                 <h4 className="font-bold text-gray-800 mb-3">Category Distribution</h4>
//                 <div className="space-y-2">
//                   {Object.entries(result.category_distribution).map(([category, count]) => (
//                     <div key={category} className="flex justify-between items-center">
//                       <span className="text-sm text-gray-700 capitalize">{category}</span>
//                       <span className="text-sm font-semibold text-[#19A595]">{count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewAnalyzer;



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


