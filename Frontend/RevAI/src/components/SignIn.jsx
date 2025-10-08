import React, { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Username: ${username}, Email: ${email}, Password: ${password}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-teal-50 to-green-50 px-4">
      <div className="flex flex-col md:flex-row items-center justify-center max-w-5xl w-full">
        
        {/* Left Illustration */}
        <div className="hidden md:flex justify-center items-center md:w-1/2">
          <img
            src="/SignIn.png"
            alt="SignIn Illustration"
            className="max-w-sm w-full h-auto"
          />
        </div>

        {/* Right SignIn Form */}
        <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-lg p-8">
          {/* Logo + Heading */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-2 mb-2">
              <img src="/logo.png" alt="RevAI Logo" className="w-8 h-8 sm:w-10 sm:h-10" />
              <span className="text-lg sm:text-xl font-bold text-black">RevAI</span>
            </div>

            {/* Title & Description */}
            <h2 className="text-xl sm:text-2xl font-bold mb-1">Signin to RevAI</h2>
            <p className="text-gray-500 text-sm text-center">
              Access your AI-powered review analysis dashboard
            </p>
          </div>

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
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-black text-sm mb-1">Email Address</label>
              <input
                type="email"
                placeholder="example@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-black text-sm mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
                required
              />
            </div>

            {/* Submit Button */}
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
              SignUp
            </button>
          </form>

          {/* Signup Link */}
          <p className="text-center text-gray-600 text-sm mt-4">
            Already have an account?{" "}
            <a href="#" className="text-teal-600 font-semibold hover:underline">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
