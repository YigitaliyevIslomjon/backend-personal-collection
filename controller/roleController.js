const { Role } = require("../model/roleModal");
require("express-async-errors");

const getRoleList = async (req, res) => {
  const role = await Role.find({}).populate("permissions");
  return res.status(200).json(role);
};

const createRole = async (req, res) => {
  console.log(req.body);
  const { role_name, permissions } = req.body;
  const thereIs = await Role.findOne({ role_name: role_name });
  if (thereIs) {
    return res.status(200).json({ error: "bu ma'lumot mavjud" });
  }
  const natija = new Role({ role_name, permissions });
  const result = await natija.save();
  return res.status(200).json({ data: result });
};

const updateRole = async (req, res) => {
  const { role_name, permissions } = req.body;
  const result = await Role.findById(req.params.id);
  if (!result) {
    return res.status(400).json({ error: "bunday Role mavjud emas" });
  }

  const updateRole = await Role.findByIdAndUpdate(
    req.params.id,
    {
      role_name,
      permissions,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(updateRole);
};

const deleteRole = async (req, res) => {
  let id = req.params.id;
  const result = await Role.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};

module.exports = {
  getRoleList,
  createRole,
  updateRole,
  deleteRole,
};
