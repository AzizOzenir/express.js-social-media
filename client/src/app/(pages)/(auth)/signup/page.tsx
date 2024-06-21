"use client";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { BASE_URL } from "@/consts";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth_context";

const SignupPage: React.FC = () => {
  const { login, authToken } = useAuth();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    username: "",
  });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (formData.password !== formData.confirmPassword) {
      alert("passwords are not matching");
    }
    e.preventDefault();
    try {
      await axios.post(`${BASE_URL}auth/signup`, {
        email: formData.email,
        password: formData.password,
        username: formData.username,
      });
      const response = await axios.post(`${BASE_URL}auth/login`, {
        email: formData.email,
        password: formData.password,
      });
      const { token, user } = response.data;
      login(token);
    } catch (error) {
      console.log((error as any).response.statusText);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg rounded-xl shadow-primary p-8 max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold text-indigo-600 text-center mb-6">
          Signup
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-black">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
            />
          </div>
          <div className="mb-4">
            <label className="block text-black">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
            />
          </div>
          <div className="mb-6">
            <label className="block text-black">Username</label>
            <input
              type="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-indigo-500 rounded-lg bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg focus:outline-none text-black"
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 mb-4 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Signup
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
          <a href="/login" className="text-indigo-600 hover:underline">
            Already have an account? Login
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
