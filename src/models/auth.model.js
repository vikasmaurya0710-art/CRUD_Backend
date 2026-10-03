import mongoose from "mongoose"

const authSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[2,"Atleast 2 characters name is required"],
        maxLength:[40,"Atmost 40 characters name are applicable"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:[ /^[^\s@]+@[^\s@]+\.[^\s@]+$/,"please enter a valid email address"]
    },
    password:{
        type:String,
        required:true,
        minLength:[6,"minimum 6 digits password is required"]
    },
    refreshToken:{
        type:String,
    }
})

const authModel = mongoose.model("CRUD_Auth_data",authSchema)

export default authModel