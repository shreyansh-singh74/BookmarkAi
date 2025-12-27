import mongoose, { Document, Model, mongo, Schema, Types } from "mongoose";

export interface IBookmark extends Document {
  userId: Types.ObjectId;
  title: string;
  url: string;
  description?: string;
  tags: string;
  createAt: Date;
  updatedAt: Date;
}

const bookmarkSchema: Schema<IBookmark> = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 200,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    tags: [
      {
        type: String,
        trim: true,
        lowercase: true,
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt
  }
);

bookmarkSchema.index({userId: 1,createdAt: -1});
bookmarkSchema.index({tags: 1});

export const Bookmark: Model<IBookmark> = mongoose.model<IBookmark>('Bookmark',bookmarkSchema);

