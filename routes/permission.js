const express = require("express");
const router = express.Router();
const {
  createPermission,
  deletePermission,
  getPermissionList,
  updatePermission,
} = require("../controller/permissionController");

router.get("/", getPermissionList);
router.post("/", createPermission);
router.put("/:id", updatePermission);
router.delete("/:id", deletePermission);

module.exports  = router;
