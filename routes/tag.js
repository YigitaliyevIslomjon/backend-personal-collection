const express = require("express");
const { getTagList, createTag } = require("../controller/tagController");

const router = express.Router();

router.get("/list", getTagList);

module.exports = router;
