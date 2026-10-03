import { Schema, model, models } from "mongoose";

const BookmarkSchema = new Schema(
  {
    user: {
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

BookmarkSchema.index({ user: 1, post: 1 }, { unique: true });
BookmarkSchema.index({ user: 1, createdAt: -1 });

const Bookmark = models.Bookmark || model("Bookmark", BookmarkSchema);

export default Bookmark;
