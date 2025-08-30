import {v2 as cloudinary} from 'cloudinary'

const connectCloudinary = async ()=>{
    try {
        if (!process.env.CLOUDINARY_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_SECRET_KEY) {
            console.log('Cloudinary credentials not found, skipping Cloudinary connection');
            return;
        }
        
        cloudinary.config({
            cloud_name: process.env.CLOUDINARY_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_SECRET_KEY,
        });
        console.log('Cloudinary connected successfully');
    } catch (error) {
        console.error('Cloudinary connection failed:', error.message);
    }
}

export default connectCloudinary