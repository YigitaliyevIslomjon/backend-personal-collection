import mongoose from "mongoose";

const { Schema } = mongoose;

export const likeSchema = new Schema({
  like_status: {
    type: String,
    enum: [1, 0],
    default: 0,
  },
  user_id: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  item_id: {
    type: Schema.Types.ObjectId,
    ref: "Item",
  },
});

const Like = mongoose.model("Like", likeSchema);
export default Like;
