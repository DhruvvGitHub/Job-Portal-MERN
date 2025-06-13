import mongoose from "mongoose";

const applicationSchema = mongoose.Schema({
  applicant:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  job: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Job",
    required: true
  },
  status: {
    type: String,
    enum: ["reject", "pending", "accept"],
    default: "pending",
    required: true,
  }
},{timestamps: true});

export const Application = mongoose.model("Application", applicationSchema)