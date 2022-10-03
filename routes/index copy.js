import express from "express";
import userRoute from "./user.js";
import collectionRoute from "./collection.js";
import commentRoute from "./comment.js";
import itemRoute from "./item.js";
import likeRoute from "./like.js";
import permissionRoute from "./permission.js";
import roleRoute from "./role.js";
import tagRoute from "./tag.js";
import itemExtraFieldRoute from "./itemExtraField.js";
const router = express.Router();

router.use("/user", userRoute);
router.use("/collection", collectionRoute);
router.use("/itemExtraField", itemExtraFieldRoute);
router.use("/comment", commentRoute);
router.use("/item", itemRoute);
router.use("/like", likeRoute);
router.use("/permission", permissionRoute);
router.use("/role", roleRoute);
router.use("/tags", tagRoute);

export default router;
