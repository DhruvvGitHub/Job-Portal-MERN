import express from "express"
import { getCompany, getCompanyById, register, updateCompany } from "../controllers/companyController.js"
import isAuthenticated from "../middlewares/isAuthenticated.js"
import { singleUpload } from "../middlewares/multer.js"
const router = express.Router()

router.route("/register").post(isAuthenticated, register)
router.route("/get").get(isAuthenticated, getCompany)
router.route("/get/:id").get(isAuthenticated, getCompanyById)
router.route("/update/:id").post(isAuthenticated, singleUpload, updateCompany)

export default router;