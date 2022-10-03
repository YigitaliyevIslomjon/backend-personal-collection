import mongoose from "mongoose";
const { Schema } = mongoose;

export const tagSchema = new Schema({
  tag_name: {
    type: String,
    unique: true,
  },
});

const Tag = mongoose.model("Tag", tagSchema);
export default Tag;
