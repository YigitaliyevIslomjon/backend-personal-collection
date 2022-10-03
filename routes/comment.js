const express = require("express");
const { createComment } = require("../controller/commentController");
const router = express.Router();

router.get("/");
router.post("/", createComment);
router.put("/");
router.delete("/");

module.exports  = router;
