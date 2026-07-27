import React from "react";
import { useEffect } from "react";
import api from "../api/axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  const [editingTask, setEditingTask] = useState(null);

  const fetchData = async () => {
    try {
      const res = await api.get("/tasks/get-tasks");
      setData(res.data.data);
    } catch (err) {
      if (err.response?.status === 401 || err.response?.status === 403) {
        navigate("/login");
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log("State changed:", data);
  }, [data]);

  const handleTaskChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const createTask = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await api.put(`/tasks/update/${editingTask._id}`, {
          title: task.title,
          description: task.description,
        });
        setEditingTask(null);
      } else {
        await api.post("/tasks/create-tasks", {
          title: task.title,
          description: task.description,
          status: false,
        });
      }

      setTask({
        title: "",
        description: "",
      });
      fetchData();
    } catch (err) {
      return res.status(401).json({ message: "Failed to Create new Task" });
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);

    setTask({
      title: task.title,
      description: task.description,
    });
  };

  const deleteTask = async (id) => {
    try {
      await api.delete(`/tasks/delete/${id}`);
      fetchData();
    } catch (err) {
      return res.status(401).json({ message: "Failed to Delete Task" });
    }
  };

  const toggleStatus = async (task) => {
    try {
      await api.put(`/tasks/update/${task._id}`, {
        status: !task.status,
      });
      fetchData();
    } catch (err) {
      return res.status(401).json({ message: "Failed to Change Status" });
    }
  };
  const goToProfilePage = async () => {
    try {
      navigate("/profile");
    } catch (err) {
      return res.status(401).json({ message: "Failed to redirect to Profile" });
    }
  };
  const handleLogout = async () => {
    try {
      await api.post("/auth/logout");

      navigate("/login", { replace: true });
    } catch (err) {
      return res.status(401).json({ message: "Failed to logout" });
    }
  };

  return (
    <>
      {/* Dashboard Header */}

      <header className="max-w-7xl mx-auto mt-4 mb-8 border-b border-slate-200/60 pb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Left: Branding & Subtitle */}
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage, track, and optimize your daily operational tasks.
          </p>
        </div>

        {/* Right: Metrics & User Controls */}
        <div className="flex flex-wrap items-center gap-4 sm:ml-auto">
          {/* Metric Stat Card */}
          <div className="bg-white border border-slate-200/80 rounded-xl px-4 py-2.5 shadow-sm flex items-center gap-3 min-w-[160px]">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400">
                Total Tasks
              </p>
              <p className="text-lg font-bold text-slate-900 leading-none mt-0.5">
                {data.length}
              </p>
            </div>
          </div>

          {/* User Actions Group */}
          <div className="flex items-center gap-3 bg-white border border-slate-200/80 rounded-xl p-1.5 shadow-sm">
            {/* Profile Navigation Circle */}
            <button
              onClick={goToProfilePage}
              title="View Profile"
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-indigo-50 border border-slate-200 hover:border-indigo-200 flex items-center justify-center text-slate-600 hover:text-indigo-600 font-semibold text-sm transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            >
              {/* Profile SVG Icon */}
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </button>

            {/* Separator Line */}
            <div className="h-5 w-px bg-slate-200" />

            {/* Logout Button */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="min-h-screen bg-slate-50/50 p-6 sm:p-8 lg:p-12 font-sans antialiased text-slate-800">
        {/* Form Container */}
        <div className="max-w-xl mx-auto mb-12 bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm">
          <form onSubmit={createTask} className="space-y-5">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">
                Add New Task
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                Fill in the details below to log a new operational objective.
              </p>
            </div>

            {/* Title Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Title
              </label>
              <input
                type="text"
                required
                name="title"
                onChange={handleTaskChange}
                value={task.title}
                placeholder="e.g., Q3 Financial Audit"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all"
              />
            </div>

            {/* Description Field */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Description
              </label>
              <textarea
                required
                name="description"
                onChange={handleTaskChange}
                value={task.description}
                placeholder="Provide context or instructions for this task..."
                rows="3"
                className="w-full px-3.5 py-2 text-sm bg-white border border-slate-200 rounded-lg shadow-sm placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10 transition-all resize-none"
              />
            </div>

            {/* Form Actions */}
            <div className="pt-2 flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-auto px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-semibold rounded-lg shadow-sm transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
              >
                {editingTask ? "Update Task" : "Add Task"}
              </button>
            </div>
          </form>
        </div>

        {/* Tasks Responsive Grid */}
        <main className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-slate-200/60 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-slate-300 transition-all duration-200 flex flex-col justify-between min-h-[220px]"
              >
                {/* Task Content */}
                <div>
                  <h2 className="text-lg font-bold text-slate-900 tracking-tight line-clamp-1 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-slate-500 text-sm leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                {/* Footer Area */}
                <div className="border-t border-slate-100 pt-4 mt-6 space-y-4">
                  {/* Status Row */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Status
                    </span>
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold tracking-wide border transition-colors ${
                        item.status
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200/60"
                          : "bg-amber-50 text-amber-700 border-amber-200/60"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${item.status ? "bg-emerald-500" : "bg-amber-500"}`}
                      />
                      {item.status ? "Completed" : "Pending"}
                    </span>
                  </div>

                  {/* Action Buttons Row */}
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    {/* Toggle Status Button */}
                    <button
                      onClick={() => toggleStatus(item)}
                      className={`flex-1 min-w-[100px] text-center px-3 py-1.5 border rounded-lg text-xs font-semibold transition-all duration-150 focus:outline-none focus:ring-2 ${
                        item.status
                          ? "bg-white border-slate-200 text-slate-600 hover:bg-slate-50 focus:ring-slate-500/20"
                          : "bg-indigo-600 border-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500/20"
                      }`}
                    >
                      {item.status ? "Reopen" : "Complete"}
                    </button>

                    {/* Edit Button */}
                    <button
                      onClick={() => startEdit(item)}
                      className="px-3 py-1.5 bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900 text-xs font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-500/20"
                    >
                      Edit
                    </button>

                    {/* Delete Button */}
                    <button
                      onClick={() => deleteTask(item._id)}
                      className="px-3 py-1.5 bg-rose-50 border border-rose-100 text-rose-600 hover:bg-rose-100 hover:text-rose-700 text-xs font-semibold rounded-lg transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </>
  );
};

export default Dashboard;
