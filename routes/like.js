import express from "express";
import {
  getLikeList,
  createLike,
  deleteLike,
  updateLike,
} from "../controller/likeController.js";
const router = express.Router();

router.get("/", getLikeList);
router.post("/", createLike);
router.put("/:id", updateLike);
router.delete("/:id", deleteLike);

export default router;
