const express = require("express");
const {
  createComment,
  getCommentListByItemId,
} = require("../controller/commentController");
const router = express.Router();

router.get("/list/:item_id", getCommentListByItemId);
router.post("/", createComment);
router.put("/");
router.delete("/");

module.exports = router;
