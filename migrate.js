const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

mongoose
  .connect(process.env.MONGODB_URI_local, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db is connected");
  })
  .catch(() => {
    console.log("db is not connected");
  });

const { User } = require("./model/userModal");

async () => {
  const salt = await bcrypt.genSalt(10);
  let password = await bcrypt.hash("123", salt);
  let user = await User.updateMany({
    user_name: "islomjon",
    user_email: "hello@gmail.com",
    user_password: password,
  });
  user.save();
  mongoose.disconnect();
};
