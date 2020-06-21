import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: "Text is required",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
}); // Comment에 Video ID를 넣거나 Video에 Comment ID array를 넣거나 2가지 방법으로 연결할 수 있다.

const model = mongoose.model("Comment", CommentSchema);
export default model;
