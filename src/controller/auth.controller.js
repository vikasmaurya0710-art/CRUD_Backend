import authModel from "../models/auth.model.js";
import bcrypt from "bcryptjs"
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.util.js";

export const register = async (req, res) => {
  try {
    let { name, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Enter correct password ",
      });
    }

    let isEmailExist = await authModel.findOne({ email });
    if (isEmailExist) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }
    let user = await authModel.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });
    let accessToken = createAccessToken(user._id);
    let refreshToken = createRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    await authModel.findByIdAndUpdate(user._id, { refreshToken });

    res.status(201).json({
      message: "User registered successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("ERROR IN REGISTER->", error);
    res.status(500).json({
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    let { email, password } = req.body;
    let user = await authModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }
    let isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    let accessToken = createAccessToken(user._id);
    let refreshToken = createRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    await authModel.findByIdAndUpdate(user._id, { refreshToken });

    res.status(200).json({
      message: "User logged in successfully",
      data: {
        accessToken,
      },
    });
  } catch (error) {
    console.log("ERROR IN LOGIN->", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const refresh = async (req, res) => {
  try {
    let { refreshToken } = req.cookies;
    if (!refreshToken) {
      return res.status(404).json({
        message: "refresh token  is not found in cookies",
      });
    }
    let decoded = readRefreshToken(refreshToken);
    let { userId } = decoded;
    console.log(userId)
    let user = await authModel.findById(userId);

    if (!user || refreshToken !== user.refreshToken) {
      return res.status(401).json({
        message: "Invalid or Expired refresh Token",
      });
    }

    let accessToken = createAccessToken(userId);
    let newRefreshToken = createRefreshToken(userId);

    res.cookie("refreshToken", newRefreshToken, { httpOnly: true });
    await authModel.findByIdAndUpdate(userId, {
      refreshToken: newRefreshToken,
    });

    res.status(200).json({
      message: "Tokens rotated successfully",
      accessToken
    });
  } catch (error) {
    console.log("ERROR IN REFRESH->", error);
    res.status(401).json({
      message: "Invalid or Expired refresh token",
    });
  }
};

export const getMe = async (req, res) => {
  try {
    let { userId } = req.user;
    let user = await authModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "user is not found",
      });
    }

    res.status(200).json({
      message: "user detail fetched successfully",
      data: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.log("ERROR IN ME->", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const logout = async(req,res)=>{

  try{
  let {refreshToken} = req.cookies
  if(!refreshToken){
    return res.status(401).json({
      message:"Refresh token is not found"
    })
  }
  let decoded = readRefreshToken(refreshToken)
  let {userId} = decoded
  let user = await authModel.findByIdAndUpdate(userId,{refreshToken:null})
  res.clearCookie("refreshToken")

  return res.status(200).json({
    message: "Logged out successfully"
})
  }catch(errro){
      console.log("ERROR IN LOGOUT ->", error);

        return res.status(401).json({
            message: "Invalid or expired refresh token"
        })
  }
}
