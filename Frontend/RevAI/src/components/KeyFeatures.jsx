import React from "react";

const features = [
  {
    imgSrc: "/Real.png",
    title: "Real Vs Fake Detection",
    description:
      "Advanced AI algorithms to detect fake online reviews with high accuracy.",
    gradient: "bg-gradient-to-b from-[#F0FDFA] to-[#CCFBF1]",
  },
  {
    imgSrc: "/Like.png",
    title: "Sentiment Analysis",
    description:
      "Identify the emotional tone of reviews as positive, negative or neutral.",
    gradient: "bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE]",
  },
  {
    imgSrc: "/Analyzer.png",
    title: "Review Scoring",
    description:
      "Get quantifiable scores that measure review authenticity and sentiment.",
    gradient: "bg-gradient-to-b from-[#FEFCE8] to-[#FEF9C3]",
  },
  {
    imgSrc: "/Insight.png",
    title: "Aspect-Based Insights",
    description:
      "Discover sentiment trends for specific product aspects like quality or price.",
    gradient: "bg-gradient-to-b from-[#FFEBFA] to-[#F5D9EE]",
  },
];

const KeyFeatures = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        // background: "linear-gradient(90deg, #F8FAFC 0%, #F0FDF4 100%)",
        background:"White"
      }}
    >
      <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12">
        {/* Title Section */}
        <div className="text-center mb-4">
          <h2 className="text-4xl md:text-5xl font-black  text-black mb-3">
            What RevAI Can Do
          </h2>
          <p className="text-black text-lg">
            Harness the power of artificial intelligence to make informed decisions about product reviews.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {features.map((feature, index) => (
            <div
              key={index}
              className={`${feature.gradient} rounded-2xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)]
                transform transition-all duration-300 ease-in-out 
                hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
                flex flex-col justify-center items-center text-center min-h-[250px]`}
            >
              <div className="mb-4">
                <img
                  src={feature.imgSrc}
                  alt={feature.title}
                  className="w-12 h-12 object-contain mx-auto"
                />
              </div>

              <h3 className="font-extrabold text-lg mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-800">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default KeyFeatures;
// import React from "react";

// const features = [
//   {
//     imgSrc: "/Real.png",
//     title: "Real Vs Fake Detection",
//     description:
//       "Advanced AI algorithms to detect fake online reviews with high accuracy.",
//     gradient: "bg-gradient-to-b from-[#F0FDFA] to-[#CCFBF1]",
//   },
//   {
//     imgSrc: "/Like.png",
//     title: "Sentiment Analysis",
//     description:
//       "Identify the emotional tone of reviews as positive, negative or neutral.",
//     gradient: "bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE]",
//   },
//   {
//     imgSrc: "/Analyzer.png",
//     title: "Review Scoring",
//     description:
//       "Get quantifiable scores that measure review authenticity and sentiment.",
//     gradient: "bg-gradient-to-b from-[#FEFCE8] to-[#FEF9C3]",
//   },
//   {
//     imgSrc: "/Insight.png",
//     title: "Aspect-Based Insights",
//     description:
//       "Discover sentiment trends for specific product aspects like quality or price.",
//     gradient: "bg-gradient-to-b from-[#FFEBFA] to-[#F5D9EE]",
//   },
// ];

// const KeyFeatures = () => {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{
//         // background: "linear-gradient(90deg, #F8FAFC 0%, #F0FDF4 100%)",
//         background:"White"
//       }}
//     >
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12">
//         {/* Title Section */}
//         <div className="text-center mb-4">
//           <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-700 to-teal-400 bg-clip-text text-transparent mb-3">
//             Key Features
//           </h2>
//           <p className="text-gray-700 text-lg">
//             Our powerful tools help you analyze reviews and make better
//             decisions.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className={`${feature.gradient} rounded-2xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)]
//               transform transition-all duration-300 ease-in-out 
//               hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
//               flex flex-col justify-between min-h-[250px]`}
//             >
//               <div className="mb-4">
//                 <img
//                   src={feature.imgSrc}
//                   alt={feature.title}
//                   className="w-12 h-12 object-contain"
//                 />
//               </div>
//               <h3 className="font-extrabold text-lg mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-800">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KeyFeatures;

// import React from "react";

// const features = [
//   {
//     imgSrc: "/Real.png",
//     title: "Real Vs Fake Detection",
//     description:
//       "Advanced AI algorithms to detect fake online reviews with high accuracy.",
//     gradient: "bg-gradient-to-b from-[#F0FDFA] to-[#CCFBF1]",
//   },
//   {
//     imgSrc: "/Like.png",
//     title: "Sentiment Analysis",
//     description:
//       "Identify the emotional tone of reviews as positive, negative or neutral.",
//     gradient: "bg-gradient-to-b from-[#EFF6FF] to-[#DBEAFE]",
//   },
//   {
//     imgSrc: "/Analyzer.png",
//     title: "Review Scoring",
//     description:
//       "Get quantifiable scores that measure review authenticity and sentiment.",
//     gradient: "bg-gradient-to-b from-[#FEFCE8] to-[#FEF9C3]",
//   },
//   {
//     imgSrc: "/Insight.png",
//     title: "Aspect-Based Insights",
//     description:
//       "Discover sentiment trends for specific product aspects like quality or price.",
//     gradient: "bg-gradient-to-b from-[#FFEBFA] to-[#F5D9EE]",
//   },
// ];

// const KeyFeatures = () => {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{
//         background: "linear-gradient(90deg, #F8FAFC 0%, #F0FDF4 100%)",
//       }}
//     >
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12">
//         {/* Title Section */}
//         <div className="text-center mb-4">
//           <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-teal-700 to-teal-400 bg-clip-text text-transparent mb-3">
//             Key Features
//           </h2>
//           <p className="text-gray-700 text-lg">
//             Our powerful tools help you analyze reviews and make better
//             decisions.
//           </p>
//         </div>

//         {/* Features Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className={`${feature.gradient} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between min-h-[250px]`}
//             >
//               <div className="mb-4">
//                 <img
//                   src={feature.imgSrc}
//                   alt={feature.title}
//                   className="w-12 h-12 object-contain"
//                 />
//               </div>
//               <h3 className="font-extrabold text-lg mb-2">{feature.title}</h3>
//               <p className="text-sm text-gray-800">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default KeyFeatures;
