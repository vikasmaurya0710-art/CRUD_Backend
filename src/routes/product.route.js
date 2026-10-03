import {Router} from "express"
import { createProductValidator, deleteValidator, singleProductValidator, updateValidator } from "../validator/product.validator.js"
import { allProducts, createProducts, deleteProduct, singleProduct, updateProduct } from "../controller/product.controller.js"
import {authenticate} from "../middleware/auth.middleware.js"

const router  = Router()

router.post("/",authenticate,createProductValidator,createProducts)

router.get("/",allProducts)

router.get("/:id",singleProductValidator,singleProduct)

router.put("/:id",authenticate,createProductValidator,updateValidator,updateProduct)

router.delete("/:id",authenticate,deleteValidator,deleteProduct)

export default router