const express = require("express");

const {
  createCollection,
  deleteCollection,
  getCollectionById,
  getCollectionList,
  updateCollection,
  getlargerCollection,
  getItemByCollectionId,
} = require("../controller/collectionController");
const upload = require("../utils/formParse");

const router = express.Router();

router.get("/large", getlargerCollection);

router.get("/list", getCollectionList);
router.get("/items", getItemByCollectionId);
router.get("/:id", getCollectionById);
router.post("/", upload.single("img"), createCollection);
router.put("/:id", upload.single("img"), updateCollection);
router.delete("/:id", deleteCollection);

module.exports = router;
