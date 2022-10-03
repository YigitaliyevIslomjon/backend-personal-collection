import express from "express";
const router = express.Router();
import {
  createPermission,
  deletePermission,
  getPermissionList,
  updatePermission,
} from "../controller/permissionController.js";

router.get("/", getPermissionList);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

export default router;
