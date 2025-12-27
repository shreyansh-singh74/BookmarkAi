import { Router } from "express";
import { authenticateToken } from "../middleware/auth.middleware";
import {
  createBookmark,
  getBookmarks,
  getBookmarkById,
  updateBookmark,
  deleteBookmark,
} from "../controllers/bookmark.controller";

const router = Router();

// All routes require authentication
router.post("/bookmarks", authenticateToken, createBookmark);
router.get("/bookmarks", authenticateToken, getBookmarks);
router.get("/bookmarks/:id", authenticateToken, getBookmarkById);
router.put("/bookmarks/:id", authenticateToken, updateBookmark);
router.delete("/bookmarks/:id", authenticateToken, deleteBookmark);

export default router;