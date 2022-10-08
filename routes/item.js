const express = require("express");
const {
  createItem,
  deleteItem,
  getItemById,
  getItemList,
  updateItem,
} = require("../controller/itemController");
const upload = require("../utils/formParse");

const router = express.Router();

router.get("/list", getItemList);
router.get("/:id", getItemById);
router.post("/", upload.single("img"), createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports = router;
