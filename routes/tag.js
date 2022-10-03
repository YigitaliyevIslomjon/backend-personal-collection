const express = require("express");
const { getTagList } = require("../controller/tagController");

const router = express.Router();

router.get("/", getTagList);
router.post("/");
router.put("/");
router.delete("/");

module.exports = router;
