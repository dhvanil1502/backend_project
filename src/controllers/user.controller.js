import {asyncHandler} from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {cloudinaryUpload} from "../utils/cloundinary.js";   
import {ApiResponse} from "../utils/apiResponse.js";


const registerUser= asyncHandler( async(req,res)=>{
    //get user details from frontend
    const {fullname,email,username,password}=req.body
    //validation-not empty
    if(
        [fullname,email,username,password].some((field)=>field?.trim()==="")
    ){
        throw new ApiError(400,"all fields are required");
    }
    //check if user exists-username,email
    const existedUser=User.findOne({
        $or: [{username},{email}]
    });
    if(existedUser){
        throw new ApiError(409,"user already exists");
    }
    //check for image,check for avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required");
    }
    if(!coverImageLocalPath){
        throw new ApiError(400,"cover image file is required");
    }
    //upload to cloudinary,avatar
    const avatar = await cloudinaryUpload(avatarLocalPath);
    const coverImage = await cloudinaryUpload(coverImageLocalPath);  

    if (!avatar.url) {
        throw new ApiError(500, "Failed to upload avatar to Cloudinary");
    }
    
    //create user object-create entry in db
    const user = await User.create({
        fullname,
        email,  
        username:username.toLowerCase(),
        password,
        avatar:avatar.url,
        coverImage:coverImage?.url||"",
    });

    //remove password and refresh token
    //check for user creation
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    if(!createdUser){
        throw new ApiError(500,"user creation failed,something went wrong");
    }
    //return res
    return res.status(201).json(
        new ApiResponse(201,createdUser,"user created successfully")
    );

})
export {registerUser};