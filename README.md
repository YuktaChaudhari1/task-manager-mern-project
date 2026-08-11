# Task Manager MERN

A full-stack Task Management application built using the MERN stack. It allows users to create an account, securely log in using JWT authentication, and manage their personal tasks with complete CRUD functionality.

## 🚀 Features

* User Registration & Login
* JWT Authentication
* Protected Routes
* User Profile
* Create Tasks
* View All Tasks
* Update Tasks
* Delete Tasks
* Mark Tasks as Completed/Pending
* Responsive User Interface

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* React Router
* Axios
* CSS

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT (JSON Web Token)
* bcrypt

---

## 📂 Project Structure

```text
task-manager-mern-project/
│
├── Backend/
│   ├── controllers/
│   ├── db/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── app.js
│   ├── .env.example
│   └── package.json
│
├── Frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YuktaChaudhari1/task-manager-mern-project.git
```

### 2. Navigate to the project

```bash
cd task-manager-mern-project
```

### 3. Install Backend Dependencies

```bash
cd Backend
npm install
```

### 4. Install Frontend Dependencies

```bash
cd ../Frontend
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `Backend` folder and add:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

---

## ▶️ Run the Application

### Start Backend

```bash
cd Backend
npm run dev
```

### Start Frontend

```bash
cd Frontend
npm run dev
```

---

## 📸 Screenshots

Add screenshots of the following pages:

* Login Page
* Register Page
* Dashboard
* Create Task
* User Profile

---

## 🎯 Future Improvements

* Task Categories
* Due Dates
* Search & Filter
* Dark Mode
* Task Priority
* Email Notifications
* Drag & Drop Task Management

---

## 📚 What I Learned

* Building REST APIs using Express.js
* MongoDB CRUD operations with Mongoose
* JWT Authentication
* Password Hashing using bcrypt
* Protected Routes
* State Management in React
* API Integration using Axios
* Full-Stack MERN Project Structure

---

## 👩‍💻 Author

**Yukta Chaudhari**

* GitHub: https://github.com/YuktaChaudhari1

If you found this project helpful, consider giving it a ⭐ on GitHub.
