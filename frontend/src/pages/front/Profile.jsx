import {motion} from "framer-motion"
import { DeleteIcon, Upload, UploadIcon } from "lucide-react";
import { useState } from "react"
import toast from "react-hot-toast";

const Profile = () => {

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const files = e.target.files;
        const images_url=[];
        var url = "";
        for(let i=0; i<files.length; i++){
            url = URL.createObjectURL(e.target.files[i]);
            images_url[i] = url;
        }
        setImages(images_url)
    }
    const handleUpload = () => {
        toast.success("Uploaded Successfully!");
        setImages("");
    }
    const handleCancel = () => {
        toast.error("Cancel uploading");
        setImages("");
    }

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.5 }}
            className='max-w-xl w-full m-auto mt-10 p-8 flex justify-center flex-col bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
        >
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
                Edit Profile
            </h2>
            <div className="space-y-6">
                <motion.div
                className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 flex justify-center'
                initial={{ opacity: 0, scale: 0.2 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2}}
                >
                <div className="image flex justify-center items-center flex-col">
               <div className="images flex justify-center flex-wrap gap-2">
               { images && (
                images.map((image, index) => (
                    <img key={index} src={image} alt="" width={90} style={{aspectRatio:"1", objectFit:"cover"}} className=" rounded-md border border-green-500 cursor-pointer" accept="image" />
                ))
               )}
               </div>
                {!images ? (
                   <>
                    <label htmlFor="images">
                        <Upload className="w-16 h-16 text-white cursor-pointer" />
                    </label>
                    <input type="file" id="images" hidden onChange={handleChange}  multiple/> 
                   </>
                ) : (
                    <div className="mt-2 flex gap-2">
                        <button onClick={handleUpload} className="bg-green-600 text-white font-semibold px-4 py-1 rounded-md border border-green-800 hover:opacity-75 hover:scale-95 transition duration-200"> <UploadIcon /> </button>
                        <button onClick={handleCancel} className="bg-red-600 text-white font-semibold px-4 py-1 rounded-md border border-red-800 hover:opacity-75 hover:scale-95 transition duration-200"> <DeleteIcon /></button>
                    </div>
                )}
                </div>
                </motion.div>
            </div>
        </motion.div>

    )
}

export default Profile