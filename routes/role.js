import express from "express";
import {
  createRole,
  deleteRole,
  getRoleList,
  updateRole,
} from "../controller/roleController.js";
const router = express.Router();

router.get("/", getRoleList);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

export default router;
