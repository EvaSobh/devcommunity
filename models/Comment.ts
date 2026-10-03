import { Schema, model, models } from "mongoose";

const CommentSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    post: {
      type: Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

CommentSchema.index({ post: 1, createdAt: -1 });
CommentSchema.index({ author: 1 });

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
