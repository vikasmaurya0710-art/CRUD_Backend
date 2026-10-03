import {body, validationResult , param} from "express-validator"

export const createProductValidator = [
    body("title")
       .exists().withMessage("Title is required").bail()
       .isString().withMessage("Title must be in string").bail()
       .isAlpha("en-IN",{ignore:" -'"}).withMessage("title can contain only upper and lower case alphabets").bail()
       .trim()
       .isLength({min:2,max:20}).withMessage("title length should be in between 2 and 20"),
    body("description")
       .exists().withMessage("description is required").bail()
       .isString().withMessage("description must be in string").bail()
       .trim()
       .isLength({min:20,max:200}).withMessage("description length should be in between 20 and 200"),
    body("price")
       .exists().withMessage("Price of product is required").bail()
       .isInt({min:1}).withMessage("price should be an integer greater than 0"),
    body("imageUrl")
       .exists().withMessage("url is required").bail()
       .isString().withMessage("url must be in string").bail()
       .isURL().withMessage("Invalid url").bail()
       .isLength({max:2048}).withMessage("url is too long"),

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

export const updateValidator = [
    param("id")
      .exists().withMessage("Product id is required").bail()
      .isMongoId().withMessage("product id should be from mongo object id"),

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

export const deleteValidator = [
    param("id")
      .exists().withMessage("Product id is required").bail()
      .isMongoId().withMessage("product id should be from mongo object id"),

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

export const singleProductValidator = [
    param("id")
      .exists().withMessage("Product id is required").bail()
      .isMongoId().withMessage("product id should be from mongo object id"),

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