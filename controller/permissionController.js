import Permission from "../model/persmissionModal.js";
import "express-async-errors";

export const getPermissionList = async (req, res) => {
  const permission = await Permission.find({}).populate("roles");
  return res.status(200).json(permission);
};
export const createPermission = async (req, res) => {
  const { name, permissio,roles } = req.body;
  const thereIs = await Permission.findOne({ name: name });
  if (thereIs) {
    return res.status(400).json("bu ma'lumot mavjud");
  }
  const permission = new Permission({ name, Permission,roless });
  const result = await permission.save();
  return res.status(200).json(result);
};

export const updatePermission = async (req, res) => {
  const { name, permission,roles } = req.body;

  const result = await Permission.findById(req.params.id);
  if (!result) {
    return res.status(400).json("bunday Permission mavjud emas");
  }

  const updatePermission = await Permission.findByIdAndUpdate(
    req.params.id,
    {
      name,
      permission,
      roless
    },
    {
      new: true,
    }
  );
  return res.status(200).json(updatePermission);
};

export const deletePermission = async (req, res) => {
  let id = req.params.id;
  const result = await Permission.findByIdAndDelete(id);
  if (!result) {
    return res.status(200).json("error");
  }
  return res.status(200).json("success");
};
