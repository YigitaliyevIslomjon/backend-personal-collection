const express = require("express");
const { getTagList, createTag } = require("../controller/tagController");

const router = express.Router();

router.get("/", getTagList);
router.post("/", createTag);
router.put("/");
router.delete("/");

module.exports = router;
