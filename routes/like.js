const express = require("express");
const { getLikeList, createLike } = require("../controller/likeController");
const router = express.Router();

router.get("/", getLikeList);
router.post("/", createLike);

module.exports = router;
