const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const roleSchema = new Schema({
  role_name: {
    type: String,
  },
  created_at: {
    type: Date,
    required: false,
    default: new Date(),
  },

  updated_at: { type: Date, required: false, default: new Date() },
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
