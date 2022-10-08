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
module.exports = upload;
