const express = require("express");
const {
  createItem,
  deleteItem,
  getItemById,
  getItemList,
  updateItem,
  getItemCollectionById,
} = require("../controller/itemController");
const upload = require("../utils/formParse");

const router = express.Router();
router.get("/list", getItemList);
router.get("/collection", getItemCollectionById);
router.get("/:id", getItemById);
router.post("/", upload.single("img"), createItem);
router.put("/:id", upload.single("img"), updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
