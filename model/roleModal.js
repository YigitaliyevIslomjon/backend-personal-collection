import mongoose from "mongoose";

const { Schema } = mongoose;

export const roleSchema = new Schema({
  role_name: {
    type: String,
  },
  permissions: [
    {
      type: Schema.Types.ObjectId,
      ref: "Permission",
    },
  ],
});

const Role = mongoose.model("Role", roleSchema);
export default Role;
