const express = require("express");
const {
  createItemExtraField,
  deleteItemExtraField,
  getItemExtraFieldList,
  updateItemExtraField,
} = require("../controller/ItemExtraFieldController");

const router = express.Router();

router.get("/", getItemExtraFieldList);
router.post("/", createItemExtraField);
router.put("/:id", updateItemExtraField);
router.delete("/:id", deleteItemExtraField);

module.exports  = router;
