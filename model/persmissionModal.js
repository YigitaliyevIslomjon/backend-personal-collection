import mongoose from "mongoose";
const { Schema } = mongoose;

export const permissionSchema = new Schema({
  name: {
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
export default Permission;
