import express from "express";
import {
  adminLogin,
  getDashboardStats,
  getAllUsers,
  deleteUser,
  getAllJournals,
  getAllAnonymousPosts,
  getAllMoods,
  getAllChats,
  getUserById,
  getUserActivity,
} from "../controller/adminController.js";
import { isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route for admin login
router.post("/login", adminLogin);

// Protected routes - only accessible by admins
router.get("/stats", isAdmin, getDashboardStats);

router.get("/users", isAdmin, getAllUsers);
router.delete("/users/:id", isAdmin, deleteUser);

router.get("/journals", isAdmin, getAllJournals);
router.get("/anonymous-posts", isAdmin, getAllAnonymousPosts);
router.get("/moods", isAdmin, getAllMoods);
router.get("/chats", isAdmin, getAllChats);

// The :id parameter should be specific
router.get("/users/:id", isAdmin, getUserById);
router.get("/users/:id/activity", isAdmin, getUserActivity);

export default router;
