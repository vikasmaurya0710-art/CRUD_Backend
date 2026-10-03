import {body, validationResult} from "express-validator"

export const registerValidator = [
    body("name")
      .exists().withMessage("Name is required").bail()
      .isString().withMessage("Name should be in string").bail()
      .trim()
      .isLength({min:2,max:40}).withMessage("Name length must be between 2 and 40"),
     body("email")
      .exists().withMessage("email is required").bail()
      .isString().withMessage("email should be in string").bail()
      .trim()
      .isEmail().withMessage("Invalid email address"),
    body("password")
       .exists().withMessage("password is required").bail()
       .isString().withMessage("Password should be in string").bail()
       .trim()
       .isLength({min:6}).withMessage("minimum 6 digits password is required"),
    body("confirmPassword")
       .exists().withMessage("password is required").bail()
       .isString().withMessage("Password should be in string").bail()
       .trim() .isLength({min:6}).withMessage("minimum 6 digits password is required"),

    (req,res,next)=>{
        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:error.array()
            })
        }
        next()
    }
    
]

export const loginValidator = [
      
    body("email")
      .exists().withMessage("email is required").bail()
      .isString().withMessage("email should be in string").bail()
      .trim()
      .isEmail().withMessage("Invalid email address"),
    body("password")
       .exists().withMessage("password is required").bail()
       .isString().withMessage("Password should be in string").bail()
       .trim()
       .isLength({min:6}).withMessage("minimum 6 digits password is required"),

       (req,res,next)=>{
        let error = validationResult(req)
        if(!error.isEmpty()){
            return res.status(400).json({
                message:"Invalid request",
                errors:error.array()
            })
        }
        next()
       }
]