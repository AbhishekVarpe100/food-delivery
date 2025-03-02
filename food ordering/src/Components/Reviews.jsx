import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { 
  Typography, 
  Paper, 
  Box, 
  TextField, 
  Button, 
  Divider, 
  Card, 
  CardContent, 
  Rating, 
  IconButton,
  Chip,
  Container
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import PersonIcon from '@mui/icons-material/Person';
import CommentIcon from '@mui/icons-material/Comment';

const Reviews = () => {
    const { id } = useParams();
    const [rating, setRating] = useState(0);
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
            setComment("");
            setRating(0);
        }
    };
    
    const getReviews = async () => {
        const res = await axios.get('http://localhost:3000/get-reviews/' + id);
        setReviews(res.data);
    };
    
    const handleDelete = async (review_id) => {
        const res = await axios.delete('http://localhost:3000/delete-review', {
            params: {
                review_id,
                item_id: id
            }
        });
        if (res.data) {
            setRender((prev) => !prev);
        }
    };

    useEffect(() => {
        getReviews();
    }, [render]);

    const isCurrentUser = (reviewer) => {
        return localStorage.getItem('username') === reviewer;
    };

    return (
        <Container maxWidth="md" className="py-8">
            <Paper elevation={3} className="overflow-hidden">
                {/* Header */}
                <Box className="bg-gray-800 text-white p-4">
                    <Typography variant="h4" className="font-serif">
                        Item Reviews
                    </Typography>
                    <Typography variant="subtitle2" className="mt-1 opacity-70">
                        Product ID: {id}
                    </Typography>
                </Box>

                {/* Form Section */}
                <Box className="p-6 bg-gray-50 border-b border-gray-200">
                    <Typography variant="h6" className="font-serif mb-4 text-gray-700">
                        Share Your Experience
                    </Typography>
                    
                    <form onSubmit={handlePost}>
                        <Box className="mb-4">
                            <Typography variant="subtitle2" className="mb-1 text-gray-600">
                                Your Rating
                            </Typography>
                            <Rating
                                size="large"
                                value={Number(rating)}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                                className="text-yellow-500"
                            />
                        </Box>
                        
                        <Box className="mb-4">
                            <TextField
                                fullWidth
                                label="Write your review"
                                multiline
                                rows={4}
                                variant="outlined"
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                required
                                placeholder="Share your thoughts about this product..."
                                className="bg-white"
                            />
                        </Box>
                        
                        <Button 
                            type="submit"
                            variant="contained" 
                            color="warning"
                            >
                            Submit Review
                        </Button>
                    </form>
                </Box>

                {/* Reviews Section */}
                <Box className="p-6">
                    <Box className="flex justify-between items-center mb-4">
                        <Typography variant="h6" className="font-serif text-gray-700">
                            Customer Reviews
                        </Typography>
                        {reviews.length > 0 && (
                            <Chip 
                                label={`${reviews.length} ${reviews.length === 1 ? 'Review' : 'Reviews'}`}
                                size="small"
                                className="bg-gray-100"
                            />
                        )}
                    </Box>
                    
                    <Divider className="mb-4" />
                    
                    <Box className="space-y-4">
                        {reviews.length > 0 ? (
                            reviews.map((review, index) => (
                                <Card key={index} elevation={1} className="border border-gray-200">
                                    <CardContent>
                                        <Box className="flex justify-between items-start">
                                            <Box className="flex items-center mb-2">
                                                <PersonIcon className="text-gray-500 mr-2" />
                                                <Typography variant="subtitle1" className="font-medium">
                                                    {review.reviewer}
                                                    {isCurrentUser(review.reviewer) && (
                                                        <Chip 
                                                            label="You" 
                                                            size="small" 
                                                            color="primary" 
                                                            className="ml-2 h-5"
                                                        />
                                                    )}
                                                </Typography>
                                            </Box>
                                            
                                            {isCurrentUser(review.reviewer) && (
                                                <IconButton 
                                                    size="small" 
                                                    onClick={() => handleDelete(review._id)}
                                                    className="text-red-500 hover:bg-red-50"
                                                >
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            )}
                                        </Box>
                                        
                                        <Rating 
                                            value={Number(review.rating)} 
                                            readOnly 
                                            size="small"
                                            className="mb-2 text-yellow-500"
                                        />
                                        
                                        <Box className="flex mt-2">
                                            <CommentIcon className="text-gray-400 mr-2 text-xl" />
                                            <Typography variant="body1" className="text-gray-700">
                                                {review.comment}
                                            </Typography>
                                        </Box>
                                    </CardContent>
                                </Card>
                            ))
                        ) : (
                            <Box className="text-center py-8 bg-gray-50 rounded-lg">
                                <Typography variant="body1" className="text-gray-500 italic">
                                    No reviews yet. Be the first to leave a review.
                                </Typography>
                            </Box>
                        )}
                    </Box>
                </Box>
            </Paper>
        </Container>
    );
};

export default Reviews;