const express = require("express");
const {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  updateUserUnblock,
  updateUserBlock,
} = require("../controller/userController");
const authenticateToken = require("../middleware/auth");
const router = express.Router();

router.post("/login", loginUser);
router.post("/sign-up", createUser);
router.use(authenticateToken);
router.get("/", getUserList);
router.get("/:id", getUserById);
router.put("/", updateUser);
router.put("/block", updateUserBlock);
router.put("/unblock", updateUserUnblock);
router.delete("/", deleteUser);

module.exports = router;
