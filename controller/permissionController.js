const { Permission } = require("../model/persmissionModal");
require("express-async-errors");

const getPermissionList = async (req, res) => {
  const permission = await Permission.find({}).populate("roles");
  return res.status(200).json({ data: permission });
};

const createPermission = async (req, res) => {
  const { permission_name, roles } = req.body;
  const thereIs = await Permission.findOne({
    permission_name,
  });
  if (thereIs) {
    return res.status(400).json({ error: "bu ma'lumot mavjud" });
  }
  const permission = new Permission({ permission_name, roles });
  const result = await permission.save();
  return res.status(200).json({ data: result });
};

const updatePermission = async (req, res) => {
  const { permission_name, roles } = req.body;

  const result = await Permission.findById(req.params.id);
  if (!result) {
    return res.status(400).json({ error: "bunday Permission mavjud emas" });
  }

  const updatePermission = await Permission.findByIdAndUpdate(
    req.params.id,
    {
      permission_name,
      roles,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(updatePermission);
};

const deletePermission = async (req, res) => {
  let id = req.params.id;
  const result = await Permission.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};
module.exports = {
  getPermissionList,
  createPermission,
  updatePermission,
  deletePermission,
};
