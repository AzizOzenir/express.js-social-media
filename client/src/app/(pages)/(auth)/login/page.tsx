"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/consts";
import { useAuth } from "@/context/auth_context";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { login,authToken } = useAuth();


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email: email,
        password: password,
      });
      const { token, user } = response.data;
      login(token)
    } catch (error) {
      console.log((error as any).response.statusText);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r to-green-100">
      {authToken}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl shadow-primary p-8 max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-6">
          Login
        </h2>
        <form onSubmit={handleLogin}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
              required
            />
          </div>
          <div className="mb-6">
            <label className="block text-black">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="flex items-center justify-center my-4">
          <hr className="w-full border-gray-300" />
          <span className="px-3 text-black">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <button className="w-full py-2 mb-2 bg-white text-black border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200 transition duration-300">
          <img
            src="/path/to/google-logo.svg"
            alt="Google"
            className="w-5 h-5 mr-2"
          />
          Continue with Google
        </button>
        <button className="w-full py-2 bg-gray-800 text-white rounded-lg flex items-center justify-center hover:bg-gray-900 transition duration-300">
          <img
            src="/path/to/github-logo.svg"
            alt="GitHub"
            className="w-5 h-5 mr-2"
          />
          Continue with GitHub
        </button>
        <div className="mt-4 text-center">
          <a href="/signup" className="text-indigo-600 hover:underline">
            Don't have an account? Sign up
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
