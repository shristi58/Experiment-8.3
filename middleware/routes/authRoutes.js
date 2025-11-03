import express from "express";
import jwt from "jsonwebtoken";
import { authenticateToken, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();
const SECRET_KEY = "mySecretKey";

const users = [
  { username: "admin", password: "admin123", role: "admin" },
  { username: "moderator", password: "mod123", role: "moderator" },
  { username: "user", password: "user123", role: "user" }
];

router.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ username: user.username, role: user.role }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

router.get("/dashboard/admin", authenticateToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: `Welcome to the Admin Dashboard`, user: req.user });
});

router.get("/dashboard/moderator", authenticateToken, authorizeRoles("moderator", "admin"), (req, res) => {
  res.json({ message: `Welcome to the Moderator Panel`, user: req.user });
});

router.get("/dashboard/profile", authenticateToken, authorizeRoles("user", "admin", "moderator"), (req, res) => {
  res.json({ message: `Welcome to your profile`, user: req.user });
});

export default router;
