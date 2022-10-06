const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
  role_name: {
    type: String,
  },
});

const Role = mongoose.model("Role", roleSchema);
const validateRole = (data) => {
  let roleSchema = Joi.object({
    role_name: Joi.string().required(),
    permissions: Joi.array().items().required(),
  });
  return roleSchema.validate(data);
};

module.exports = {
  Role,
  validateRole,
};
