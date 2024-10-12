"use client";
import axios from 'axios';
import React, { useState } from 'react'

const ImageUpload = () => {
    const [image, setImage] = useState<File | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const handleImageChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const file = e.target.files?.[0];
        if(file){
            setImage(file);
        }
    };
    const handleUpload = async()=>{
        if(!image){
            return;
        }
        const formData = new FormData();
        formData.append('file', image);
        formData.append('upload_preset', '');
        try{
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dp3sgvlit/image/upload`, formData
            );
            setImageUrl(response.data.secure_url);
        }catch(error){
            console.log(`Error: `, error);
        }
    }
  return (
    <div>
        <div>
            <div>
                <label htmlFor="ImageUpload">ImageUpload</label>
                <input type="file" accept='image/*' onChange={handleImageChange} className="hidden" id="ImageUpload" />
            </div>
            <button className='bg-black border p-2 rounded-md text-white font-bold' onClick={handleUpload}>UploadImage</button>

        </div>
    </div>
  )
}

export default ImageUpload



// #includeANJALI01