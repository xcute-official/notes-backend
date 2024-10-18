"use client";
import axios from 'axios';
import React, { useState } from 'react'
import { CgAdd } from 'react-icons/cg';

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
        formData.append('upload_preset', 'abqgpsps');
        formData.append('api_key', '616465935954996')
        try{
            const response = await axios.post(
                `https://api.cloudinary.com/v1_1/dp3sgvlit/image/upload`, formData
            );
            console.log(response);
            setImageUrl(response.data.secure_url);
        }catch(error){
            console.log(`Error: `, error);
        }
    }
  return (
    <div className='flex flex-col gap-2'>
        <div className='flex gap-2 items-center'>
            <div className=''>
                <label className='flex items-center gap-2 rounded-md bg-primary cursor-pointer text-white p-2' htmlFor="ImageUpload"><CgAdd className='w-4 h-4'/><span>upload</span></label>
                <input type="file" accept='image/*' onChange={handleImageChange} className="hidden" id="ImageUpload" />
            </div>
            <button className='bg-black border p-2 rounded-md text-white font-bold' onClick={handleUpload}>UploadImage</button>
        </div>
        <div>
            <span className='font-bold'>{imageUrl ? `${imageUrl.slice(0, 30)}... uploaded.`:"No image selected"}</span>
        </div>
    </div>
  )
}

export default ImageUpload;



// #includeANJALI01