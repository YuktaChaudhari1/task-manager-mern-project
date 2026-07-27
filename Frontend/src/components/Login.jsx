import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [fromData, setFromData] = useState({
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
      const res = await api.post("/auth/login", fromData);

      

      navigate("/dashboard", { replace: true });

      setFromData({
        email: "",
        password: "",
      });
    } catch (err) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-cyan-200 via-blue-500 to-indigo-300">
        <form
          onSubmit={handleSubmit}
          className="bg-yellow-200 p-8 rounded-xl shadow-lg w-96"
        >
          <h1 className="mb-5 text-2xl font-bold">Login</h1>

          <label className="block mb-1 font-medium">Email:</label>
          <input
            type="text"
            required
            name="email"
            value={fromData.email}
            onChange={handleChange}
            className="w-full p-2 border bg-white rounded-lg"
          ></input>

          <label>Password :</label>
          <input
            type="password"
            required
            name="password"
            onChange={handleChange}
            value={fromData.password}
            className="w-full bg-white rounded-lg border p-2"
          ></input>

          <button
            type="submit"
            className="bg-amber-700 rounded-3xl p-2 m-2 w-full"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Already don't have an account ?{" "}
            <Link to="/" className="text-black font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Login;
