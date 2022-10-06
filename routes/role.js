const express = require("express");
const {
  createRole,
  deleteRole,
  getRoleList,
  updateRole,
} = require("../controller/roleController");

const router = express.Router();

router.get("/", getRoleList);
router.post("/", createRole);
router.put("/:id", updateRole);
router.delete("/:id", deleteRole);

module.exports = router;
