import express from "express";
import { getTagList } from "../controller/tagController.js";

const router = express.Router();

router.get("/", getTagList);
router.post("/");
router.put("/");
router.delete("/");

export default router;
