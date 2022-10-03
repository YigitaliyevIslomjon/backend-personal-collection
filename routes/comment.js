import express from "express";
import { createComment } from "../controller/commentController.js";
const router = express.Router();

router.get("/");
router.post("/", createComment);
router.put("/");
router.delete("/");

export default router;
