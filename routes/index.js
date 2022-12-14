const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const userRoute = require("./user");
const collectionRoute = require("./collection");
const commentRoute = require("./comment");
const itemRoute = require("./item");
const likeRoute = require("./like");
const tagRoute = require("./tag");
const itemExtraFieldRoute = require("./itemExtraField");
const topicRoute = require("./topic");
const searchRotute = require("./search");

router.use("/user", userRoute);
router.use(authenticateToken);
router.use("/collection", collectionRoute);
router.use("/item-extra-field", itemExtraFieldRoute);
router.use("/comment", commentRoute);
router.use("/item", itemRoute);
router.use("/like", likeRoute);
router.use("/tag", tagRoute);
router.use("/topic", topicRoute);
router.use("/search", searchRotute);

module.exports = router;
