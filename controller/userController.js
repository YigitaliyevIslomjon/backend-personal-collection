const { User, validateUserSignUp } = require("../model/userModal");
const bcrypt = require("bcrypt");
require("express-async-errors");

const getUserList = async (req, res) => {
  const { pageSize, pageNumber } = req.query;
  let total_user_count = await User.find().count();

  let total_page_count = parseInt(total_user_count / pageSize) + 1;

  const user = await User.find({})
    .select("-password")
    .sort({ updated_at: 1 })
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize);

  return res.status(200).json({
    user,
    pagenation: {
      pageNumber: +pageNumber,
      pageSize: +pageSize,
      total_page_count,
      total_user_count,
    },
  });
};
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.status(200).json({ user });
};

const createUser = async (req, res) => {
  let { user_name, email, password } = req.body;
  let checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(404).json({ error: "email alredy exit" });
  }

  const { error } = validateUserSignUp(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  // one admin should be always in database other ways. it should be created
  let thereIsAdmin = User.findOne({ role: "admin" });
  let user = await User.create({
    user_name,
    email,
    role: thereIsAdmin ? "user" : "admin",
    password,
    created_at: new Date(),
    updated_at: new Date(),
  });

  let token = user.generateAccessToken();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();

  return res.status(200).json({ user, token });
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const findUser = await User.findOne({ email });
  if (findUser) {
    if (findUser.permissions[0].block) {
      return res.status(404).json({ error: "user is blocked" });
    }
    const validPassword = await bcrypt.compare(password, findUser.password);

    if (validPassword) {
      let token = await findUser.generateAccessToken();
      let user = await User.findByIdAndUpdate(
        findUser._id,
        { created_at: new Date() },
        { new: true }
      );
      user = await user.save();
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    return res.status(401).json({ error: "User does not exist" });
  }
};

const loginUserAdmin = async (req, res) => {
  const { password, email } = req.body;
  const findUser = await User.findOne({ email });

  if (findUser.permissions[0].block === true) {
    return res.status(404).json({ error: "user is blocked" });
  }

  if (findUser?.role === "admin") {
    const validPassword = await bcrypt.compare(password, findUser.password);
    if (validPassword) {
      let token = await findUser.generateAccessToken();
      let user = await User.findByIdAndUpdate(
        findUser._id,
        { created_at: new Date() },
        { new: true }
      );
      user = await user.save();
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ error: "Invalid Password" });
    }
  } else if (findUser) {
    return res.status(401).json({ error: "User is not admin, cannt access" });
  } else {
    return res.status(401).json({ error: "User does not exist" });
  }
};

const updateUser = async (req, res) => {
  let id = req.params.id;
  let { user_name, email, role, permissions } = req.body;

  let userAdminList = await User.find({ role: "admin" });
  if (
    userAdminList.length < 2 &&
    userAdminList[0]._id === id &&
    role !== "admin"
  ) {
    return res.status(400).json({
      error:
        "At least one admin is required to access the admin panel, now there is only one admin left",
    });
  }

  let user = await User.findByIdAndUpdate(
    id,
    {
      user_name,
      email,
      role,
      permissions,
    },
    {
      new: true,
    }
  );

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  let isInValidUser = req.user._id === id && user.role === "user";

  return res.status(200).json({
    message: "success",
    user,
    isInValidUser: isInValidUser ? true : false,
  });
};

const deleteUser = async (req, res) => {
  let id = req.params.id;

  let user = await User.findById(id);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  let userAdminList = await User.find({ role: "admin" });
  if (userAdminList.length < 2 && user.role === "admin") {
    return res.status(400).json({
      error:
        "At least one admin is required to access the admin panel, now there is only one admin left",
    });
  }

  let isInValidUser = req.user._id === id;
  user = await User.findByIdAndDelete(id);
  user.remove();

  return res
    .status(200)
    .json({ message: "success", isInValidUser: isInValidUser ? true : false });
};

const socailMediaLogin = async (req, res) => {
  const { email, user_name } = req.body;
  let user = await User.findOne({ email: email }).select("-password");
  if (user) {
    let token = user.generateAccessToken();
    return res.status(200).json({ user, token });
  } else {
    let user = new User({
      user_name,
      email,
      role: "user",
      password: Math.random() * 1000000,
      created_at: new Date(),
      updated_at: new Date(),
    });
    user = await user.save();
    let token = user.generateAccessToken();
    return res.status(200).json({ user, token });
  }
};

exports.getUserList = getUserList;
exports.socailMediaLogin = socailMediaLogin;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.getUserById = getUserById;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
exports.loginUserAdmin = loginUserAdmin;
