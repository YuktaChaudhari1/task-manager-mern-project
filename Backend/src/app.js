const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin:
      "[https://tasksmanagerproject.netlify.app](https://tasksmanagerproject.netlify.app)",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/tasks", taskRoutes);

app.use("/api/auth", userRoutes);

app.get("/", (req, res) => {
  res.json({ message: "hey , welcome" });
});

module.exports = app;
