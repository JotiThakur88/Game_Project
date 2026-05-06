const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// 🔥 fake database (memory)
let users = [];

// ---------------- SIGNUP ----------------
app.post("/api/auth/signup", (req, res) => {
  const { name, email, password, age } = req.body;

  const exists = users.find(u => u.email === email);
  if (exists) {
    return res.status(400).json({ msg: "User already exists" });
  }

  users.push({
    id: Date.now(),
    name,
    email,
    password,
    age
  });

  console.log("SIGNUP USERS:", users);

  res.json({ msg: "Signup successful" });
});

// ---------------- LOGIN ----------------
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;

  const user = users.find(
    u => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  res.json({
    msg: "Login success",
    user: {
      name: user.name,
      email: user.email
    }
  });
});

// ---------------- SERVER ----------------
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});