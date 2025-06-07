import mongoose from "mongoose";

const companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
      unique: true
    },
    description: {
      type: String,
    },
    website: {
      type: String,
    },
    location: {
      type: String,
    },
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    jobs: [
      {
        type: String,
        required: true,
      },
    ],
  },
  { timestamps: true }
);

export const Company = mongoose.model("Company", companySchema) 