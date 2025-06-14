import { use } from "react";
import { Job } from "../models/jobModel.js";
import { User } from "../models/userModel.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      experience,
      location,
      positions,
      jobType,
      companyId,
    } = req.body;
    const userId = req.id;

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !experience ||
      !location ||
      !positions ||
      !jobType ||
      !companyId
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const job = await Job.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      experienceLevel: experience,
      location,
      jobType,
      positions,
      company: companyId,
      created_by: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job posted successfully",
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Job.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Jobs not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;

    const job = await Job.findById(jobId)
      .populate([
        {
          path: "company",
        },
        {
          path: "applications",
        },
      ])
      .sort({ createdAt: -1 });

    if (!job) {
      return res.status(404).json({
        success: false,
        message: "Job not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Job fetched successfully",
      job,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;

    const jobs = await Job.find({ created_by: adminId }).populate({
      path: "company",
    });
    if (!jobs) {
      return res.status(404).json({
        success: false,
        message: "Jobd not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Jobs fetched successfully",
      jobs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveJob = async (req, res) => {
  try {
    const { jobId } = req.body;

    const user = await User.findById(req.id);

    if (!user.savedJobs.includes(jobId)) {
      user.savedJobs.push(jobId);
      await user.save();
    }

    // Get complete job details with populated company
    const savedJobs = await Job.find({ _id: { $in: user.savedJobs } })
      .populate({
        path: "company"
      });

    res.status(200).json({
      success: true, 
      message: "Job saved successfully",
      savedJobs
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

export const getSavedJobs = async (req, res) => {
  try {
    const userId = req.id;

    const user = await User.findById(userId).populate({
      path: "savedJobs",
      populate: { path: "company" }  // populates company inside each saved job
    });

    if (!user || user.savedJobs.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No saved jobs found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Saved jobs fetched successfully",
      savedJobs: user.savedJobs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};