import {v2 as cloudinary} from "cloudinary"
import fs from "fs"


 //configuration
    cloudinary.config({ 
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
            api_key: process.env.CLOUDINARY_API_KEY, 
            api_secret:process.env.CLOUDINARY_API_SECRET  // Click 'View API Keys' above to copy your API secret
    });


//upload basically temporarily save file in our server and then upload to cloudinary

const cloudinaryUpload=async (localfilepath)=>{
    try{

        if(!localfilepath) return null;
          // Upload an image
        const uploadResult = await cloudinary.uploader
        .upload(
           localfilepath, {
               resource_type:"auto"
           }
        )
        console.log("file uploaded on cloudinary",uploadResult.url);
    }catch(error) {
            fs.unlinkSync(localfilepath)//remove saved file on local saerver as upload failed
           console.log(error);
           return null
    };
    
    console.log(uploadResult);
    
    
}

   

    
  
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    const optimizeUrl = cloudinary.url('shoes', {
        fetch_format: 'auto',
        quality: 'auto'
    });
    
    console.log(optimizeUrl);
    
    // Transform the image: auto-crop to square aspect_ratio
    const autoCropUrl = cloudinary.url('shoes', {
        crop: 'auto',
        gravity: 'auto',
        width: 500,
        height: 500,
    });
    
    console.log(autoCropUrl);    
