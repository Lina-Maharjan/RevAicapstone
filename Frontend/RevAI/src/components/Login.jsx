// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { apiFetch, setToken } from "../utils/api";

// const Login = () => {
//   const [identifier, setIdentifier] = useState("");
//   const [password, setPassword] = useState("");
//   const [identifierTouched, setIdentifierTouched] = useState(false);
//   const [passwordTouched, setPasswordTouched] = useState(false);

//   const navigate = useNavigate(); // To redirect after login

//   const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
//   const isUsernameFormat = /^[a-zA-Z0-9_]{3,}$/.test(identifier);
//   const isIdentifierValid = isEmailFormat || isUsernameFormat;
//   const isPasswordValid = password.length >= 6;

//   const API_BASE = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";
//   const API_URL = `${API_BASE}/auth`;

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIdentifierTouched(true);
//     setPasswordTouched(true);

//     if (!isIdentifierValid || !isPasswordValid) {
//       alert("Please fix the errors before submitting.");
//       return;
//     }

//     try {
//       const data = await apiFetch('/auth/login', {
//         method: 'POST',
//         body: JSON.stringify({ identifier, password })
//       });

//       // Save token and redirect
//       setToken(data.access_token);
//       alert('Login successful!');
//       navigate('/dashboard');
//     } catch (error) {
//       console.error('Error:', error);
//       alert(error.detail || error.message || 'Server error. Try again later.');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-white px-4">
//       <div className="flex max-w-4xl w-full items-center gap-6">

//         {/* Left Image */}
//         <div className="hidden md:flex w-1/2">
//           <img
//             src="/login.png"
//             alt="Login Illustration"
//             className="w-full h-auto object-cover rounded-2xl"
//           />
//         </div>

//         {/* Right Form */}
//         <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
//           <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
//           <p className="text-gray-500 mb-6">Login to your account</p>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Email or Username */}
//             <div>
//               <input
//                 type="text"
//                 placeholder="Email or Username"
//                 value={identifier}
//                 onChange={(e) => setIdentifier(e.target.value)}
//                 onBlur={() => setIdentifierTouched(true)}
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   identifierTouched && !isIdentifierValid
//                     ? "border-red-500 focus:ring-red-400"
//                     : "focus:ring-teal-400"
//                 }`}
//                 required
//               />
//               {identifierTouched && !isIdentifierValid && (
//                 <p className="text-red-500 text-sm mt-1">Enter a valid email or username.</p>
//               )}
//             </div>

//             {/* Password */}
//             <div>
//               <input
//                 type="password"
//                 placeholder="Password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 onBlur={() => setPasswordTouched(true)}
//                 className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
//                   passwordTouched && !isPasswordValid
//                     ? "border-red-500 focus:ring-red-400"
//                     : "focus:ring-teal-400"
//                 }`}
//                 required
//               />
//               {passwordTouched && !isPasswordValid && (
//                 <p className="text-red-500 text-sm mt-1">
//                   Password must be at least 6 characters.
//                 </p>
//               )}
//             </div>

//             <button
//               type="submit"
//               style={{
//                 width: "100%",
//                 backgroundColor: "#14B8A6",
//                 color: "white",
//                 padding: "0.5rem 1rem",
//                 borderRadius: "0.5rem",
//                 fontWeight: "600",
//                 cursor: "pointer",
//               }}
//             >
//               Login
//             </button>
//           </form>

//           <p className="text-center text-gray-600 text-sm mt-4">
//             Don’t have an account?{" "}
//             <a href="/signup" className="text-teal-600 font-semibold hover:underline">
//               Sign Up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login; 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch, setToken } from "../utils/api";
import { toast } from 'react-toastify';

const Login = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [identifierTouched, setIdentifierTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  const navigate = useNavigate();

  const isEmailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(identifier);
  const isUsernameFormat = /^[a-zA-Z0-9_]{3,}$/.test(identifier);
  const isIdentifierValid = isEmailFormat || isUsernameFormat;
  const isPasswordValid = password.length >= 6;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIdentifierTouched(true);
    setPasswordTouched(true);

    if (!isIdentifierValid || !isPasswordValid) {
      toast.error("Please fix the errors before submitting.");
      return;
    }

    try {
      const data = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ identifier, password })
      });

      // Save token and redirect
      setToken(data.access_token);
      
      // Dispatch auth change event to update navbar
      window.dispatchEvent(new Event('authChange'));
      
      toast.success('Login successful! Redirecting...', {
        position: "top-right",
        autoClose: 2000,
      });
      
      // Delay navigation to show toast
      setTimeout(() => navigate('/dashboard'), 2000);
    } catch (error) {
      console.error('Error:', error);
      toast.error(error.detail || error.message || 'Server error. Try again later.', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex max-w-5xl w-full items-center gap-8 md:gap-12">
        {/* Left Image */}
        <div className="hidden md:flex w-1/2 md:-ml-12">
          <img
            src="/Login.jpg"
            alt="Login Illustration"
            className="w-full h-auto object-cover rounded-2xl"
          />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h2 className="text-2xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-gray-500 mb-6">Login to your account</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email or Username */}
            <div>
              <input
                type="text"
                placeholder="Email or Username"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                onBlur={() => setIdentifierTouched(true)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  identifierTouched && !isIdentifierValid
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-teal-400"
                }`}
                required
              />
              {identifierTouched && !isIdentifierValid && (
                <p className="text-red-500 text-sm mt-1">Enter a valid email or username.</p>
              )}
            </div>

            {/* Password */}
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                  passwordTouched && !isPasswordValid
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-teal-400"
                }`}
                required
              />
              {passwordTouched && !isPasswordValid && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be at least 6 characters.
                </p>
              )}
            </div>

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
              }}
            >
              Login
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-4">
            Don't have an account?{" "}
            <a href="/signup" className="text-teal-600 font-semibold hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;