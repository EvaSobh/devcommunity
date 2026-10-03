import mongoose, { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    password: {
      type: String,
    },

    provider: {
      type: String,
      enum: ["github", "google", "credentials"],
      default: "credentials",
    },
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    username: {
      type: String,
      unique: true,
      sparse: true,
    },

    image: {
      type: String,
    },

    bio: {
      type: String,
      default: "",
    },

    skills: {
      type: [String],
      default: [],
    },

    joinedCommunities: [
      {
        type: Schema.Types.ObjectId,
        ref: "Community",
      },
    ],
  },
  {
    timestamps: true,
  },
);

UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ username: 1 }, { unique: true, sparse: true });

const User = models.User || model("User", UserSchema);

export default User;
