const express = require("express");

const {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollectionList,
  updateCollection,
} = require("../controller/collectionController");
const upload = require("../utils/formParse");

const router = express.Router();

router.get("/list", getCollectionList);
router.get("/:id", getCollectionById);
router.post("/", upload.single("img"), createCollection);
router.put("/:id", upload.single("img"), updateCollection);
router.delete("/:id", deleteCollection);

module.exports = router;
