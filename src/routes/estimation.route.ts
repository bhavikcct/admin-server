import { Router } from "express";

import { authMiddleware } from "../middleware/auth.middleware";
import {
  createEstimation,
  deleteEstimation,
  getAllEstimations,
  getEstimationById,
  updateEstimation,
} from "../controllers/estimation.controller";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllEstimations);
router.post("/", createEstimation);
router.put("/:id", updateEstimation);
router.delete("/:id", deleteEstimation);
router.get("/:id", getEstimationById);

export default router;
