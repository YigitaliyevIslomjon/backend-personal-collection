const express = require("express");
const {
  getLikeList,
  createLike,
  deleteLike,
  updateLike,
} = require("../controller/likeController");
const router = express.Router();

router.get("/", getLikeList);
router.post("/", createLike);
router.put("/:id", updateLike);
router.delete("/:id", deleteLike);

module.exports  = router;
