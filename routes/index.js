const express = require("express");
const authenticateToken = require("../middleware/auth");
const router = express.Router();
const userRoute = require("./user");

router.use("/user", userRoute);

module.exports = router;
