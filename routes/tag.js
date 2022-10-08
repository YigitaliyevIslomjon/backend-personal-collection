const express = require("express");
const { getTagList } = require("../controller/tagController");

const router = express.Router();

router.get("/list", getTagList);

module.exports = router;
