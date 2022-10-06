const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const userRoute = require("./user");
const collectionRoute = require("./collection");
const commentRoute = require("./comment");
const itemRoute = require("./item");
const likeRoute = require("./like");
const permissionRoute = require("./permission");
const roleRoute = require("./role");
const tagRoute = require("./tag");
const itemExtraFieldRoute = require("./itemExtraField");
const topicRoute = require("./topic");

router.use("/user", userRoute);
router.use(authenticateToken);
router.use("/collection", collectionRoute);
router.use("/itemExtraField", itemExtraFieldRoute);
router.use("/comment", commentRoute);
router.use("/item", itemRoute);
router.use("/like", likeRoute);
router.use("/permission", permissionRoute);
router.use("/role", roleRoute);
router.use("/tags", tagRoute);
router.use("/topic", topicRoute);
module.exports = router;
