const express = require("express");
const {
  createItem,
  deleteItem,
  getItemById,
  getItemList,
  updateItem,
} = require("../controller/itemController");

const router = express.Router();

router.get("/", getItemList);
router.get("/:id", getItemById);
router.post("/", createItem);
router.put("/:id", updateItem);
router.delete("/:id", deleteItem);

module.exports  = router;
