const express = require("express");
const taskModel = require("../models/task.model.js");
const middleware = require("../middleware/auth.middleware.js");
const router = express.Router();

//Create task
router.post("/create-tasks", middleware, async (req, res) => {
  const data = await taskModel.create({
    userId: req.user.id,
    title: req.body.title,
    description: req.body.description,
    status: req.body.status,
  });
  res.status(201).json({ message: "post created successfully", data });
});

router.get("/get-tasks", middleware, async (req, res) => {
  const data = await taskModel.find({ userId: req.user.id });
  res.status(200).json({ message: " tasks Fetch successfully", data });
});

router.get("/:id", middleware, async (req, res) => {
  const id = req.params.id;
  const data = await taskModel.findOne({
    _id: id,
    userId: req.user.id,
  });

  if (!data) {
    return res.status(404).json({
      message: "Task not found",
    });
  }
  res.status(200).json({ message: "task fetched successfully", data });
});

router.put("/update/:id", middleware, async (req, res) => {
  const id = req.params.id.trim();

  const data = await taskModel.findOneAndUpdate(
    { _id: id, userId: req.user.id },
    req.body,
    { new: true },
  );

  if (!data) {
    return res.status(403).json({
      message: "Task not found or you are not authorized to update it.",
    });
  }

  res.status(200).json({
    message: "Task updated successfully",
    data,
  });
});

router.delete("/delete/:id", middleware, async (req, res) => {
  const id = req.params.id;
  const data = await taskModel.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!data) {
    return res.status(404).json({
      message: "Task not found or unauthorized",
    });
  }

  res.status(200).json({ message: "data deleted successfully", data });
});

module.exports = router;
