import { use } from "react"
import { Job } from "../models/jobModel.js"

export const postJob = async (req, res) => {
    try {
        const {title, description, requirements, salary, experience, location, positions, jobType, companyId} = req.body
        const userId = req.id

        if(!title || !description || !requirements || !salary || !experience || !location || !positions || !jobType || !companyId) {
            return res.status(400).json({
                success: false, 
                message: "All fields are required"
            })
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
            created_by: userId
        })

        return res.status(201).json({
            success: true, 
            message: "Job posted successfully",
            job
        })
    } catch (error) {
        console.log(error);
    }
}


export const getJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query ={
            $or:[
                {title:{$regex:keyword, $options:"i"}},
                {description:{$regex:keyword, $options:"i"}},
            ]
        }

        const jobs = await Job.find(query).populate({
            path:"company"
        }).sort({createdAt: -1})
        if(!jobs) {
            return res.status(404).json({
                success: false,
                message: "Jobs not found"
            })
        }

        return res.status(200).json({
                success: true,
                message: "Jobs fetched successfully",
                jobs
            })
    } catch (error) {
        console.log(error);
    }
}


export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id

        const job = await Job.findById(jobId).populate({
            path:"company"
        }).sort({createdAt: -1})
        if(!job) {
            return res.status(404).json({
                success: false,
                message: "Job not found"
            })
        }

         return res.status(200).json({
                success: true,
                message: "Job fetched successfully",
                job
            })
    } catch (error) {
        console.log(error);
    }
}


export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id;

        const jobs = await Job.find({created_by: adminId})
        if(!jobs) {
            return res.status(404).json({
                success: false,
                message: "Jobd not found"
            })
        }

        return res.status(200).json({
                success: true,
                message: "Jobs fetched",
                jobs
            })
    } catch (error) {
        console.log(error);
    }
}