const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    title: { type: String, required: true },
    description: String,
    status: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  },
);

const taskModel = mongoose.model("Task", taskSchema);
module.exports = taskModel;
