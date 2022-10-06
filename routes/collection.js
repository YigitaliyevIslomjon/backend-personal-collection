const express = require("express");
const multer = require("multer");

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

const {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollectionList,
  updateCollection,
} = require("../controller/collectionController");

const router = express.Router();

router.get("/list", getCollectionList);
router.get("/:id", getCollectionById);
router.post("/", upload.single("img"), createCollection);
router.put("/:id", updateCollection);
router.delete("/:id", deleteCollection);

module.exports = router;
