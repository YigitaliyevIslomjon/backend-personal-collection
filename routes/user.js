const express = require("express");
const {
  getUserList,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  loginUser,
  loginUserAdmin,
} = require("../controller/userController");
const router = express.Router();
const authenticateToken = require("../middleware/auth");

router.post("/login", loginUser);
router.post("/sign-up", createUser);
router.use(authenticateToken);
router.post("/login/admin", loginUserAdmin);
router.get("/", getUserList);
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

module.exports = router;
