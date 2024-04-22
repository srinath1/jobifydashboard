import { Router } from "express";
import {
  validateJobInput,
  validateIdParam,
} from "../middleware/ValidationMiddleware.js";
const router = Router();

import {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats
} from "../controllers/JobController.js";
import { checkFortestUser } from "../middleware/authMiddleware.js";

// router.get('/', getAllJobs);
// router.post('/', createJob);

router
  .route("/")
  .get(getAllJobs)
  .post(checkFortestUser, validateJobInput, createJob);
  router.route('/stats').get(showStats)
router
  .route("/:id")
  .get(validateIdParam, getJob)
  .patch(checkFortestUser, validateJobInput, validateIdParam, updateJob)
  .delete(checkFortestUser, validateIdParam, deleteJob);

export default router;
