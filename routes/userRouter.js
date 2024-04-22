import { Router } from "express";
const router = Router();

import {
  getCurrentUser,
  getApplicationStats,
  updateUser,
} from "../controllers/userController.js";
import { validateUpdateUserInput } from "../middleware/ValidationMiddleware.js";
import {
  authorizePermissions,
  checkFortestUser,
} from "../middleware/authMiddleware.js";
import upload from "../middleware/multerMiddleware.js";
router.get("/current-user", getCurrentUser);
router.get(
  "/admin/app-stats",
  authorizePermissions("admin"),
  getApplicationStats
);
router.patch(
  "/update-user",
  checkFortestUser,
  upload.single("avatar"),
  validateUpdateUserInput,
  updateUser
);
export default router;
