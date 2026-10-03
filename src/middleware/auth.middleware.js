import { readAccessToken } from "../utils/auth.util.js"

export const authenticate = async(req,res,next)=>{
    try {
        let accessToken = req.headers.authorization?.split(" ")[1]
        if(!accessToken){
            return res.status().json({
                message:"Access Token is not found"
            })
        }
        let decoded = readAccessToken(accessToken)
        req.user = decoded
        next()
    } catch (error) {
        console.log("ERROR IN AUTHENTICATION->",error)
        res.status(401).json({
            message:"Invalid or Expired access token"
        })
    }
}