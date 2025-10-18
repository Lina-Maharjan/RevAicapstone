// import React, { useState } from "react";

// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert(`Username: ${username}, Email: ${email}, Password: ${password}`);
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-green-50 mt-9 px-4">
//       <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl w-full">
        
//         {/* Left Illustration */}
//         <div className="hidden md:flex justify-center items-center md:w-1/2">
//           <img
//             src="/SignIn.png"
//             alt="SignUp Illustration"
//             className="max-w-lg w-full h-auto"
//           />
//         </div>

//         {/* Right SignUp Form */}
//         <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8">
//           {/* Logo + Heading */}
//           <div className="flex flex-col items-center mb-6">
//             <div className="flex items-center gap-2 mb-2">
//               <img src="/logo.png" alt="RevAI Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
//               <span className="text-lg sm:text-xl font-bold text-black">RevAI</span>
//             </div>

//             {/* Title & Description */}
//             <h2 className="text-xl sm:text-2xl font-bold mb-1">SignUp to RevAI</h2>
//             <p className="text-gray-500 text-sm text-center">
//               Create your account to access AI-powered review analysis
//             </p>
//           </div>

//           {/* Form */}
//           <form onSubmit={handleSubmit} className="space-y-4">
//             {/* Username */}
//             <div>
//               <label className="block text-black text-sm mb-1">Username</label>
//               <input
//                 type="text"
//                 placeholder="Enter username"
//                 value={username}
//                 onChange={(e) => setUsername(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
//                 required
//               />
//             </div>

//             {/* Email */}
//             <div>
//               <label className="block text-black text-sm mb-1">Email Address</label>
//               <input
//                 type="email"
//                 placeholder="example@email.com"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
//                 required
//               />
//             </div>

//             {/* Password */}
//             <div>
//               <label className="block text-black text-sm mb-1">Password</label>
//               <input
//                 type="password"
//                 placeholder="Enter password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
//                 required
//               />
//             </div>

//             {/* Submit Button */}
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
//                 transition: "background-color 0.3s",
//               }}
//               onMouseOver={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#0D9488")
//               }
//               onMouseOut={(e) =>
//                 (e.currentTarget.style.backgroundColor = "#14B8A6")
//               }
//             >
//               SignUp
//             </button>
//           </form>

//           {/* Login Link */}
//           <p className="text-center text-gray-600 text-sm mt-4">
//             Already have an account?{" "}
//             <a href="#" className="text-teal-600 font-semibold hover:underline">
//               Login
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignUp; 

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for redirect
import { apiFetch } from "../utils/api";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Validation states
  const [usernameTouched, setUsernameTouched] = useState(false);
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordTouched, setPasswordTouched] = useState(false);

  // Feedback & loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Validation logic
  const isUsernameValid = username.length >= 3;
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isPasswordValid = password.length >= 6 && new TextEncoder().encode(password).length <= 72;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameTouched(true);
    setEmailTouched(true);
    setPasswordTouched(true);

    // Client-side validation
    if (!isUsernameValid || !isEmailValid || !isPasswordValid) {
      setError("Please fix the errors before submitting.");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await apiFetch('/auth/signup', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      });

      setSuccess('User created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 1500);

      // Reset form
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      // apiFetch throws normalized error objects
      setError(err.message || err.detail || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-green-50 mt-9 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl w-full">
        {/* Left Illustration */}
        <div className="hidden md:flex justify-center items-center md:w-1/2">
          <img src="/SignIn.png" alt="SignUp Illustration" className="max-w-lg w-full h-auto" />
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="RevAI Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl font-bold text-black">RevAI</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">SignUp to RevAI</h2>
            <p className="text-gray-500 text-sm text-center">
              Create your account to access AI-powered review analysis
            </p>
          </div>

          {/* Feedback */}
          {error && <p className="text-red-500 text-center mb-2 text-sm">{error}</p>}
          {success && <p className="text-green-600 text-center mb-2 text-sm">{success}</p>}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div>
              <label className="block text-black text-sm mb-1">Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onBlur={() => setUsernameTouched(true)}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  usernameTouched && !isUsernameValid
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-teal-400"
                }`}
                required
              />
              {usernameTouched && !isUsernameValid && (
                <p className="text-red-500 text-sm mt-1">
                  Username must be at least 3 characters.
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-black text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={() => setEmailTouched(true)}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  emailTouched && !isEmailValid
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-teal-400"
                }`}
                required
              />
              {emailTouched && !isEmailValid && (
                <p className="text-red-500 text-sm mt-1">Enter a valid email address.</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-black text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={() => setPasswordTouched(true)}
                className={`w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 ${
                  passwordTouched && !isPasswordValid
                    ? "border-red-500 focus:ring-red-400"
                    : "focus:ring-teal-400"
                }`}
                required
              />
              {passwordTouched && !isPasswordValid && (
                <p className="text-red-500 text-sm mt-1">
                  Password must be between 6 and 72 characters.
                </p>
              )}
            </div>

            {/* Submit */}
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
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-teal-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
