import { Schema, model, models } from "mongoose";

const CommunitySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },

    slug: {
      type: String,
      required: true,
      unique: true,
    },

    description: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    topics: {
      type: [String],
      default: [],
    },

    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  },
);

CommunitySchema.index({ slug: 1 }, { unique: true });
CommunitySchema.index({ name: 1 }, { unique: true });
CommunitySchema.index({ category: 1 });

const Community = models.Community || model("Community", CommunitySchema);

export default Community;
