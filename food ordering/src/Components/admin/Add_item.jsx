import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Paper, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

function AddItem() {
  const [data, setData] = useState({ name: '', price: '', quantity: '' });
  const [file, setFile] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('food', data.name);
    formData.append('price', data.price);
    formData.append('quantity', data.quantity);
    formData.append('file', file);

    try {
      const res = await axios.post('http://localhost:3000/add-item', formData);
      if (res.data.msg === 'added') {
        setSuccess('Added successfully');
        setTimeout(() => {
          setSuccess('');
          navigate('/admin');
        }, 3000);
      }
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" textAlign="center" gutterBottom>
          Add Food Item
        </Typography>

        {success && <Alert severity="success">{success}</Alert>}

        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Food Name" name="name" required onChange={handleChange} fullWidth />
          <TextField label="Price" name="price" required onChange={handleChange} fullWidth />
          <TextField label="Quantity" name="quantity" required onChange={handleChange} fullWidth />

          <Button color='warning' variant="contained" component="label" startIcon={<CloudUploadIcon />}>
            Upload Image
            <input required type="file" hidden onChange={(e) => setFile(e.target.files[0])} />
          </Button>

          <Button type="submit" variant="outlined" color="warning" fullWidth>
            Add Item
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default AddItem;
