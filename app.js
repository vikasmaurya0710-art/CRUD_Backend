import express from "express"
import authRouter from "./src/routes/auth.route.js"
import cookieParser from "cookie-parser"
import productRouter from "./src/routes/product.route.js"
import connectDB from "./src/config/db.js"

const app = express()

app.use(cookieParser())
app.use(express.json())

let isConnected = false

async function connectToDb(){
try {
    await connectDB()
    isConnected = true
} catch (error) {
    console.log("ERROR CONNECTED TO DB->",error)
}
}

app.use((req,res,next)=>{
    if(!isConnected){
       connectToDb()
    }
    next()
})
app.use("/api/auth",authRouter)

app.use("/api/products",productRouter)


export default app