const express = require("express");
// const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dk00zlmlh",
  api_key: "319387558821126",
  api_secret: "wvkayuODCkLMCBgfRE7t6_fmzm0",
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "DEV",
  },
});

const upload = multer({ storage: storage });
//Configuration for Multer
// const multerStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public");
//   },
//   filename: (req, file, cb) => {
//     const ext = file.mimetype.split("/")[1];
//     cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
//   },
// });
// // Multer Filter
// const multerFilter = (req, file, cb) => {
//   if (file.mimetype.split("/")[1] === "pdf") {
//     cb(null, true);
//   } else {
//     cb(new Error("Not a PDF File!!"), false);
//   }
// };
//Calling the "multer" Function
// const upload = multer({
//   storage: multerStorage,
//   // fileFilter: multerFilter,
// });

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
router.put("/:id", upload.single("img"), updateCollection);
router.delete("/:id", deleteCollection);

module.exports = router;
