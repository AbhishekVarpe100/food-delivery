// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import axios from 'axios';

// const Reviews = () => {
//     const { id } = useParams();
//     const [rating, setRating] = useState(0);
//     const [comment, setComment] = useState('');
//     const [reviews, setReviews] = useState([]);
//     const [render, setRender] = useState(false);

//     const handlePost = async (e) => {
//         e.preventDefault();
//         const res = await axios.post('http://localhost:3000/post-comment', {
//             id,
//             username: localStorage.getItem('username'),
//             rating,
//             comment,
//         });
//         if (res.data) {
//             setRender((prev) => !prev);
//         }
//     };

//     const getReviews = async () => {
//         const res = await axios.get('http://localhost:3000/get-reviews/' + id);
//         setReviews(res.data);
//     };

//     useEffect(() => {
//         getReviews();
//     }, [render]);

//     return (
//         <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-300">
//             <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-6 border-b pb-3">
//                 Product Reviews <span className="text-sm text-gray-500">ID: {id}</span>
//             </h1>

//             {/* Form Section */}
//             <form
//                 onSubmit={handlePost}
//                 className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 border border-gray-200"
//             >
//                 <h2 className="text-xl font-serif font-medium text-gray-700 mb-4">
//                     Submit Your Review
//                 </h2>

//                 <div className="mb-4">
//                     <label
//                         htmlFor="rating"
//                         className="block text-sm font-semibold text-gray-600 mb-2"
//                     >
//                         Rating
//                     </label>
//                     <select
//                         id="rating"
//                         required
//                         onChange={(e) => setRating(e.target.value)}
//                         className="w-full p-2 border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-gray-400"
//                     >
//                         <option value="">--- Choose Rating ---</option>
//                         <option value="1">1 - Poor</option>
//                         <option value="2">2 - Fair</option>
//                         <option value="3">3 - Good</option>
//                         <option value="4">4 - Very Good</option>
//                         <option value="5">5 - Excellent</option>
//                     </select>
//                 </div>

//                 <div className="mb-4">
//                     <label
//                         htmlFor="comment"
//                         className="block text-sm font-semibold text-gray-600 mb-2"
//                     >
//                         Comment
//                     </label>
//                     <textarea
//                         id="comment"
//                         required
//                         onChange={(e) => setComment(e.target.value)}
//                         placeholder="Write your feedback here..."
//                         rows="4"
//                         className="w-full p-2 border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-gray-400"
//                     ></textarea>
//                 </div>

//                 <button
//                     type="submit"
//                     className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition"
//                 >
//                     Submit Review
//                 </button>
//             </form>

//             {/* Reviews Section */}
//             <div className="space-y-6">
//                 {reviews.length > 0 ? (
//                     reviews.map((review, index) => (
//                         <div
//                             key={index}
//                             className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200"
//                         >
//                             <p className="text-gray-700 font-medium mb-1">
//                                 <span className="font-semibold">Reviewer:</span> {review.reviewer}
//                             </p>
//                             <p className="text-gray-700 font-medium mb-1">
//                                 <span className="font-semibold">Rating:</span> {review.rating} / 5
//                             </p>
//                             <p className="text-gray-700 font-medium">
//                                 <span className="font-semibold">Comment:</span> {review.comment}
//                             </p>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500 text-center italic">
//                         No reviews yet. Be the first to leave a review.
//                     </p>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Reviews;




import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Reviews = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [reviews, setReviews] = useState([]);
    const [render, setRender] = useState(false);

    const handlePost = async (e) => {
        e.preventDefault();
        const res = await axios.post('http://localhost:3000/post-comment', {
            id,
            username: localStorage.getItem('username'),
            rating,
            comment,
        });
        if (res.data) {
            setRender((prev) => !prev);
            setComment("")
            
        }
    };
    
    const getReviews = async () => {
        const res = await axios.get('http://localhost:3000/get-reviews/' + id);
        setReviews(res.data);
    };
    
    const handleDelete=async(review_id)=>{
        const res=await axios.delete('http://localhost:3000/delete-review',{params:{review_id,item_id:id}})
        if(res.data){
            setRender((prev) => !prev);
        }
    }

    useEffect(() => {
        getReviews();
    }, [render]);

    // Star component for displaying individual stars
    const Star = ({ index, rating, hoverRating, onMouseEnter, onMouseLeave, onClick }) => {
        return (
            <svg
                className={`h-8 w-8 cursor-pointer ${
                    index <= (hoverRating || rating) ? 'text-yellow-500' : 'text-gray-300'
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                onMouseEnter={() => onMouseEnter(index)}
                onMouseLeave={onMouseLeave}
                onClick={() => onClick(index)}
            >
                <path
                    d="M9.049 2.927a1 1 0 011.902 0l1.286 4.278a1 1 0 00.95.69h4.487a1 1 0 01.588 1.81l-3.638 2.638a1 1 0 00-.364 1.118l1.287 4.278a1 1 0 01-1.54 1.118l-3.638-2.637a1 1 0 00-1.176 0l-3.638 2.637a1 1 0 01-1.54-1.118l1.287-4.278a1 1 0 00-.364-1.118L2.14 9.705a1 1 0 01.588-1.81h4.487a1 1 0 00.95-.69l1.286-4.278z"
                />
            </svg>
        );
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-lg border border-gray-300">
            <h1 className="text-3xl font-serif font-semibold text-gray-800 mb-6 border-b pb-3">
                Product Reviews <span className="text-sm text-gray-500">ID: {id}</span>
            </h1>

            {/* Form Section */}
            <form
                onSubmit={handlePost}
                className="bg-gray-50 p-6 rounded-lg shadow-md mb-8 border border-gray-200"
            >
                <h2 className="text-xl font-serif font-medium text-gray-700 mb-4">
                    Submit Your Review
                </h2>

                <div className="mb-4">
                    <label
                        htmlFor="rating"
                        className="block text-sm font-semibold text-gray-600 mb-2"
                    >
                        Rating
                    </label>
                    <div className="flex space-x-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                                key={star}
                                index={star}
                                rating={rating}
                                hoverRating={hoverRating}
                                onMouseEnter={setHoverRating}
                                onMouseLeave={() => setHoverRating(0)}
                                onClick={setRating}
                            />
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <label
                        htmlFor="comment"
                        className="block text-sm font-semibold text-gray-600 mb-2"
                    >
                        Comment
                    </label>
                    <textarea value={comment}
                        id="comment"
                        required
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Write your feedback here..."
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded-md bg-white text-gray-700 focus:ring-2 focus:ring-gray-400"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-900 transition"
                >
                    Submit Review
                </button>
            </form>

            {/* Reviews Section */}
            <div className="space-y-6">
                {reviews.length > 0 ? <>  <p>Total reviews : {reviews.length}</p> {
                    reviews.map((review, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-6 rounded-lg shadow border border-gray-200"
                        >
                            <p className="text-gray-700 font-medium mb-1">
                                <span className="font-semibold">Reviewer :</span> {review.reviewer} {localStorage.getItem('username')==review.reviewer?<b>(You)</b>:null}
                            </p>
                            <p className="text-gray-700 font-medium mb-1 flex items-center">
                                <span className="font-semibold mr-2">Rating :</span>
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <svg
                                        key={star}
                                        className={`h-5 w-5 ${
                                            star <= review.rating
                                                ? 'text-yellow-500'
                                                : 'text-gray-300'
                                        }`}
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            d="M9.049 2.927a1 1 0 011.902 0l1.286 4.278a1 1 0 00.95.69h4.487a1 1 0 01.588 1.81l-3.638 2.638a1 1 0 00-.364 1.118l1.287 4.278a1 1 0 01-1.54 1.118l-3.638-2.637a1 1 0 00-1.176 0l-3.638 2.637a1 1 0 01-1.54-1.118l1.287-4.278a1 1 0 00-.364-1.118L2.14 9.705a1 1 0 01.588-1.81h4.487a1 1 0 00.95-.69l1.286-4.278z"
                                        />
                                    </svg>
                                ))}
                            </p>
                            <p className="text-gray-700 font-medium">
                                <span className="font-semibold">Comment :</span> {review.comment}
                            </p>
                            <p>{localStorage.getItem('username')==review.reviewer?<><button onClick={()=>handleDelete(review._id)}  className='text-red-500 font-bold hover:underline'>Delete</button ></>:null}</p>
                        </div>
                    ))
} </> : (
                    <p className="text-gray-500 text-center italic">
                        No reviews yet. Be the first to leave a review.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Reviews;
