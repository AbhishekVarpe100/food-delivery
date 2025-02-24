import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrLike } from "react-icons/gr";
import axios from 'axios';
import { Container, Typography, TextField, Button, Paper, Box, IconButton, List, ListItem, ListItemText, Divider, Chip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

function Suggestions() {
    const [suggestion, setSuggestion] = useState("");
    const [data, setData] = useState([]);
    const [dataOther, setDataOthers] = useState([]);
    const [render, setRender] = useState(false);
    const [likes, setLikes] = useState([]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:3000/add-suggestion', { username: localStorage.getItem('username'), suggestion }).then(res => {
            if (res.data === 'added') {
                alert("Posted");
                setRender(prev => !prev);
                setSuggestion("");
            }
        });
    };

    const handleDelete = async (id) => {
        const res = await axios.delete(`http://localhost:3000/delete-suggestion/${id}`);
        if (res.data) {
            setRender(prev => !prev);
        }
    };

    const handleLike = async (id) => {
        const res = await axios.post('http://localhost:3000/like-suggestion', { id, username: localStorage.getItem('username') });
        if (res.data) {
            setRender(prev => !prev);
        }
    };

    const getAllLikes = async () => {
        const res = await axios.get('http://localhost:3000/get-all-likes', { params: { username: localStorage.getItem('username') } });
        setLikes(res.data);
        setRender(prev => !prev);
    };

    useEffect(() => {
        async function getSuggestions() {
            axios.get('http://localhost:3000/get-suggestions', { params: { username: localStorage.getItem('username') } }).then(res => setData(res.data)).catch(err => console.log(err));
        }
        async function getSuggestionsOthers() {
            axios.get('http://localhost:3000/get-suggestions-others', { params: { username: localStorage.getItem('username') } }).then(res => setDataOthers(res.data)).catch(err => console.log(err));
        }
        getSuggestions();
        getSuggestionsOthers();
        getAllLikes();
    }, [render]);

    return (
        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
            {/* Post Suggestions Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>Post Suggestions</Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={suggestion}
                        required
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Enter your suggestion..."
                        sx={{ mb: 2 }}
                    />
                    <Button type="submit" fullWidth variant="contained" color="primary" sx={{ py: 1.5 }}>Post</Button>
                </form>
            </Paper>

            {/* Your Suggestions Section */}
            <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>Your Suggestions</Typography>
                {data.length !== 0 ? (
                    <List>
                        {data.map((suggestion) => (
                            <React.Fragment key={suggestion._id}>
                                <ListItem alignItems="flex-start" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>{suggestion.suggestion}</Typography>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">Reply: {suggestion.reply || '-'}</Typography>
                                    <Typography variant="body2" color="textSecondary">Posted At: {suggestion.createdAt}</Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton onClick={() => handleDelete(suggestion._id)} color="error" size="small">
                                                <DeleteIcon />
                                            </IconButton>
                                            <Link to={`/main_home/suggestions/edit/${suggestion._id}`}>
                                                <IconButton color="primary" size="small">
                                                    <EditIcon />
                                                </IconButton>
                                            </Link>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                title={likes.includes(`${suggestion.username}${suggestion._id}`) ? 'Dislike' : 'Like'}
                                                onClick={() => handleLike(suggestion._id)}
                                                size="small"
                                            >
                                                <GrLike className={likes.includes(`${suggestion.username}${suggestion._id}`) ? "text-red-500" : "text-black"} />
                                            </IconButton>
                                            <Chip label={`Likes: ${suggestion.likes}`} size="small" />
                                        </Box>
                                    </Box>
                                </ListItem>
                                <Divider sx={{ my: 2 }} />
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" color="textSecondary">No suggestions found</Typography>
                )}
            </Paper>

            {/* Other Suggestions Section */}
            <Paper elevation={3} sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold', color: 'primary.main' }}>Other Suggestions</Typography>
                {dataOther.length !== 0 ? (
                    <List>
                        {dataOther.map((suggestion) => (
                            <React.Fragment key={suggestion._id}>
                                <ListItem alignItems="flex-start" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 1 }}>
                                    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="body1" sx={{ fontWeight: 'bold' }}>Suggested by: {suggestion.username}</Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <IconButton
                                                title={likes.includes(`${suggestion.username}${suggestion._id}`) ? 'Dislike' : 'Like'}
                                                onClick={() => handleLike(suggestion._id)}
                                                size="small"
                                            >
                                                <GrLike className={likes.includes(`${suggestion.username}${suggestion._id}`) ? "text-red-500" : "text-black"} />
                                            </IconButton>
                                            <Chip label={`Likes: ${suggestion.likes}`} size="small" />
                                        </Box>
                                    </Box>
                                    <Typography variant="body2" color="textSecondary">Description: {suggestion.suggestion}</Typography>
                                    <Typography variant="body2" color="textSecondary">Reply: {suggestion.reply || '-'}</Typography>
                                    <Typography variant="body2" color="textSecondary">Posted At: {suggestion.createdAt}</Typography>
                                </ListItem>
                                <Divider sx={{ my: 2 }} />
                            </React.Fragment>
                        ))}
                    </List>
                ) : (
                    <Typography variant="body1" color="textSecondary">No other suggestions found</Typography>
                )}
            </Paper>
        </Container>
    );
}

export default Suggestions;