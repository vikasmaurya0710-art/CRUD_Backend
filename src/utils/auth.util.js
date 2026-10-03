import jwt from "jsonwebtoken"
import config from "../config/config.js"


export const createAccessToken = (userId)=>{
    let token = jwt.sign({userId},config.ACCESS_TOKEN_SECRET,{expiresIn:"15m"})
    return token
}

export const createRefreshToken = (userId)=>{
    let token = jwt.sign({userId},config.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
    return token
}

export const readAccessToken = (token)=>{
     return jwt.verify(token,config.ACCESS_TOKEN_SECRET)
}

export const readRefreshToken = (token)=>{
     return jwt.verify(token,config.REFRESH_TOKEN_SECRET)
}