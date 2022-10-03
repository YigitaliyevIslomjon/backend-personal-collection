const Joi = require("joi");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const permissionSchema = new Schema({
  permission_name: {
    type: String,
  },
  roles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
  ],
});

const Permission = mongoose.model("Permission", permissionSchema);

const validatePermission = (data) => {
  const permissionSchema = Joi.object({
    permission_name: Joi.string().required(),
    roles: Joi.array().items().required(),
  });
  return permissionSchema.validate(data);
};

module.exports = {
  Permission,
  validatePermission,
};
