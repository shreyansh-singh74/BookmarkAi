import { Router,Response } from "express";
import { authenticateToken, AuthRequest } from "../middleware/auth.middleware";

const router = Router();

// Protected route example
router.get(
  "/bookmarks",
  authenticateToken,
  (req:AuthRequest, res:Response) => {
    res.json({
      message: "Your bookmarks",
      user: req.user,
    });
  }
);

export default router;
