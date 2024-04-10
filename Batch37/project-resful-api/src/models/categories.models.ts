import mongoose from "mongoose";
import { Schema, model } from "mongoose";
import { Icatgory } from "../type/models";
const categoriesSchema = new Schema(
  {
    categoryName: {
      type: String,
      required: [true, "Do not leave blank here"],
      unique: [true, "Name unduplicate"],
      minLength: [1, "Minimum Length 1"],
      maxLength: [50, "Maximum Length 50"],
    },
    description: {
      type: String,
      require: false,
      maxLength: 500,
    },
    slug: {
      type: String,
      require: true,
      lowercase: true,
      unique: true,
      max: 255,
      validay: {
        validator: function (value: string) {
          const slugRegex = /^[a-z0-9\-]+$/;
          return slugRegex.test(value);
        },
        message:
          "Slug must be unique and contain only letters, numbers, and hyphens",
      },
    },
    sort: {
      type: Number,
      default: 50,
      min: 1,
    },
    isActice: {
      type: Boolean,
      default: 0,
      enum: ["true", "false"],
    },
  },
  {
    timestamps: true,
  }
);
const Category = model<Icatgory>("Category", categoriesSchema);
export default Category;
