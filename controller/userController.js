const { User, validateUserSignUp } = require("../model/user");
const bcrypt = require("bcrypt");
require("express-async-errors");

const getUserList = async (req, res) => {
  const { pageSize, pageNumber } = req.query;
  const user = await User.find({});
  // .sort({ sign_up_at: 1 })
  // .skip((pageNumber - 1) * pageSize)
  // .limit(pageSize);
  return res.status(200).json(user);
};
const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.status(200).json({ user });
};

const createUser = async (req, res) => {
  let { name, email, password } = req.body;
  let checkEmail = await User.findOne({ email: req.body.email });
  if (checkEmail) {
    return res.status(404).json({ error: "email alredy exit" });
  }

  const { error } = validateUserSignUp(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let user = await User.create({
    name,
    email,
    password,
    sign_in_at: new Date(),
    sign_up_at: new Date(),
  });

  let token = user.generateAccessToken();
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  user = await user.save();
  return res.status(200).json({ user, token });
};

const loginUser = async (req, res) => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    const validPassword = await bcrypt.compare(password, user.password);
    if (validPassword) {
      let token = await user.generateAccessToken();
      let user = await User.findByIdAndUpdate(
        user._id,
        { sign_in_at: new Date() },
        { new: true }
      );
      user.save();
      return res.status(200).json({ token, user });
    } else {
      return res.status(400).json({ error: "Invalid Password" });
    }
  } else {
    return res.status(404).json({ error: "User does not exist" });
  }
};

const updateUser = async (req, res) => {
  const { error } = validateUserSignUp(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }

  let { name, email, password } = req.body;
  let userChecking = await User.findByIdAndDelete(req.params.id);
  if (!userChecking) {
    return res.status(404).json({ error: "User not found" });
  }
  let user = await User.findByIdAndUpdate(
    req.params.id,
    {
      name,
      email,
      password,
    },
    {
      new: true,
    }
  );
  return res.status(200).json(user);
};
const updateUserBlock = async (req, res) => {
  const { userIdList } = req.body;
  let isValidUser = userIdList.find((id) => id === req.user._id);

  userIdList.forEach(async (userId) => {
    let userChecking = await User.findById(userId);
    if (!userChecking) {
      return res.status(404).json({ error: "User not found" });
    }

    let user = await User.findByIdAndUpdate(
      userId,
      {
        status: true,
      },
      {
        new: true,
      }
    );

    user.save();
  });

  return res
    .status(200)
    .json({ message: "success", isValidUser: isValidUser ? true : false });
};

const updateUserUnblock = async (req, res) => {
  const { userIdList } = req.body;

  userIdList.forEach(async (userId) => {
    let userChecking = await User.findById(userId);
    if (!userChecking) {
      return res.status(404).json({ error: "User not found" });
    }
    let user = await User.findByIdAndUpdate(
      userId,
      {
        status: false,
      },
      {
        new: true,
      }
    );
    user = await user.save();
  });

  return res.status(200).json("success");
};

const deleteUser = async (req, res) => {
  let userIdList = req.body.userIdList;
  let isValidUser = userIdList.find((id) => id === req.user._id);

  userIdList.forEach(async (userId) => {
    let user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
  });
  return res
    .status(200)
    .json({ message: "success", isValidUser: isValidUser ? true : false });
};

exports.getUserList = getUserList;
exports.createUser = createUser;
exports.updateUser = updateUser;
exports.updateUserBlock = updateUserBlock;
exports.updateUserUnblock = updateUserUnblock;
exports.getUserById = getUserById;
exports.loginUser = loginUser;
exports.deleteUser = deleteUser;
