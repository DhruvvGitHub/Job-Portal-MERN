import {Company} from "../models/companyModel.js";

export const register = async (req, res) => {
  try {
    const { companyName } = req.body;
    console.log("Request Body:", req.body);

    if (!companyName || companyName.trim() === "") {
  return res.status(400).json({
    success: false,
    message: "Company name is required",
  });
}


    let company = await Company.findOne({ companyName });
    if (company) {
      return res.status(400).json({
        success: false,
        message: "Company already registered",
      });
    }

    console.log("User ID in register:", req.id);
    company = await Company.create({
      companyName,
      userId: req.id,
    });
    return res.status(201).json({
      success: true,
      company,
      message: "Company registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
};


export const getCompany = async (req, res) => {
    try {
        const userId = req.id  // User id of logged in user
        const companies = await Company.find({userId})

        if(!companies) {
            return res.status(400).json({
                success: false,
                message: "Companies not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            companies
        })
    } catch (error) {
        console.log(error);
    }
}


export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id

        const company = await Company.findById(companyId)
        if(!company) {
            return res.status(200).json({
            success: false,
            message: "Company not found"
        })
        }

        return res.status(200).json({
            success: true,
            message: "Companies fetched by ID successfully".
            company
        })

    } catch (error) {
        console.log(error);
    }
}


export const updateCompany = async (req, res) => {
    try {
      const {companyName, description, website, location} = req.body
    const file = req.file

    // cloudinary will be implemented later here 

    const updatedData = {companyName, description, website, location}

    const company = await Company.findByIdAndUpdate(req.params.id, updatedData, {new: true})
    if(!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found"
      })
    }

    return res.status(200).json({
        success: true,
        message: "Company information updated successfully"
      })
    } catch (error) {
      console.log(error);
    }
}