import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoCloseSharp } from "react-icons/io5";
function Image() {
    const { file } = useParams();
    const navigate = useNavigate();

    const handleClose = () => {
        navigate(-1); // Navigate back to the previous page
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="relative">
                <button title='Close' 
                    className="absolute top-2 right-2 bg-white text-black rounded-full w-8 h-8 flex justify-center items-center shadow-md hover:bg-gray-100"
                    onClick={handleClose}
                >
                    <IoCloseSharp></IoCloseSharp>
                </button>
                <img 
                    src={`http://localhost:3000/Food_Images/${file}`} 
                    alt="A food image" 
                    className="max-w-[90%] max-h-[80vh] rounded-lg shadow-lg"
                />
            </div>
        </div>
    );
}

export default Image;
