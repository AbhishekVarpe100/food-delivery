import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GrLike } from "react-icons/gr";
import axios from 'axios';
import { 
  Container, Typography, TextField, Button, Paper, Box, 
  IconButton, List, ListItem, ListItemText, Divider, Chip, 
  Tooltip, Avatar, Card, CardContent, CardHeader, CardActions
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MessageIcon from '@mui/icons-material/Message';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonIcon from '@mui/icons-material/Person';

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

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString(undefined, options);
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
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            {/* Header */}
            <Box sx={{ mb: 5, textAlign: 'center' }}>
                <Typography variant="h4" component="h1" 
                    sx={{ 
                        fontFamily: 'Georgia, serif',
                        fontWeight: 'bold',
                        color: '#333',
                        position: 'relative',
                        display: 'inline-block',
                        pb: 1,
                        '&:after': {
                            content: '""',
                            position: 'absolute',
                            bottom: 0,
                            left: '50%',
                            transform: 'translateX(-50%)',
                            width: '60%',
                            height: '3px',
                            background: 'linear-gradient(to right, rgba(0,0,0,0), rgba(218, 165, 32, 0.8), rgba(0,0,0,0))'
                        }
                    }}
                >
                    Suggestion Forum
                </Typography>
                <Typography variant="subtitle1" sx={{ mt: 1, fontFamily: 'Georgia, serif', color: '#666' }}>
                    Share your thoughts and view community suggestions
                </Typography>
            </Box>

            {/* Post Suggestions Section */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: '8px',
                    background: 'linear-gradient(to bottom, #f8f8f8, #fff)',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontFamily: 'Georgia, serif',
                        fontWeight: 'bold', 
                        color: '#5a3921', 
                        mb: 3,
                        pb: 1.5,
                        borderBottom: '2px solid #e0e0e0'
                    }}
                >
                    Post a New Suggestion
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                        value={suggestion}
                        required
                        onChange={(e) => setSuggestion(e.target.value)}
                        placeholder="Share your ideas and suggestions here..."
                        sx={{ 
                            mb: 3,
                            '& .MuiOutlinedInput-root': {
                                fontFamily: 'Georgia, serif',
                                fontSize: '1rem',
                                '& fieldset': {
                                    borderColor: '#d1c8b7',
                                    borderWidth: '1px',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#b39c7d',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#8b6b4a',
                                }
                            }
                        }}
                    />
                    <Button 
                        type="submit" 
                        variant="contained" 
                        sx={{ 
                            py: 1.5,
                            px: 4,
                            background: 'linear-gradient(to bottom, #8b6b4a, #5a3921)',
                            color: 'white',
                            fontFamily: 'Georgia, serif',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            border: 'none',
                            borderRadius: '4px',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
                            '&:hover': {
                                background: 'linear-gradient(to bottom, #9b7b5a, #6a4931)',
                                boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
                            }
                        }}
                    >
                        Submit Suggestion
                    </Button>
                </form>
            </Paper>

            {/* Your Suggestions Section */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    mb: 4, 
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontFamily: 'Georgia, serif',
                        fontWeight: 'bold', 
                        color: '#5a3921', 
                        mb: 3,
                        pb: 1.5,
                        borderBottom: '2px solid #e0e0e0'
                    }}
                >
                    Your Suggestions
                </Typography>
                {data.length !== 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        {data.map((suggestion) => (
                            <Card 
                                key={suggestion._id} 
                                sx={{ 
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <CardContent>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            fontFamily: 'Georgia, serif',
                                            fontSize: '1.1rem',
                                            fontWeight: 'bold',
                                            color: '#333',
                                            mb: 2
                                        }}
                                    >
                                        {suggestion.suggestion}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                                        <MessageIcon sx={{ fontSize: '0.9rem', color: '#8b6b4a', mr: 1 }} />
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                color: '#555'
                                            }}
                                        >
                                            Reply: {suggestion.reply || 'No reply yet'}
                                        </Typography>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <AccessTimeIcon sx={{ fontSize: '0.9rem', color: '#8b6b4a', mr: 1 }} />
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                color: '#777'
                                            }}
                                        >
                                            {formatDate(suggestion.createdAt)}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                
                                <Divider sx={{ mx: 2, backgroundColor: '#e0e0e0' }} />
                                
                                <CardActions sx={{ px: 2, py: 1.5, justifyContent: 'space-between' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Tooltip title="Delete" arrow placement="top">
                                            <IconButton 
                                                onClick={() => handleDelete(suggestion._id)} 
                                                size="small"
                                                sx={{ 
                                                    color: '#d32f2f',
                                                    '&:hover': { backgroundColor: 'rgba(211, 47, 47, 0.08)' }
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </IconButton>
                                        </Tooltip>
                                        <Link to={`/main_home/suggestions/edit/${suggestion._id}`} style={{ textDecoration: 'none' }}>
                                            <Tooltip title="Edit" arrow placement="top">
                                                <IconButton 
                                                    size="small"
                                                    sx={{ 
                                                        color: '#5a3921',
                                                        '&:hover': { backgroundColor: 'rgba(90, 57, 33, 0.08)' }
                                                    }}
                                                >
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                        </Link>
                                    </Box>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Tooltip
                                            title={likes.includes(`${suggestion.username}${suggestion._id}`) ? 'Dislike' : 'Like'} 
                                            arrow 
                                            placement="top"
                                        >
                                            <IconButton
                                                onClick={() => handleLike(suggestion._id)}
                                                size="small"
                                                sx={{ 
                                                    color: likes.includes(`${suggestion.username}${suggestion._id}`) ? '#d32f2f' : '#555',
                                                    transition: 'color 0.2s'
                                                }}
                                            >
                                                <GrLike className={likes.includes(`${suggestion.username}${suggestion._id}`) ? "text-red-500" : "text-gray-500"} />
                                            </IconButton>
                                        </Tooltip>
                                        <Chip 
                                            label={`${suggestion.likes} ${suggestion.likes === 1 ? 'Like' : 'Likes'}`} 
                                            size="small"
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                backgroundColor: '#f5f5f5',
                                                border: '1px solid #e0e0e0'
                                            }} 
                                        />
                                    </Box>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Box 
                        sx={{ 
                            textAlign: 'center', 
                            py: 4,
                            backgroundColor: '#f9f9f9',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontFamily: 'Georgia, serif',
                                color: '#777',
                                fontStyle: 'italic'
                            }}
                        >
                            You haven't posted any suggestions yet
                        </Typography>
                    </Box>
                )}
            </Paper>

            {/* Other Suggestions Section */}
            <Paper 
                elevation={3} 
                sx={{ 
                    p: 4, 
                    borderRadius: '8px',
                    border: '1px solid #e0e0e0',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.08)'
                }}
            >
                <Typography 
                    variant="h5" 
                    sx={{ 
                        fontFamily: 'Georgia, serif',
                        fontWeight: 'bold', 
                        color: '#5a3921', 
                        mb: 3,
                        pb: 1.5,
                        borderBottom: '2px solid #e0e0e0'
                    }}
                >
                    Community Suggestions
                </Typography>
                {dataOther.length !== 0 ? (
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        {dataOther.map((suggestion) => (
                            <Card 
                                key={suggestion._id} 
                                sx={{ 
                                    border: '1px solid #e0e0e0',
                                    borderRadius: '8px',
                                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                                    transition: 'transform 0.2s, box-shadow 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-3px)',
                                        boxShadow: '0 6px 12px rgba(0,0,0,0.1)'
                                    }
                                }}
                            >
                                <CardHeader
                                    avatar={
                                        <Avatar 
                                            sx={{ 
                                                bgcolor: '#8b6b4a',
                                                fontFamily: 'Georgia, serif'
                                            }}
                                        >
                                            {suggestion.username.charAt(0).toUpperCase()}
                                        </Avatar>
                                    }
                                    title={
                                        <Typography 
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {suggestion.username}
                                        </Typography>
                                    }
                                    subheader={
                                        <Typography 
                                            variant="caption" 
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                color: '#777'
                                            }}
                                        >
                                            {formatDate(suggestion.createdAt)}
                                        </Typography>
                                    }
                                />
                                
                                <CardContent>
                                    <Typography 
                                        variant="body1" 
                                        sx={{ 
                                            fontFamily: 'Georgia, serif',
                                            mb: 2
                                        }}
                                    >
                                        {suggestion.suggestion}
                                    </Typography>
                                    
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <MessageIcon sx={{ fontSize: '0.9rem', color: '#8b6b4a', mr: 1 }} />
                                        <Typography 
                                            variant="body2" 
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                color: '#555',
                                                fontStyle: suggestion.reply ? 'normal' : 'italic'
                                            }}
                                        >
                                            {suggestion.reply || 'No reply yet'}
                                        </Typography>
                                    </Box>
                                </CardContent>
                                
                                <Divider sx={{ mx: 2, backgroundColor: '#e0e0e0' }} />
                                
                                <CardActions sx={{ px: 2, py: 1.5, justifyContent: 'flex-end' }}>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Tooltip
                                            title={likes.includes(`${suggestion.username}${suggestion._id}`) ? 'Dislike' : 'Like'} 
                                            arrow 
                                            placement="top"
                                        >
                                            <IconButton
                                                onClick={() => handleLike(suggestion._id)}
                                                size="small"
                                                sx={{ 
                                                    color: likes.includes(`${suggestion.username}${suggestion._id}`) ? '#d32f2f' : '#555',
                                                    transition: 'color 0.2s'
                                                }}
                                            >
                                                <GrLike className={likes.includes(`${suggestion.username}${suggestion._id}`) ? "text-red-500" : "text-gray-500"} />
                                            </IconButton>
                                        </Tooltip>
                                        <Chip 
                                            label={`${suggestion.likes} ${suggestion.likes === 1 ? 'Like' : 'Likes'}`} 
                                            size="small"
                                            sx={{ 
                                                fontFamily: 'Georgia, serif',
                                                backgroundColor: '#f5f5f5',
                                                border: '1px solid #e0e0e0'
                                            }}
                                        />
                                    </Box>
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Box 
                        sx={{ 
                            textAlign: 'center', 
                            py: 4,
                            backgroundColor: '#f9f9f9',
                            borderRadius: '4px'
                        }}
                    >
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                fontFamily: 'Georgia, serif',
                                color: '#777',
                                fontStyle: 'italic'
                            }}
                        >
                            No community suggestions available
                        </Typography>
                    </Box>
                )}
            </Paper>
        </Container>
    );
}

export default Suggestions;