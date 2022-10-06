const express = require("express");
const {
  getTopicList,
  createTopic,
  updateTopic,
  deleteTopic,
} = require("../controller/topicController");

const router = express.Router();

router.get("/", getTopicList);
router.post("/", createTopic);
router.put("/:id", updateTopic);
router.delete("/:id", deleteTopic);

module.exports = router;
