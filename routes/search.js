const express = require("express");
const {
  searchTargetValue,
  searchTagItem,
} = require("../controller/searchController");

const upload = require("../utils/formParse");

const router = express.Router();

router.post("/", searchTargetValue);
router.post("/:tag_id", searchTagItem);

module.exports = router;
