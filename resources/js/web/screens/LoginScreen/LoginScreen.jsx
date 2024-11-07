import React from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Perform login logic here
    navigate("/contact");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="flex flex-col md:flex-row bg-white rounded-lg shadow-lg overflow-hidden w-full max-w-4xl">
        <div className="md:w-1/2">
          <img
            src="https://bcassetcdn.com/public/blog/wp-content/uploads/2022/06/22202833/softball-mark-bybaruch-nave-dribbble.png"
            alt="Floating person"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            Welcome Back
          </h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-300"
            />
            <button
              type="submit"
              className="w-full py-2 bg-primary-300 text-white rounded hover:bg-primary-600 transition-colors"
            >
              Login
            </button>
          </form>
          <p className="mt-4 text-sm text-gray-600">
            Haven't an account?{" "}
            <Link to="/signup" className="text-primary-300 hover:underline">
              Create Here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
