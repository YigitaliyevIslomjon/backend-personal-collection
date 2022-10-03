import express from "express";
import {
  createItemExtraField,
  deleteItemExtraField,
  getItemExtraFieldList,
  updateItemExtraField,
} from "../controller/ItemExtraFieldController.js";

const router = express.Router();

router.get("/", getItemExtraFieldList);
router.post("/", createItemExtraField);
router.put("/:id", updateItemExtraField);
router.delete("/:id", deleteItemExtraField);

export default router;
