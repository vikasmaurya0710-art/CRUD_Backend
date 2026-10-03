import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:[2,"Atleast length of title should be 2 characters"],
        maxLength:[20,"Atmost 20 characters applicable"]
    },
    description:{
        type:String,
        required:true,
        minLength:[20,"Minimum 20 characters required"],
        maxLength:[200,"maximum 200 characters required"]
    },
    price:{
        type:Number,
        required:true,
        min:[1,"Price must be greater than 0"]
    },
    imageUrl:{
        type:String,
        required:true,
        unique:true,
        maxLength:[2048,"Url is too long, try another url"]
    }
})

const productModel = mongoose.model("CRUD_Product_data",productSchema)

export default productModel