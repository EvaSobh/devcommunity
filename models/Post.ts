import { Schema, model, models } from "mongoose";

const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    content: {
      type: String,
      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    community: {
      type: Schema.Types.ObjectId,
      ref: "Community",
      required: true,
    },

    topics: {
      type: [String],
      default: [],
    },

    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

PostSchema.index({ author: 1 });
PostSchema.index({ community: 1 });
PostSchema.index({ createdAt: -1 });
PostSchema.index({ title: 1 });
PostSchema.index({ topics: 1 });

const Post = models.Post || model("Post", PostSchema);

export default Post;
