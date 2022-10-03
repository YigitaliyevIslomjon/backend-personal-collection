import express from "express";
import multer from "multer";

//Configuration for Multer
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});
// Multer Filter
const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[1] === "pdf") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};
//Calling the "multer" Function
const upload = multer({
  storage: multerStorage,
  // fileFilter: multerFilter,
});

import {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollectionList,
  updateCollection,
} from "../controller/collectionController.js";
const router = express.Router();
router.get("/", getCollectionList);
router.get("/:id", getCollectionById);
router.post("/", upload.single("img"), createCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);

export default router;
