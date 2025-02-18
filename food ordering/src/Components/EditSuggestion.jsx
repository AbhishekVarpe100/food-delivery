import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function EditSuggestion() {
    const { id } = useParams();
    const [info, setInfo] = useState([]);
    const [suggestion, setSuggestions] = useState("");
    const [showNotification, setShowNotification] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const getInfo = async () => {
            try {
                const res = await axios.get('http://localhost:3000/get-suggestion-info/' + id);
                setInfo(res.data);
                if (res.data.length > 0) {
                    setSuggestions(res.data[0].suggestion);
                }
            } catch (error) {
                console.error("Error fetching suggestion info:", error);
            }
        };
        getInfo();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.put(`http://localhost:3000/edit-suggestion/${id}`, { suggestion });
            if (res.data === 'edited') {
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                    navigate(-1);
                }, 2000);
            }
        } catch (error) {
            console.error("Error editing suggestion:", error);
        }
    };

    const handleChange = (e) => {
        setSuggestions(e.target.value);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md relative">
                <h2 className="text-2xl font-bold mb-4">Edit Suggestion</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Suggestion</label>
                        <input
                            required
                            value={suggestion}
                            onChange={handleChange}
                            type="text"
                            className="w-full px-3 py-2 border rounded shadow"
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="submit"
                            className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 transition"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="px-4 py-2 font-bold text-white bg-gray-500 rounded hover:bg-gray-700 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
                {showNotification && (
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 mt-2 px-4 py-2 bg-green-500 text-white font-bold rounded shadow">
                        Edited Successfully!
                    </div>
                )}
            </div>
        </div>
    );
}

export default EditSuggestion;
