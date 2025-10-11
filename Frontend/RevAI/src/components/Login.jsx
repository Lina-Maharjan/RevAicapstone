import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex max-w-5xl w-full items-center justify-between gap-6">
        
        {/* Left Image Card */}
        <div className="hidden md:flex flex-col justify-between items-center bg-[#E0F2FE] rounded-2xl border-2 border-blue-400 p-6 w-1/2">
          <img
            src="/LoginImage.png"
            alt="Login Illustration"
            className="w-full h-auto object-contain rounded-lg"
          />
          <div className="text-center mt-4">
            <h2 className="text-lg font-bold text-teal-600">RevAI</h2>
            <p className="text-gray-600 text-sm mt-1">
              Sentiment and fake review detection uses AI to analyze emotions and spot fake reviews.
            </p>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          {/* Heading */}
          <h2 className="text-2xl font-bold mb-2">Hello!</h2>
          <p className="text-gray-500 mb-6">Welcome Onboard</p>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div>
              <input
                type="email"
                placeholder="Username/email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Remember + Forgot */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4 text-teal-500" />
                Remember me
              </label>
              <a href="#" className="text-teal-500 font-semibold hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* Button */}
            <button
              type="submit"
              style={{
                width: "100%",
                backgroundColor: "#14B8A6",
                color: "white",
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                fontWeight: "600",
                cursor: "pointer",
                transition: "background-color 0.3s",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.backgroundColor = "#0D9488")
              }
              onMouseOut={(e) =>
                (e.currentTarget.style.backgroundColor = "#14B8A6")
              }
            >
              Login
            </button>
          </form>

          {/* Signup */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Don’t have an account?{" "}
            <a href="#" className="text-teal-600 font-semibold hover:underline">
              Sign Up 
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;



// import React, { useState } from "react";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Email: ${email}, Password: ${password}`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-green-50 px-4">
//       <div className="flex bg-white rounded-2xl shadow-lg overflow-hidden max-w-5xl w-full">
//         {/* Left Info Card */}
//         <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-r from-teal-100 to-green-100 p-8 w-1/2 text-center">
//           <div className="bg-white p-6 rounded-xl shadow-md">
//             <img
//               src="https://img.icons8.com/color/96/000000/lock--v1.png"
//               alt="Security"
//               className="mx-auto mb-4"
//             />
//             <ul className="text-teal-700 mb-4 space-y-2">
//               <li>Secure login system</li>
//               <li>Fast authentication</li>
//               <li>Trusted by users</li>
//             </ul>
//             <div className="flex justify-between text-sm font-semibold text-teal-800">
//               <p>
//                 <span className="text-black font-bold">258-bit</span> Encryption
//               </p>
//               <p>
//                 <span className="text-black font-bold">99.9%</span> Uptime
//               </p>
//             </div>
//           </div>
//         </div>

//         {/* Right Login Form */}
//         <div className="w-full md:w-1/2 p-8">
//          {/* Logo + Heading */}
//         <div className="flex flex-col items-center mb-6">
//         <div className="flex items-center gap-2 mb-2">
//         <img src="/logo.png" alt="RevAI Logo" className="w-10 h-10" />
//         <span className="text-xl font-bold text-black">RevAI</span>
//         </div>

//         {/* Title & Description */}
//         <h2 className="text-3xl font-bold mb-1">Sign In to RevAI</h2>
//         <p className="text-gray-500 text-sm text-center">
//         Access your AI-powered review analysis dashboard
//         </p>
//         </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email */}
//             <div>
//               <label className="block text-black text-sm mb-1">
//                 Email Address
//               </label>
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-black text-sm mb-1">
//                 Password
//               </label>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
//                 required
//               />
//             </div>

//             {/* Remember + Forgot */}
//             <div className="flex items-center justify-between text-sm">
//               <label className="flex items-center gap-2">
//                 <input type="checkbox" className="h-4 w-4 text-teal-500" />
//                 Remember me
//               </label>
//              <a href="#"  className="text-teal-500 font-semibold hover:underline">Forgot Password?</a>
//             </div>

//             <button type="submit"
//                 style={{width: '100%',backgroundColor: '#3B82F6', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem',
//                 fontWeight: '600', cursor: 'pointer', transition: 'background-color 0.3s',}}
//             onMouseOver={e => e.currentTarget.style.backgroundColor = '#14B8A6'} 
//             onMouseOut={e => e.currentTarget.style.backgroundColor = '#3B82F6'}>Sign In
//             </button>

//           </form>
//           {/* Signup */}
//           <p className="text-center text-teal-600 text-sm mt-4">
//             Don’t have an account?{" "}
//             <a href="#" className="text-teal-600 font-semibold hover:underline">
//               Sign Up Now
//             </a>
//           </p>

//           {/* Divider */}
//           <div className="flex items-center my-4">
//             <hr className="flex-grow border-teal-600" />
//             <span className="mx-2 text-teal-600 text-sm">Or continue with</span>
//             <hr className="flex-grow border-gray-300" />
//           </div>

//           {/* Social Buttons */}
//           <div className="flex gap-3 justify-center">
//             <button className="flex items-center justify-center gap-2 bg-white border px-4 py-2 text-teal-600 rounded-lg shadow-sm hover:bg-gray-100">
//               < img src="https://img.icons8.com/color/24/google-logo.png" alt="" />
//               Google
//             </button>
//             <button className="flex items-center justify-center gap-2 bg-white border px-4 py-2 text-teal-600 rounded-lg shadow-sm hover:bg-gray-100">
//               <img src="https://img.icons8.com/color/24/facebook-new.png" alt="" />
//               Facebook
//             </button>
//             <button className="flex items-center justify-center gap-2 bg-white border px-4 py-2 text-teal-600 rounded-lg shadow-sm hover:bg-gray-100">
//               <img src="https://img.icons8.com/color/24/linkedin.png" alt="" />
//               LinkedIn
//             </button>
//           </div>

          
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
