import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [fromData, setFromData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFromData({
      ...fromData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/create-user", fromData);

      alert("Registration Successful");

      setFromData({
        username: "",
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error.response?.data || error.message);
      alert(error.response?.data?.message || "Failed to register");
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 via-blue-500 to-indigo-200">
        <form
          onSubmit={handleSubmit}
          className="bg-cyan-500 p-8 rounded-xl shadow-lg w-96"
        >
          <h1 className="mb-5 text-2xl font-bold">Registration Form</h1>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            name="username"
            value={fromData.username}
            onChange={handleChange}
            required
            className="w-full p-2 border bg-white rounded-lg"
          />
          <br /> <br />
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={fromData.email}
            onChange={handleChange}
            className="border w-full p-2 bg-white rounded-lg"
            required
          ></input>
          <br />
          <br />
          <label className="block mb-1 font-medium">Password</label>
          <input
            type="password"
            name="password"
            value={fromData.password}
            onChange={handleChange}
            className="border bg-white rounded-lg w-full p-2"
            required
          ></input>
          <br />
          <br />
          <button
            type="submit"
            className="bg-amber-800 rounded-3xl p-2 m-2 w-full text-white py-2 "
          >
            Register
          </button>
          <p className="text-center mt-4">
            Already have an account ?{" "}
            <Link
              to="/login"
              className="text-black font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};
export default Register;
