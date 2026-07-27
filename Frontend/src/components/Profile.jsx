import React from "react";
import { useEffect, useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const fetchProfile = async () => {
    try {
      const res = await api.get(`/auth/profile`);
      setUser(res.data.user);
    } catch (err) {
      return res.status(401).json({ message: "Failed to fetch Data" });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      navigate("/login", { replace: true });
    } catch (err) {
      return res.status(401).json({ message: "Failed to Logout " });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-8 rounded-xl shadow-lg w-96 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
          {user?.username?.charAt(0).toUpperCase()}
        </div>

        <h1 className="text-2xl font-bold mt-4">My Profile</h1>

        <div className="mt-6 text-left space-y-3">
          <p>
            <span className="font-semibold">Username:</span> {user?.username}
          </p>

          <p>
            <span className="font-semibold">Email:</span> {user?.email}
          </p>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-xs font-semibold text-slate-600 bg-amber-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
