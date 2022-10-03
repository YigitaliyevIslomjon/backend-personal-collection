const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const userRoute = require("./user");

router.use("/user", userRoute);
router.use("/collection", collectionRoute);
router.use("/itemExtraField", itemExtraFieldRoute);
router.use("/comment", commentRoute);
router.use("/item", itemRoute);
router.use("/like", likeRoute);
router.use("/permission", permissionRoute);
router.use("/role", roleRoute);
router.use("/tags", tagRoute);
module.exports = router;
