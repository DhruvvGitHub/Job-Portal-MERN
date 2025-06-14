import express from "express"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { getAdminJobs, getJobById, getJobs, getSavedJobs, postJob, saveJob } from "../controllers/jobController.js"

const router = express.Router()

router.route("/post").post(isAuthenticated, postJob)
router.route("/get").get(isAuthenticated, getJobs)
router.route("/save").post(isAuthenticated, saveJob)
router.route("/getsavedjobs").get(isAuthenticated, getSavedJobs)
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs)
router.route("/get/:id").get(isAuthenticated, getJobById)

export default router;