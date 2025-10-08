import React from "react";

const faqs = [
  {
    question: "How accurate is RevAI?",
    answer:
      "RevAI achieves 99% accuracy in fake review detection through advanced machine learning algorithms trained on millions of review samples.",
  },
  {
    question: "What languages are supported?",
    answer:
      "Currently, RevAI supports English with more languages being added regularly.",
  },
  {
    question: "Is there a free trial?",
    answer:
      "Yes! New users get 100 free review analyses to try our service. No credit card required to get started.",
  },
  {
    question: "How fast is the analysis?",
    answer:
      "RevAI analyzes reviews in under 2 seconds, providing instant results for quick decision-making.",
  },
];

const FrequentQuestions = () => {
  return (
    <div className="py-10 px-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold text-center mb-8">
        Frequently Asked Questions
      </h2>
      <div className="grid md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="p-5 border  border-[#19A595] rounded-lg shadow-sm 
              transition duration-300 ease-in-out 
              hover:scale-105 hover:shadow-[0_12px_32px_rgba(13,148,136,0.3)] 
              bg-white"
          >
            <h3 className="text-lg font-medium mb-2">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FrequentQuestions;
