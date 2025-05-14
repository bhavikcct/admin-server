import { Router } from "express";
import {
  createproject,
  deleteproject,
  updateProject,
  getAllProject,
  getprojectbyID,
} from "../controllers/project.controller";
import { authMiddleware } from "../middleware/auth.middleware";

const router = Router();

router.use(authMiddleware);

router.get("/", getAllProject);
router.post("/", createproject);
router.put("/:id", updateProject);
router.delete("/:id", deleteproject);
router.get("/:id", getprojectbyID);

export default router;
