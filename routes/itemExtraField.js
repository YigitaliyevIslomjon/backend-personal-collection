const express = require("express");
const {
  createItemExtraField,
  deleteItemExtraField,
  getItemExtraFieldById,
  updateItemExtraField,
} = require("../controller/ItemExtraFieldController");

const router = express.Router();

router.get("/:collection_id", getItemExtraFieldById);
router.post("/:collection_id", createItemExtraField);
router.put("/:id", updateItemExtraField);
router.delete("/:id", deleteItemExtraField);

module.exports = router;
