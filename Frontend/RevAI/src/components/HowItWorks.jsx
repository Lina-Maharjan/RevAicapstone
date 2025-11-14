import React from "react";

const steps = [
  {
    imgSrc: "/human.png",
    title: "Sign In to your RevAI account",
    description:
      "Create a free account or log in to access our powerful review analysis tools.",
  },
  {
    imgSrc: "/download.png",
    title: "Paste or upload a product review",
    description:
      "Simply copy and paste review text or upload a file containing multiple reviews.",
  },
  {
    imgSrc: "/brain.png",
    title: "AI analyzes the text using NLP",
    description:
      "Our advanced natural language processing engine examines patterns and authenticity markers.",
  },
  {
    imgSrc: "/time.png",
    title: "Get the authenticity score and sentiment result",
    description:
      "Receive detailed analysis including fake probability score and sentiment classification.",
  },
];

export default function HowItWorks() {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-6 py-16 md:py-20"
      style={{
        background:
          "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
      }}
    >
      <div className="max-w-7xl w-full flex flex-col items-center gap-12">
        {/* Title */}
        <div className="text-center">
          <h2 className="text-4xl md:text-5xl font-black text-black mb-3">
            How it works
          </h2>
          <p className="text-black text-lg">
            Analyzing reviews is simple with our four-step process.
          </p>
        </div>

        {/* Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {steps.map((step, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)]
              transform transition-all duration-300 ease-in-out 
              hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)]
              flex flex-col justify-center items-center text-center min-h-[280px]"
            >
              <div className="mb-4 flex justify-center items-center h-16">
                <img
                  src={step.imgSrc}
                  alt={step.title}
                  className={`mx-auto object-contain ${
                    step.imgSrc === "/human.png" || step.imgSrc === "/brain.png"
                      ? "w-[72px] h-[72px]"
                      : "w-[52px] h-[52px]"
                  }`}
                />
              </div>

              <h3 className="font-extrabold text-lg mb-2">{step.title}</h3>
              <p className="text-sm text-gray-800">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// import React from "react";

// const steps = [
//   {
//     imgSrc: "/human.png", // Replace with your actual image path
//     title: "Sign In to your RevAI account",
//     description:
//       "Create a free account or log in to access our powerful review analysis tools.",
//   },
//   {
//     imgSrc: "/download.png",
//     title: "Paste or upload a product review",
//     description:
//       "Simply copy and paste review text or upload a file containing multiple reviews.",
//   },
//   {
//     imgSrc: "/brain.png",
//     title: "AI analyzes the text using NLP",
//     description:
//       "Our advanced natural language processing engine examines patterns and authenticity markers.",
//   },
//   {
//     imgSrc: "/time.png",
//     title: "Get the authenticity score and sentiment result",
//     description:
//       "Receive detailed analysis including fake probability score and sentiment classification.",
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{
//         background:
//           "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
//       }}
//     >
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12">
//         {/* Title Section */}
//         <div className="text-center mb-4">
//           <h2 className="text-4xl md:text-5xl font-black text-black mb-3">
//             How it works
//           </h2>
//           <p className="text-black text-lg">
//             Analyzing reviews is simple with our four-step process.
//           </p>
//         </div>

//         {/* Steps Grid */}
//         <div className="flex items-center gap-6 w-full">
//           {steps.map((step, index) => (
//             <React.Fragment key={index}>
//               {/* Step Card */}
//               <div
//                 className="bg-white rounded-2xl p-6 shadow-[0_6px_24px_rgba(0,0,0,0.08)]
//                 transform transition-all duration-300 ease-in-out 
//                 hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
//                 flex flex-col justify-center items-center text-center min-h-[300px] w-full"
//               >
//                 <div className="mb-4 flex justify-center items-center h-16">
//                 <img
//                   src={step.imgSrc}
//                   alt={step.title}
//                   className={`mx-auto -mt-2 object-contain ${
//                     step.imgSrc === "/human.png" || step.imgSrc === "/brain.png"
//                       ? "w-18 h-18" // Bigger for human and brain
//                       : "w-13 h-13" // Default for others
//                   }`}
//                 />
//                 </div>

//                 <h3 className="font-extrabold text-lg mb-2">{step.title}</h3>
//                 <p className="text-sm text-gray-800">{step.description}</p>
//               </div>

//               {/* Arrow between steps (desktop only, hidden after last step) */}
//               {index !== steps.length - 1 && (
//                 <div className="hidden md:flex items-center justify-center">
//                   <span className="text-3xl font-extrabold text-[#0E3F83]">
//                     →
//                   </span>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

//second UI
// import React from "react";

// const steps = [
//   {
//     number: "01",
//     title: "Paste Your Review",
//     description:
//       "Simply paste the product review that you want to analyze into our text area.",
//   },
//   {
//     number: "02",
//     title: "AI Analysis",
//     description:
//       "Our advanced AI model processes the review text for authenticity and sentiment.",
//   },
//   {
//     number: "03",
//     title: "Get Insights",
//     description:
//       "Receive detailed insights about authenticity, sentiment, and important keywords.",
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{
//         background:
//           "linear-gradient(90deg, #F0FDFA 0%, #E6FFFA 50%, #CCFBF1 100%)",
//       }}
//     >
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12 text-center">
//         <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0E3F83] to-[#030E1D] bg-clip-text text-transparent mb-3">
//           How It works
//         </h2>
//         <p className="text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto">
//           Analyzing reviews is simple with our three-step process.
//         </p>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl mx-auto">
//           {steps.map((step, index) => (
//             <React.Fragment key={index}>
//               <div className="flex flex-col items-center text-center max-w-[250px]">
//                 {/* Number Circle */}
//                 <div className="bg-[#1E3A8A] text-white font-semibold w-12 h-12 flex items-center justify-center rounded-full text-lg mb-3">
//                   {step.number}
//                 </div>

//                 {/* Step Title */}
//                 <h3 className="text-xl font-bold mb-2">{step.title}</h3>

//                 {/* Description */}
//                 <p className="text-sm text-gray-700">{step.description}</p>
//               </div>

//               {/* Arrow between steps (desktop only) */}
//               {index !== steps.length - 1 && (
//                 <div className="hidden md:flex flex-col justify-center items-center px-6">
//                   <span className="text-5xl font-extrabold text-[#0E3F83]">
//                     →
//                   </span>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }














































// import React from "react";

// const steps = [
//   {
//     number: "01",
//     title: "Paste Your Review",
//     description:
//       "Simply paste the product review that you want to analyze into our text area.",
//   },
//   {
//     number: "02",
//     title: "AI Analysis",
//     description:
//       "Our advanced AI model processes the review text for authenticity and sentiment.",
//   },
//   {
//     number: "03",
//     title: "Get Insights",
//     description:
//       "Receive detailed insights about authenticity, sentiment, and important keywords.",
//   },
// ];

// export default function HowItWorks() {
//   return (
//     <div
//       className="min-h-screen flex items-center justify-center px-6"
//       style={{
//         background:
//           // "linear-gradient(90deg, #DBEAFE 0%, #D6EFFA 31%, #D3F3F7 50%, #CCFBF1 100%)",
//           "linear-gradient(90deg, #CCFBF1 0%, #D3F3F7 41%, #D6EFFA 50%, #DBEAFE 100%)",
//         color: "#1E293B", // Slate-800 equivalent for text
//       }}
//     >
//       <div className="max-w-7xl w-full flex flex-col items-center justify-center gap-12 text-center">
//         <h2 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-[#0E3F83] to-[#030E1D] bg-clip-text text-transparent mb-3">
//           How It works
//         </h2>
//         <p className="text-lg md:text-xl font-medium mb-12 max-w-3xl mx-auto">
//           Analyzing reviews is simple with our three-step process.
//         </p>

//         <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full max-w-6xl mx-auto">
//           {steps.map((step, index) => (
//             <React.Fragment key={index}>
//               <div className="flex flex-col items-center text-center max-w-[250px]">
//                 {/* Number Circle */}
//                 <div className="bg-[#1E3A8A] text-white font-semibold w-12 h-12 flex items-center justify-center rounded-full text-lg mb-3">
//                   {step.number}
//                 </div>

//                 {/* Step Title */}
//                 <h3 className="text-xl font-bold mb-2">{step.title}</h3>

//                 {/* Description */}
//                 <p className="text-sm text-gray-700">{step.description}</p>
//               </div>

//               {/* Arrow between steps (desktop only) */}
//               {index !== steps.length - 1 && (
//                 <div className="hidden md:flex flex-col justify-center items-center px-6">
//                   <span className="text-5xl font-extrabold text-[#0E3F83]">
//                     →
//                   </span>
//                 </div>
//               )}
//             </React.Fragment>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
